import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { EventContext } from "../../contexts/EventContext";
import { VideoProgressRepository } from "../../repositories/VideoProgressRepository";
import { useVideoProgress } from "./useVideoProgress";

const video = { id: "en-a1-cafe-order", language: "english", duration: 112 };

function wrapper({ children }) {
    return (
        <EventContext.Provider value={{ logEvent: vi.fn() }}>
            {children}
        </EventContext.Provider>
    );
}

describe("useVideoProgress", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("starts as not completed when there is no saved progress", () => {

        const { result } = renderHook(() => useVideoProgress(video), { wrapper });

        expect(result.current.completed).toBe(false);

    });

    // Regression test: `completed` used to always start `false`, ignoring
    // any progress already saved for this video, so revisiting a video that
    // had previously been marked completed showed the player again instead
    // of the completion screen.
    it("starts as completed when the saved progress already has completed: true", () => {

        VideoProgressRepository.updateVideoProgress(video.language, video.id, {
            currentTime: video.duration,
            duration: video.duration,
            completed: true,
            completedAt: Date.now()
        });

        const { result } = renderHook(() => useVideoProgress(video), { wrapper });

        expect(result.current.completed).toBe(true);

    });

    it("flips to completed and persists it once handleEnded fires", () => {

        const { result } = renderHook(() => useVideoProgress(video), { wrapper });

        expect(result.current.completed).toBe(false);

        act(() => {
            result.current.handleEnded();
        });

        expect(result.current.completed).toBe(true);

        const saved = VideoProgressRepository.getVideoProgress(video.language, video.id);
        expect(saved.completed).toBe(true);
        expect(saved.completedAt).not.toBeNull();

    });

    it("does not resume mid-video playback for an already-completed video", () => {

        VideoProgressRepository.updateVideoProgress(video.language, video.id, {
            currentTime: 42,
            duration: video.duration,
            completed: true,
            completedAt: Date.now()
        });

        const { result } = renderHook(() => useVideoProgress(video), { wrapper });

        const fakeVideoElement = { currentTime: 0 };
        act(() => {
            result.current.applyResume(fakeVideoElement);
        });

        expect(fakeVideoElement.currentTime).toBe(0);

    });

});
