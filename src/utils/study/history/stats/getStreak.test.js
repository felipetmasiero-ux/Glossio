import { describe, expect, it } from "vitest";
import { getStreak } from "./getStreak";

const DAY = 24 * 60 * 60 * 1000;

describe("getStreak", () => {

    it("returns zero streak for empty history", () => {

        expect(getStreak([])).toEqual({
            current: 0,
            longest: 0
        });

    });

    it("returns streak of one when studied today", () => {

        const history = [
            {
                reviewedAt: Date.now()
            }
        ];

        expect(getStreak(history).current).toBe(1);

    });

    it("returns streak of two for today and yesterday", () => {

        const history = [
            {
                reviewedAt: Date.now()
            },
            {
                reviewedAt: Date.now() - DAY
            }
        ];

        expect(getStreak(history).current).toBe(2);

    });

    it("breaks streak when yesterday is missing", () => {

        const history = [
            {
                reviewedAt: Date.now()
            },
            {
                reviewedAt: Date.now() - (2 * DAY)
            }
        ];

        expect(getStreak(history).current).toBe(1);

    });

    it("ignores multiple reviews on the same day", () => {

        const history = [
            {
                reviewedAt: Date.now()
            },
            {
                reviewedAt: Date.now() - 1000
            }
        ];

        expect(getStreak(history).current).toBe(1);

    });

});