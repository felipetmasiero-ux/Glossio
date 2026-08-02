import { describe, expect, it } from "vitest";

import { getDailyLessonGoal } from "./getDailyLessonGoal";
import { DEFAULT_GOALS } from "./goalsStorage";
import { EVENT_TYPES } from "../../constants/events";

describe("getDailyLessonGoal", () => {

    it("reports hasGoal: false when no daily lesson goal is configured", () => {

        const result = getDailyLessonGoal({ events: [], flashcards: [], language: "English", goals: DEFAULT_GOALS });

        expect(result.hasGoal).toBe(false);
        expect(result.completed).toBe(false);

    });

    it("computes progress against today's completed lessons", () => {

        const now = Date.now();

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } }
        ];

        const goals = { ...DEFAULT_GOALS, dailyLessons: 2 };

        const result = getDailyLessonGoal({ events, flashcards: [], language: "English", goals });

        expect(result).toEqual({
            current: 1,
            target: 2,
            hasGoal: true,
            remaining: 1,
            percentage: 50,
            completed: false
        });

    });

    it("caps percentage at 100 and remaining at 0 when the goal is exceeded", () => {

        const now = Date.now();

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } }
        ];

        const goals = { ...DEFAULT_GOALS, dailyLessons: 1 };

        const result = getDailyLessonGoal({ events, flashcards: [], language: "English", goals });

        expect(result.completed).toBe(true);
        expect(result.remaining).toBe(0);
        expect(result.percentage).toBe(100);

    });

});
