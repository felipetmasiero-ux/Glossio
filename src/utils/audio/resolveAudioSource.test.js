import { describe, expect, it } from "vitest";

import { resolveAudioSource, AUDIO_PROVIDERS } from "./resolveAudioSource";

describe("resolveAudioSource", () => {

    it("returns null when there is no audio reference at all", () => {
        expect(resolveAudioSource({ audio: undefined, text: "hello", language: "english" })).toBeNull();
        expect(resolveAudioSource({ audio: null, text: "hello", language: "english" })).toBeNull();
    });

    it("resolves to the file provider when a file is present", () => {

        const source = resolveAudioSource({
            audio: { file: "/audio/english/a1/hello.mp3" },
            text: "hello",
            language: "english"
        });

        expect(source).toEqual({ provider: AUDIO_PROVIDERS.FILE, url: "/audio/english/a1/hello.mp3" });

    });

    it("resolves to the TTS provider when audio is opted into but has no file", () => {

        const source = resolveAudioSource({ audio: {}, text: "hello", language: "english" });

        expect(source).toEqual({ provider: AUDIO_PROVIDERS.TTS, text: "hello", language: "english" });

    });

    it("prefers the file over TTS when both a file and text are available", () => {

        const source = resolveAudioSource({
            audio: { file: "/audio/x.mp3" },
            text: "hello",
            language: "english"
        });

        expect(source.provider).toBe(AUDIO_PROVIDERS.FILE);

    });

    it("returns null for TTS with no text to synthesize", () => {
        expect(resolveAudioSource({ audio: {}, text: "", language: "english" })).toBeNull();
        expect(resolveAudioSource({ audio: {}, text: undefined, language: "english" })).toBeNull();
    });

});
