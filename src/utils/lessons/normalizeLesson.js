export function normalizeLesson(lesson) {

    if (!lesson) {

        return null;

    }

    return {

        id: lesson.id,

        language: lesson.language,

        level: lesson.level,

        category: lesson.category,

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

        prerequisites: lesson.prerequisites ?? [],

        objectives: lesson.objectives ?? [],

        vocabulary: lesson.vocabulary ?? [],

        blocks: lesson.blocks ?? [],

        practice: lesson.practice ?? [],

        summary: lesson.summary ?? {

            tip: "",

            review: []

        },

        nextLesson: lesson.nextLesson ?? null

    };

}