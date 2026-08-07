import { describe, expect, it } from "vitest";

import { getStartOfDay, getEndOfDay, isDueNow, isDueToday, isDueWithinDays } from "./dueDate";

const DAY = 24 * 60 * 60 * 1000;

describe("getStartOfDay", () => {

    it("zeroes the time to local midnight of the given day", () => {

        const noon = new Date(2026, 2, 15, 14, 30, 45, 500).getTime();

        const startOfDay = new Date(getStartOfDay(noon));

        expect(startOfDay.getFullYear()).toBe(2026);
        expect(startOfDay.getMonth()).toBe(2);
        expect(startOfDay.getDate()).toBe(15);
        expect(startOfDay.getHours()).toBe(0);
        expect(startOfDay.getMinutes()).toBe(0);
        expect(startOfDay.getSeconds()).toBe(0);
        expect(startOfDay.getMilliseconds()).toBe(0);

    });

    it("uses local time, not UTC - confirms the timezone this app already relied on didn't change", () => {

        // 00:30 local time is still "today" locally, even though in a
        // timezone west of UTC the UTC calendar date could already be
        // "yesterday" - getStartOfDay must stay anchored to local time,
        // exactly like every place this logic used to live inline
        // (new Date(...).setHours(0, 0, 0, 0) is inherently local-time).
        const justAfterMidnight = new Date(2026, 5, 10, 0, 30).getTime();

        const startOfDay = new Date(getStartOfDay(justAfterMidnight));

        expect(startOfDay.getDate()).toBe(10);
        expect(startOfDay.getHours()).toBe(0);

    });

    it("defaults to the current instant when no timestamp is given", () => {
        expect(() => getStartOfDay()).not.toThrow();
    });

});

describe("getEndOfDay", () => {

    it("returns exactly one day after start of day when daysAhead is 0 (end of today)", () => {

        const now = new Date(2026, 2, 15, 9, 0).getTime();

        expect(getEndOfDay(now, 0)).toBe(getStartOfDay(now) + DAY);

    });

    it("adds one extra day per daysAhead - end of tomorrow, end of the 7th day", () => {

        const now = new Date(2026, 2, 15, 9, 0).getTime();

        expect(getEndOfDay(now, 1)).toBe(getStartOfDay(now) + 2 * DAY);
        expect(getEndOfDay(now, 6)).toBe(getStartOfDay(now) + 7 * DAY);

    });

});

describe("isDueNow", () => {

    it("is due when nextReview is in the past", () => {
        expect(isDueNow(Date.now() - 1000)).toBe(true);
    });

    it("is due when nextReview is exactly now", () => {
        const now = Date.now();
        expect(isDueNow(now, now)).toBe(true);
    });

    it("is not due when nextReview is in the future", () => {
        expect(isDueNow(Date.now() + 1000)).toBe(false);
    });

    it("treats a missing/falsy nextReview as due - defensive fallback shared by every caller now", () => {
        expect(isDueNow(null)).toBe(true);
        expect(isDueNow(undefined)).toBe(true);
        expect(isDueNow(0)).toBe(true);
    });

});

describe("isDueToday", () => {

    const now = new Date(2026, 2, 15, 12, 0).getTime(); // noon, March 15

    it("counts a card overdue since yesterday as due today - it doesn't just vanish until reviewed", () => {
        expect(isDueToday(now - DAY, now)).toBe(true);
    });

    it("counts a card due at the start of today", () => {
        expect(isDueToday(getStartOfDay(now), now)).toBe(true);
    });

    it("counts a card due later this afternoon (midday)", () => {
        expect(isDueToday(now + 3600_000, now)).toBe(true);
    });

    it("counts a card due at exactly the end of today (inclusive boundary)", () => {
        expect(isDueToday(getEndOfDay(now, 0), now)).toBe(true);
    });

    it("does not count a card due just after the end of today", () => {
        expect(isDueToday(getEndOfDay(now, 0) + 1, now)).toBe(false);
    });

    it("changes which day is 'today' across the midnight rollover", () => {

        const justBeforeMidnight = new Date(2026, 2, 15, 23, 59, 59).getTime();
        const justAfterMidnight = new Date(2026, 2, 16, 0, 0, 1).getTime();

        // A card due mid-morning on the 16th...
        const nextReview = new Date(2026, 2, 16, 9, 0).getTime();

        // ...isn't part of "today" yet while it's still the 15th...
        expect(isDueToday(nextReview, justBeforeMidnight)).toBe(false);

        // ...but becomes part of "today" the instant the calendar rolls
        // over to the 16th, with no change to the card itself.
        expect(isDueToday(nextReview, justAfterMidnight)).toBe(true);

    });

});

describe("isDueWithinDays", () => {

    const now = new Date(2026, 2, 15, 12, 0).getTime();

    it("is equivalent to isDueToday when daysAhead is 0", () => {
        expect(isDueWithinDays(now + 1000, 0, now)).toBe(isDueToday(now + 1000, now));
    });

    it("includes cards due up to and including the Nth day ahead", () => {
        expect(isDueWithinDays(getEndOfDay(now, 6), 6, now)).toBe(true);
    });

    it("excludes cards due after the Nth day ahead", () => {
        expect(isDueWithinDays(getEndOfDay(now, 6) + 1, 6, now)).toBe(false);
    });

});
