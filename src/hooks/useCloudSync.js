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

export function useCloudSync() {

    const { isAuthenticated, token } = useAuth();

    const [isHydrating, setIsHydrating] = useState(() => isAuthenticated);
    const hasHydratedRef = useRef(false);
    const lastSyncedProgressRef = useRef(null);
    const lastSyncedLessonProgressRef = useRef(null);
    const lastSyncedFlashcardsRef = useRef(null);
    const lastSyncedVideoProgressRef = useRef(null);
    const lastSyncedEventsCountRef = useRef(0);
    const isFlushingRef = useRef(false);

    useEffect(() => {
        if (!isAuthenticated) {
            hasHydratedRef.current = false;
            lastSyncedProgressRef.current = null;
            lastSyncedLessonProgressRef.current = null;
            lastSyncedFlashcardsRef.current = null;
            lastSyncedVideoProgressRef.current = null;
            lastSyncedEventsCountRef.current = 0;
            return;
        }

        let cancelled = false;

        async function hydrate() {
            try {
                // Progress, lessonProgress, flashcards, videoProgress, events -
                // per spec order. It also means each endpoint's one-time
                // legacy migration always runs after the earlier ones have
                // already read UserProgress, so migrations never race.
                const server = await getProgress();
                if (cancelled) return;

                const localProgress = readProgressSnapshot();
                const serverProgressSerialized = serializeProgress(server);
                const progressChanged = serverProgressSerialized !== serializeProgress(localProgress);

                applyProgressSnapshot(server);
                lastSyncedProgressRef.current = serverProgressSerialized;

                const serverLessonIds = await getLessonProgress();
                if (cancelled) return;

                const localLessonIds = readLessonProgressSnapshot();
                const serverLessonProgressSerialized = serializeLessonProgress(serverLessonIds);
                const lessonProgressChanged = serverLessonProgressSerialized !== serializeLessonProgress(localLessonIds);

                applyLessonProgressSnapshot(serverLessonIds);
                lastSyncedLessonProgressRef.current = serverLessonProgressSerialized;

                const serverCards = await getFlashcards();
                if (cancelled) return;

                const localCards = readFlashcardsSnapshot();
                const serverCardsSerialized = serializeFlashcards(serverCards);
                const flashcardsChanged = serverCardsSerialized !== serializeFlashcards(localCards);

                applyFlashcardsSnapshot(serverCards);
                lastSyncedFlashcardsRef.current = serverCardsSerialized;

                const serverVideoProgress = await getVideoProgress();
                if (cancelled) return;

                const localVideoProgress = readVideoProgressSnapshot();
                const serverVideoProgressSerialized = serializeVideoProgress(serverVideoProgress);
                const videoProgressChanged = serverVideoProgressSerialized !== serializeVideoProgress(localVideoProgress);

                applyVideoProgressSnapshot(serverVideoProgress);
                lastSyncedVideoProgressRef.current = serverVideoProgressSerialized;

                const serverEvents = await getEvents();
                if (cancelled) return;

                const localEvents = readEventsSnapshot();
                const eventsChanged = serverEvents.length !== localEvents.length
                    || serializeEvents(serverEvents) !== serializeEvents(localEvents);

                applyEventsSnapshot(serverEvents);
                lastSyncedEventsCountRef.current = serverEvents.length;

                hasHydratedRef.current = true;

                const anyChanged = progressChanged || lessonProgressChanged || flashcardsChanged
                    || videoProgressChanged || eventsChanged;

                if (anyChanged && !sessionStorage.getItem(RELOAD_FLAG_KEY)) {
                    sessionStorage.setItem(RELOAD_FLAG_KEY, "1");
                    window.location.reload();
                }
            } catch {
                hasHydratedRef.current = true;
            } finally {
                if (!cancelled) setIsHydrating(false);
            }
        }

        hydrate();

        return () => {
            cancelled = true;
        };
    }, [isAuthenticated]);

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
                if (progressDirty) {
                    lastSyncedProgressRef.current = progressSerialized;
                    await saveProgress(progressSnapshot, token).catch(() => {});
                }

                if (lessonProgressDirty) {
                    lastSyncedLessonProgressRef.current = lessonProgressSerialized;
                    await saveLessonProgress(lessonIdsSnapshot, token).catch(() => {});
                }

                if (cardsDirty) {
                    lastSyncedFlashcardsRef.current = cardsSerialized;
                    await saveFlashcards(cardsSnapshot, token).catch(() => {});
                }

                if (videoProgressDirty) {
                    lastSyncedVideoProgressRef.current = videoProgressSerialized;
                    await saveVideoProgress(videoProgressSnapshot, token).catch(() => {});
                }

                if (eventsDirty) {
                    const newEvents = eventsSnapshot.slice(lastSyncedEventsCountRef.current);
                    lastSyncedEventsCountRef.current = eventsSnapshot.length;

                    if (newEvents.length > 0) {
                        await postEvents(newEvents, token).catch(() => {});
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
