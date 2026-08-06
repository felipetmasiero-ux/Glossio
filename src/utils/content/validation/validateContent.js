import { normalizeWord } from "../../../repositories/normalizeWord";
import { error } from "./createIssue";
import { validateCourse } from "./validateCourse";
import { validateDictionary } from "./validateDictionary";

// Top-level entry point: validates every course + dictionary together, and
// adds the one class of check that only makes sense across languages -
// course/module/lesson ids colliding with each other even though they live
// in entirely different courses (each validateCourse/validateModule call
// below only ever sees its own subtree, so it structurally can't catch
// this).
//
// `courses`: { [language]: course } - e.g. { english: englishCourse, ... }
// `dictionaries`: { [language]: entries[] } - same shape as
// src/data/dictionary/index.js's `dictionaries` export.
export function validateContent({ courses, dictionaries }) {

    const issues = [];

    const globalCourseIds = new Map();

    const globalModuleIds = new Map();

    const globalLessonIds = new Map();

    Object.entries(courses ?? {}).forEach(([language, course]) => {

        const dictionaryEntries = dictionaries?.[language] ?? [];

        const dictionaryIds = new Set(
            dictionaryEntries.map(entry => normalizeWord(entry.id ?? entry.word))
        );

        issues.push(...validateDictionary(dictionaryEntries, { language }));

        issues.push(...validateCourse(course, { dictionaryIds }));

        if (course?.id) {

            if (globalCourseIds.has(course.id)) {
                issues.push(error("id", course.id, `Id de curso duplicado: "${course.id}" (também usado por "${globalCourseIds.get(course.id)}").`));
            }

            globalCourseIds.set(course.id, language);

        }

        (course?.modules ?? []).forEach(module => {

            if (module?.id) {

                if (globalModuleIds.has(module.id)) {
                    issues.push(error("id", module.id, `Id de módulo duplicado globalmente: "${module.id}" (também em "${globalModuleIds.get(module.id)}").`));
                }

                globalModuleIds.set(module.id, language);

            }

            (module?.lessons ?? []).forEach(lesson => {

                if (lesson?.id) {

                    if (globalLessonIds.has(lesson.id)) {
                        issues.push(error("id", lesson.id, `Id de lição duplicado globalmente: "${lesson.id}" (também em "${globalLessonIds.get(lesson.id)}").`));
                    }

                    globalLessonIds.set(lesson.id, language);

                }

            });

        });

    });

    return issues;

}
