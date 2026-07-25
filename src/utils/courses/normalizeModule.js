import { normalizeLesson } from "../lessons/normalizeLesson";

export function normalizeModule(module) {

    if (!module) {
        return null;
    }

    return {

        id: module.id,

        courseId: module.courseId,

        language: module.language,

        level: module.level,

        order: module.order ?? 0,

        title: module.title,

        description: module.description ?? "",

        lessons: (module.lessons ?? []).map(normalizeLesson)

    };

}
