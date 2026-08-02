import { describe, expect, it } from "vitest";

import { getWeeklyActivity } from "./getWeeklyActivity";
import { EVENT_TYPES } from "../../constants/events";

describe("getWeeklyActivity", () => {

    it("returns 8 weekly buckets by default, oldest first", () => {

        const weeks = getWeeklyActivity({ events: [], flashcards: [], language: "English" });

        expect(weeks).toHaveLength(8);
        expect(weeks.every(week => week.reviews === 0 && week.lessons === 0 && week.videos === 0)).toBe(true);

    });

    it("counts this week's activity for the given language into the last bucket", () => {

        const now = Date.now();

        const flashcards = [{ id: "card-1", language: "English" }];

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } },
            { type: EVENT_TYPES.VIDEO_COMPLETED, timestamp: now, payload: { videoId: "en-a1-meeting-family" } },
            { type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now, payload: { cardId: "card-1" } }
        ];

        const weeks = getWeeklyActivity({ events, flashcards, language: "English" });

        const currentWeek = weeks.at(-1);

        expect(currentWeek.lessons).toBe(1);
        expect(currentWeek.videos).toBe(1);
        expect(currentWeek.reviews).toBe(1);

        const totalLessons = weeks.reduce((sum, week) => sum + week.lessons, 0);
        expect(totalLessons).toBe(1);

    });

    it("ignores activity that does not belong to the requested language", () => {

        const now = Date.now();

        const flashcards = [{ id: "card-1", language: "French" }];

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "french-a1-numbers" } },
            { type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now, payload: { cardId: "card-1" } }
        ];

        const weeks = getWeeklyActivity({ events, flashcards, language: "English" });

        expect(weeks.every(week => week.lessons === 0 && week.reviews === 0)).toBe(true);

    });

});
