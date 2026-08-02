import { describe, expect, it } from "vitest";

import { getWeeklyLessonGoal } from "./getWeeklyLessonGoal";
import { getStartOfWeek } from "./getStartOfWeek";
import { DEFAULT_GOALS } from "./goalsStorage";
import { EVENT_TYPES } from "../../constants/events";

describe("getWeeklyLessonGoal", () => {

    it("counts lessons completed since the start of this calendar week", () => {

        const startOfWeek = getStartOfWeek(Date.now());

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: startOfWeek + 1000, payload: { lessonId: "english-a1-family" } },
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: startOfWeek - 1000, payload: { lessonId: "english-a1-family" } } // last week, excluded
        ];

        const goals = { ...DEFAULT_GOALS, weeklyLessons: 10 };

        const result = getWeeklyLessonGoal({ events, flashcards: [], language: "English", goals });

        expect(result.current).toBe(1);
        expect(result.target).toBe(10);

    });

});
