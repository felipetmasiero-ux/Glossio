import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { EventContext } from "../../contexts/EventContext";
import { LastActivityContext } from "../../contexts/LastActivityContext";
import { VideoProgressRepository } from "../../repositories/VideoProgressRepository";
import { useVideoProgress } from "./useVideoProgress";

const video = { id: "en-a1-cafe-order", language: "english", duration: 112 };

function makeWrapper({ lastActivity = null, setActivity = vi.fn(), clearActivity = vi.fn() } = {}) {

    return function wrapper({ children }) {
        return (
            <EventContext.Provider value={{ logEvent: vi.fn() }}>
                <LastActivityContext.Provider value={{ lastActivity, setActivity, clearActivity }}>
                    {children}
                </LastActivityContext.Provider>
            </EventContext.Provider>
        );
    };

}

const wrapper = makeWrapper();

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

    describe("Last Activity (L4)", () => {

        it("does not register any activity just from rendering the hook - only real playback counts", () => {

            const setActivity = vi.fn();

            renderHook(() => useVideoProgress(video), { wrapper: makeWrapper({ setActivity }) });

            expect(setActivity).not.toHaveBeenCalled();

        });

        it("registers Last Activity with the video's identifiers once playback actually starts", () => {

            const setActivity = vi.fn();

            const { result } = renderHook(() => useVideoProgress(video), { wrapper: makeWrapper({ setActivity }) });

            act(() => {
                result.current.handlePlay();
            });

            expect(setActivity).toHaveBeenCalledWith({
                type: "video",
                language: "english",
                videoId: "en-a1-cafe-order"
            });

        });

        it("clears Last Activity once the video ends, when it is still about this same video", () => {

            const clearActivity = vi.fn();

            const { result } = renderHook(() => useVideoProgress(video), {
                wrapper: makeWrapper({
                    lastActivity: { type: "video", videoId: video.id },
                    clearActivity
                })
            });

            act(() => {
                result.current.handleEnded();
            });

            expect(clearActivity).toHaveBeenCalled();

        });

        it("does not clear Last Activity on end when it belongs to a different video", () => {

            const clearActivity = vi.fn();

            const { result } = renderHook(() => useVideoProgress(video), {
                wrapper: makeWrapper({
                    lastActivity: { type: "video", videoId: "some-other-video" },
                    clearActivity
                })
            });

            act(() => {
                result.current.handleEnded();
            });

            expect(clearActivity).not.toHaveBeenCalled();

        });

        it("does not clear Last Activity on end when it belongs to a different activity type - e.g. a lesson read afterwards", () => {

            const clearActivity = vi.fn();

            const { result } = renderHook(() => useVideoProgress(video), {
                wrapper: makeWrapper({
                    lastActivity: { type: "lesson", lessonId: "english-a1-greetings" },
                    clearActivity
                })
            });

            act(() => {
                result.current.handleEnded();
            });

            expect(clearActivity).not.toHaveBeenCalled();

        });

        it("tolerates an old/partial Last Activity object without crashing - compatibility with pre-existing data", () => {

            expect(() => renderHook(() => useVideoProgress(video), {
                wrapper: makeWrapper({ lastActivity: { type: "exercise" } })
            })).not.toThrow();

        });

    });

});
