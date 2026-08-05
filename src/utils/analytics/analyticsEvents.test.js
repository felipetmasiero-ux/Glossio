import { describe, expect, it } from "vitest";

import { ANALYTICS_EVENTS } from "./analyticsEvents";

describe("ANALYTICS_EVENTS", () => {

    it("has no duplicate event names", () => {
        const values = Object.values(ANALYTICS_EVENTS);
        expect(new Set(values).size).toBe(values.length);
    });

    it("uses snake_case for every event name (GA4 convention)", () => {
        Object.values(ANALYTICS_EVENTS).forEach(name => {
            expect(name).toMatch(/^[a-z]+(_[a-z]+)*$/);
        });
    });

    it("covers every event requested for the app", () => {
        const expectedKeys = [
            "APP_OPEN", "PAGE_VIEW", "LANGUAGE_SELECTED",
            "LESSON_STARTED", "LESSON_COMPLETED",
            "EXERCISE_STARTED", "EXERCISE_COMPLETED",
            "FLASHCARD_ADDED", "CUSTOM_FLASHCARD_CREATED", "CUSTOM_FLASHCARD_EDITED", "CUSTOM_FLASHCARD_DELETED",
            "STUDY_SESSION_STARTED", "STUDY_SESSION_FINISHED", "REVIEW_COMPLETED",
            "DECK_CREATED", "DECK_DELETED",
            "SEARCH_PERFORMED",
            "FAVORITE_ADDED", "FAVORITE_REMOVED"
        ];

        expectedKeys.forEach(key => {
            expect(ANALYTICS_EVENTS).toHaveProperty(key);
        });
    });

});
