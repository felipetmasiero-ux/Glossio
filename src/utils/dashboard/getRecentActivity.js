import { EVENT_TYPES } from "../../constants/events";
import { LessonRepository } from "../lessons/LessonRepository";
import { VideoRepository } from "../../repositories/VideoRepository";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const MAX_ITEMS = 15;

function getDayTimestamp(timestamp) {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

function formatDateLabel(day, today) {

    const diffDays = Math.round((today - day) / DAY_IN_MS);

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";

    const date = new Date(day);

    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;

}

function createEmptyBucket() {
    return { lessons: [], videos: [], reviewCount: 0, addedCount: 0, exerciseCount: 0 };
}

export function getRecentActivity({ language, events = [], flashcards = [] }) {

    const cardLanguageById = new Map(flashcards.map(card => [card.id, card.language]));

    const sortedEvents = events.slice().sort((a, b) => b.timestamp - a.timestamp);

    const today = getDayTimestamp(Date.now());

    const dayOrder = [];
    const dayBuckets = new Map();

    sortedEvents.forEach(event => {

        const day = getDayTimestamp(event.timestamp);

        if (!dayBuckets.has(day)) {
            dayBuckets.set(day, createEmptyBucket());
            dayOrder.push(day);
        }

        const bucket = dayBuckets.get(day);

        if (event.type === EVENT_TYPES.LESSON_COMPLETED) {

            const lesson = LessonRepository.getById(language, event.payload.lessonId);
            if (lesson) bucket.lessons.push(lesson.title);

        } else if (event.type === EVENT_TYPES.VIDEO_COMPLETED) {

            const video = VideoRepository.getById(language, event.payload.videoId);
            if (video) bucket.videos.push(video.title);

        } else if (event.type === EVENT_TYPES.FLASHCARD_REVIEWED) {

            if (cardLanguageById.get(event.payload.cardId) === language) bucket.reviewCount++;

        } else if (event.type === EVENT_TYPES.VOCABULARY_ADDED) {

            if (event.payload.language === language) bucket.addedCount++;

        } else if (event.type === EVENT_TYPES.EXERCISE_COMPLETED) {

            const lesson = LessonRepository.getById(language, event.payload.lessonId);
            if (lesson) bucket.exerciseCount++;

        }

    });

    const days = [];
    let remaining = MAX_ITEMS;

    for (const day of dayOrder) {

        if (remaining <= 0) break;

        const bucket = dayBuckets.get(day);
        const items = [];

        bucket.lessons.forEach(title => items.push({ icon: "book", label: `Concluiu "${title}"` }));
        bucket.videos.forEach(title => items.push({ icon: "play", label: `Assistiu "${title}"` }));

        if (bucket.reviewCount > 0) {
            items.push({
                icon: "cards",
                label: `Revisou ${bucket.reviewCount} ${bucket.reviewCount === 1 ? "palavra" : "palavras"}`
            });
        }

        if (bucket.addedCount > 0) {
            items.push({
                icon: "cards",
                label: `Adicionou ${bucket.addedCount} ${bucket.addedCount === 1 ? "flashcard" : "flashcards"}`
            });
        }

        if (bucket.exerciseCount > 0) {
            items.push({
                icon: "pencil",
                label: `Completou ${bucket.exerciseCount} ${bucket.exerciseCount === 1 ? "exercício" : "exercícios"}`
            });
        }

        if (items.length === 0) continue;

        const limitedItems = items.slice(0, remaining);
        remaining -= limitedItems.length;

        days.push({ dateLabel: formatDateLabel(day, today), items: limitedItems });

    }

    return days;

}
