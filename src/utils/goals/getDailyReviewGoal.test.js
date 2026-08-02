import { describe, expect, it } from "vitest";

import { getDailyReviewGoal } from "./getDailyReviewGoal";
import { DEFAULT_GOALS } from "./goalsStorage";
import { EVENT_TYPES } from "../../constants/events";

describe("getDailyReviewGoal", () => {

    it("counts only today's reviews for flashcards in the current language", () => {

        const now = Date.now();

        const flashcards = [
            { id: "en-1", language: "English" },
            { id: "fr-1", language: "French" }
        ];

        const events = [
            { type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now, payload: { cardId: "en-1" } },
            { type: EVENT_TYPES.FLASHCARD_REVIEWED, timestamp: now, payload: { cardId: "fr-1" } }
        ];

        const goals = { ...DEFAULT_GOALS, dailyReviews: 20 };

        const result = getDailyReviewGoal({ events, flashcards, language: "English", goals });

        expect(result.current).toBe(1);
        expect(result.target).toBe(20);
        expect(result.remaining).toBe(19);

    });

});
