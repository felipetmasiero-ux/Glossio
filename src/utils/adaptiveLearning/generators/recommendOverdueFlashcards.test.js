import { describe, expect, it } from "vitest";

import { recommendOverdueFlashcards } from "./recommendOverdueFlashcards";

const DAY_MS = 24 * 60 * 60 * 1000;

function card({ word, language = "english", daysOverdue, reviewed = true }) {
    return {
        id: `card-${word}`,
        word,
        language,
        nextReview: Date.now() - daysOverdue * DAY_MS,
        lastReviewedAt: reviewed ? Date.now() - (daysOverdue + 1) * DAY_MS : null
    };
}

describe("recommendOverdueFlashcards", () => {

    it("recommends the most overdue card by name", () => {

        const result = recommendOverdueFlashcards({
            flashcards: [
                card({ word: "hello", daysOverdue: 4 }),
                card({ word: "bye", daysOverdue: 9 })
            ],
            language: "english"
        });

        expect(result).toHaveLength(1);
        expect(result[0].reason).toContain('"bye"');
        expect(result[0].reason).toContain("9 dias");

    });

    it("does not recommend a card that isn't overdue yet", () => {

        const result = recommendOverdueFlashcards({
            flashcards: [card({ word: "hello", daysOverdue: 0 })],
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("ignores a card that has never been reviewed - see recommendPendingFlashcards for that", () => {

        const result = recommendOverdueFlashcards({
            flashcards: [card({ word: "hello", daysOverdue: 10, reviewed: false })],
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("gives a higher priority (lower number) to a very overdue card", () => {

        const veryOverdue = recommendOverdueFlashcards({
            flashcards: [card({ word: "hello", daysOverdue: 10 })],
            language: "english"
        });

        const slightlyOverdue = recommendOverdueFlashcards({
            flashcards: [card({ word: "hello", daysOverdue: 4 })],
            language: "english"
        });

        expect(veryOverdue[0].priority).toBeLessThan(slightlyOverdue[0].priority);

    });

    it("ignores cards from a different language", () => {

        const result = recommendOverdueFlashcards({
            flashcards: [card({ word: "bonjour", language: "french", daysOverdue: 10 })],
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("returns nothing for a brand new user with no flashcards", () => {
        expect(recommendOverdueFlashcards({ flashcards: [], language: "english" })).toEqual([]);
    });

});
