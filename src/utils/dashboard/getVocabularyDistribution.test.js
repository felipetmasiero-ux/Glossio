import { describe, expect, it } from "vitest";

import { getVocabularyDistribution } from "./getVocabularyDistribution";
import { DictionaryRepository } from "../../repositories/DictionaryRepository";

describe("getVocabularyDistribution", () => {

    it("returns available levels with zero known words when there are no flashcards", () => {

        const distribution = getVocabularyDistribution({ flashcards: [], language: "English" });

        expect(distribution.map(entry => entry.level)).toEqual(["A1", "A2"]);
        expect(distribution.every(entry => entry.known === 0)).toBe(true);
        expect(distribution.every(entry => entry.percentage === 0)).toBe(true);
        expect(distribution.find(entry => entry.level === "A1").total).toBe(
            DictionaryRepository.getAll("English").filter(entry => entry.level === "A1").length
        );

    });

    it("computes the known percentage per level from the learner's flashcards", () => {

        const flashcards = [
            { word: "hello", language: "English" }, // A1
            { word: "often", language: "English" } // A2
        ];

        const distribution = getVocabularyDistribution({ flashcards, language: "English" });

        const a1 = distribution.find(entry => entry.level === "A1");
        const a2 = distribution.find(entry => entry.level === "A2");

        expect(a1.known).toBe(1);
        expect(a1.percentage).toBe(Math.round((1 / a1.total) * 100));

        expect(a2.known).toBe(1);
        expect(a2.percentage).toBe(Math.round((1 / a2.total) * 100));

    });

    it("ignores flashcards for other languages and words not in the dictionary", () => {

        const flashcards = [
            { word: "hello", language: "French" },
            { word: "not-a-real-word", language: "English" }
        ];

        const distribution = getVocabularyDistribution({ flashcards, language: "English" });

        expect(distribution.every(entry => entry.known === 0)).toBe(true);

    });

});
