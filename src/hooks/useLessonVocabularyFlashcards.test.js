import { describe, expect, it, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./useFlashcards", () => ({
    useFlashcards: vi.fn()
}));

vi.mock("../utils/flashcards/getPendingLessonVocabulary", () => ({
    getPendingLessonVocabulary: vi.fn()
}));

vi.mock("../utils/analytics", () => ({
    trackEvent: vi.fn(),
    ANALYTICS_EVENTS: { FLASHCARD_ADDED: "flashcard_added" }
}));

import { useFlashcards } from "./useFlashcards";
import { getPendingLessonVocabulary } from "../utils/flashcards/getPendingLessonVocabulary";
import { trackEvent } from "../utils/analytics";
import { useLessonVocabularyFlashcards } from "./useLessonVocabularyFlashcards";

const lesson = { id: "english-a1-greetings", vocabulary: ["hello", "goodbye"] };

function entry(word) {
    return { id: word, word, translation: "x" };
}

afterEach(() => {
    vi.clearAllMocks();
});

describe("useLessonVocabularyFlashcards", () => {

    it("exposes total/alreadyAdded/pendingCount straight from getPendingLessonVocabulary", () => {

        const addFlashcard = vi.fn();
        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard });
        getPendingLessonVocabulary.mockReturnValue({
            entries: [entry("hello"), entry("goodbye")],
            pending: [entry("goodbye")],
            alreadyAdded: 1
        });

        const { result } = renderHook(() => useLessonVocabularyFlashcards(lesson, "english"));

        expect(result.current.total).toBe(2);
        expect(result.current.alreadyAdded).toBe(1);
        expect(result.current.pendingCount).toBe(1);
        expect(result.current.lastAddedCount).toBeNull();

    });

    it("passes the given moduleId through to getPendingLessonVocabulary, so bulk-added cards carry it", () => {

        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard: vi.fn() });
        getPendingLessonVocabulary.mockReturnValue({ entries: [], pending: [], alreadyAdded: 0 });

        renderHook(() => useLessonVocabularyFlashcards(lesson, "english", "english-a1"));

        expect(getPendingLessonVocabulary).toHaveBeenCalledWith(
            expect.objectContaining({ moduleId: "english-a1" })
        );

    });

    it("adds every pending word via the existing addFlashcard, one call per word", () => {

        const addFlashcard = vi.fn();
        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard });
        getPendingLessonVocabulary.mockReturnValue({
            entries: [entry("hello"), entry("goodbye")],
            pending: [entry("hello"), entry("goodbye")],
            alreadyAdded: 0
        });

        const { result } = renderHook(() => useLessonVocabularyFlashcards(lesson, "english"));

        act(() => result.current.addPending());

        expect(addFlashcard).toHaveBeenCalledTimes(2);
        expect(addFlashcard).toHaveBeenCalledWith(entry("hello"), "english");
        expect(addFlashcard).toHaveBeenCalledWith(entry("goodbye"), "english");

    });

    it("tracks FLASHCARD_ADDED once per word added, tagged with the lesson-summary source", () => {

        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard: vi.fn() });
        getPendingLessonVocabulary.mockReturnValue({
            entries: [entry("hello")],
            pending: [entry("hello")],
            alreadyAdded: 0
        });

        const { result } = renderHook(() => useLessonVocabularyFlashcards(lesson, "english"));

        act(() => result.current.addPending());

        expect(trackEvent).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledWith("flashcard_added", { language: "english", source: "lesson-summary" });

    });

    it("records how many were just added, for the success message", () => {

        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard: vi.fn() });
        getPendingLessonVocabulary.mockReturnValue({
            entries: [entry("hello"), entry("goodbye")],
            pending: [entry("hello"), entry("goodbye")],
            alreadyAdded: 0
        });

        const { result } = renderHook(() => useLessonVocabularyFlashcards(lesson, "english"));

        act(() => result.current.addPending());

        expect(result.current.lastAddedCount).toBe(2);

    });

    it("does nothing and adds nothing when everything is already pending-empty", () => {

        const addFlashcard = vi.fn();
        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard });
        getPendingLessonVocabulary.mockReturnValue({
            entries: [entry("hello")],
            pending: [],
            alreadyAdded: 1
        });

        const { result } = renderHook(() => useLessonVocabularyFlashcards(lesson, "english"));

        act(() => result.current.addPending());

        expect(addFlashcard).not.toHaveBeenCalled();
        expect(trackEvent).not.toHaveBeenCalled();
        expect(result.current.lastAddedCount).toBe(0);

    });

});
