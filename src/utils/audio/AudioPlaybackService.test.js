import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createAudioController, AUDIO_STATUS } from "./AudioPlaybackService";
import { AUDIO_PROVIDERS } from "./resolveAudioSource";

class FakeAudioElement {

    constructor(url) {
        this.url = url;
        this.listeners = {};
        this.playCalled = 0;
        this.pauseCalled = 0;
    }

    addEventListener(type, handler) {
        this.listeners[type] = this.listeners[type] ?? [];
        this.listeners[type].push(handler);
    }

    removeAttribute() {}

    load() {}

    play() {
        this.playCalled += 1;
        return Promise.resolve();
    }

    pause() {
        this.pauseCalled += 1;
    }

    trigger(type) {
        (this.listeners[type] ?? []).forEach(handler => handler());
    }

}

describe("createAudioController", () => {

    let createdAudioElements;
    let createdUtterances;
    let speechSynthesis;

    beforeEach(() => {

        createdAudioElements = [];

        vi.stubGlobal("Audio", vi.fn(function (url) {
            const element = new FakeAudioElement(url);
            createdAudioElements.push(element);
            return element;
        }));

        createdUtterances = [];

        speechSynthesis = { speak: vi.fn(), cancel: vi.fn(), getVoices: vi.fn(() => []) };

        vi.stubGlobal("window", { ...window, speechSynthesis });

        vi.stubGlobal("SpeechSynthesisUtterance", vi.fn(function (text) {
            this.text = text;
            createdUtterances.push(this);
        }));

    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    describe("file provider", () => {

        it("goes through loading -> playing -> ended for a normal playback", () => {

            const statuses = [];

            const controller = createAudioController({ onStatusChange: status => statuses.push(status) });

            controller.play({ provider: AUDIO_PROVIDERS.FILE, url: "/audio/hello.mp3" });

            expect(statuses).toEqual([AUDIO_STATUS.LOADING]);

            const [element] = createdAudioElements;

            expect(element.url).toBe("/audio/hello.mp3");

            element.trigger("canplay");

            expect(element.playCalled).toBe(1);
            expect(statuses).toEqual([AUDIO_STATUS.LOADING, AUDIO_STATUS.PLAYING]);

            element.trigger("ended");

            expect(statuses).toEqual([AUDIO_STATUS.LOADING, AUDIO_STATUS.PLAYING, AUDIO_STATUS.ENDED]);

        });

        it("reports an error status when the element fires an error event", () => {

            const statuses = [];

            const controller = createAudioController({ onStatusChange: status => statuses.push(status) });

            controller.play({ provider: AUDIO_PROVIDERS.FILE, url: "/audio/broken.mp3" });

            createdAudioElements[0].trigger("error");

            expect(statuses).toEqual([AUDIO_STATUS.LOADING, AUDIO_STATUS.ERROR]);

        });

        it("ignores a stale canplay/ended event from a superseded playback", () => {

            const statuses = [];

            const controller = createAudioController({ onStatusChange: status => statuses.push(status) });

            controller.play({ provider: AUDIO_PROVIDERS.FILE, url: "/audio/a.mp3" });

            const first = createdAudioElements[0];

            controller.play({ provider: AUDIO_PROVIDERS.FILE, url: "/audio/b.mp3" });

            // The first (now stale) element finishing loading shouldn't
            // move the status away from whatever the second play() set.
            first.trigger("canplay");

            expect(statuses).toEqual([AUDIO_STATUS.LOADING, AUDIO_STATUS.LOADING]);

        });

        it("pause() stops playback and resets to idle", () => {

            const statuses = [];

            const controller = createAudioController({ onStatusChange: status => statuses.push(status) });

            controller.play({ provider: AUDIO_PROVIDERS.FILE, url: "/audio/a.mp3" });

            createdAudioElements[0].trigger("canplay");

            controller.pause();

            expect(createdAudioElements[0].pauseCalled).toBe(1);
            expect(statuses.at(-1)).toBe(AUDIO_STATUS.IDLE);

        });

    });

    describe("tts provider", () => {

        it("goes through loading -> playing -> ended via the utterance lifecycle", () => {

            const statuses = [];

            const controller = createAudioController({ onStatusChange: status => statuses.push(status) });

            controller.play({ provider: AUDIO_PROVIDERS.TTS, text: "hello", language: "english" });

            expect(statuses).toEqual([AUDIO_STATUS.LOADING]);
            expect(speechSynthesis.speak).toHaveBeenCalled();

            const [utterance] = createdUtterances;

            expect(utterance.text).toBe("hello");
            expect(utterance.lang).toBe("en-US");

            utterance.onstart();
            expect(statuses).toEqual([AUDIO_STATUS.LOADING, AUDIO_STATUS.PLAYING]);

            utterance.onend();
            expect(statuses).toEqual([AUDIO_STATUS.LOADING, AUDIO_STATUS.PLAYING, AUDIO_STATUS.ENDED]);

        });

        it("reports an error status when the utterance fails", () => {

            const statuses = [];

            const controller = createAudioController({ onStatusChange: status => statuses.push(status) });

            controller.play({ provider: AUDIO_PROVIDERS.TTS, text: "hello", language: "english" });

            createdUtterances[0].onerror();

            expect(statuses).toEqual([AUDIO_STATUS.LOADING, AUDIO_STATUS.ERROR]);

        });

        it("picks a known high-quality voice for the utterance's language when one is available", () => {

            const goodVoice = { name: "Samantha", lang: "en-US" };
            speechSynthesis.getVoices = vi.fn(() => [
                { name: "Robotic Guy", lang: "en-US" },
                goodVoice
            ]);

            const controller = createAudioController({ onStatusChange: vi.fn() });

            controller.play({ provider: AUDIO_PROVIDERS.TTS, text: "hello", language: "english" });

            expect(createdUtterances[0].voice).toBe(goodVoice);

        });

        it("leaves the utterance's voice unset when no voices are available yet - falls back to the browser's own default for utterance.lang", () => {

            speechSynthesis.getVoices = vi.fn(() => []);

            const controller = createAudioController({ onStatusChange: vi.fn() });

            controller.play({ provider: AUDIO_PROVIDERS.TTS, text: "hello", language: "english" });

            expect(createdUtterances[0].voice).toBeUndefined();

        });

        it("falls back to an error status when speechSynthesis isn't supported", () => {

            vi.stubGlobal("window", { ...window, speechSynthesis: undefined });

            const statuses = [];

            const controller = createAudioController({ onStatusChange: status => statuses.push(status) });

            controller.play({ provider: AUDIO_PROVIDERS.TTS, text: "hello", language: "english" });

            expect(statuses).toEqual([AUDIO_STATUS.ERROR]);

        });

    });

    it("reports an error status for an unresolved (null) source, without throwing", () => {

        const statuses = [];

        const controller = createAudioController({ onStatusChange: status => statuses.push(status) });

        expect(() => controller.play(null)).not.toThrow();

        expect(statuses).toEqual([AUDIO_STATUS.ERROR]);

    });

});
