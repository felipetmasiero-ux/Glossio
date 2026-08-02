import { EVENT_TYPES } from "../../constants/events";
import { LessonRepository } from "../lessons/LessonRepository";
import { VideoRepository } from "../../repositories/VideoRepository";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_IN_MS = 7 * DAY_IN_MS;
const DEFAULT_WEEKS = 8;

function getDayTimestamp(timestamp) {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

function formatWeekLabel(timestamp) {
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getWeeklyActivity({ events = [], flashcards = [], language, weeks = DEFAULT_WEEKS } = {}) {

    const cardLanguageById = new Map(flashcards.map(card => [card.id, card.language]));

    const lessonIds = new Set(LessonRepository.getAll(language).map(lesson => lesson.id));
    const videoIds = new Set(VideoRepository.getAll(language).map(video => video.id));

    const today = getDayTimestamp(Date.now());
    const currentWeekStart = today - (today % WEEK_IN_MS);
    const earliestWeekStart = currentWeekStart - (weeks - 1) * WEEK_IN_MS;

    const buckets = [];

    for (let i = 0; i < weeks; i++) {

        const weekStart = earliestWeekStart + i * WEEK_IN_MS;

        buckets.push({
            weekStart,
            label: formatWeekLabel(weekStart),
            reviews: 0,
            lessons: 0,
            videos: 0
        });

    }

    function addToBucket(timestamp, key) {

        if (timestamp < earliestWeekStart) return;

        const index = Math.floor((timestamp - earliestWeekStart) / WEEK_IN_MS);

        if (index < 0 || index >= buckets.length) return;

        buckets[index][key]++;

    }

    events.forEach(event => {

        if (event.type === EVENT_TYPES.FLASHCARD_REVIEWED) {
            if (cardLanguageById.get(event.payload.cardId) === language) {
                addToBucket(event.timestamp, "reviews");
            }
        } else if (event.type === EVENT_TYPES.LESSON_COMPLETED) {
            if (lessonIds.has(event.payload.lessonId)) {
                addToBucket(event.timestamp, "lessons");
            }
        } else if (event.type === EVENT_TYPES.VIDEO_COMPLETED) {
            if (videoIds.has(event.payload.videoId)) {
                addToBucket(event.timestamp, "videos");
            }
        }

    });

    return buckets;

}
