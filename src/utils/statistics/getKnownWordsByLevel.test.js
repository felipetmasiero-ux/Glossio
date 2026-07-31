import { describe, expect, it } from "vitest";

import { getKnownWordsByLevel } from "./getKnownWordsByLevel";

function card(word, overrides = {}) {
    return { id: word, word, translation: word, language: "English", lessonId: null, ...overrides };
}

describe("getKnownWordsByLevel", () => {

    it("filters flashcards by language", () => {

        const flashcards = [card("hello", { language: "English" }), card("bonjour", { language: "French" })];

        const result = getKnownWordsByLevel({ flashcards, language: "English" });

        expect(result).toEqual([{ level: "unknown", count: 1 }]);

    });

    it("groups flashcards with no lessonId under the unknown bucket", () => {

        const flashcards = [card("hello"), card("world")];

        const result = getKnownWordsByLevel({ flashcards, language: "English" });

        expect(result).toEqual([{ level: "unknown", count: 2 }]);

    });

    it("returns an empty array when there are no flashcards for the language", () => {

        expect(getKnownWordsByLevel({ flashcards: [], language: "English" })).toEqual([]);

    });

});
