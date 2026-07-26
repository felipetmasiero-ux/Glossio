import { ModuleRepository } from "../courses/ModuleRepository";

export function getCourseProgress(language, completedLessons = []) {

    const lessons = ModuleRepository.getAllLessonsInOrder(language);

    const total = lessons.length;

    const completedInCourse = lessons.filter(
        lesson => completedLessons.includes(lesson.id)
    );

    const completed = completedInCourse.length;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    const lastCompletedLesson = completedInCourse.at(-1) ?? null;

    const lastModule = lastCompletedLesson
        ? ModuleRepository.getByLesson(language, lastCompletedLesson.id)
        : null;

    return {
        completed,
        total,
        percentage,
        lastModule: lastModule?.title ?? null
    };

}
