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
    AGAIN,
    GOOD,
    EASY
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

// R3 (post-sprint audit): during the ~350ms exit animation, currentCard
// (and revealed) don't change yet - a second click, a repeated Enter/Space/
// number shortcut, or a mix of both used to re-enter handleAnswer for the
// *same* card, calling answerFlashcard (and therefore scheduleCard),
// addStudyRecord, and the review-completed analytics event a second time
// for one single answer. AnswerButtons and useKeyboardShortcuts both call
// this exact same handleAnswer reference with nothing in between, so
// calling it more than once in a row here reproduces every real trigger
// combination (double click, double Enter, double Space/number shortcut,
// click+keyboard, keyboard+click) - see StudyFlashcards.test.jsx for the
// real-DOM-event version of the same guarantee.
describe("useStudySession - duplicate-answer protection (R3)", () => {

    beforeEach(() => {

        vi.clearAllMocks();
        vi.useFakeTimers();

        getDueCards.mockReturnValue(flashcards);

    });

    afterEach(() => {

        vi.runOnlyPendingTimers();
        vi.useRealTimers();

    });

    it("a single answer calls answerFlashcard exactly once, with the exact card id and quality", () => {

        const answerFlashcard = vi.fn();
        const { result } = renderStudySession({ answerFlashcard });

        act(() => { result.current.startSession(); });
        act(() => { result.current.handleAnswer(GOOD); });
        act(() => { vi.runAllTimers(); });

        expect(answerFlashcard).toHaveBeenCalledTimes(1);
        expect(answerFlashcard).toHaveBeenCalledWith(1, GOOD);

    });

    it("two activations back to back (double click / double Enter / double Space, indistinguishable at this level) only answer once", () => {

        const answerFlashcard = vi.fn();
        const { result } = renderStudySession({ answerFlashcard });

        act(() => { result.current.startSession(); });

        act(() => {
            result.current.handleAnswer(GOOD);
            result.current.handleAnswer(GOOD);
        });

        act(() => { vi.runAllTimers(); });

        expect(answerFlashcard).toHaveBeenCalledTimes(1);

    });

    it("a second activation with a *different* quality (e.g. click then a keyboard shortcut) is still ignored - the first answer wins, not the last", () => {

        const answerFlashcard = vi.fn();
        const { result } = renderStudySession({ answerFlashcard });

        act(() => { result.current.startSession(); });

        act(() => {
            result.current.handleAnswer(GOOD);
            result.current.handleAnswer(EASY);
        });

        act(() => { vi.runAllTimers(); });

        expect(answerFlashcard).toHaveBeenCalledTimes(1);
        expect(answerFlashcard).toHaveBeenCalledWith(1, GOOD);

    });

    it("a third, fourth, fifth... activation within the exit window is still ignored (not just a second one)", () => {

        const answerFlashcard = vi.fn();
        const { result } = renderStudySession({ answerFlashcard });

        act(() => { result.current.startSession(); });

        act(() => {
            for (let i = 0; i < 5; i++) {
                result.current.handleAnswer(GOOD);
            }
        });

        act(() => { vi.runAllTimers(); });

        expect(answerFlashcard).toHaveBeenCalledTimes(1);

    });

    it("a duplicate activation arriving after the exit animation has already resolved the first answer is a normal new answer for the next card, not a rejected duplicate", () => {

        const answerFlashcard = vi.fn();
        const { result } = renderStudySession({ answerFlashcard });

        act(() => { result.current.startSession(); });

        act(() => { result.current.handleAnswer(GOOD); });
        act(() => { vi.runAllTimers(); });

        expect(result.current.currentCard.id).toBe(2);

        // Late arrival for card 1 would have been ignored while leaving;
        // this call is for card 2 and must be accepted normally.
        act(() => { result.current.handleAnswer(EASY); });
        act(() => { vi.runAllTimers(); });

        expect(answerFlashcard).toHaveBeenCalledTimes(2);
        expect(answerFlashcard).toHaveBeenNthCalledWith(2, 2, EASY);

    });

    it("addStudyRecord (history) runs exactly once per card despite a duplicate activation", () => {

        const addStudyRecord = vi.fn();
        const { result } = renderStudySession({ addStudyRecord });

        act(() => { result.current.startSession(); });

        act(() => {
            result.current.handleAnswer(GOOD);
            result.current.handleAnswer(GOOD);
        });

        act(() => { vi.runAllTimers(); });

        expect(addStudyRecord).toHaveBeenCalledTimes(1);
        expect(addStudyRecord).toHaveBeenCalledWith(1, GOOD);

    });

    it("the review_completed analytics event fires exactly once per card despite a duplicate activation", () => {

        const { result } = renderStudySession();

        act(() => { result.current.startSession(); });
        vi.clearAllMocks();

        act(() => {
            result.current.handleAnswer(GOOD);
            result.current.handleAnswer(GOOD);
        });

        act(() => { vi.runAllTimers(); });

        const reviewCompletedCalls = trackEvent.mock.calls.filter(([name]) => name === "review_completed");
        expect(reviewCompletedCalls).toHaveLength(1);
        expect(reviewCompletedCalls[0][1]).toEqual({ cardId: 1, quality: GOOD, correct: true });

    });

    it("stats only advance once per card despite a duplicate activation (proves the SRS-facing state isn't double-applied, not just the callback)", () => {

        const { result } = renderStudySession();

        act(() => { result.current.startSession(); });

        act(() => {
            result.current.handleAnswer(GOOD);
            result.current.handleAnswer(GOOD);
        });

        expect(result.current.stats.good).toBe(1);
        expect(result.current.completedCards).toBe(1);

        act(() => { vi.runAllTimers(); });

    });

    it("the guard is not stuck after the first card - the next card can be answered normally, once, including via a repeated activation of its own", () => {

        const answerFlashcard = vi.fn();
        const { result } = renderStudySession({ answerFlashcard });

        act(() => { result.current.startSession(); });
        act(() => { result.current.handleAnswer(GOOD); });
        act(() => { vi.runAllTimers(); });

        expect(result.current.currentCard.id).toBe(2);

        act(() => {
            result.current.handleAnswer(EASY);
            result.current.handleAnswer(EASY);
        });

        act(() => { vi.runAllTimers(); });

        expect(answerFlashcard).toHaveBeenCalledTimes(2);
        expect(answerFlashcard).toHaveBeenNthCalledWith(2, 2, EASY);

    });

    it("restarting the session resets the guard, so the very first card of a new session isn't permanently blocked by a stale flag", () => {

        const answerFlashcard = vi.fn();
        const { result } = renderStudySession({ answerFlashcard });

        act(() => { result.current.startSession(); });
        act(() => {
            result.current.handleAnswer(GOOD);
            result.current.handleAnswer(GOOD);
        });
        act(() => { vi.runAllTimers(); });
        act(() => { result.current.handleAnswer(GOOD); });
        act(() => { vi.runAllTimers(); });

        expect(result.current.sessionCards).toHaveLength(0);

        act(() => { result.current.restartSession(); });

        expect(result.current.currentCard.id).toBe(1);

        act(() => { result.current.handleAnswer(AGAIN); });
        act(() => { vi.runAllTimers(); });

        expect(answerFlashcard).toHaveBeenCalledTimes(3);
        expect(answerFlashcard).toHaveBeenNthCalledWith(3, 1, AGAIN);

    });

    it("each answer quality (Again/Good/Easy) is independently accepted exactly once when tried on its own card", () => {

        const threeCards = [
            { id: 1, language: "english" },
            { id: 2, language: "english" },
            { id: 3, language: "english" }
        ];
        getDueCards.mockReturnValue(threeCards);

        const answerFlashcard = vi.fn();
        const { result } = renderStudySession({ cards: threeCards, answerFlashcard });

        act(() => { result.current.startSession(); });

        for (const quality of [AGAIN, GOOD, EASY]) {
            act(() => { result.current.handleAnswer(quality); });
            act(() => { vi.runAllTimers(); });
        }

        expect(answerFlashcard).toHaveBeenCalledTimes(3);
        expect(answerFlashcard).toHaveBeenNthCalledWith(1, 1, AGAIN);
        expect(answerFlashcard).toHaveBeenNthCalledWith(2, 2, GOOD);
        expect(answerFlashcard).toHaveBeenNthCalledWith(3, 3, EASY);

    });

    it("the exit animation state (leaving) still runs its normal course despite a duplicate activation", () => {

        const { result } = renderStudySession();

        act(() => { result.current.startSession(); });

        act(() => {
            result.current.handleAnswer(GOOD);
            result.current.handleAnswer(GOOD);
        });

        expect(result.current.leaving).toBe(true);

        act(() => { vi.runAllTimers(); });

        expect(result.current.leaving).toBe(false);

    });

});