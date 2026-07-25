import { ModuleRepository } from "../courses/ModuleRepository";
import { normalizeLesson } from "./normalizeLesson";

export const LessonRepository = {

    getAll(language) {

        return ModuleRepository.getAllLessonsInOrder(language).map(normalizeLesson);

    },

    getById(language, id) {

        const lesson = ModuleRepository.getAllLessonsInOrder(language).find(

            lesson => lesson.id === id

        );

        return normalizeLesson(lesson);

    }

};
