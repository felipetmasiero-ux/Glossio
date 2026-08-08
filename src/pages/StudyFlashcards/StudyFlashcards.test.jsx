import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { StudyFlashcards } from "./StudyFlashcards";
import { FlashcardContext } from "../../contexts/FlashcardContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { StudyHistoryContext } from "../../contexts/StudyHistoryContext";
import { LastActivityContext } from "../../contexts/LastActivityContext";
import { createFlashcard } from "../../utils/flashcards/createFlashcard";
import { CARD_EXIT_ANIMATION } from "../../constants/studyTiming";
import { GOOD } from "../../constants/studyQuality";
import { trackEvent } from "../../utils/analytics";

// R3: real end-to-end coverage of the double-answer race - unlike
// useStudySession.test.jsx (which calls handleAnswer directly, bypassing
// AnswerButtons/useKeyboardShortcuts entirely), this renders the actual
// page so a real click and a real keydown genuinely go through the same
// DOM/event paths a user would.
vi.mock("../../utils/analytics", async importOriginal => {
    const actual = await importOriginal();
    return { ...actual, trackEvent: vi.fn() };
});

function renderStudyFlashcards({ answerFlashcard = vi.fn(), addStudyRecord = vi.fn() } = {}) {

    const cards = [
        createFlashcard({ word: "hello", translation: "olá", language: "english" })
    ];

    render(
        <MemoryRouter>
            <FlashcardContext.Provider value={{ flashcards: cards, answerFlashcard }}>
                <LanguageContext.Provider value={{ language: "english" }}>
                    <StudyHistoryContext.Provider value={{ addStudyRecord, studyHistory: [] }}>
                        <LastActivityContext.Provider value={{ setActivity: vi.fn(), clearActivity: vi.fn() }}>
                            <StudyFlashcards />
                        </LastActivityContext.Provider>
                    </StudyHistoryContext.Provider>
                </LanguageContext.Provider>
            </FlashcardContext.Provider>
        </MemoryRouter>
    );

    return { cards };

}

function startAndReveal() {
    fireEvent.click(screen.getByText("Começar a estudar"));
    fireEvent.click(screen.getByText("Revelar"));
}

describe("StudyFlashcards - double-answer race condition (R3 integration)", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it("a real double click on the same answer button only schedules the card once", async () => {

        const answerFlashcard = vi.fn();
        const { cards } = renderStudyFlashcards({ answerFlashcard });

        startAndReveal();

        const goodButton = screen.getByText("Bom");
        fireEvent.click(goodButton);
        fireEvent.click(goodButton);

        await act(async () => {
            await vi.advanceTimersByTimeAsync(CARD_EXIT_ANIMATION);
        });

        expect(answerFlashcard).toHaveBeenCalledTimes(1);
        expect(answerFlashcard).toHaveBeenCalledWith(cards[0].id, GOOD);

    });

    it("a real Enter keypress followed by a real click within the exit window only schedules the card once", async () => {

        const answerFlashcard = vi.fn();
        const addStudyRecord = vi.fn();
        const { cards } = renderStudyFlashcards({ answerFlashcard, addStudyRecord });

        startAndReveal();

        // "2" is the GOOD shortcut per useKeyboardShortcuts.js.
        fireEvent.keyDown(window, { key: "2", code: "Digit2" });
        fireEvent.click(screen.getByText("Bom"));

        await act(async () => {
            await vi.advanceTimersByTimeAsync(CARD_EXIT_ANIMATION);
        });

        expect(answerFlashcard).toHaveBeenCalledTimes(1);
        expect(addStudyRecord).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledWith("review_completed", {
            cardId: cards[0].id,
            quality: GOOD,
            correct: true
        });

    });

    it("pressing Enter twice on a focused answer button only schedules the card once (native button keyboard activation, not useKeyboardShortcuts)", async () => {

        // useKeyboardShortcuts only ever binds Space to reveal and 1/2/3 to
        // answer (confirmed by reading the file) - it never listens for
        // Enter/Space as an "answer" shortcut itself. The real Enter/Space-
        // answers-a-card path is the *native* <button> behavior: a focused
        // <button> fires a click on Enter or Space. user-event (not
        // fireEvent, which doesn't simulate that native translation) is
        // what actually exercises it.
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        const answerFlashcard = vi.fn();
        renderStudyFlashcards({ answerFlashcard });

        startAndReveal();

        const goodButton = screen.getByText("Bom").closest("button");
        goodButton.focus();

        await user.keyboard("[Enter][Enter]");

        await act(async () => {
            await vi.advanceTimersByTimeAsync(CARD_EXIT_ANIMATION);
        });

        expect(answerFlashcard).toHaveBeenCalledTimes(1);

    });

    it("pressing Space twice on a focused answer button only schedules the card once (native button keyboard activation)", async () => {

        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        const answerFlashcard = vi.fn();
        renderStudyFlashcards({ answerFlashcard });

        startAndReveal();

        const goodButton = screen.getByText("Bom").closest("button");
        goodButton.focus();

        await user.keyboard("[Space][Space]");

        await act(async () => {
            await vi.advanceTimersByTimeAsync(CARD_EXIT_ANIMATION);
        });

        expect(answerFlashcard).toHaveBeenCalledTimes(1);

    });

    it("a full answer -> exit -> next-card cycle keeps working end to end", async () => {

        const twoCardsAnswerFlashcard = vi.fn();
        const cards = [
            createFlashcard({ word: "hello", translation: "olá", language: "english" }),
            createFlashcard({ word: "bye", translation: "tchau", language: "english" })
        ];

        render(
            <MemoryRouter>
                <FlashcardContext.Provider value={{ flashcards: cards, answerFlashcard: twoCardsAnswerFlashcard }}>
                    <LanguageContext.Provider value={{ language: "english" }}>
                        <StudyHistoryContext.Provider value={{ addStudyRecord: vi.fn(), studyHistory: [] }}>
                            <LastActivityContext.Provider value={{ setActivity: vi.fn(), clearActivity: vi.fn() }}>
                                <StudyFlashcards />
                            </LastActivityContext.Provider>
                        </StudyHistoryContext.Provider>
                    </LanguageContext.Provider>
                </FlashcardContext.Provider>
            </MemoryRouter>
        );

        startAndReveal();
        fireEvent.click(screen.getByText("Bom"));

        await act(async () => {
            await vi.advanceTimersByTimeAsync(CARD_EXIT_ANIMATION);
        });

        expect(twoCardsAnswerFlashcard).toHaveBeenCalledTimes(1);
        expect(twoCardsAnswerFlashcard).toHaveBeenCalledWith(cards[0].id, GOOD);

        // The second card is now current - reveal and answer it too,
        // proving the guard reopened and keyboard still works normally.
        fireEvent.click(screen.getByText("Revelar"));
        fireEvent.keyDown(window, { key: "2", code: "Digit2" });

        await act(async () => {
            await vi.advanceTimersByTimeAsync(CARD_EXIT_ANIMATION);
        });

        expect(twoCardsAnswerFlashcard).toHaveBeenCalledTimes(2);
        expect(twoCardsAnswerFlashcard).toHaveBeenNthCalledWith(2, cards[1].id, GOOD);

    });

});
