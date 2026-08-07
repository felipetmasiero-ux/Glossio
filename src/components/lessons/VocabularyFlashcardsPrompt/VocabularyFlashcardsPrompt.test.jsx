import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("../../../hooks/useLessonVocabularyFlashcards", () => ({
    useLessonVocabularyFlashcards: vi.fn()
}));

import { useLessonVocabularyFlashcards } from "../../../hooks/useLessonVocabularyFlashcards";
import { VocabularyFlashcardsPrompt } from "./VocabularyFlashcardsPrompt";

const lesson = { id: "english-a1-greetings", vocabulary: ["hello", "goodbye"] };

afterEach(() => {
    vi.clearAllMocks();
});

describe("VocabularyFlashcardsPrompt", () => {

    it("renders nothing when the lesson has no vocabulary at all", () => {

        useLessonVocabularyFlashcards.mockReturnValue({
            total: 0, alreadyAdded: 0, pendingCount: 0, lastAddedCount: null, addPending: vi.fn()
        });

        const { container } = render(<VocabularyFlashcardsPrompt lesson={lesson} language="english" />);

        expect(container.firstChild).toBeNull();

    });

    it("shows the total and a button to add the pending words", () => {

        useLessonVocabularyFlashcards.mockReturnValue({
            total: 5, alreadyAdded: 2, pendingCount: 3, lastAddedCount: null, addPending: vi.fn()
        });

        render(<VocabularyFlashcardsPrompt lesson={lesson} language="english" />);

        expect(screen.getByText("5 palavras aprendidas nesta lição.")).not.toBeNull();
        expect(screen.getByText("2 já estão nos seus flashcards.")).not.toBeNull();
        expect(screen.getByRole("button", { name: "Adicionar 3 palavras aos flashcards" })).not.toBeNull();

    });

    it("omits the 'already added' note when nothing was already added", () => {

        useLessonVocabularyFlashcards.mockReturnValue({
            total: 3, alreadyAdded: 0, pendingCount: 3, lastAddedCount: null, addPending: vi.fn()
        });

        render(<VocabularyFlashcardsPrompt lesson={lesson} language="english" />);

        expect(screen.queryByText(/já est/)).toBeNull();

    });

    it("calls addPending when the button is clicked", () => {

        const addPending = vi.fn();
        useLessonVocabularyFlashcards.mockReturnValue({
            total: 2, alreadyAdded: 0, pendingCount: 2, lastAddedCount: null, addPending
        });

        render(<VocabularyFlashcardsPrompt lesson={lesson} language="english" />);

        fireEvent.click(screen.getByRole("button"));

        expect(addPending).toHaveBeenCalledTimes(1);

    });

    it("shows a neutral message, no button, when every word was already a flashcard from the start", () => {

        useLessonVocabularyFlashcards.mockReturnValue({
            total: 4, alreadyAdded: 4, pendingCount: 0, lastAddedCount: null, addPending: vi.fn()
        });

        render(<VocabularyFlashcardsPrompt lesson={lesson} language="english" />);

        expect(screen.getByText("Todas as palavras desta lição já estão nos seus flashcards.")).not.toBeNull();
        expect(screen.queryByRole("button")).toBeNull();

    });

    it("shows a success message, no button, right after adding - and never allows a second add", () => {

        useLessonVocabularyFlashcards.mockReturnValue({
            total: 4, alreadyAdded: 4, pendingCount: 0, lastAddedCount: 4, addPending: vi.fn()
        });

        render(<VocabularyFlashcardsPrompt lesson={lesson} language="english" />);

        expect(screen.getByText("4 palavras adicionadas aos flashcards.")).not.toBeNull();
        expect(screen.queryByRole("button")).toBeNull();

    });

    it("uses singular phrasing for a single pending/added word", () => {

        useLessonVocabularyFlashcards.mockReturnValue({
            total: 1, alreadyAdded: 0, pendingCount: 1, lastAddedCount: null, addPending: vi.fn()
        });

        render(<VocabularyFlashcardsPrompt lesson={lesson} language="english" />);

        expect(screen.getByText("1 palavra aprendida nesta lição.")).not.toBeNull();
        expect(screen.getByRole("button", { name: "Adicionar 1 palavra aos flashcards" })).not.toBeNull();

    });

});
