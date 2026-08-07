import {
    describe,
    expect,
    it,
    vi,
    beforeEach,
    afterEach
} from "vitest";

import {
    renderHook,
    act
} from "@testing-library/react";

import { StudyHistoryContext } from "../../contexts/StudyHistoryContext";
import { LastActivityContext } from "../../contexts/LastActivityContext";
import { useStudySession } from "./useStudySession";

import {
    GOOD
} from "../../constants/studyQuality";

import { MAX_SESSION_SIZE } from "../../constants/studySession";

import { getDueCards } from "../../utils/study/session";
import { trackEvent } from "../../utils/analytics";
import { createFlashcard } from "../../utils/flashcards/createFlashcard";

vi.mock("../../utils/analytics", async importOriginal => {
    const actual = await importOriginal();
    return { ...actual, trackEvent: vi.fn() };
});

vi.mock("../../utils/study/session", () => ({
    getDueCards: vi.fn()
}));

const flashcards = [
    {
        id: 1,
        language: "english"
    },
    {
        id: 2,
        language: "english"
    }
];

function createWrapper(addStudyRecord = vi.fn()) {

    return function Wrapper({ children }) {

        return (
            <StudyHistoryContext.Provider
                value={{
                    addStudyRecord
                }}
            >
                <LastActivityContext.Provider
                    value={{
                        setActivity: vi.fn(),
                        clearActivity: vi.fn()
                    }}
                >
                    {children}
                </LastActivityContext.Provider>
            </StudyHistoryContext.Provider>
        );

    };

}

function renderStudySession({
    cards = flashcards,
    answerFlashcard = vi.fn(),
    addStudyRecord = vi.fn()
} = {}) {

    return renderHook(
        () =>
            useStudySession(
                cards,
                "english",
                answerFlashcard
            ),
        {
            wrapper: createWrapper(addStudyRecord)
        }
    );

}

