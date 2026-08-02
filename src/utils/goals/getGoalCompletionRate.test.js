import { describe, expect, it } from "vitest";

import { getGoalCompletionRate } from "./getGoalCompletionRate";
import { DEFAULT_GOALS } from "./goalsStorage";
import { EVENT_TYPES } from "../../constants/events";

describe("getGoalCompletionRate", () => {

    it("returns zero rates with no activity and no goals", () => {

        const rate = getGoalCompletionRate({ events: [], flashcards: [], language: "English", goals: DEFAULT_GOALS });

        expect(rate.thisWeek).toEqual({ daysMet: 0, totalDays: 7, rate: 0 });
        expect(rate.last30Days).toEqual({ daysMet: 0, totalDays: 30, rate: 0 });
        expect(rate.average).toBe(0);

    });

    it("counts today as met when the daily goal was reached, reflected in both windows", () => {

        const now = Date.now();

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } }
        ];

        const goals = { ...DEFAULT_GOALS, dailyLessons: 1 };

        const rate = getGoalCompletionRate({ events, flashcards: [], language: "English", goals });

        expect(rate.thisWeek.daysMet).toBe(1);
        expect(rate.thisWeek.rate).toBe(Math.round((1 / 7) * 100));
        expect(rate.last30Days.daysMet).toBe(1);
        expect(rate.average).toBe(rate.last30Days.rate);

    });

});
