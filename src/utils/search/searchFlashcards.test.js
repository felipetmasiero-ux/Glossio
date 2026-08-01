import { describe, expect, it } from "vitest";

import { searchFlashcards } from "./searchFlashcards";
import { MATCH_RANK } from "./matchRank";

function card(word, overrides = {}) {
    return { id: word, word, translation: `t-${word}`, language: "english", favorite: false, ...overrides };
}

function fakeDictionary(topicsByWord) {
    return {
        getEntry(language, word) {
            const topic = topicsByWord[word];
            return topic ? { topic } : null;
        }
    };
}

describe("searchFlashcards", () => {

    it("matches by word (front)", () => {

        const cards = [card("work"), card("cat")];

        const results = searchFlashcards(cards, "work", fakeDictionary({}));

        expect(results.map(r => r.label)).toEqual(["work"]);

    });

    it("matches by translation (back)", () => {

        const cards = [card("work", { translation: "trabalhar" })];

        const results = searchFlashcards(cards, "trabalhar", fakeDictionary({}));

        expect(results[0].rank).toBe(MATCH_RANK.TRANSLATION);

    });

    it("matches by the dictionary topic looked up for the card's word", () => {

        const cards = [card("waiter")];

        const results = searchFlashcards(cards, "restaurant", fakeDictionary({ waiter: "restaurant" }));

        expect(results.map(r => r.label)).toEqual(["waiter"]);
        expect(results[0].rank).toBe(MATCH_RANK.ALIAS);
        expect(results[0].data.topic).toBe("restaurant");

    });

    it("matches favorited cards when searching for 'favoritos'", () => {

        const cards = [card("work", { favorite: true }), card("cat", { favorite: false })];

        const results = searchFlashcards(cards, "favoritos", fakeDictionary({}));

        expect(results.map(r => r.label)).toEqual(["work"]);

    });

    it("does not match unfavorited cards when searching for 'favoritos'", () => {

        const cards = [card("cat", { favorite: false })];

        expect(searchFlashcards(cards, "favoritos", fakeDictionary({}))).toEqual([]);

    });

    it("excludes cards that don't match any field", () => {

        const cards = [card("work")];

        expect(searchFlashcards(cards, "xyz", fakeDictionary({}))).toEqual([]);

    });

});
