import { describe, expect, it } from "vitest";

import { getStreakSummary } from "./getStreakSummary";
import { EVENT_TYPES } from "../../constants/events";

const DAY = 24 * 60 * 60 * 1000;

describe("getStreakSummary", () => {

    it("returns zeros for no activity", () => {

        const summary = getStreakSummary({ events: [] });

        expect(summary).toEqual({ current: 0, longest: 0, daysThisMonth: 0 });

    });

    it("reports current and longest streak from activity events", () => {

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: Date.now(), payload: {} },
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: Date.now() - DAY, payload: {} }
        ];

        const summary = getStreakSummary({ events });

        expect(summary.current).toBe(2);
        expect(summary.longest).toBe(2);

    });

    it("counts distinct days studied in the current calendar month", () => {

        const now = new Date();
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 12).getTime();
        const expectedDistinctDays = now.getDate() === 1 ? 1 : 2;

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: Date.now(), payload: {} },
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: firstOfMonth, payload: {} }
        ];

        const summary = getStreakSummary({ events });

        expect(summary.daysThisMonth).toBe(expectedDistinctDays);

    });

    it("excludes activity from a previous calendar month", () => {

        const now = new Date();
        const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 15).getTime();

        const summary = getStreakSummary({
            events: [{ type: EVENT_TYPES.LESSON_COMPLETED, timestamp: previousMonth, payload: {} }]
        });

        expect(summary.daysThisMonth).toBe(0);

    });

});
