import { describe, expect, it } from "vitest";

import { getDailyVideoMinutesGoal } from "./getDailyVideoMinutesGoal";
import { DEFAULT_GOALS } from "./goalsStorage";
import { EVENT_TYPES } from "../../constants/events";

describe("getDailyVideoMinutesGoal", () => {

    it("converts today's completed video durations (seconds) to whole minutes", () => {

        const now = Date.now();

        const events = [
            { type: EVENT_TYPES.VIDEO_COMPLETED, timestamp: now, payload: { videoId: "en-a1-meeting-family" } } // 350s -> 6min
        ];

        const goals = { ...DEFAULT_GOALS, dailyVideoMinutes: 15 };

        const result = getDailyVideoMinutesGoal({ events, flashcards: [], language: "English", goals });

        expect(result.current).toBe(6);
        expect(result.remaining).toBe(9);

    });

});
