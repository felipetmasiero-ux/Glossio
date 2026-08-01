import { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";
import { getProgress, saveProgress } from "../api/progressApi";
import { getLessonProgress, saveLessonProgress } from "../api/lessonProgressApi";
import { getFlashcards, saveFlashcards } from "../api/flashcardApi";
import { getVideoProgress, saveVideoProgress } from "../api/videoProgressApi";
import { getEvents, postEvents } from "../api/eventsApi";
import {
    readProgressSnapshot,
    applyProgressSnapshot,
    serializeProgress,
    readLessonProgressSnapshot,
    applyLessonProgressSnapshot,
    serializeLessonProgress,
    readFlashcardsSnapshot,
    applyFlashcardsSnapshot,
    serializeFlashcards,
    readVideoProgressSnapshot,
    applyVideoProgressSnapshot,
    serializeVideoProgress,
    readEventsSnapshot,
    applyEventsSnapshot,
    serializeEvents
} from "../utils/cloudSync/progressStorage";

const PUSH_INTERVAL_MS = 8000;

// Existing Repositories/Providers normalize their data shape on load and
// immediately resave it (e.g. FlashcardProvider filling in defaults via
// normalizeFlashcards), which can make a freshly-hydrated snapshot look
// "changed" again on the very next hydration. Capping the reload to once per
// tab (never cleared - a brand new tab always gets sessionStorage reset)
// makes that class of drift self-limiting instead of looping, since
// isAuthenticated also flips through a transient `false` on every page load
// (while /me is pending), not just on a real logout.
const RELOAD_FLAG_KEY = "cloudSyncReloaded";

// Persisted (localStorage, survives reload/refresh) record of what this
// browser last confirmed as synced with the server for each resource - the
// actual fix for the "quick refresh loses an unsynced change" race. Without
// this, hydrate() had no way to tell "local looks different from the server
// because it has a pending edit" apart from "local looks different from the
// server because another device changed it" - and always assumed the
// latter, blindly overwriting local (and the pending edit) with the server's
// answer. A resource is only ever overwritten by the server when local
// still matches this marker (nothing pending) - the very first hydration
// ever for a resource (no marker yet) is the one case where an overwrite is
// always safe, since there is nothing local to protect.
const SYNCED_MARKER_KEY = "cloudSyncSynced";

function readSyncedMarker() {
    try {
        const raw = localStorage.getItem(SYNCED_MARKER_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
        return {};
    }
}

function writeSyncedMarker(marker) {
    localStorage.setItem(SYNCED_MARKER_KEY, JSON.stringify(marker));
}

// One retry on top of the initial attempt - enough to ride out a single
// dropped request without building a real retry/backoff queue. Failures are
// only ever logged (never surfaced to the user) and, in dev, only via
// console.warn so a flaky local backend doesn't spam production users.
async function withRetry(fn, label) {
    try {
        return await fn();
    } catch {
        try {
            return await fn();
        } catch (error) {
            if (import.meta.env.DEV) {
                console.warn(`[cloudSync] ${label} failed after retry:`, error);
            }
            throw error;
        }
    }
}

export function useCloudSync() {

    const { isAuthenticated, isLoading: isAuthLoading, token } = useAuth();

    const [isHydrating, setIsHydrating] = useState(() => isAuthenticated);
    const hasHydratedRef = useRef(false);
    const lastSyncedProgressRef = useRef(null);
    const lastSyncedLessonProgressRef = useRef(null);
    const lastSyncedFlashcardsRef = useRef(null);
    const lastSyncedVideoProgressRef = useRef(null);
    const lastSyncedEventsCountRef = useRef(0);
    const isFlushingRef = useRef(false);
    const syncedMarkerRef = useRef(null);

    if (syncedMarkerRef.current === null) {
        syncedMarkerRef.current = readSyncedMarker();
    }

    function markSynced(key, value) {
        syncedMarkerRef.current = { ...syncedMarkerRef.current, [key]: value };
        writeSyncedMarker(syncedMarkerRef.current);
    }

    useEffect(() => {
        // AuthProvider's `isAuthenticated` is `Boolean(user)`, and `user`
        // starts `null` on every fresh page load until `/auth/me` resolves -
        // so this is transiently false on every reload, not just on a real
        // logout. Treating that transient state as "logged out" would wipe
        // the persisted synced-marker (see below) on every single reload,
        // right before hydrate ever gets to use it - which defeats the fix
        // in exactly the race window it exists to protect. Only a *confirmed*
        // unauthenticated state (isAuthLoading already settled) means a real
        // logout (or no session at all), and is when resetting is correct.
        if (isAuthLoading) {
            return;
        }

        if (!isAuthenticated) {
            hasHydratedRef.current = false;
            lastSyncedProgressRef.current = null;
            lastSyncedLessonProgressRef.current = null;
            lastSyncedFlashcardsRef.current = null;
            lastSyncedVideoProgressRef.current = null;
            lastSyncedEventsCountRef.current = 0;
            syncedMarkerRef.current = {};
            localStorage.removeItem(SYNCED_MARKER_KEY);
            return;
        }

        let cancelled = false;

        async function hydrate() {

            const marker = syncedMarkerRef.current;
            let anyChanged = false;

            // Progress, lessonProgress, flashcards, videoProgress, events -
            // per spec order. It also means each endpoint's one-time legacy
            // migration always runs after the earlier ones have already read
            // UserProgress, so migrations never race. Each resource is
            // independent: one failing (even after its retry) doesn't stop
            // the others from hydrating.
            try {
                const server = await withRetry(getProgress, "getProgress");
                if (cancelled) return;

                const localProgress = readProgressSnapshot();
                const localSerialized = serializeProgress(localProgress);
                const serverSerialized = serializeProgress(server);
                const hasMarker = "progress" in marker;
                const localIsPending = hasMarker && localSerialized !== marker.progress;

                if (!localIsPending) {
                    applyProgressSnapshot(server);
                    lastSyncedProgressRef.current = serverSerialized;
                    markSynced("progress", serverSerialized);
                    anyChanged = anyChanged || serverSerialized !== localSerialized;
                } else {
                    lastSyncedProgressRef.current = marker.progress;
                }
            } catch {
                // Already retried inside withRetry; keep local as-is.
            }

            try {
                const serverLessonIds = await withRetry(getLessonProgress, "getLessonProgress");
                if (cancelled) return;

                const localLessonIds = readLessonProgressSnapshot();
                const localSerialized = serializeLessonProgress(localLessonIds);
                const serverSerialized = serializeLessonProgress(serverLessonIds);
                const hasMarker = "lessonProgress" in marker;
                const localIsPending = hasMarker && localSerialized !== marker.lessonProgress;

                if (!localIsPending) {
                    applyLessonProgressSnapshot(serverLessonIds);
                    lastSyncedLessonProgressRef.current = serverSerialized;
                    markSynced("lessonProgress", serverSerialized);
                    anyChanged = anyChanged || serverSerialized !== localSerialized;
                } else {
                    lastSyncedLessonProgressRef.current = marker.lessonProgress;
                }
            } catch {
                // Already retried inside withRetry; keep local as-is.
            }

            try {
                const serverCards = await withRetry(getFlashcards, "getFlashcards");
                if (cancelled) return;

                const localCards = readFlashcardsSnapshot();
                const localSerialized = serializeFlashcards(localCards);
                const serverSerialized = serializeFlashcards(serverCards);
                const hasMarker = "flashcards" in marker;
                const localIsPending = hasMarker && localSerialized !== marker.flashcards;

                if (!localIsPending) {
                    applyFlashcardsSnapshot(serverCards);
                    lastSyncedFlashcardsRef.current = serverSerialized;
                    markSynced("flashcards", serverSerialized);
                    anyChanged = anyChanged || serverSerialized !== localSerialized;
                } else {
                    lastSyncedFlashcardsRef.current = marker.flashcards;
                }
            } catch {
                // Already retried inside withRetry; keep local as-is.
            }

            try {
                const serverVideoProgress = await withRetry(getVideoProgress, "getVideoProgress");
                if (cancelled) return;

                const localVideoProgress = readVideoProgressSnapshot();
                const localSerialized = serializeVideoProgress(localVideoProgress);
                const serverSerialized = serializeVideoProgress(serverVideoProgress);
                const hasMarker = "videoProgress" in marker;
                const localIsPending = hasMarker && localSerialized !== marker.videoProgress;

                if (!localIsPending) {
                    applyVideoProgressSnapshot(serverVideoProgress);
                    lastSyncedVideoProgressRef.current = serverSerialized;
                    markSynced("videoProgress", serverSerialized);
                    anyChanged = anyChanged || serverSerialized !== localSerialized;
                } else {
                    lastSyncedVideoProgressRef.current = marker.videoProgress;
                }
            } catch {
                // Already retried inside withRetry; keep local as-is.
            }

            try {
                const serverEvents = await withRetry(getEvents, "getEvents");
                if (cancelled) return;

                const localEvents = readEventsSnapshot();
                const hasMarker = "eventsCount" in marker;
                const localIsPending = hasMarker && localEvents.length !== marker.eventsCount;

                if (!localIsPending) {
                    const eventsChanged = serverEvents.length !== localEvents.length
                        || serializeEvents(serverEvents) !== serializeEvents(localEvents);

                    applyEventsSnapshot(serverEvents);
                    lastSyncedEventsCountRef.current = serverEvents.length;
                    markSynced("eventsCount", serverEvents.length);
                    anyChanged = anyChanged || eventsChanged;
                } else {
                    lastSyncedEventsCountRef.current = marker.eventsCount;
                }
            } catch {
                // Already retried inside withRetry; keep local as-is.
            }

            if (cancelled) return;

            hasHydratedRef.current = true;

            if (anyChanged && !sessionStorage.getItem(RELOAD_FLAG_KEY)) {
                sessionStorage.setItem(RELOAD_FLAG_KEY, "1");
                window.location.reload();
            }

            setIsHydrating(false);
        }

        hydrate();

        return () => {
            cancelled = true;
        };
    }, [isAuthenticated, isAuthLoading]);

    useEffect(() => {
        if (!isAuthenticated) return;

        async function flushIfChanged() {
            // Without this guard, an interval tick and a pagehide/cleanup-
            // triggered call (e.g. right as a page reload fires) can overlap:
            // both read the same "dirty" snapshot before either updates the
            // lastSynced refs, both PUT the same full-replace payload, and
            // the second one's createMany hits a unique constraint on rows
            // the first one just committed. One flush at a time; a call that
            // arrives while one's already running just no-ops - the running
            // one already covers whatever it would have sent.
            if (!hasHydratedRef.current || isFlushingRef.current) return;

            isFlushingRef.current = true;

            try {
                const progressSnapshot = readProgressSnapshot();
                const progressSerialized = serializeProgress(progressSnapshot);
                const progressDirty = progressSerialized !== lastSyncedProgressRef.current;

                const lessonIdsSnapshot = readLessonProgressSnapshot();
                const lessonProgressSerialized = serializeLessonProgress(lessonIdsSnapshot);
                const lessonProgressDirty = lessonProgressSerialized !== lastSyncedLessonProgressRef.current;

                const cardsSnapshot = readFlashcardsSnapshot();
                const cardsSerialized = serializeFlashcards(cardsSnapshot);
                const cardsDirty = cardsSerialized !== lastSyncedFlashcardsRef.current;

                const videoProgressSnapshot = readVideoProgressSnapshot();
                const videoProgressSerialized = serializeVideoProgress(videoProgressSnapshot);
                const videoProgressDirty = videoProgressSerialized !== lastSyncedVideoProgressRef.current;

                const eventsSnapshot = readEventsSnapshot();
                const eventsDirty = eventsSnapshot.length !== lastSyncedEventsCountRef.current;

                // Progress, lessonProgress, flashcards, videoProgress, events -
                // same order as hydrate.
                //
                // Each "lastSynced" ref (and its persisted marker counterpart)
                // is only updated AFTER its save resolves. If the request
                // fails even after its retry (offline, backend down), the
                // snapshot stays marked dirty so the next tick retries it -
                // marking it synced up-front would silently drop that change
                // until some unrelated future edit happened to touch the same
                // data again. One resource failing never stops the others.
                if (progressDirty) {
                    await withRetry(() => saveProgress(progressSnapshot, token), "saveProgress")
                        .then(() => {
                            lastSyncedProgressRef.current = progressSerialized;
                            markSynced("progress", progressSerialized);
                        })
                        .catch(() => {});
                }

                if (lessonProgressDirty) {
                    await withRetry(() => saveLessonProgress(lessonIdsSnapshot, token), "saveLessonProgress")
                        .then(() => {
                            lastSyncedLessonProgressRef.current = lessonProgressSerialized;
                            markSynced("lessonProgress", lessonProgressSerialized);
                        })
                        .catch(() => {});
                }

                if (cardsDirty) {
                    await withRetry(() => saveFlashcards(cardsSnapshot, token), "saveFlashcards")
                        .then(() => {
                            lastSyncedFlashcardsRef.current = cardsSerialized;
                            markSynced("flashcards", cardsSerialized);
                        })
                        .catch(() => {});
                }

                if (videoProgressDirty) {
                    await withRetry(() => saveVideoProgress(videoProgressSnapshot, token), "saveVideoProgress")
                        .then(() => {
                            lastSyncedVideoProgressRef.current = videoProgressSerialized;
                            markSynced("videoProgress", videoProgressSerialized);
                        })
                        .catch(() => {});
                }

                if (eventsDirty) {
                    const newEvents = eventsSnapshot.slice(lastSyncedEventsCountRef.current);

                    if (newEvents.length > 0) {
                        await withRetry(() => postEvents(newEvents, token), "postEvents")
                            .then(() => {
                                lastSyncedEventsCountRef.current = eventsSnapshot.length;
                                markSynced("eventsCount", eventsSnapshot.length);
                            })
                            .catch(() => {});
                    } else {
                        lastSyncedEventsCountRef.current = eventsSnapshot.length;
                        markSynced("eventsCount", eventsSnapshot.length);
                    }
                }
            } finally {
                isFlushingRef.current = false;
            }
        }

        const intervalId = setInterval(flushIfChanged, PUSH_INTERVAL_MS);
        window.addEventListener("pagehide", flushIfChanged);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("pagehide", flushIfChanged);
            flushIfChanged();
        };
    }, [isAuthenticated, token]);

    return { isHydrating };

}