describe("useStudySession", () => {

    beforeEach(() => {

        vi.clearAllMocks();
        vi.useFakeTimers();

        getDueCards.mockReturnValue(flashcards);

    });

    afterEach(() => {

        vi.runOnlyPendingTimers();
        vi.useRealTimers();

    });

    it("starts a study session", () => {

        const { result } = renderStudySession();

        act(() => {
            result.current.startSession();
        });

        expect(result.current.sessionCards).toHaveLength(2);

    });

    it("reveals the current card", () => {

        const { result } = renderStudySession();

        act(() => {
            result.current.startSession();
        });

        act(() => {
            result.current.revealCard();
        });

        expect(result.current.revealed).toBe(true);

    });

    it("calls answerFlashcard", () => {

        const answerFlashcard = vi.fn();

        const { result } = renderStudySession({
            answerFlashcard
        });

        act(() => {
            result.current.startSession();
        });

        act(() => {
            result.current.handleAnswer(GOOD);
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(answerFlashcard)
            .toHaveBeenCalledWith(1, GOOD);

    });

    it("adds a study record", () => {

        const addStudyRecord = vi.fn();

        const { result } = renderStudySession({
            addStudyRecord
        });

        act(() => {
            result.current.startSession();
        });

        act(() => {
            result.current.handleAnswer(GOOD);
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(addStudyRecord)
            .toHaveBeenCalledWith(1, GOOD);

    });

    it("does nothing when there is no current card", () => {

        getDueCards.mockReturnValue([]);

        const answerFlashcard = vi.fn();

        const { result } = renderStudySession({
            cards: [],
            answerFlashcard
        });

        act(() => {
            result.current.handleAnswer(GOOD);
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(answerFlashcard)
            .not.toHaveBeenCalled();

    });


    it("lets every card in when there are fewer due than the session cap", () => {

        const fewCards = Array.from({ length: 10 }, (_, i) => ({ id: i, language: "english" }));
        getDueCards.mockReturnValue(fewCards);

        const { result } = renderStudySession({ cards: fewCards });

        act(() => {
            result.current.startSession();
        });

        expect(result.current.sessionCards).toHaveLength(10);
        expect(result.current.initialSessionSize).toBe(10);

    });

    it("lets every card in when the due count is exactly the session cap", () => {

        const exactCards = Array.from({ length: MAX_SESSION_SIZE }, (_, i) => ({ id: i, language: "english" }));
        getDueCards.mockReturnValue(exactCards);

        const { result } = renderStudySession({ cards: exactCards });

        act(() => {
            result.current.startSession();
        });

        expect(result.current.sessionCards).toHaveLength(MAX_SESSION_SIZE);

    });

    it("caps the session at MAX_SESSION_SIZE when more cards are due, without losing them elsewhere", () => {

        const manyCards = Array.from({ length: MAX_SESSION_SIZE + 10 }, (_, i) => ({ id: i, language: "english" }));
        getDueCards.mockReturnValue(manyCards);

        const { result } = renderStudySession({ cards: manyCards });

        act(() => {
            result.current.startSession();
        });

        // Exactly the cap, and exactly the first N in the order
        // getDueCards already returned them - no new sort introduced.
        expect(result.current.sessionCards).toHaveLength(MAX_SESSION_SIZE);
        expect(result.current.sessionCards.map(c => c.id)).toEqual(manyCards.slice(0, MAX_SESSION_SIZE).map(c => c.id));

    });

    it("reports the capped size, not the full due count, in the session-started analytics event", () => {

        const manyCards = Array.from({ length: MAX_SESSION_SIZE + 10 }, (_, i) => ({ id: i, language: "english" }));
        getDueCards.mockReturnValue(manyCards);

        const { result } = renderStudySession({ cards: manyCards });

        act(() => {
            result.current.startSession();
        });

        expect(trackEvent).toHaveBeenCalledWith("study_session_started", { language: "english", cardsCount: MAX_SESSION_SIZE });

    });

    it("leaves excluded cards' SRS fields completely untouched - simulating a lesson bulk-add larger than the cap", () => {

        // Real createFlashcard() output, the same shape
        // useLessonVocabularyFlashcards produces via addFlashcard - not a
        // hand-rolled fixture.
        const bulkAdded = Array.from({ length: MAX_SESSION_SIZE + 5 }, (_, i) =>
            createFlashcard({ word: `word-${i}`, translation: "x", language: "english" })
        );

        const snapshotBeforeSession = bulkAdded.map(card => ({ ...card }));

        getDueCards.mockReturnValue(bulkAdded);

        const { result } = renderStudySession({ cards: bulkAdded });

        act(() => {
            result.current.startSession();
        });

        expect(result.current.sessionCards).toHaveLength(MAX_SESSION_SIZE);

        // Every card - whether it entered this session or not - is
        // untouched by merely starting a session. Nothing is scheduled,
        // rescheduled, or marked studied until handleAnswer actually runs.
        bulkAdded.forEach((card, index) => {
            expect(card).toEqual(snapshotBeforeSession[index]);
        });

        const excludedCards = bulkAdded.slice(MAX_SESSION_SIZE);
        const sessionCardIds = new Set(result.current.sessionCards.map(c => c.id));

        excludedCards.forEach(card => {
            expect(sessionCardIds.has(card.id)).toBe(false);
        });

    });

    it("returns an empty session when nothing is due, regardless of the cap", () => {

        getDueCards.mockReturnValue([]);

        const { result } = renderStudySession({ cards: [] });

        act(() => {
            result.current.startSession();
        });

        expect(result.current.sessionCards).toEqual([]);
        expect(result.current.initialSessionSize).toBe(0);

    });

    it("moves to the next card", () => {

        const { result } = renderStudySession();

        act(() => {
            result.current.startSession();
        });

        expect(result.current.currentCard.id).toBe(1);

        act(() => {
            result.current.handleAnswer(GOOD);
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(result.current.currentCard.id).toBe(2);

    });

});