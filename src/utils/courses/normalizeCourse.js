import { normalizeModule } from "./normalizeModule";

export function normalizeCourse(course) {

    if (!course) {
        return null;
    }

    return {

        id: course.id,

        language: course.language,

        title: course.title,

        description: course.description ?? "",

        cover: course.cover ?? null,

        modules: (course.modules ?? [])
            .map(normalizeModule)
            .sort((a, b) => a.order - b.order)

    };

}
