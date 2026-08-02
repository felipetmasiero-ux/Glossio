import { describe, expect, it } from "vitest";

import { computeDayMetrics, computeRangeMetrics, getDayTimestamp } from "./computeDayMetrics";
import { EVENT_TYPES } from "../../constants/events";

const DAY = 24 * 60 * 60 * 1000;

describe("computeDayMetrics", () => {

    it("counts lessons, language-scoped reviews, and video minutes for a single day", () => {

        const now = Date.now();

        const flashcards = [
            { id: "card-en", language: "English" },
            { id: "card-fr", language: "French" }
        ];

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } },
            { type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now, payload: { cardId: "card-en" } },
            { type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now, payload: { cardId: "card-fr" } }, // wrong language, excluded
            { type: EVENT_TYPES.VIDEO_COMPLETED, timestamp: now, payload: { videoId: "en-a1-meeting-family" } }, // 350s
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now - DAY, payload: { lessonId: "english-a1-family" } } // yesterday, excluded
        ];

        const metrics = computeDayMetrics({
            events,
            flashcards,
            language: "English",
            dayTimestamp: getDayTimestamp(now)
        });

        expect(metrics.lessons).toBe(1);
        expect(metrics.reviews).toBe(1);
        expect(metrics.videoMinutes).toBeCloseTo(350 / 60, 5);

    });

    it("ignores lesson/video ids that don't belong to the given language", () => {

        const now = Date.now();

        const metrics = computeDayMetrics({
            events: [{ type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "french-a1-numbers" } }],
            flashcards: [],
            language: "English",
            dayTimestamp: getDayTimestamp(now)
        });

        expect(metrics.lessons).toBe(0);

    });

    it("computeRangeMetrics also accumulates lessonMinutes across the range", () => {

        const now = Date.now();

        const metrics = computeRangeMetrics({
            events: [
                { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } }
            ],
            flashcards: [],
            language: "English",
            startTimestamp: now - DAY,
            endTimestamp: now + DAY
        });

        expect(metrics.lessons).toBe(1);
        expect(metrics.lessonMinutes).toBe(8);

    });

});
