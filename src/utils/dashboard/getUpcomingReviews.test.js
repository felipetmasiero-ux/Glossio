import { describe, expect, it } from "vitest";

import { getUpcomingReviews } from "./getUpcomingReviews";

const DAY = 24 * 60 * 60 * 1000;

describe("getUpcomingReviews", () => {

    it("returns zeros when there are no flashcards", () => {

        expect(getUpcomingReviews({ flashcards: [], language: "English" })).toEqual({
            today: 0,
            tomorrow: 0,
            next7Days: 0
        });

    });

    it("buckets cards due today, tomorrow, and within the next 7 days", () => {

        const flashcards = [
            { id: "1", language: "English", nextReview: Date.now() - DAY }, // overdue, counts as today
            { id: "2", language: "English", nextReview: Date.now() },
            { id: "3", language: "English", nextReview: Date.now() + DAY + 1000 },
            { id: "4", language: "English", nextReview: Date.now() + 5 * DAY },
            { id: "5", language: "English", nextReview: Date.now() + 30 * DAY }
        ];

        const upcoming = getUpcomingReviews({ flashcards, language: "English" });

        expect(upcoming.today).toBe(2);
        expect(upcoming.tomorrow).toBe(1);
        expect(upcoming.next7Days).toBe(4);

    });

    it("counts every card as today's when all of them are overdue", () => {

        const flashcards = [
            { id: "1", language: "English", nextReview: Date.now() - DAY },
            { id: "2", language: "English", nextReview: Date.now() - 30 * DAY }
        ];

        const upcoming = getUpcomingReviews({ flashcards, language: "English" });

        expect(upcoming).toEqual({ today: 2, tomorrow: 0, next7Days: 2 });

    });

    it("counts nothing when every card is due more than 7 days from now", () => {

        const flashcards = [{ id: "1", language: "English", nextReview: Date.now() + 30 * DAY }];

        const upcoming = getUpcomingReviews({ flashcards, language: "English" });

        expect(upcoming).toEqual({ today: 0, tomorrow: 0, next7Days: 0 });

    });

    it("only counts flashcards for the given language", () => {

        const flashcards = [
            { id: "1", language: "English", nextReview: Date.now() },
            { id: "2", language: "French", nextReview: Date.now() }
        ];

        const upcoming = getUpcomingReviews({ flashcards, language: "English" });

        expect(upcoming.today).toBe(1);

    });

});
