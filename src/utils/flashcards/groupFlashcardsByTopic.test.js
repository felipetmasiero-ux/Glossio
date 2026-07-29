import { describe, expect, it } from "vitest";

import { groupFlashcardsByTopic, OTHER_TOPIC } from "./groupFlashcardsByTopic";

const entriesByWord = {
    coffee: { word: "coffee", topic: "food" },
    menu: { word: "menu", topic: "food" },
    mother: { word: "mother", topic: "family" },
    hello: { word: "hello", topic: null },
    xyz: { word: "xyz", topic: "food" }
};

const fakeDictionary = {
    getEntry(language, word) {
        return entriesByWord[word] ?? null;
    }
};

function card(word, overrides = {}) {
    return { id: word, word, translation: word, language: "english", ...overrides };
}

describe("groupFlashcardsByTopic", () => {

    it("groups cards by the topic found in the dictionary entry", () => {

        const result = groupFlashcardsByTopic(
            [card("coffee"), card("menu"), card("mother")],
            fakeDictionary
        );

        expect(result).toEqual([
            { topic: "family", cards: [card("mother")] },
            { topic: "food", cards: [card("coffee"), card("menu")] }
        ]);

    });

    it("sorts cards alphabetically by word within a group", () => {

        const result = groupFlashcardsByTopic(
            [card("menu"), card("coffee")],
            fakeDictionary
        );

        expect(result[0].cards.map(c => c.word)).toEqual(["coffee", "menu"]);

    });

    it("falls back to Other when the dictionary entry has no topic", () => {

        const result = groupFlashcardsByTopic([card("hello")], fakeDictionary);

        expect(result).toEqual([{ topic: OTHER_TOPIC, cards: [card("hello")] }]);

    });

    it("falls back to Other when the word has no dictionary entry at all", () => {

        const result = groupFlashcardsByTopic([card("notindictionary")], fakeDictionary);

        expect(result).toEqual([{ topic: OTHER_TOPIC, cards: [card("notindictionary")] }]);

    });

    it("always places Other last, regardless of insertion order", () => {

        const result = groupFlashcardsByTopic(
            [card("hello"), card("mother"), card("coffee")],
            fakeDictionary
        );

        expect(result.map(group => group.topic)).toEqual(["family", "food", OTHER_TOPIC]);

    });

    it("sorts topics alphabetically", () => {

        const result = groupFlashcardsByTopic(
            [card("mother"), card("coffee")],
            fakeDictionary
        );

        expect(result.map(group => group.topic)).toEqual(["family", "food"]);

    });

    it("returns an empty array for an empty flashcard list", () => {

        expect(groupFlashcardsByTopic([], fakeDictionary)).toEqual([]);

    });

    it("does not mutate the input array", () => {

        const input = [card("menu"), card("coffee")];
        const copy = [...input];

        groupFlashcardsByTopic(input, fakeDictionary);

        expect(input).toEqual(copy);

    });

});
