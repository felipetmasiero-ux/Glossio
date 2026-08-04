import { describe, expect, it, beforeEach } from "vitest";

import {
    readProgressSnapshot,
    applyProgressSnapshot,
    serializeProgress,
    readFlashcardsSnapshot,
    applyFlashcardsSnapshot
} from "./progressStorage";
import { GoalsStorage, DEFAULT_GOALS } from "../goals/goalsStorage";

describe("progressStorage goals integration", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("includes the locally configured goals in the progress snapshot", () => {

        GoalsStorage.saveGoals({ dailyLessons: 2, dailyReviews: 20 });

        const snapshot = readProgressSnapshot();

        expect(snapshot.dashboard.goals).toEqual({ ...DEFAULT_GOALS, dailyLessons: 2, dailyReviews: 20 });

    });

    it("applies a server snapshot's goals back into local GoalsStorage", () => {

        applyProgressSnapshot({
            language: "English",
            exerciseProgress: [],
            studyHistory: [],
            dashboard: { lastActivity: null, goals: { ...DEFAULT_GOALS, weeklyMinutes: 240 } }
        });

        expect(GoalsStorage.getGoals()).toEqual({ ...DEFAULT_GOALS, weeklyMinutes: 240 });

    });

    it("serializes goals identically regardless of source key order", () => {

        const a = serializeProgress({
            language: "English",
            dashboard: { goals: { dailyLessons: 2, dailyReviews: null, dailyVideoMinutes: null, weeklyMinutes: null, weeklyLessons: null } }
        });

        const b = serializeProgress({
            language: "English",
            dashboard: { goals: { weeklyLessons: null, weeklyMinutes: null, dailyVideoMinutes: null, dailyReviews: null, dailyLessons: 2 } }
        });

        expect(a).toBe(b);

    });

});

describe("applyFlashcardsSnapshot deckId/example/notes preservation", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("preserves local-only fields the server doesn't know about", () => {

        localStorage.setItem("flashcards", JSON.stringify([
            { id: "1", word: "casa", translation: "house", deckId: "deck-1", example: "Minha casa", notes: "nota" }
        ]));

        applyFlashcardsSnapshot([
            { id: "1", word: "casa", translation: "house", favorite: true }
        ]);

        const result = readFlashcardsSnapshot();

        expect(result).toEqual([
            { id: "1", word: "casa", translation: "house", favorite: true, deckId: "deck-1", example: "Minha casa", notes: "nota" }
        ]);

    });

    it("keeps the server's value when the server does send deckId/example/notes", () => {

        localStorage.setItem("flashcards", JSON.stringify([
            { id: "1", word: "casa", translation: "house", deckId: "deck-1", example: null, notes: null }
        ]));

        applyFlashcardsSnapshot([
            { id: "1", word: "casa", translation: "house", deckId: "deck-2", example: "novo exemplo", notes: null }
        ]);

        const result = readFlashcardsSnapshot();

        expect(result[0].deckId).toBe("deck-2");
        expect(result[0].example).toBe("novo exemplo");

    });

    it("defaults to null for a brand new card with no local counterpart", () => {

        localStorage.setItem("flashcards", JSON.stringify([]));

        applyFlashcardsSnapshot([
            { id: "1", word: "casa", translation: "house" }
        ]);

        const result = readFlashcardsSnapshot();

        expect(result[0].deckId).toBeNull();
        expect(result[0].example).toBeNull();
        expect(result[0].notes).toBeNull();

    });

});
