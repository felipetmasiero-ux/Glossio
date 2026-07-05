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
import { useStudySession } from "./useStudySession";

import {
    GOOD
} from "../../constants/studyQuality";

import { getDueCards } from "../../utils/study/session";

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
                {children}
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