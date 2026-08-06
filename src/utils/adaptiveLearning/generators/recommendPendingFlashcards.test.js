import { describe, expect, it } from "vitest";

import { recommendPendingFlashcards } from "./recommendPendingFlashcards";

function card({ word, language = "english", reviewed = false }) {
    return {
        id: `card-${word}`,
        word,
        language,
        lastReviewedAt: reviewed ? Date.now() : null
    };
}

describe("recommendPendingFlashcards", () => {

    it("recommends studying never-reviewed cards", () => {

        const result = recommendPendingFlashcards({
            flashcards: [card({ word: "hello" }), card({ word: "bye" })],
            language: "english"
        });

        expect(result).toHaveLength(1);
        expect(result[0].title).toContain("2");
        expect(result[0].href).toBe("/flashcards");

    });

    it("uses singular phrasing for exactly one pending card", () => {

        const result = recommendPendingFlashcards({
            flashcards: [card({ word: "hello" })],
            language: "english"
        });

        expect(result[0].title).toBe("Estudar 1 flashcard novo");

    });

    it("does not count a card that has already been reviewed", () => {

        const result = recommendPendingFlashcards({
            flashcards: [card({ word: "hello", reviewed: true })],
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("ignores cards from a different language", () => {

        const result = recommendPendingFlashcards({
            flashcards: [card({ word: "bonjour", language: "french" })],
            language: "english"
        });

        expect(result).toEqual([]);

    });

    it("returns nothing for a brand new user with no flashcards", () => {
        expect(recommendPendingFlashcards({ flashcards: [], language: "english" })).toEqual([]);
    });

});
