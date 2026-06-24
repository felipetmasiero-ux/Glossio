import {
    FIRST_INTERVAL,
    SECOND_INTERVAL
} from "../../../constants/scheduling";

export function calculateInterval(
    repetitions,
    previousInterval,
    easeFactor
) {
    if (repetitions === 1) {
        return FIRST_INTERVAL;
    }

    if (repetitions === 2) {
        return SECOND_INTERVAL;
    }

    return Math.round(previousInterval * easeFactor);
}