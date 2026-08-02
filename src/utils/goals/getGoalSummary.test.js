import { describe, expect, it } from "vitest";

import { getGoalSummary } from "./getGoalSummary";
import { DEFAULT_GOALS } from "./goalsStorage";
import { EVENT_TYPES } from "../../constants/events";

describe("getGoalSummary", () => {

    it("reports hasAnyGoal: false with no configuration and no crash", () => {

        const summary = getGoalSummary({ language: "English", completedLessons: [], flashcards: [], events: [], goals: DEFAULT_GOALS });

        expect(summary.hasAnyGoal).toBe(false);
        expect(summary.daily.anyConfigured).toBe(false);
        expect(summary.weekly.anyConfigured).toBe(false);
        expect(summary.recommendation).toBeNull();

    });

    it("composes daily and weekly progress and a recommendation together", () => {

        const now = Date.now();

        const goals = { ...DEFAULT_GOALS, dailyLessons: 2, dailyReviews: 20 };

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } }
        ];

        const summary = getGoalSummary({ language: "English", completedLessons: [], flashcards: [], events, goals });

        expect(summary.hasAnyGoal).toBe(true);
        expect(summary.daily.lessons.current).toBe(1);
        expect(summary.daily.anyConfigured).toBe(true);
        expect(summary.daily.allCompleted).toBe(false);
        expect(summary.recommendation).toBe("Você só precisa de mais 1 lição hoje.");

    });

    it("estimates remaining minutes from the average lesson length plus remaining video minutes", () => {

        const goals = { ...DEFAULT_GOALS, dailyLessons: 1, dailyVideoMinutes: 10 };

        const summary = getGoalSummary({ language: "English", completedLessons: [], flashcards: [], events: [], goals });

        expect(summary.estimatedMinutesRemaining).toBeGreaterThan(0);

    });

});
