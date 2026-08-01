import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useCloudSync } from "./useCloudSync";
import { serializeProgress } from "../utils/cloudSync/progressStorage";

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

import { getProgress, saveProgress } from "../api/progressApi";
import { getLessonProgress } from "../api/lessonProgressApi";
import { getFlashcards } from "../api/flashcardApi";
import { getVideoProgress } from "../api/videoProgressApi";
import { getEvents } from "../api/eventsApi";

function progressState(language) {
    return {
        language,
        exerciseProgress: [],
        studyHistory: [],
        dashboard: { lastActivity: null }
    };
}

function seedLocalProgress(language) {
    localStorage.setItem("language", language);
    localStorage.setItem("exerciseProgress", JSON.stringify([]));
    localStorage.setItem("studyHistory", JSON.stringify([]));
    localStorage.setItem("lastActivity", JSON.stringify(null));
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
