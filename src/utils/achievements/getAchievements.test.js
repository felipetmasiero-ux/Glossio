import { describe, expect, it, beforeEach } from "vitest";

import { getAchievements } from "./getAchievements";
import { EVENT_TYPES } from "../../constants/events";
import { GoalsStorage } from "../goals/goalsStorage";

const DAY = 24 * 60 * 60 * 1000;

function flashcard(word, overrides = {}) {
    return { id: word, word, translation: word, language: "English", ...overrides };
}

function reviewEvent(timestamp = Date.now()) {
    return { type: EVENT_TYPES.FLASHCARD_REVIEWED, payload: {}, timestamp };
}

describe("getAchievements", () => {

    beforeEach(() => {
        localStorage.clear();
    });

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

    it("computes favorites progress only from favorited cards in the current language", () => {

        const flashcards = [
            ...Array.from({ length: 10 }, (_, i) => flashcard(`fav-${i}`, { favorite: true })),
            ...Array.from({ length: 5 }, (_, i) => flashcard(`notfav-${i}`, { favorite: false })),
            flashcard("french-fav", { favorite: true, language: "French" })
        ];

        const achievements = getAchievements({ language: "English", flashcards, events: [], completedLessons: [] });

        const tier1 = achievements.find(a => a.id === "favorites-1");
        const tier10 = achievements.find(a => a.id === "favorites-10");
        const tier25 = achievements.find(a => a.id === "favorites-25");

        expect(tier1.completed).toBe(true);
        expect(tier10.completed).toBe(true);
        expect(tier25.completed).toBe(false);
        expect(tier25.progress).toBe(10);

    });

    it("unlocks the first-goal tier once a day with every configured goal met exists", () => {

        GoalsStorage.saveGoals({ dailyLessons: 1 });

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: Date.now(), payload: { lessonId: "english-a1-family" } }
        ];

        const achievements = getAchievements({ language: "English", flashcards: [], events, completedLessons: [] });

        const tier1 = achievements.find(a => a.id === "goals-1");
        const tier7 = achievements.find(a => a.id === "goals-7");

        expect(tier1.completed).toBe(true);
        expect(tier7.completed).toBe(false);

    });

    it("unlocks the perfect-week achievement after 7 consecutive days meeting the goal", () => {

        GoalsStorage.saveGoals({ dailyLessons: 1 });

        const now = Date.now();

        const events = Array.from({ length: 7 }, (_, i) => ({
            type: EVENT_TYPES.LESSON_COMPLETED,
            timestamp: now - i * DAY,
            payload: { lessonId: "english-a1-family" }
        }));

        const achievements = getAchievements({ language: "English", flashcards: [], events, completedLessons: [] });

        const perfectWeek = achievements.find(a => a.id === "goals-perfect-week");
        const perfectMonth = achievements.find(a => a.id === "goals-perfect-month");

        expect(perfectWeek.completed).toBe(true);
        expect(perfectMonth.completed).toBe(false);

    });

    it("never unlocks goal achievements when no goal was ever configured", () => {

        const achievements = getAchievements({ language: "English", flashcards: [], events: [], completedLessons: [] });

        const goalAchievements = achievements.filter(a => a.category === "goals");

        expect(goalAchievements.every(a => !a.completed)).toBe(true);

    });

});
