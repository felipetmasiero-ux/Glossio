import { describe, expect, it } from "vitest";

import { audio } from "./audio";

describe("audio", () => {

    it("wraps a file path", () => {
        expect(audio("/audio/english/a1/hello.mp3")).toEqual({ file: "/audio/english/a1/hello.mp3" });
    });

    it("returns an empty object (opt into TTS, no file yet) when called with no file", () => {
        expect(audio()).toEqual({});
    });

});
