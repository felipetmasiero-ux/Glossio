import { CourseRepository } from "./CourseRepository";
import { ENABLE_LESSON_LOCKING } from "../../config/lessonLocking";

export const ModuleRepository = {

    getAll(language) {

        return CourseRepository.getByLanguage(language)?.modules ?? [];

    },

    getById(language, moduleId) {

        return this.getAll(language).find(
            module => module.id === moduleId
        ) ?? null;

    },

    getByLesson(language, lessonId) {

        return this.getAll(language).find(
            module => module.lessons.some(
                lesson => lesson.id === lessonId
            )
        ) ?? null;

    },

    getAllLessonsInOrder(language) {

        return this.getAll(language).flatMap(
            module => module.lessons
        );

    },

    getNextLesson(language, lessonId) {

        const lessons = this.getAllLessonsInOrder(language);

        const index = lessons.findIndex(
            lesson => lesson.id === lessonId
        );

        if (index === -1 || index === lessons.length - 1) {
            return null;
        }

        return lessons[index + 1];

    },

    getPreviousLesson(language, lessonId) {

        const lessons = this.getAllLessonsInOrder(language);

        const index = lessons.findIndex(
            lesson => lesson.id === lessonId
        );

        if (index <= 0) {
            return null;
        }

        return lessons[index - 1];

    },

    isLastLessonInModule(language, lessonId) {

        const module = this.getByLesson(language, lessonId);

        if (!module) {
            return false;
        }

        return module.lessons.at(-1)?.id === lessonId;

    },

    getNextModule(language, moduleId) {

        const modules = this.getAll(language);

        const index = modules.findIndex(
            module => module.id === moduleId
        );

        if (index === -1 || index === modules.length - 1) {
            return null;
        }

        return modules[index + 1];

    },

    getProgress(module, completedLessons = []) {

        const total = module.lessons.length;

        const completed = module.lessons.filter(
            lesson => completedLessons.includes(lesson.id)
        ).length;

        return {

            completed,

            total,

            percentage: total === 0 ? 0 : completed / total

        };

    },

    isLessonUnlocked(language, lessonId, completedLessons = []) {

        if (!ENABLE_LESSON_LOCKING) {
            return true;
        }

        const lessons = this.getAllLessonsInOrder(language);

        const index = lessons.findIndex(
            lesson => lesson.id === lessonId
        );

        if (index <= 0) {
            return true;
        }

        return completedLessons.includes(
            lessons[index - 1].id
        );

    }

};
