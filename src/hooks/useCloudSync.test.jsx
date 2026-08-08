import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useCloudSync } from "./useCloudSync";
import { serializeProgress } from "../utils/cloudSync/progressStorage";
import { DEFAULT_GOALS } from "../utils/goals/goalsStorage";

vi.mock("./useAuth", () => ({ useAuth: vi.fn() }));

import { useAuth } from "./useAuth";

vi.mock("../api/progressApi", () => ({
    getProgress: vi.fn(),
    saveProgress: vi.fn()
}));
vi.mock("../api/lessonProgressApi", () => ({
    getLessonProgress: vi.fn(),
    saveLessonProgress: vi.fn()
}));
vi.mock("../api/flashcardApi", () => ({
    getFlashcards: vi.fn(),
    saveFlashcards: vi.fn()
}));
vi.mock("../api/videoProgressApi", () => ({
    getVideoProgress: vi.fn(),
    saveVideoProgress: vi.fn()
}));
vi.mock("../api/eventsApi", () => ({
    getEvents: vi.fn(),
    postEvents: vi.fn()
}));
vi.mock("../utils/cloudSync/reportSyncFailure", () => ({ reportSyncFailure: vi.fn() }));

import { getProgress, saveProgress } from "../api/progressApi";
import { getLessonProgress } from "../api/lessonProgressApi";
import { getFlashcards, saveFlashcards } from "../api/flashcardApi";
import { getVideoProgress } from "../api/videoProgressApi";
import { getEvents } from "../api/eventsApi";
import { reportSyncFailure } from "../utils/cloudSync/reportSyncFailure";

function progressState(language) {
    return {
        language,
        exerciseProgress: [],
        studyHistory: [],
        dashboard: { lastActivity: null, goals: DEFAULT_GOALS }
    };
}

function seedLocalProgress(language) {
    localStorage.setItem("language", language);
    localStorage.setItem("exerciseProgress", JSON.stringify([]));
    localStorage.setItem("studyHistory", JSON.stringify([]));
    localStorage.setItem("lastActivity", JSON.stringify(null));
}

// Marks every resource but "progress" as already synced against an empty
// local state, matching what seedLocalProgress + otherwise-untouched
// localStorage actually serialize to - so only progress ends up dirty,
// letting a test target one resource's push in isolation.
function syncedMarkerWithOnlyProgressPending(baseLanguage) {
    return JSON.stringify({
        progress: serializeProgress(progressState(baseLanguage)),
        lessonProgress: "[]",
        flashcards: "[]",
        videoProgress: "[]",
        eventsCount: 0
    });
}

