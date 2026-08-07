import { describe, expect, it } from "vitest";

import { calculateStats } from "./calculateStats";

const DAY = 24 * 60 * 60 * 1000;

function card(overrides = {}) {
    return { id: "1", language: "English", nextReview: Date.now(), repetitions: 0, ...overrides };
}

describe("calculateStats", () => {

    it("returns all zeros for an empty collection", () => {
        expect(calculateStats([])).toEqual({ total: 0, due: 0, learning: 0, mature: 0 });
    });

    it("counts a card due now (overdue) as due", () => {
        const cards = [card({ nextReview: Date.now() - DAY })];
        expect(calculateStats(cards).due).toBe(1);
    });

    it("does not count a card due in the future as due", () => {
        const cards = [card({ nextReview: Date.now() + DAY })];
        expect(calculateStats(cards).due).toBe(0);
    });

    it("uses the same due-now definition as the rest of the app - a mix of overdue/today/future", () => {

        const cards = [
            card({ id: "1", nextReview: Date.now() - DAY }),
            card({ id: "2", nextReview: Date.now() }),
            card({ id: "3", nextReview: Date.now() + DAY })
        ];

        expect(calculateStats(cards).due).toBe(2);

    });

    it("buckets repetitions into learning (1-2) and mature (3+), independent of due status", () => {

        const cards = [
            card({ id: "1", repetitions: 0 }),
            card({ id: "2", repetitions: 1 }),
            card({ id: "3", repetitions: 2 }),
            card({ id: "4", repetitions: 3 }),
            card({ id: "5", repetitions: 10 })
        ];

        const stats = calculateStats(cards);

        expect(stats.learning).toBe(2);
        expect(stats.mature).toBe(2);
        expect(stats.total).toBe(5);

    });

});
