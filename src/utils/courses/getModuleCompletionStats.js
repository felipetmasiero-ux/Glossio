import { EVENT_TYPES } from "../../constants/events";

export function getModuleCompletionStats({ module, events = [], flashcards = [] }) {

    const lessonIds = new Set(module.lessons.map(lesson => lesson.id));

    const wordViewEvents = events.filter(event =>
        event.type === EVENT_TYPES.WORD_VIEWED &&
        lessonIds.has(event.payload.lessonId)
    );

    const wordsLearned = new Set(
        wordViewEvents.map(event => event.payload.word?.toLowerCase())
    ).size;

    const flashcardsAdded = flashcards.filter(
        card => card.moduleId === module.id
    ).length;

    const quizEvents = events.filter(event =>
        event.type === EVENT_TYPES.QUIZ_COMPLETED &&
        lessonIds.has(event.payload.lessonId)
    );

    const correctQuizzes = quizEvents.filter(event => event.payload.correct).length;

    const quizAccuracy = quizEvents.length === 0
        ? null
        : Math.round((correctQuizzes / quizEvents.length) * 100);

    const estimatedMinutes = module.lessons.reduce(
        (sum, lesson) => sum + (lesson.estimatedTime ?? 0),
        0
    );

    return {
        lessonCount: module.lessons.length,
        wordsLearned,
        flashcardsAdded,
        quizAccuracy,
        quizzesAnswered: quizEvents.length,
        estimatedMinutes
    };

}
