import {
    DEFAULT_EASE_FACTOR,
    DEFAULT_INTERVAL,
    DEFAULT_REPETITIONS
} from "../../constants/scheduling";

export function normalizeFlashcard(card) {
    return {
        ...card,

        createdAt: card.createdAt ?? Date.now(),

        updatedAt: card.updatedAt ?? Date.now(),

        repetitions:
            card.repetitions ??
            DEFAULT_REPETITIONS,

        interval:
            card.interval ??
            DEFAULT_INTERVAL,

        easeFactor:
            card.easeFactor ??
            card.ease ??
            DEFAULT_EASE_FACTOR,

        nextReview:
            card.nextReview ??
            Date.now(),

        lastReviewedAt:
            card.lastReviewedAt ??
            null,

        favorite: card.favorite ?? false,

        moduleId: card.moduleId ?? null,

        lessonId: card.lessonId ?? null,

        category: card.category ?? null,
    };
}