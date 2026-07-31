import { ModuleRepository } from "../courses/ModuleRepository";

export function getLessonsCompleted({ completedLessons = [], language }) {

    const languageLessonIds = new Set(
        ModuleRepository.getAllLessonsInOrder(language).map(lesson => lesson.id)
    );

    return completedLessons.filter(lessonId => languageLessonIds.has(lessonId)).length;

}
