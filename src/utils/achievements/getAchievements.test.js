import { describe, expect, it } from "vitest";

import { getAchievements } from "./getAchievements";
import { EVENT_TYPES } from "../../constants/events";

function flashcard(word, overrides = {}) {
    return { id: word, word, translation: word, language: "English", ...overrides };
}

function reviewEvent(timestamp = Date.now()) {
    return { type: EVENT_TYPES.FLASHCARD_REVIEWED, payload: {}, timestamp };
}

describe("getAchievements", () => {

    it("marks a tier completed once progress reaches its target", () => {

        const flashcards = Array.from({ length: 25 }, (_, i) => flashcard(`word-${i}`));

        const achievements = getAchievements({ language: "English", flashcards, events: [], completedLessons: [] });

        const tier1 = achievements.find(a => a.id === "collect-1");
        const tier25 = achievements.find(a => a.id === "collect-25");
        const tier100 = achievements.find(a => a.id === "collect-100");

        expect(tier1.completed).toBe(true);
        expect(tier25.completed).toBe(true);
        expect(tier100.completed).toBe(false);
        expect(tier100.progress).toBe(25);

    });

    it("caps progress at the tier's target instead of overshooting", () => {

        const flashcards = Array.from({ length: 500 }, (_, i) => flashcard(`word-${i}`));

        const achievements = getAchievements({ language: "English", flashcards, events: [], completedLessons: [] });

        const tier1 = achievements.find(a => a.id === "collect-1");

        expect(tier1.progress).toBe(1);
        expect(tier1.completed).toBe(true);

    });

    it("computes review progress from FLASHCARD_REVIEWED events", () => {

        const events = Array.from({ length: 100 }, () => reviewEvent());

        const achievements = getAchievements({ language: "English", flashcards: [], events, completedLessons: [] });

        const tier100 = achievements.find(a => a.id === "review-100");
        const tier500 = achievements.find(a => a.id === "review-500");

        expect(tier100.completed).toBe(true);
        expect(tier500.completed).toBe(false);
        expect(tier500.progress).toBe(100);

    });

    it("has zero progress for a brand new user with no data", () => {

        const achievements = getAchievements({ language: "English", flashcards: [], events: [], completedLessons: [] });

        expect(achievements.every(a => !a.completed)).toBe(true);
        expect(achievements.every(a => a.progress === 0)).toBe(true);

    });

    it("returns every achievement definition, unfiltered", () => {

        const achievements = getAchievements({ language: "English", flashcards: [], events: [], completedLessons: [] });

        expect(achievements.length).toBeGreaterThan(20);
        expect(achievements.map(a => a.id)).toContain("streak-3");

    });

});
