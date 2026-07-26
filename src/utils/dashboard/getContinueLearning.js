import { ModuleRepository } from "../courses/ModuleRepository";

export function getContinueLearning({ language, completedLessons = [] }) {

    const lessons = ModuleRepository.getAllLessonsInOrder(language);

    if (lessons.length === 0) {
        return { status: "empty" };
    }

    const nextLesson = lessons.find(
        lesson => !completedLessons.includes(lesson.id)
    );

    if (!nextLesson) {
        return { status: "finished" };
    }

    const module = ModuleRepository.getByLesson(language, nextLesson.id);

    return {
        status: "in-progress",
        lessonId: nextLesson.id,
        lessonTitle: nextLesson.title,
        lessonCategory: nextLesson.category,
        moduleId: module?.id ?? null,
        moduleTitle: module?.title ?? null,
        moduleLevel: module?.level ?? null,
        href: `/lessons/${nextLesson.id}`
    };

}
