import { describe, expect, it } from "vitest";

import { getFavoriteWordsCount } from "./getFavoriteWordsCount";

function card(word, overrides = {}) {
    return { id: word, word, translation: word, language: "English", favorite: false, ...overrides };
}

describe("getFavoriteWordsCount", () => {

    it("counts only favorited cards for the given language", () => {

        const flashcards = [
            card("hello", { favorite: true }),
            card("bye", { favorite: false }),
            card("cat", { favorite: true })
        ];

        expect(getFavoriteWordsCount({ flashcards, language: "English" })).toBe(2);

    });

    it("excludes favorites from other languages", () => {

        const flashcards = [
            card("hello", { favorite: true, language: "English" }),
            card("chat", { favorite: true, language: "French" })
        ];

        expect(getFavoriteWordsCount({ flashcards, language: "English" })).toBe(1);

    });

    it("returns 0 when there are no flashcards", () => {

        expect(getFavoriteWordsCount({ flashcards: [], language: "English" })).toBe(0);

    });

});
