import { describe, expect, it } from "vitest";

import { groupFlashcardsByTopic, OTHER_TOPIC } from "./groupFlashcardsByTopic";
import { DictionaryRepository } from "../../repositories/DictionaryRepository";

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

    describe("with the real DictionaryRepository (regression)", () => {

        // Cards store `language` exactly as LanguageContext provides it -
        // display-cased ("English"), not the "english" key the dictionary
        // data is keyed by. Using the fake dictionary above wouldn't catch a
        // casing mismatch since its lookup ignores `language` entirely; this
        // exercises the real default dictionary the app actually uses.
        it("finds a real topic for a card whose language is display-cased", () => {

            const result = groupFlashcardsByTopic([
                { id: "hello", word: "hello", translation: "olá", language: "English" }
            ], DictionaryRepository);

            expect(result).toEqual([
                { topic: DictionaryRepository.getEntry("english", "hello").topic, cards: [{ id: "hello", word: "hello", translation: "olá", language: "English" }] }
            ]);
            expect(result[0].topic).not.toBe(OTHER_TOPIC);

        });

    });

});
