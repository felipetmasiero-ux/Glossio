import { LessonRepository } from "../../lessons/LessonRepository";
import { getLessonAccuracy } from "../getLessonAccuracy";
import {
    RECOMMENDATION_TYPES,
    MIN_ATTEMPTS_FOR_LESSON_ACCURACY,
    CRITICAL_ACCURACY_THRESHOLD,
    LOW_ACCURACY_THRESHOLD,
    MAX_WEAK_LESSONS
} from "../../../constants/adaptiveLearning";

// Surfaces the lessons the user is actually struggling with, not just
// "hasn't finished yet" - see recommendContinueModule for that. Capped at
// MAX_WEAK_LESSONS (worst first) so one bad module can't crowd out every
// other recommendation type once everything gets merged and sorted by
// priority in generateRecommendations().
export function recommendWeakLessons({ events, language }) {

    return getLessonAccuracy(events, language)
        .filter(stats => stats.total >= MIN_ATTEMPTS_FOR_LESSON_ACCURACY && stats.accuracy < LOW_ACCURACY_THRESHOLD)
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, MAX_WEAK_LESSONS)
        .map(stats => {

            const lesson = LessonRepository.getById(language, stats.lessonId);

            if (!lesson) {
                return null;
            }

            const percentage = Math.round(stats.accuracy * 100);

            return {
                id: `weak-lesson-${lesson.id}`,
                type: RECOMMENDATION_TYPES.REVIEW_LESSON,
                priority: stats.accuracy < CRITICAL_ACCURACY_THRESHOLD ? 1 : 3,
                title: `Revisar: ${lesson.title}`,
                reason: `Você acertou apenas ${percentage}% nesta lição.`,
                href: `/lessons/${lesson.id}`,
                icon: "book"
            };

        })
        .filter(Boolean);

}
