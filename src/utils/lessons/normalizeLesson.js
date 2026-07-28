export function normalizeLesson(lesson) {

    if (!lesson) {

        return null;

    }

    return {

        id: lesson.id,

        language: lesson.language,

        level: lesson.level,

        category: lesson.category,

        topic: lesson.topic ?? null,

        order: lesson.order,

        title: lesson.title,

        subtitle: lesson.subtitle,

        description: lesson.description,

        cover: lesson.cover,

        estimatedTime: lesson.estimatedTime ?? 0,

        difficulty: lesson.difficulty ?? 1,

        xp: lesson.xp ?? 0,

        tags: lesson.tags ?? [],

        skills: lesson.skills ?? [],

        objectives: lesson.objectives ?? [],

        vocabulary: lesson.vocabulary ?? [],

        blocks: lesson.blocks ?? [],

        summary: lesson.summary ?? {

            tip: "",

            review: []

        }

    };

}
