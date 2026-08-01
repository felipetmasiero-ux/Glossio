import { describe, expect, it } from "vitest";

import { sortFlashcards, SORT_OPTIONS } from "./sortFlashcards";

function card(word, overrides = {}) {
    return { id: word, word, translation: word, language: "english", ...overrides };
}

describe("sortFlashcards", () => {

    it("sorts alphabetically by word by default", () => {

        const cards = [card("zebra"), card("apple"), card("mango")];

        const result = sortFlashcards(cards);

        expect(result.map(c => c.word)).toEqual(["apple", "mango", "zebra"]);

    });

    it("sorts alphabetically when explicitly requested", () => {

        const cards = [card("zebra"), card("apple")];

        const result = sortFlashcards(cards, SORT_OPTIONS.ALPHA);

        expect(result.map(c => c.word)).toEqual(["apple", "zebra"]);

    });

    it("sorts most-recently-created first", () => {

        const cards = [
            card("old", { createdAt: 1000 }),
            card("newest", { createdAt: 3000 }),
            card("middle", { createdAt: 2000 })
        ];

        const result = sortFlashcards(cards, SORT_OPTIONS.RECENT);

        expect(result.map(c => c.word)).toEqual(["newest", "middle", "old"]);

    });

    it("sorts by soonest next review first", () => {

        const cards = [
            card("later", { nextReview: 3000 }),
            card("soonest", { nextReview: 1000 }),
            card("middle", { nextReview: 2000 })
        ];

        const result = sortFlashcards(cards, SORT_OPTIONS.NEXT_REVIEW);

        expect(result.map(c => c.word)).toEqual(["soonest", "middle", "later"]);

    });

    it("does not mutate the input array", () => {

        const cards = [card("zebra"), card("apple")];
        const copy = [...cards];

        sortFlashcards(cards, SORT_OPTIONS.ALPHA);

        expect(cards).toEqual(copy);

    });

    it("returns an empty array for an empty input", () => {

        expect(sortFlashcards([], SORT_OPTIONS.ALPHA)).toEqual([]);

    });

});
