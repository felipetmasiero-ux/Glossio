import { ModuleRepository } from "../courses/ModuleRepository";
import { normalizeLesson } from "./normalizeLesson";

// Same reasoning/pattern as CourseRepository's cache: the underlying lesson
// data is static, but normalizeLesson() was being re-run over every lesson
// on every single getAll()/getById() call (and getById() didn't even reuse
// getAll(), so it normalized the one lesson it wanted a second time from
// scratch). Cached per language; getById now just looks up the cached list
// instead of normalizing independently.
const normalizedLessonsCache = new Map();

function getNormalizedLessons(language) {

    const key = language?.toLowerCase();

    if (!normalizedLessonsCache.has(key)) {
        normalizedLessonsCache.set(
            key,
            ModuleRepository.getAllLessonsInOrder(language).map(normalizeLesson)
        );
    }

    return normalizedLessonsCache.get(key);

}

export const LessonRepository = {

    getAll(language) {
        return getNormalizedLessons(language);
    },

    getById(language, id) {
        return getNormalizedLessons(language).find(lesson => lesson.id === id) ?? null;
    }

};
