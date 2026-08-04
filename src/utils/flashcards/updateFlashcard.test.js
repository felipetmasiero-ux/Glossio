import { describe, expect, it } from "vitest";

import { updateFlashcard } from "./updateFlashcard";

describe("updateFlashcard", () => {

    it("applies the given updates", () => {

        const card = { id: "1", word: "casa", translation: "house", updatedAt: 100 };

        const result = updateFlashcard(card, { word: "gato", translation: "cat" });

        expect(result.word).toBe("gato");
        expect(result.translation).toBe("cat");

    });

    it("bumps updatedAt", () => {

        const card = { id: "1", word: "casa", updatedAt: 100 };

        const result = updateFlashcard(card, { word: "gato" });

        expect(result.updatedAt).toBeGreaterThanOrEqual(100);

    });

    it("never touches SM-2 review history fields", () => {

        const card = {
            id: "1",
            word: "casa",
            repetitions: 4,
            interval: 30,
            easeFactor: 2.6,
            nextReview: 12345,
            lastReviewedAt: 6789,
            createdAt: 1
        };

        const result = updateFlashcard(card, { word: "gato", translation: "cat" });

        expect(result.repetitions).toBe(4);
        expect(result.interval).toBe(30);
        expect(result.easeFactor).toBe(2.6);
        expect(result.nextReview).toBe(12345);
        expect(result.lastReviewedAt).toBe(6789);
        expect(result.createdAt).toBe(1);
        expect(result.id).toBe("1");

    });

    it("does not mutate the original card", () => {

        const card = { id: "1", word: "casa", updatedAt: 100 };

        updateFlashcard(card, { word: "gato" });

        expect(card.word).toBe("casa");

    });

    it("supports a partial update (e.g. moving a card between decks)", () => {

        const card = { id: "1", word: "casa", translation: "house", deckId: null, updatedAt: 100 };

        const result = updateFlashcard(card, { deckId: "deck-1" });

        expect(result.deckId).toBe("deck-1");
        expect(result.word).toBe("casa");
        expect(result.translation).toBe("house");

    });

});