describe("useCloudSync", () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();

        // jsdom's window.location.reload isn't configurable enough for
        // vi.spyOn - replace the whole object instead, since hydrate()
        // calling the real thing would otherwise throw ("not implemented").
        delete window.location;
        window.location = { ...window.location, reload: vi.fn() };

        useAuth.mockReturnValue({ isAuthenticated: true, isLoading: false, token: "fake-token" });

        getLessonProgress.mockResolvedValue([]);
        getFlashcards.mockResolvedValue([]);
        getVideoProgress.mockResolvedValue([]);
        getEvents.mockResolvedValue([]);
        saveProgress.mockResolvedValue({});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it("applies the server snapshot on the very first hydration ever (bootstrap)", async () => {

        seedLocalProgress("english");
        getProgress.mockResolvedValue(progressState("french"));

        const { result } = renderHook(() => useCloudSync());

        await waitFor(() => expect(result.current.isHydrating).toBe(false));

        expect(localStorage.getItem("language")).toBe("french");

        const marker = JSON.parse(localStorage.getItem("cloudSyncSynced"));
        expect(marker.progress).toBe(serializeProgress(progressState("french")));

    });

    // Regression test for the project's most serious known bug: a quick
    // refresh right after a local change (before the 8s push interval fires)
    // used to have hydrate() blindly overwrite the fresh local change with
    // whatever the server still had on file, silently losing it.
    it("does not overwrite a local change that hasn't been pushed to the server yet", async () => {

        // A previous session already confirmed "english" was synced...
        localStorage.setItem("cloudSyncSynced", JSON.stringify({
            progress: serializeProgress(progressState("english")),
            lessonProgress: "[]",
            flashcards: "[]",
            videoProgress: "[]",
            eventsCount: 0
        }));

        // ...but the user then switched to "french" locally and refreshed
        // before that change could be pushed - the server still says "english".
        seedLocalProgress("french");
        getProgress.mockResolvedValue(progressState("english"));

        const { result } = renderHook(() => useCloudSync());

        await waitFor(() => expect(result.current.isHydrating).toBe(false));

        expect(localStorage.getItem("language")).toBe("french");
        expect(window.location.reload).not.toHaveBeenCalled();

    });

    it("pushes the preserved local change once the flush interval fires", async () => {

        localStorage.setItem("cloudSyncSynced", JSON.stringify({
            progress: serializeProgress(progressState("english")),
            lessonProgress: "[]",
            flashcards: "[]",
            videoProgress: "[]",
            eventsCount: 0
        }));

        seedLocalProgress("french");
        getProgress.mockResolvedValue(progressState("english"));

        vi.useFakeTimers();

        const { result } = renderHook(() => useCloudSync());

        await vi.waitFor(() => expect(result.current.isHydrating).toBe(false));

        await vi.advanceTimersByTimeAsync(8000);

        expect(saveProgress).toHaveBeenCalledWith(progressState("french"), "fake-token");
        expect(reportSyncFailure).not.toHaveBeenCalled();
        expect(result.current.syncStatus).toBe("idle");

    });

    // Regression test: AuthProvider's `isAuthenticated` is `Boolean(user)`,
    // and `user` starts `null` on every fresh page load until `/auth/me`
    // resolves - so isAuthenticated is transiently false on every reload,
    // not just on a real logout. An earlier version of this fix treated any
    // `!isAuthenticated` render as a logout and wiped the persisted marker,
    // which destroyed the very thing this fix relies on right before hydrate
    // ever got to use it - silently reintroducing the data-loss bug in the
    // exact race window it exists to close.
    it("does not wipe the persisted marker while auth is still resolving (isLoading transient false)", async () => {

        localStorage.setItem("cloudSyncSynced", JSON.stringify({
            progress: serializeProgress(progressState("english")),
            lessonProgress: "[]",
            flashcards: "[]",
            videoProgress: "[]",
            eventsCount: 0
        }));

        seedLocalProgress("french");
        getProgress.mockResolvedValue(progressState("english"));

        useAuth.mockReturnValue({ isAuthenticated: false, isLoading: true, token: null });

        const { result, rerender } = renderHook(() => useCloudSync());

        expect(localStorage.getItem("cloudSyncSynced")).not.toBeNull();

        useAuth.mockReturnValue({ isAuthenticated: true, isLoading: false, token: "fake-token" });
        rerender();

        await waitFor(() => expect(result.current.isHydrating).toBe(false));

        expect(localStorage.getItem("language")).toBe("french");

    });

    it("applies a genuine remote change when local has no pending edits", async () => {

        // Local matches exactly what was last confirmed synced - nothing
        // pending here, so a different value now coming from the server can
        // only mean another device changed it, and should be adopted.
        localStorage.setItem("cloudSyncSynced", JSON.stringify({
            progress: serializeProgress(progressState("english")),
            lessonProgress: "[]",
            flashcards: "[]",
            videoProgress: "[]",
            eventsCount: 0
        }));

        seedLocalProgress("english");
        getProgress.mockResolvedValue(progressState("portuguese"));

        const { result } = renderHook(() => useCloudSync());

        await waitFor(() => expect(result.current.isHydrating).toBe(false));

        expect(localStorage.getItem("language")).toBe("portuguese");

    });

});

