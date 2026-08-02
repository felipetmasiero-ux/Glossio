import { describe, expect, it } from "vitest";

import { getHeatmap } from "./getHeatmap";
import { EVENT_TYPES } from "../../constants/events";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

describe("getHeatmap", () => {

    it("returns exactly 90 days by default, ending today", () => {

        const cells = getHeatmap({ events: [] });

        expect(cells).toHaveLength(90);
        expect(cells.at(-1).timestamp).toBeLessThanOrEqual(Date.now());
        expect(Date.now() - cells.at(-1).timestamp).toBeLessThan(DAY_IN_MS);

    });

    it("buckets activity events by day and computes intensity levels", () => {

        const now = Date.now();

        const events = [
            ...Array.from({ length: 3 }, () => ({ type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: {} })),
            ...Array.from({ length: 6 }, () => ({ type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now - DAY_IN_MS, payload: {} })),
            ...Array.from({ length: 12 }, () => ({ type: EVENT_TYPES.EXERCISE_COMPLETED, timestamp: now - 2 * DAY_IN_MS, payload: {} }))
        ];

        const cells = getHeatmap({ events, days: 5 });

        expect(cells.at(-1).count).toBe(3);
        expect(cells.at(-1).level).toBe(1);

        expect(cells.at(-2).count).toBe(6);
        expect(cells.at(-2).level).toBe(2);

        expect(cells.at(-3).count).toBe(12);
        expect(cells.at(-3).level).toBe(3);

        expect(cells.at(-4).count).toBe(0);
        expect(cells.at(-4).level).toBe(0);

    });

    it("ignores non-activity events such as WORD_VIEWED", () => {

        const cells = getHeatmap({
            events: [{ type: EVENT_TYPES.WORD_VIEWED, timestamp: Date.now(), payload: {} }],
            days: 3
        });

        expect(cells.at(-1).count).toBe(0);

    });

});
