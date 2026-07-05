import { describe, expect, it } from "vitest";

import {
    studyReducer,
    initialStudyState
} from "./studyReducer";

import {
    ANSWER,
    REVEAL,
    START_LEAVING,
    FINISH_LEAVING,
    START_SESSION,
    UPDATE_QUEUE
} from "../constants/studyActions";

import {
    AGAIN,
    GOOD,
    EASY
} from "../constants/studyQuality";

describe("START_SESSION", () => {

    it("starts a new study session", () => {

        const cards = [
            { id: 1 },
            { id: 2 }
        ];

        const state = studyReducer(
            initialStudyState,
            {
                type: START_SESSION,
                cards
            }
        );

        expect(state.sessionCards).toEqual(cards);

        expect(state.initialSessionSize).toBe(2);

        expect(state.completedCards).toBe(0);

        expect(state.revealed).toBe(false);

    });

});

describe("REVEAL", () => {

    it("reveals the current card", () => {

        const state = studyReducer(
            initialStudyState,
            {
                type: REVEAL
            }
        );

        expect(state.revealed).toBe(true);

    });

});

describe("START_LEAVING", () => {

    it("starts leaving animation", () => {

        const state = studyReducer(
            initialStudyState,
            {
                type: START_LEAVING
            }
        );

        expect(state.leaving).toBe(true);

    });

});

describe("FINISH_LEAVING", () => {

    it("resets leaving state", () => {

        const state = studyReducer(

            {
                ...initialStudyState,
                leaving: true,
                revealed: true
            },

            {
                type: FINISH_LEAVING
            }

        );

        expect(state.leaving).toBe(false);

        expect(state.revealed).toBe(false);

    });

});

describe("ANSWER", () => {

    it("increments completed cards for GOOD", () => {

        const state = studyReducer(

            initialStudyState,

            {
                type: ANSWER,
                quality: GOOD
            }

        );

        expect(state.completedCards).toBe(1);

        expect(state.stats.good).toBe(1);

    });

    it("does not increment completed cards for AGAIN", () => {

        const state = studyReducer(

            initialStudyState,

            {
                type: ANSWER,
                quality: AGAIN
            }

        );

        expect(state.completedCards).toBe(0);

        expect(state.stats.again).toBe(1);

    });

    it("increments easy counter", () => {

        const state = studyReducer(

            initialStudyState,

            {
                type: ANSWER,
                quality: EASY
            }

        );

        expect(state.completedCards).toBe(1);

        expect(state.stats.easy).toBe(1);

    });
});

describe("UPDATE_QUEUE", () => {

    it("updates session queue", () => {

        const cards = [

            { id: 1 },

            { id: 2 }

        ];

        const state = studyReducer(

            {
                ...initialStudyState,
                sessionCards: cards
            },

            {
                type: UPDATE_QUEUE,
                card: cards[0],
                quality: GOOD
            }

        );

        expect(state.sessionCards).not.toEqual(cards);

    });

});

describe("unknown action", () => {

    it("returns current state", () => {

        const state = studyReducer(

            initialStudyState,

            {
                type: "UNKNOWN_ACTION"
            }

        );

        expect(state).toEqual(initialStudyState);

    });

});