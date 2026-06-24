import { MIN_EASE_FACTOR } from "../../../constants/scheduling";

export function calculateEaseFactor(easeFactor, quality) {
    let newEase =
        easeFactor +
        (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    return Math.max(newEase, MIN_EASE_FACTOR);
}