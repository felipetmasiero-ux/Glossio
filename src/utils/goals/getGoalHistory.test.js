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

});
