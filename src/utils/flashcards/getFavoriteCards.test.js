import { describe, expect, it } from "vitest";

import { getFavoriteCards } from "./getFavoriteCards";

function card(word, favorite) {
    return { id: word, word, translation: word, language: "english", favorite };
}

describe("getFavoriteCards", () => {

    it("returns only cards marked as favorite", () => {

        const cards = [card("hello", true), card("bye", false), card("cat", true)];

        const result = getFavoriteCards(cards);

        expect(result.map(c => c.word)).toEqual(["hello", "cat"]);

    });

    it("returns an empty array when nothing is favorited", () => {

        const cards = [card("hello", false), card("bye", false)];

        expect(getFavoriteCards(cards)).toEqual([]);

    });

    it("returns an empty array for an empty input", () => {

        expect(getFavoriteCards([])).toEqual([]);

    });

});
