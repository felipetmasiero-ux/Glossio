import { describe, expect, it, vi, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";

vi.mock("../../utils/audio/AudioPlaybackService", async (importOriginal) => {
    const actual = await importOriginal();
    return { ...actual, createAudioController: vi.fn() };
});

import { useAudioPlayer } from "./useAudioPlayer";
import { createAudioController, AUDIO_STATUS } from "../../utils/audio/AudioPlaybackService";
import { AUDIO_PROVIDERS } from "../../utils/audio/resolveAudioSource";

describe("useAudioPlayer", () => {

    let playMock;
    let pauseMock;
    let stopMock;
    let statusCallback;

    beforeEach(() => {

        playMock = vi.fn();
        pauseMock = vi.fn();
        stopMock = vi.fn();

        createAudioController.mockImplementation(({ onStatusChange }) => {
            statusCallback = onStatusChange;
            return { play: playMock, pause: pauseMock, stop: stopMock };
        });

    });

    it("starts idle and reports hasAudio false when there is no audio reference", () => {

        const { result } = renderHook(() => useAudioPlayer({ audio: null, text: "hello", language: "english" }));

        expect(result.current.status).toBe(AUDIO_STATUS.IDLE);
        expect(result.current.hasAudio).toBe(false);

    });

    it("reports hasAudio true whenever an audio reference is present, file or TTS-only", () => {

        const { result: withFile } = renderHook(() => useAudioPlayer({ audio: { file: "/a.mp3" }, text: "hi", language: "english" }));
        expect(withFile.current.hasAudio).toBe(true);

        const { result: ttsOnly } = renderHook(() => useAudioPlayer({ audio: {}, text: "hi", language: "english" }));
        expect(ttsOnly.current.hasAudio).toBe(true);

    });

    it("play() resolves the source (via resolveAudioSource) and hands it to the controller", () => {

        const { result } = renderHook(() => useAudioPlayer({ audio: { file: "/audio/hello.mp3" }, text: "hello", language: "english" }));

        act(() => {
            result.current.play();
        });

        expect(playMock).toHaveBeenCalledWith({ provider: AUDIO_PROVIDERS.FILE, url: "/audio/hello.mp3" });

    });

    it("play() resolves a TTS source when there's no file", () => {

        const { result } = renderHook(() => useAudioPlayer({ audio: {}, text: "hello", language: "english" }));

        act(() => {
            result.current.play();
        });

        expect(playMock).toHaveBeenCalledWith({ provider: AUDIO_PROVIDERS.TTS, text: "hello", language: "english" });

    });

    it("replay does the same thing as play", () => {

        const { result } = renderHook(() => useAudioPlayer({ audio: { file: "/a.mp3" }, text: "hi", language: "english" }));

        act(() => {
            result.current.replay();
        });

        expect(playMock).toHaveBeenCalledWith({ provider: AUDIO_PROVIDERS.FILE, url: "/a.mp3" });

    });

    it("pause() delegates to the controller", () => {

        const { result } = renderHook(() => useAudioPlayer({ audio: { file: "/a.mp3" }, text: "hi", language: "english" }));

        act(() => {
            result.current.pause();
        });

        expect(pauseMock).toHaveBeenCalled();

    });

    it("reflects status changes reported by the controller", () => {

        const { result } = renderHook(() => useAudioPlayer({ audio: { file: "/a.mp3" }, text: "hi", language: "english" }));

        act(() => {
            statusCallback(AUDIO_STATUS.LOADING);
        });

        expect(result.current.status).toBe(AUDIO_STATUS.LOADING);

        act(() => {
            statusCallback(AUDIO_STATUS.PLAYING);
        });

        expect(result.current.status).toBe(AUDIO_STATUS.PLAYING);

    });

    it("stops the controller on unmount", () => {

        const { unmount } = renderHook(() => useAudioPlayer({ audio: { file: "/a.mp3" }, text: "hi", language: "english" }));

        unmount();

        expect(stopMock).toHaveBeenCalled();

    });

});
