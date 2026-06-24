import { calculateEaseFactor } from './calculateEaseFactor';
import { calculateInterval } from './calculateInterval';
import { calculateNextReview } from './calculateNextReview';
import {
    FIRST_INTERVAL,
    MIN_QUALITY_TO_PASS
} from "../../../constants/scheduling";

export function scheduleCard(card, quality) {
    const isCorrect = quality >= MIN_QUALITY_TO_PASS       ;

    const repetitions = isCorrect
        ? card.repetitions + 1
        : 0;

    const interval = isCorrect
        ? calculateInterval(
            repetitions,
            card.interval,
            card.easeFactor
        )
        : FIRST_INTERVAL;

    const easeFactor = calculateEaseFactor(
        card.easeFactor,
        quality
    );

    return {
        ...card,

        repetitions,
        interval,
        easeFactor,

        lastReviewedAt: Date.now(),
        nextReview: calculateNextReview(interval),

        updatedAt: Date.now()
    };
}