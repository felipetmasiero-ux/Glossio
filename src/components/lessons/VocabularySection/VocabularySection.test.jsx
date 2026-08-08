import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { VocabularySection } from "./VocabularySection";
import { EventProvider } from "../../../contexts/EventProvider";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { AuthGateContext } from "../../../contexts/AuthGateContext";

// Only the flashcard *storage* boundary is mocked here (same convention
// WordPopup.test.jsx already uses) - DictionaryRepository (real dictionary
// data), useLessonVocabularyFlashcards and getPendingLessonVocabulary are
// all real, so the actual word-resolution and pending/already-added diffing
// run for real against real English/French dictionary entries, not a
// hand-rolled fixture. EventProvider/LanguageContext are wrapped for real
// too - useWordPopup (used for the pre-existing individual add-word flow)
// needs both, unrelated to the bulk action under test here.
vi.mock("../../../hooks/useFlashcards", () => ({ useFlashcards: vi.fn() }));

import { useFlashcards } from "../../../hooks/useFlashcards";

const englishLesson = { id: "english-a1-greetings", language: "english", vocabulary: ["hello", "hi", "goodbye"] };
const frenchLesson = { id: "french-a1-greetings", language: "french", vocabulary: ["salut", "au revoir"] };

function existingCard(word, language) {
    return { id: word, word, language, translation: "x" };
}

function renderVocabularySection(props) {
    return render(
        <AuthContext.Provider value={{ isAuthenticated: Boolean(props.isAuthenticated) }}>
            <AuthGateContext.Provider value={{ requestAuth: () => {} }}>
                <EventProvider>
                    <LanguageContext.Provider value={{ language: props.lesson.language, setLanguage: () => {} }}>
                        <VocabularySection {...props} />
                    </LanguageContext.Provider>
                </EventProvider>
            </AuthGateContext.Provider>
        </AuthContext.Provider>
    );
}

function renderSection(overrides = {}) {
    return renderVocabularySection({
        lesson: englishLesson,
        vocabulary: englishLesson.vocabulary,
        isAuthenticated: true,
        moduleId: "english-a1",
        ...overrides
    });
}

