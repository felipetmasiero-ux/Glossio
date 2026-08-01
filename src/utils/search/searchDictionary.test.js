import { describe, expect, it } from "vitest";

import { searchDictionary } from "./searchDictionary";
import { MATCH_RANK } from "./matchRank";

function entry(word, overrides = {}) {
    return { word, translation: `t-${word}`, ...overrides };
}

describe("searchDictionary", () => {

    it("matches by word", () => {

        const entries = [entry("hello"), entry("goodbye")];

        const results = searchDictionary(entries, "hello");

        expect(results.map(r => r.label)).toEqual(["hello"]);
        expect(results[0].rank).toBe(MATCH_RANK.EXACT);

    });

    it("matches by translation when the word itself doesn't match", () => {

        const entries = [entry("hello", { translation: "olá" }), entry("bye", { translation: "tchau" })];

        const results = searchDictionary(entries, "olá");

        expect(results.map(r => r.label)).toEqual(["hello"]);
        expect(results[0].rank).toBe(MATCH_RANK.TRANSLATION);

    });

    it("matches by alias", () => {

        const entries = [entry("go", { aliases: ["went", "gone", "going"] })];

        const results = searchDictionary(entries, "went");

        expect(results.map(r => r.label)).toEqual(["go"]);
        expect(results[0].rank).toBe(MATCH_RANK.ALIAS);
        expect(results[0].matchedText).toBe("went");

    });

    it("ranks a word match above an alias/translation match", () => {

        const entries = [
            entry("cat", { translation: "gato" }),
            entry("dog", { aliases: ["cat-like"], translation: "cachorro" })
        ];

        const results = searchDictionary(entries, "cat");

        expect(results.map(r => r.label)).toEqual(["cat", "dog"]);

    });

    it("excludes entries that don't match any field", () => {

        const entries = [entry("hello"), entry("goodbye")];

        expect(searchDictionary(entries, "xyz")).toEqual([]);

    });

    it("includes phrase-style multi-word entries", () => {

        const entries = [entry("how are you", { translation: "como você está" })];

        const results = searchDictionary(entries, "how are");

        expect(results.map(r => r.label)).toEqual(["how are you"]);

    });

});
