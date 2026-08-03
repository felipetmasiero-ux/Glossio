import { describe, expect, it } from "vitest";

import { getGoalHistory } from "./getGoalHistory";
import { DEFAULT_GOALS } from "./goalsStorage";
import { EVENT_TYPES } from "../../constants/events";

describe("getGoalHistory", () => {

    it("returns `days` entries, oldest first, ending today with a 'Hoje' label", () => {

        const history = getGoalHistory({ events: [], flashcards: [], language: "English", goals: DEFAULT_GOALS, days: 7 });

        expect(history).toHaveLength(7);
        expect(history.at(-1).label).toBe("Hoje");
        expect(history.at(-2).label).toBe("Ontem");
        expect(history.at(-1).timestamp).toBeGreaterThan(history[0].timestamp);

    });

    it("marks a day as completed only when its configured goals were met", () => {

        const now = Date.now();

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: now, payload: { lessonId: "english-a1-family" } }
        ];

        const goals = { ...DEFAULT_GOALS, dailyLessons: 1 };

        const history = getGoalHistory({ events, flashcards: [], language: "English", goals, days: 3 });

        expect(history.at(-1).completed).toBe(true); // today
        expect(history.at(-2).completed).toBe(false); // yesterday, no activity
        expect(history.at(-1).metrics.lessons).toBe(1);

    });

    it("defaults to 7 days when `days` is omitted", () => {

        const history = getGoalHistory({ events: [], flashcards: [], language: "English", goals: DEFAULT_GOALS });

        expect(history).toHaveLength(7);

    });

    // Performance sprint regression guard (section 4): getGoalHistory used to
    // call computeRangeMetrics per day, and *each* call re-scanned the
    // *entire* events array (filtering out everything outside that one
    // day) and rebuilt the flashcard/lesson/video lookup maps from scratch -
    // an O(days * events) cost. Events are now bucketed by day once up
    // front and the lookup maps are built once and reused across the whole
    // window. This proves the day-boundary bucketing is exact: an event
    // just outside the requested window must never leak into any bucket,
    // and events land on the correct day even with many days/events at once.
    it("still attributes every event to exactly the right day, and none outside the window, at scale", () => {

        const now = Date.now();
        const goals = { ...DEFAULT_GOALS, dailyLessons: 1 };

        const events = [];
        for (let daysAgo = 0; daysAgo < 10; daysAgo++) {
            events.push({
                type: EVENT_TYPES.LESSON_COMPLETED,
                timestamp: now - daysAgo * 24 * 60 * 60 * 1000,
                payload: { lessonId: "english-a1-family" }
            });
        }

        const history = getGoalHistory({ events, flashcards: [], language: "English", goals, days: 5 });

        expect(history).toHaveLength(5);
        // Every one of the last 5 days (today + 4 before it) had a lesson
        // logged, so every returned day should be marked completed with
        // exactly one lesson counted - none doubled up, none missed.
        history.forEach(day => {
            expect(day.metrics.lessons).toBe(1);
            expect(day.completed).toBe(true);
        });

    });

});
