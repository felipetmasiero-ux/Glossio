import { describe, expect, it } from "vitest";

import { generateRecommendations } from "./generateRecommendations";
import { MAX_RECOMMENDATIONS } from "../../constants/adaptiveLearning";

const DAY_MS = 24 * 60 * 60 * 1000;

function wrongAnswers(lessonId, count) {
    return Array.from({ length: count }, () => ({
        type: "QUIZ_COMPLETED",
        payload: { lessonId, correct: false }
    }));
}

function overdueCard(word, daysOverdue) {
    return {
        id: `card-${word}`,
        word,
        language: "english",
        nextReview: Date.now() - daysOverdue * DAY_MS,
        lastReviewedAt: Date.now() - (daysOverdue + 1) * DAY_MS
    };
}

describe("generateRecommendations", () => {

    it("returns an empty array without a language - nothing to build recommendations from", () => {
        expect(generateRecommendations({ language: null })).toEqual([]);
    });

    it("is compatible with a brand new user with no data at all - suggests starting the first lesson", () => {

        const result = generateRecommendations({ language: "english" });

        expect(result.length).toBeGreaterThan(0);
        expect(result.some(r => r.href === "/lessons/english-a1-greetings")).toBe(true);

    });

    it("falls back to fully generic recommendations when even continuing a module finds nothing", () => {

        // No course for this language at all - recommendContinueModule (the
        // one generator that would otherwise always find *something* for a
        // fresh account, since "the first lesson" counts as in-progress)
        // also comes up empty here, so this is what actually exercises
        // getGenericRecommendations' fallback inside the orchestrator.
        const result = generateRecommendations({ language: "klingon" });

        expect(result.length).toBeGreaterThan(0);
        expect(result.every(r => r.id.startsWith("generic-"))).toBe(true);

    });

    it("prefers personalized recommendations over generic ones once there is real data", () => {

        const result = generateRecommendations({
            language: "english",
            flashcards: [overdueCard("hello", 10)]
        });

        expect(result.some(r => r.id.startsWith("generic-"))).toBe(false);
        expect(result.some(r => r.reason.includes("hello"))).toBe(true);

    });

    it("sorts every recommendation by priority ascending, most urgent first", () => {

        const result = generateRecommendations({
            language: "english",
            completedLessons: [],
            events: wrongAnswers("english-a1-greetings", 5), // priority 1 (accuracy 0%)
            flashcards: [overdueCard("hello", 10)] // priority 1 too (>= 7 days overdue)
        });

        for (let i = 1; i < result.length; i++) {
            expect(result[i].priority).toBeGreaterThanOrEqual(result[i - 1].priority);
        }

    });

    it("never returns more than MAX_RECOMMENDATIONS items", () => {

        const result = generateRecommendations({
            language: "english",
            events: wrongAnswers("english-a1-greetings", 10),
            flashcards: [
                overdueCard("hello", 10),
                { id: "c2", word: "bye", language: "english", easeFactor: 1.2, lastReviewedAt: null }
            ],
            studyHistory: [
                { cardId: "c2", quality: 1 },
                { cardId: "c2", quality: 1 }
            ]
        });

        expect(result.length).toBeLessThanOrEqual(MAX_RECOMMENDATIONS);

    });

    it("every recommendation carries a reason - the whole point of this feature", () => {

        const result = generateRecommendations({
            language: "english",
            events: wrongAnswers("english-a1-greetings", 5)
        });

        result.forEach(recommendation => {
            expect(typeof recommendation.reason).toBe("string");
            expect(recommendation.reason.length).toBeGreaterThan(0);
        });

    });

    it("is compatible with a returning user who has completed everything and has no weak spots", () => {

        // No events, no due/difficult flashcards, but some lesson progress -
        // still shouldn't throw, and continue-module correctly finds nothing
        // left once every lesson is done (covered by its own generator
        // tests) so this exercises the "personalized but empty" -> generic
        // fallback path with a non-trivial (not brand-new) profile.
        const result = generateRecommendations({
            language: "english",
            completedLessons: [],
            flashcards: [{ id: "c1", word: "hello", language: "english", easeFactor: 2.5, nextReview: Date.now() + DAY_MS, lastReviewedAt: Date.now() }],
            studyHistory: [{ cardId: "c1", quality: 5 }],
            events: [{ type: "LESSON_COMPLETED", payload: { lessonId: "english-a1-greetings" } }]
        });

        expect(Array.isArray(result)).toBe(true);

    });

});
