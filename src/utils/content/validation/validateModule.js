import { CEFR_LEVELS } from "../../../constants/cefrLevels";
import { error } from "./createIssue";
import { validateLesson } from "./validateLesson";

const REQUIRED_STRING_FIELDS = ["id", "courseId", "language", "level", "title"];

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

// `courseId` enables the id-prefix check (every module id is expected to
// start with its course's id, e.g. "english-a1"). `dictionaryIds` is passed
// straight through to validateLesson for each lesson.
export function validateModule(module, { path, courseId, dictionaryIds } = {}) {

    const modulePath = path ?? module?.id ?? "module";

    if (!module || typeof module !== "object") {
        return [error("module", modulePath, "Módulo inválido (não é um objeto).")];
    }

    const issues = [];

    REQUIRED_STRING_FIELDS.forEach(field => {

        if (!isNonEmptyString(module[field])) {
            issues.push(error("module", modulePath, `Módulo sem "${field}" válido.`));
        }

    });

    if (module.level && !CEFR_LEVELS.includes(module.level)) {
        issues.push(error("module", modulePath, `Nível "${module.level}" inválido. Níveis válidos: ${CEFR_LEVELS.join(", ")}.`));
    }

    if (courseId && isNonEmptyString(module.id) && !module.id.startsWith(`${courseId}-`)) {
        issues.push(error("id", modulePath, `Id do módulo "${module.id}" deveria começar com "${courseId}-".`));
    }

    if (!Array.isArray(module.lessons) || module.lessons.length === 0) {

        issues.push(error("module", modulePath, "Módulo sem lições."));

    } else {

        const seenLessonIds = new Set();

        module.lessons.forEach((lesson, index) => {

            const lessonPath = `${modulePath} > ${lesson?.id ?? `lessons[${index}]`}`;

            issues.push(...validateLesson(lesson, {
                path: lessonPath,
                moduleId: module.id,
                dictionaryIds,
                position: index + 1
            }));

            if (lesson?.id) {

                if (seenLessonIds.has(lesson.id)) {
                    issues.push(error("id", lessonPath, `Id de lição duplicado dentro do módulo: "${lesson.id}".`));
                }

                seenLessonIds.add(lesson.id);

            }

        });

    }

    return issues;

}
