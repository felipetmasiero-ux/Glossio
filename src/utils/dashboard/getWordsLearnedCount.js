import { LessonRepository } from "../lessons/LessonRepository";
import { EVENT_TYPES } from "../../constants/events";

export function getWordsLearnedCount({ language, events = [] }) {

    const lessonIds = new Set(
        LessonRepository.getAll(language).map(lesson => lesson.id)
    );

    const words = new Set(
        events
            .filter(event =>
                event.type === EVENT_TYPES.WORD_VIEWED &&
                lessonIds.has(event.payload.lessonId)
            )
            .map(event => event.payload.word?.toLowerCase())
    );

    return words.size;

}
