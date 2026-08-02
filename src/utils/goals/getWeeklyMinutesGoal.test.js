import { describe, expect, it } from "vitest";

import { getWeeklyMinutesGoal } from "./getWeeklyMinutesGoal";
import { getStartOfWeek } from "./getStartOfWeek";
import { DEFAULT_GOALS } from "./goalsStorage";
import { EVENT_TYPES } from "../../constants/events";

describe("getWeeklyMinutesGoal", () => {

    it("sums lesson minutes and video minutes since the start of this week", () => {

        const startOfWeek = getStartOfWeek(Date.now());

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: startOfWeek + 1000, payload: { lessonId: "english-a1-family" } }, // 8 min
            { type: EVENT_TYPES.VIDEO_COMPLETED, timestamp: startOfWeek + 2000, payload: { videoId: "en-a1-meeting-family" } } // 350s ~ 6min
        ];

        const goals = { ...DEFAULT_GOALS, weeklyMinutes: 240 };

        const result = getWeeklyMinutesGoal({ events, flashcards: [], language: "English", goals });

        expect(result.current).toBe(8 + Math.round(350 / 60));
        expect(result.target).toBe(240);

    });

});
