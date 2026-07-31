import { describe, expect, it } from "vitest";

import { getWordsByTopic } from "./getWordsByTopic";
import { OTHER_TOPIC } from "../flashcards/groupFlashcardsByTopic";

const entriesByWord = {
    coffee: { word: "coffee", topic: "food" },
    menu: { word: "menu", topic: "food" },
    mother: { word: "mother", topic: "family" }
};

const fakeDictionary = {
    getEntry(language, word) {
        return entriesByWord[word] ?? null;
    }
};

function card(word, language = "English") {
    return { id: word, word, translation: word, language };
}

describe("getWordsByTopic", () => {

    it("filters flashcards by language before grouping", () => {

        const flashcards = [card("coffee", "English"), card("menu", "French")];

        const result = getWordsByTopic({ flashcards, language: "English" }, fakeDictionary);

        expect(result).toEqual([{ topic: "food", count: 1 }]);

    });

    it("sorts topics by count descending", () => {

        const flashcards = [card("coffee"), card("menu"), card("mother")];

        const result = getWordsByTopic({ flashcards, language: "English" }, fakeDictionary);

        expect(result).toEqual([
            { topic: "food", count: 2 },
            { topic: "family", count: 1 }
        ]);

    });

    it("falls back to Other for words with no dictionary entry", () => {

        const flashcards = [card("unknownword")];

        const result = getWordsByTopic({ flashcards, language: "English" }, fakeDictionary);

        expect(result).toEqual([{ topic: OTHER_TOPIC, count: 1 }]);

    });

    it("returns an empty array when there are no flashcards for the language", () => {

        expect(getWordsByTopic({ flashcards: [], language: "English" }, fakeDictionary)).toEqual([]);

    });

});
