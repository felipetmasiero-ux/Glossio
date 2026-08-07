import { describe, expect, it, vi, afterEach } from "vitest";

vi.mock("../exercises/getVocabularyEntries", () => ({
    getVocabularyEntries: vi.fn()
}));

import { getVocabularyEntries } from "../exercises/getVocabularyEntries";
import { getPendingLessonVocabulary } from "./getPendingLessonVocabulary";

afterEach(() => {
    vi.clearAllMocks();
});

function entry(word, translation = "x") {
    return { id: word, word, translation };
}

function card(word, language) {
    return { word, language };
}

describe("getPendingLessonVocabulary", () => {

    it("returns everything as pending when the user has no matching flashcards yet", () => {

        getVocabularyEntries.mockReturnValue([entry("hello"), entry("goodbye")]);

        const result = getPendingLessonVocabulary({ lesson: { vocabulary: ["hello", "goodbye"] }, flashcards: [], language: "english" });

        expect(result.entries).toHaveLength(2);
        expect(result.pending).toHaveLength(2);
        expect(result.alreadyAdded).toBe(0);

    });

    it("excludes words that are already flashcards in the same language", () => {

        getVocabularyEntries.mockReturnValue([entry("hello"), entry("goodbye")]);

        const result = getPendingLessonVocabulary({
            lesson: { vocabulary: ["hello", "goodbye"] },
            flashcards: [card("hello", "english")],
            language: "english"
        });

        expect(result.pending.map(e => e.word)).toEqual(["goodbye"]);
        expect(result.alreadyAdded).toBe(1);

    });

    it("does not treat a flashcard in a different language as already added", () => {

        getVocabularyEntries.mockReturnValue([entry("bonjour")]);

        const result = getPendingLessonVocabulary({
            lesson: { vocabulary: ["bonjour"] },
            flashcards: [card("bonjour", "french")],
            language: "english"
        });

        expect(result.pending).toHaveLength(1);
        expect(result.alreadyAdded).toBe(0);

    });

    it("reports zero pending when every word is already a flashcard", () => {

        getVocabularyEntries.mockReturnValue([entry("hello"), entry("goodbye")]);

        const result = getPendingLessonVocabulary({
            lesson: { vocabulary: ["hello", "goodbye"] },
            flashcards: [card("hello", "english"), card("goodbye", "english")],
            language: "english"
        });

        expect(result.pending).toHaveLength(0);
        expect(result.alreadyAdded).toBe(2);

    });

    it("returns empty results for a missing lesson - compatibility with a not-yet-loaded lesson", () => {

        const result = getPendingLessonVocabulary({ lesson: null, flashcards: [], language: "english" });

        expect(result).toEqual({ entries: [], pending: [], alreadyAdded: 0 });
        expect(getVocabularyEntries).not.toHaveBeenCalled();

    });

    it("defaults flashcards to an empty array when omitted", () => {

        getVocabularyEntries.mockReturnValue([entry("hello")]);

        expect(() => getPendingLessonVocabulary({ lesson: { vocabulary: ["hello"] }, language: "english" })).not.toThrow();

    });

    // The exact fields useWordPopup.js's withLessonContext already attaches
    // before a single word goes through addFlashcard - a bulk-added card
    // must carry the same context, or getModuleCompletionStats' per-module
    // flashcard count silently misses it.
    it("enriches every entry with lessonId/moduleId/category, matching withLessonContext's single-word path", () => {

        getVocabularyEntries.mockReturnValue([entry("hello")]);

        const result = getPendingLessonVocabulary({
            lesson: { id: "english-a1-greetings", category: "Basics", vocabulary: ["hello"] },
            flashcards: [],
            language: "english",
            moduleId: "english-a1"
        });

        expect(result.entries[0]).toMatchObject({
            word: "hello",
            lessonId: "english-a1-greetings",
            moduleId: "english-a1",
            category: "Basics"
        });

    });

    it("defaults moduleId/category to null when not provided", () => {

        getVocabularyEntries.mockReturnValue([entry("hello")]);

        const result = getPendingLessonVocabulary({
            lesson: { id: "english-a1-greetings", vocabulary: ["hello"] },
            flashcards: [],
            language: "english"
        });

        expect(result.entries[0].moduleId).toBeNull();
        expect(result.entries[0].category).toBeNull();

    });

});
