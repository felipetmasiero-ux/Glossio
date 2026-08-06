import { describe, expect, it } from "vitest";

import { recommendDifficultFlashcards } from "./recommendDifficultFlashcards";

function card({ id, word, language = "english", easeFactor }) {
    return { id, word, language, easeFactor };
}

function lowQualityReviews(cardId, count) {
    return Array.from({ length: count }, () => ({ cardId, quality: 1 }));
}

describe("recommendDifficultFlashcards", () => {

    it("recommends a card with a low ease factor and several recent low-quality reviews", () => {

        const result = recommendDifficultFlashcards({
            flashcards: [card({ id: "c1", word: "hello", easeFactor: 1.5 })],
            studyHistory: lowQualityReviews("c1", 3),
            language: "english"
        });

        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("Praticar: hello");
        expect(result[0].reason).toContain("3 vezes");

    });

    it("does not recommend a card with a normal (default) ease factor", () => {

        const result = recommendDifficultFlashcards({
            flashcards: [card({ id: "c1", word: "hello", easeFactor: 2.5 })],
            studyHistory: lowQualityReviews("c1", 5),
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("does not recommend a low-ease card with too few recent low-quality reviews to be sure", () => {

        const result = recommendDifficultFlashcards({
            flashcards: [card({ id: "c1", word: "hello", easeFactor: 1.5 })],
            studyHistory: lowQualityReviews("c1", 1),
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("does not count a high-quality review toward the low-quality total", () => {

        const result = recommendDifficultFlashcards({
            flashcards: [card({ id: "c1", word: "hello", easeFactor: 1.5 })],
            studyHistory: [{ cardId: "c1", quality: 5 }, { cardId: "c1", quality: 4 }],
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("ignores a card from a different language", () => {

        const result = recommendDifficultFlashcards({
            flashcards: [card({ id: "c1", word: "bonjour", language: "french", easeFactor: 1.5 })],
            studyHistory: lowQualityReviews("c1", 3),
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("picks the hardest (lowest ease factor) card when more than one qualifies", () => {

        const result = recommendDifficultFlashcards({
            flashcards: [
                card({ id: "c1", word: "hello", easeFactor: 1.8 }),
                card({ id: "c2", word: "bye", easeFactor: 1.4 })
            ],
            studyHistory: [...lowQualityReviews("c1", 3), ...lowQualityReviews("c2", 3)],
            language: "english"
        });

        expect(result[0].title).toBe("Praticar: bye");

    });

    it("returns nothing for a brand new user with no flashcards", () => {
        expect(recommendDifficultFlashcards({ flashcards: [], studyHistory: [], language: "english" })).toEqual([]);
    });

});
