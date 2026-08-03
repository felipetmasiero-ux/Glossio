import { EVENT_TYPES } from "../../constants/events";
import { LessonRepository } from "../lessons/LessonRepository";
import { VideoRepository } from "../../repositories/VideoRepository";

export function getDayTimestamp(timestamp) {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

// Shared by every goal getter (daily, weekly, and history) so "what counts
// as a lesson/review/video-minute in this time range" is defined exactly
// once. Language-scoped the same way Sprint 38's dashboard functions are:
// lesson/video ids are already language-namespaced (LessonRepository/
// VideoRepository.getAll(language) only ever returns that language's
// content), and flashcard reviews are matched back to a language via the
// card itself, since FLASHCARD_REVIEWED events don't carry one.
export function buildRangeLookups({ flashcards = [], language }) {

    return {
        cardLanguageById: new Map(flashcards.map(card => [card.id, card.language])),
        lessonMinutesById: new Map(
            LessonRepository.getAll(language).map(lesson => [lesson.id, lesson.estimatedTime ?? 0])
        ),
        videoDurationById: new Map(
            VideoRepository.getAll(language).map(video => [video.id, video.duration ?? 0])
        )
    };

}

// `lookups` lets a caller that's computing many ranges in a row (like
// getGoalHistory, over its whole day-by-day window) build these maps once
// instead of once per range - they only depend on flashcards/language, never
// on the range itself. Defaults to building them fresh, so existing callers
// that only need a single range are unaffected.
export function computeRangeMetrics({ events = [], flashcards = [], language, startTimestamp, endTimestamp, lookups }) {

    const { cardLanguageById, lessonMinutesById, videoDurationById } = lookups ?? buildRangeLookups({ flashcards, language });

    let lessons = 0;
    let lessonMinutes = 0;
    let reviews = 0;
    let videoSeconds = 0;

    events.forEach(event => {

        if (event.timestamp < startTimestamp || event.timestamp >= endTimestamp) return;

        if (event.type === EVENT_TYPES.LESSON_COMPLETED && lessonMinutesById.has(event.payload.lessonId)) {
            lessons++;
            lessonMinutes += lessonMinutesById.get(event.payload.lessonId);
        } else if (event.type === EVENT_TYPES.FLASHCARD_REVIEWED && cardLanguageById.get(event.payload.cardId) === language) {
            reviews++;
        } else if (event.type === EVENT_TYPES.VIDEO_COMPLETED && videoDurationById.has(event.payload.videoId)) {
            videoSeconds += videoDurationById.get(event.payload.videoId);
        }

    });

    return { lessons, lessonMinutes, reviews, videoMinutes: videoSeconds / 60 };

}

export function computeDayMetrics({ events = [], flashcards = [], language, dayTimestamp, lookups }) {

    return computeRangeMetrics({
        events,
        flashcards,
        language,
        startTimestamp: dayTimestamp,
        endTimestamp: dayTimestamp + 24 * 60 * 60 * 1000,
        lookups
    });

}
