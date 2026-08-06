import { describe, expect, it } from "vitest";

import { validateAudioRef } from "./validateAudioRef";

describe("validateAudioRef", () => {

    it("is valid when the field was never set (undefined - the block builder convention)", () => {
        expect(validateAudioRef(undefined, "path")).toEqual([]);
    });

    it("is valid when the field is explicitly null (the dictionary entry default convention)", () => {
        expect(validateAudioRef(null, "path")).toEqual([]);
    });

    it("is valid for an empty object - explicitly opting into TTS with no file yet", () => {
        expect(validateAudioRef({}, "path")).toEqual([]);
    });

    it("is valid with a non-empty file path", () => {
        expect(validateAudioRef({ file: "/audio/hello.mp3" }, "path")).toEqual([]);
    });

    it("rejects a non-object value", () => {
        const issues = validateAudioRef("hello.mp3", "path");
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("error");
        expect(issues[0].message).toContain("audio()");
    });

    it("rejects an array", () => {
        expect(validateAudioRef(["hello.mp3"], "path")[0].severity).toBe("error");
    });

    it("rejects an empty file string", () => {
        const issues = validateAudioRef({ file: "" }, "path");
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("error");
        expect(issues[0].message).toContain("audio.file");
    });

    it("warns about an unknown field, e.g. a typo", () => {
        const issues = validateAudioRef({ src: "/audio/hello.mp3" }, "path");
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("warning");
        expect(issues[0].message).toContain("src");
    });

});
