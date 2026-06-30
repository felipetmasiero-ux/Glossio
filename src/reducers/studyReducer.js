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
    GOOD
} from "../constants/studyQuality";

import { updateSessionQueue } from "../utils/study/session/updateSessionQueue";   

export const initialStudyState = {

    stats: {
        again: 0,
        good: 0,
        easy: 0
    },

    completedCards: 0,

    revealed: false,

    leaving: false,

    sessionCards: [],

    initialSessionSize: 0

};


export function studyReducer(state, action) {

    switch (action.type) {

        case ANSWER: {

            const key =
                action.quality === AGAIN
                    ? "again"
                    : action.quality === GOOD
                        ? "good"
                        : "easy";

            return {

                ...state,

                completedCards:
                    action.quality === AGAIN
                        ? state.completedCards
                        : state.completedCards + 1,

                stats: {

                    ...state.stats,

                    [key]:
                        state.stats[key] + 1

                }

            };

        }

        case REVEAL:

            return {

                ...state,

                revealed: true

            };

        case START_LEAVING:

            return {

                ...state,

                leaving: true

            };

        case FINISH_LEAVING:

            return {

                ...state,

                leaving: false,

                revealed: false

            };

        case START_SESSION:

            return {

                ...initialStudyState,

                sessionCards: action.cards,

                initialSessionSize: action.cards.length

            };
        case UPDATE_QUEUE:

            return {

                ...state,

                sessionCards: updateSessionQueue(
                    state.sessionCards,
                    action.card,
                    action.quality
                )

            };

        default:

            return state;

    }

}