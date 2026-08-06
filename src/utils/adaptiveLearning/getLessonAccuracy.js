import { EVENT_TYPES } from "../../constants/events";
import { getLanguageFromId } from "../courses/getLanguageFromId";

// No accuracy is stored anywhere - QUIZ_COMPLETED (from QuizCard, reading a
// lesson) and EXERCISE_COMPLETED (from the exercise session) already carry
// {lessonId, correct} on every answer, so this derives per-lesson accuracy
// straight from the existing event log (src/contexts/EventProvider.jsx)
// instead of tracking a new running total anywhere. Every recommendation
// generator that needs "how well is the user doing in lesson X" calls this
// instead of re-deriving it.
//
// `language` filters by the lesson id's own prefix (see getLanguageFromId,
// same reasoning as the public-preview-mode sprint) rather than requiring
// events to carry a language field they don't have.
export function getLessonAccuracy(events, language) {

    const byLesson = new Map();

    events.forEach(event => {

        if (event.type !== EVENT_TYPES.QUIZ_COMPLETED && event.type !== EVENT_TYPES.EXERCISE_COMPLETED) {
            return;
        }

        const lessonId = event.payload?.lessonId;

        if (!lessonId || getLanguageFromId(lessonId) !== language) {
            return;
        }

        const stats = byLesson.get(lessonId) ?? { lessonId, correct: 0, total: 0 };

        stats.total += 1;

        if (event.payload.correct) {
            stats.correct += 1;
        }

        byLesson.set(lessonId, stats);

    });

    return [...byLesson.values()].map(stats => ({
        ...stats,
        accuracy: stats.total === 0 ? 0 : stats.correct / stats.total
    }));

}
