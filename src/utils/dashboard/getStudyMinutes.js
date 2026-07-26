import { LessonRepository } from "../lessons/LessonRepository";

export function getStudyMinutes({ language, completedLessons = [] }) {

    return LessonRepository.getAll(language)
        .filter(lesson => completedLessons.includes(lesson.id))
        .reduce((sum, lesson) => sum + (lesson.estimatedTime ?? 0), 0);

}
