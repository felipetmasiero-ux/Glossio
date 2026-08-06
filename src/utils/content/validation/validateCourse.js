import { error, warning } from "./createIssue";
import { validateModule } from "./validateModule";

const REQUIRED_STRING_FIELDS = ["id", "language", "title"];

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

// `dictionaryIds` is passed straight through to validateModule/validateLesson
// for every lesson in this course.
export function validateCourse(course, { dictionaryIds } = {}) {

    const coursePath = course?.id ?? "course";

    if (!course || typeof course !== "object") {
        return [error("course", coursePath, "Curso inválido (não é um objeto).")];
    }

    const issues = [];

    REQUIRED_STRING_FIELDS.forEach(field => {

        if (!isNonEmptyString(course[field])) {
            issues.push(error("course", coursePath, `Curso sem "${field}" válido.`));
        }

    });

    if (!Array.isArray(course.modules) || course.modules.length === 0) {

        issues.push(error("course", coursePath, "Curso sem módulos."));

    } else {

        const seenModuleIds = new Set();

        const seenOrders = new Set();

        course.modules.forEach((module, index) => {

            const modulePath = module?.id ?? `${coursePath} > modules[${index}]`;

            issues.push(...validateModule(module, {
                path: modulePath,
                courseId: course.id,
                dictionaryIds
            }));

            if (module?.id) {

                if (seenModuleIds.has(module.id)) {
                    issues.push(error("id", modulePath, `Id de módulo duplicado dentro do curso: "${module.id}".`));
                }

                seenModuleIds.add(module.id);

            }

            if (module?.order != null) {

                if (seenOrders.has(module.order)) {
                    issues.push(warning("module", modulePath, `"order" (${module.order}) duplicado entre módulos do curso - a ordem de exibição pode ficar ambígua.`));
                }

                seenOrders.add(module.order);

            }

        });

    }

    return issues;

}
