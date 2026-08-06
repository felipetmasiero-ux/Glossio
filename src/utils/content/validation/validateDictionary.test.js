import { describe, expect, it } from "vitest";

import { validateDictionary } from "./validateDictionary";

describe("validateDictionary", () => {

    it("accepts a valid dictionary", () => {
        const entries = [
            { id: "hello", word: "hello", translation: "olá" },
            { id: "bye", word: "bye", translation: "tchau" }
        ];
        expect(validateDictionary(entries)).toEqual([]);
    });

    it("rejects a non-array dictionary", () => {
        const issues = validateDictionary(null);
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("error");
    });

    it("flags an entry missing a word", () => {
        const issues = validateDictionary([{ translation: "olá" }]);
        expect(issues.some(i => i.message.includes('"word"'))).toBe(true);
    });

    it("flags an entry missing a translation", () => {
        const issues = validateDictionary([{ word: "hello" }]);
        expect(issues.some(i => i.message.includes("translation"))).toBe(true);
    });

    it("flags two entries that normalize to the same id", () => {
        const entries = [
            { id: "hello", word: "hello", translation: "olá" },
            { id: "hello", word: "Hello!", translation: "olá (duplicado)" }
        ];
        const issues = validateDictionary(entries, { language: "english" });
        expect(issues).toHaveLength(1);
        expect(issues[0].message).toContain("duplicada");
        expect(issues[0].path).toBe("english[1]");
    });

    it("derives the id from word when no explicit id is given", () => {
        const entries = [
            { word: "hello", translation: "olá" },
            { word: "Hello!", translation: "olá de novo" }
        ];
        const issues = validateDictionary(entries);
        expect(issues.some(i => i.message.includes("duplicada"))).toBe(true);
    });

    it("accepts the audio: null default every dictionary entry already has - compatibility with the whole existing dictionary", () => {
        const entries = [{ id: "hello", word: "hello", translation: "olá", audio: null }];
        expect(validateDictionary(entries)).toEqual([]);
    });

    it("accepts a valid audio() reference on an entry", () => {
        const entries = [{ id: "hello", word: "hello", translation: "olá", audio: { file: "/audio/hello.mp3" } }];
        expect(validateDictionary(entries)).toEqual([]);
    });

    it("flags a malformed audio value on an entry", () => {
        const entries = [{ id: "hello", word: "hello", translation: "olá", audio: "hello.mp3" }];
        const issues = validateDictionary(entries);
        expect(issues.some(i => i.severity === "error" && i.message.includes("audio()"))).toBe(true);
    });

});
