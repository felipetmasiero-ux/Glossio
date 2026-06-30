import { describe, expect, it } from "vitest";

import { getTodayReviews } from "./getTodayReviews";

describe("getTodayReviews", () => {

    it("returns 0 for an empty history", () => {

        expect(getTodayReviews([])).toBe(0);

    });

    it("counts reviews made today", () => {

        const history = [
            { reviewedAt: Date.now() },
            { reviewedAt: Date.now() }
        ];

        expect(getTodayReviews(history)).toBe(2);

    });

    it("ignores reviews from previous days", () => {

        const yesterday = Date.now() - 24 * 60 * 60 * 1000;

        const history = [
            { reviewedAt: yesterday }
        ];

        expect(getTodayReviews(history)).toBe(0);

    });

    it("counts only today's reviews", () => {

        const yesterday = Date.now() - 24 * 60 * 60 * 1000;

        const history = [
            { reviewedAt: yesterday },
            { reviewedAt: Date.now() },
            { reviewedAt: Date.now() }
        ];

        expect(getTodayReviews(history)).toBe(2);

    });

});