// R2 (post-sprint audit): a push failure used to be a bare `.catch(() =>
// {})` - completely silent, both to the team (no error tracking) and to
// product (no analytics). These tests cover the fix: the existing retry is
// untouched, but a failure that survives it is now reported exactly once
// through reportSyncFailure, and reflected in the hook's own syncStatus.
describe("useCloudSync - instrumenting push failures (R2)", () => {

    beforeEach(() => {
        // vi.restoreAllMocks() (used by the describe block above) only
        // restores vi.spyOn spies - it doesn't clear call history or
        // implementations set via mockResolvedValue/mockRejectedValue on the
        // vi.fn()s created by the vi.mock(...) factories above, so those
        // would otherwise leak across every test in this file.
        vi.resetAllMocks();

        localStorage.clear();
        sessionStorage.clear();

        delete window.location;
        window.location = { ...window.location, reload: vi.fn() };

        useAuth.mockReturnValue({ isAuthenticated: true, isLoading: false, token: "fake-token" });

        getProgress.mockResolvedValue(progressState("english"));
        getLessonProgress.mockResolvedValue([]);
        getFlashcards.mockResolvedValue([]);
        getVideoProgress.mockResolvedValue([]);
        getEvents.mockResolvedValue([]);

        localStorage.setItem("cloudSyncSynced", syncedMarkerWithOnlyProgressPending("english"));
        seedLocalProgress("french");
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it("does not report anything when the push succeeds outright", async () => {

        saveProgress.mockResolvedValue({});

        vi.useFakeTimers();
        const { result } = renderHook(() => useCloudSync());
        await vi.waitFor(() => expect(result.current.isHydrating).toBe(false));
        await vi.advanceTimersByTimeAsync(8000);

        expect(reportSyncFailure).not.toHaveBeenCalled();
        expect(result.current.syncStatus).toBe("idle");

    });

    it("does not report anything when the failure is recovered by withRetry's own retry", async () => {

        saveProgress.mockRejectedValueOnce(new Error("blip")).mockResolvedValueOnce({});

        vi.useFakeTimers();
        const { result } = renderHook(() => useCloudSync());
        await vi.waitFor(() => expect(result.current.isHydrating).toBe(false));
        await vi.advanceTimersByTimeAsync(8000);

        expect(saveProgress).toHaveBeenCalledTimes(2);
        expect(reportSyncFailure).not.toHaveBeenCalled();
        expect(result.current.syncStatus).toBe("idle");

    });

    it("reports exactly once, and sets syncStatus to \"error\", once retries are exhausted", async () => {

        const error = new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        saveProgress.mockRejectedValue(error);

        vi.useFakeTimers();
        const { result } = renderHook(() => useCloudSync());
        await vi.waitFor(() => expect(result.current.isHydrating).toBe(false));
        await vi.advanceTimersByTimeAsync(8000);

        // withRetry: one initial attempt + one retry, both failing.
        expect(saveProgress).toHaveBeenCalledTimes(2);
        expect(reportSyncFailure).toHaveBeenCalledTimes(1);
        expect(reportSyncFailure).toHaveBeenCalledWith("progress", "push", error);
        await vi.waitFor(() => expect(result.current.syncStatus).toBe("error"));

    });

    it("recovers to \"idle\" automatically once a later tick's push succeeds", async () => {

        const error = new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        saveProgress.mockRejectedValue(error);

        vi.useFakeTimers();
        const { result } = renderHook(() => useCloudSync());
        await vi.waitFor(() => expect(result.current.isHydrating).toBe(false));
        await vi.advanceTimersByTimeAsync(8000);

        await vi.waitFor(() => expect(result.current.syncStatus).toBe("error"));

        saveProgress.mockResolvedValue({});
        await vi.advanceTimersByTimeAsync(8000);

        await vi.waitFor(() => expect(result.current.syncStatus).toBe("idle"));

    });

    it("a failure in one resource does not block the push attempt for another", async () => {

        // Both progress and flashcards dirty this time.
        localStorage.setItem("cloudSyncSynced", JSON.stringify({
            progress: serializeProgress(progressState("english")),
            lessonProgress: "[]",
            flashcards: JSON.stringify([{ id: "old" }]),
            videoProgress: "[]",
            eventsCount: 0
        }));
        localStorage.setItem("flashcards", JSON.stringify([{ id: "new" }]));

        saveProgress.mockRejectedValue(new Error("boom"));
        saveFlashcards.mockResolvedValue({});

        vi.useFakeTimers();
        const { result } = renderHook(() => useCloudSync());
        await vi.waitFor(() => expect(result.current.isHydrating).toBe(false));
        await vi.advanceTimersByTimeAsync(8000);

        expect(saveFlashcards).toHaveBeenCalled();
        expect(reportSyncFailure).toHaveBeenCalledTimes(1);
        expect(reportSyncFailure).toHaveBeenCalledWith("progress", "push", expect.any(Error));
        await vi.waitFor(() => expect(result.current.syncStatus).toBe("error"));

    });

    it("keeps local data usable and does not throw when a push fails (offline-first behavior preserved)", async () => {

        saveProgress.mockRejectedValue(new Error("Não foi possível conectar ao servidor."));

        vi.useFakeTimers();
        const { result } = renderHook(() => useCloudSync());
        await vi.waitFor(() => expect(result.current.isHydrating).toBe(false));

        await expect(vi.advanceTimersByTimeAsync(8000)).resolves.not.toThrow();

        expect(localStorage.getItem("language")).toBe("french");

    });

});