describe("VocabularySection - bulk add to flashcards", () => {

    let addFlashcard;

    beforeEach(() => {
        addFlashcard = vi.fn();
    });

    // A. no words added yet
    it("adds every resolved word when none are flashcards yet", () => {

        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard });

        renderSection();

        fireEvent.click(screen.getByRole("button", { name: "Adicionar todas aos flashcards" }));

        expect(addFlashcard).toHaveBeenCalledTimes(3);
        expect(addFlashcard).toHaveBeenCalledWith(expect.objectContaining({ word: "hello" }), "english");
        expect(addFlashcard).toHaveBeenCalledWith(expect.objectContaining({ word: "hi" }), "english");
        expect(addFlashcard).toHaveBeenCalledWith(expect.objectContaining({ word: "goodbye" }), "english");

    });

    // B. some words already added
    it("adds only the words that are not already flashcards, leaving the existing one untouched", () => {

        useFlashcards.mockReturnValue({ flashcards: [existingCard("hello", "english")], addFlashcard });

        renderSection();

        fireEvent.click(screen.getByRole("button", { name: "Adicionar todas aos flashcards" }));

        expect(addFlashcard).toHaveBeenCalledTimes(2);
        expect(addFlashcard).not.toHaveBeenCalledWith(expect.objectContaining({ word: "hello" }), "english");
        expect(addFlashcard).toHaveBeenCalledWith(expect.objectContaining({ word: "hi" }), "english");
        expect(addFlashcard).toHaveBeenCalledWith(expect.objectContaining({ word: "goodbye" }), "english");

    });

    // C. all words already added
    it("shows a completed state and no button when every word is already a flashcard - and adds nothing", () => {

        useFlashcards.mockReturnValue({
            flashcards: [
                existingCard("hello", "english"),
                existingCard("hi", "english"),
                existingCard("goodbye", "english")
            ],
            addFlashcard
        });

        renderSection();

        expect(screen.getByText("Todas adicionadas")).not.toBeNull();
        expect(screen.queryByRole("button", { name: /Adicionar/ })).toBeNull();
        expect(addFlashcard).not.toHaveBeenCalled();

    });

    // D. lesson with no resolvable vocabulary
    it("renders nothing at all - no bulk action, no word grid - when no vocabulary word resolves in the dictionary", () => {

        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard });

        const { container } = renderVocabularySection({
            lesson: englishLesson,
            vocabulary: ["not-a-real-word"],
            isAuthenticated: true,
            moduleId: "english-a1"
        });

        expect(container.firstChild).toBeNull();

    });

    // E. repeating the action / no duplicates once everything is added
    it("does not offer the action again, and never calls addFlashcard again, once flashcards catch up to all pending words", () => {

        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard });

        const { rerender } = renderSection();

        fireEvent.click(screen.getByRole("button", { name: "Adicionar todas aos flashcards" }));
        expect(addFlashcard).toHaveBeenCalledTimes(3);

        // Simulate FlashcardProvider's `flashcards` now reflecting the 3
        // adds (as it would in the real app, since addFlashcard is what
        // appends to that array) and re-render.
        useFlashcards.mockReturnValue({
            flashcards: englishLesson.vocabulary.map(word => existingCard(word, "english")),
            addFlashcard
        });

        rerender(
            <AuthContext.Provider value={{ isAuthenticated: true }}>
                <AuthGateContext.Provider value={{ requestAuth: () => {} }}>
                    <EventProvider>
                        <LanguageContext.Provider value={{ language: "english", setLanguage: () => {} }}>
                            <VocabularySection
                                lesson={englishLesson}
                                vocabulary={englishLesson.vocabulary}
                                isAuthenticated
                                moduleId="english-a1"
                            />
                        </LanguageContext.Provider>
                    </EventProvider>
                </AuthGateContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.queryByRole("button", { name: /Adicionar/ })).toBeNull();
        expect(screen.getByText("Todas adicionadas")).not.toBeNull();
        expect(addFlashcard).toHaveBeenCalledTimes(3);

    });

    // F. different languages
    it("respects the lesson's own language (French), not a hardcoded one", () => {

        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard });

        renderVocabularySection({
            lesson: frenchLesson,
            vocabulary: frenchLesson.vocabulary,
            isAuthenticated: true,
            moduleId: "french-a1"
        });

        fireEvent.click(screen.getByRole("button", { name: "Adicionar todas aos flashcards" }));

        expect(addFlashcard).toHaveBeenCalledTimes(2);
        expect(addFlashcard).toHaveBeenCalledWith(expect.objectContaining({ word: "salut" }), "french");
        expect(addFlashcard).toHaveBeenCalledWith(expect.objectContaining({ word: "au revoir" }), "french");

    });

    it("does not show the bulk action for an unauthenticated visitor, but the word grid still renders", () => {

        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard });

        renderSection({ isAuthenticated: false });

        expect(screen.queryByText("Adicionar todas aos flashcards")).toBeNull();
        expect(screen.queryByText("Todas adicionadas")).toBeNull();
        expect(screen.getByText("hello")).not.toBeNull();
        expect(addFlashcard).not.toHaveBeenCalled();

    });

    it("preserves the existing individual add-word flow untouched - a word card still opens WordPopup", () => {

        useFlashcards.mockReturnValue({ flashcards: [], addFlashcard });

        renderSection();

        // VocabularyCard's first click flips to reveal the translation, the
        // second opens WordPopup - unrelated to the bulk action above.
        fireEvent.click(screen.getByText("hello"));
        fireEvent.click(screen.getByText("olá"));

        expect(screen.getByRole("dialog")).not.toBeNull();

    });

});
