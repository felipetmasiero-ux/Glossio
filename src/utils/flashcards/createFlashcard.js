import {
    DEFAULT_EASE_FACTOR,
    DEFAULT_INTERVAL,
    DEFAULT_REPETITIONS
} from "../../constants/scheduling";

export function createFlashcard({
    word,
    translation,
    language
}) {
    const now = Date.now();

    return {
    id: crypto.randomUUID(),

    word,
    translation,
    language,

    favorite: false,

    createdAt: now,
    updatedAt: now,

    repetitions: DEFAULT_REPETITIONS,
    interval: DEFAULT_INTERVAL,
    easeFactor: DEFAULT_EASE_FACTOR,

    nextReview: now,
    lastReviewedAt: null
};
}