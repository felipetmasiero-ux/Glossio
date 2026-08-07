import { describe, expect, it } from "vitest";

import { getStudyStats } from "./getStudyStats";

const DAY = 24 * 60 * 60 * 1000;

function card(overrides = {}) {
    return { id: "1", language: "English", nextReview: Date.now(), repetitions: 0, ...overrides };
}

describe("getStudyStats", () => {

    it("returns all zeros for an empty collection", () => {
        expect(getStudyStats([], "English")).toEqual({ total: 0, due: 0, learned: 0, newCards: 0 });
    });

    it("only counts flashcards for the given language", () => {

        const cards = [card({ id: "1", language: "English" }), card({ id: "2", language: "French" })];

        expect(getStudyStats(cards, "English").total).toBe(1);

    });

    it("counts overdue and exactly-now cards as due, future cards as not due", () => {

        const cards = [
            card({ id: "1", nextReview: Date.now() - DAY }),
            card({ id: "2", nextReview: Date.now() + DAY })
        ];

        expect(getStudyStats(cards, "English").due).toBe(1);

    });

    it("treats a card with no nextReview yet as due - same defensive fallback as before", () => {

        const cards = [card({ nextReview: undefined })];

        expect(getStudyStats(cards, "English").due).toBe(1);

    });

    it("splits learned (repetitions > 0) from newCards (repetitions === 0)", () => {

        const cards = [
            card({ id: "1", repetitions: 0 }),
            card({ id: "2", repetitions: 1 }),
            card({ id: "3", repetitions: 5 })
        ];

        const stats = getStudyStats(cards, "English");

        expect(stats.newCards).toBe(1);
        expect(stats.learned).toBe(2);

    });

});
