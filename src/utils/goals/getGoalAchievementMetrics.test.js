import { describe, expect, it } from "vitest";

import { getGoalAchievementMetrics } from "./getGoalAchievementMetrics";
import { DEFAULT_GOALS } from "./goalsStorage";
import { EVENT_TYPES } from "../../constants/events";

const DAY = 24 * 60 * 60 * 1000;

describe("getGoalAchievementMetrics", () => {

    it("reports zeroed metrics with no configured goals", () => {

        const metrics = getGoalAchievementMetrics({ events: [], flashcards: [], language: "English", goals: DEFAULT_GOALS });

        expect(metrics).toEqual({ goalsCompletedCount: 0, hasPerfectWeek: 0, hasPerfectMonth: 0 });

    });

    it("counts a single completed day and no perfect week without 7 in a row", () => {

        const now = Date.now();

        const goals = { ...DEFAULT_GOALS, dailyLessons: 1 };

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } }
        ];

        const metrics = getGoalAchievementMetrics({ events, flashcards: [], language: "English", goals });

        expect(metrics.goalsCompletedCount).toBe(1);
        expect(metrics.hasPerfectWeek).toBe(0);
        expect(metrics.hasPerfectMonth).toBe(0);

    });

    it("detects a perfect week when 7 consecutive days all met the goal", () => {

        const now = Date.now();

        const goals = { ...DEFAULT_GOALS, dailyLessons: 1 };

        const events = Array.from({ length: 7 }, (_, i) => ({
            type: EVENT_TYPES.LESSON_COMPLETED,
            timestamp: now - i * DAY,
            payload: { lessonId: "english-a1-family" }
        }));

        const metrics = getGoalAchievementMetrics({ events, flashcards: [], language: "English", goals });

        expect(metrics.goalsCompletedCount).toBe(7);
        expect(metrics.hasPerfectWeek).toBe(1);
        expect(metrics.hasPerfectMonth).toBe(0);

    });

});
