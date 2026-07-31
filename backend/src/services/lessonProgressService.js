import { prisma } from "../config/prisma.js";

// Every real lesson id in this app follows a `{language}-{level}-{topic}`
// naming convention (e.g. "english-a1-greetings") - this is the only place
// that assumption lives, used for both the one-time legacy migration and
// regular writes, since the client's local format is just `string[]` with
// no language of its own to send.
function deriveLanguage(lessonId) {
    return lessonId?.split("-")[0] ?? "unknown";
}

export async function getOrMigrateLessonProgress(userId) {
    const existingCount = await prisma.lessonProgress.count({ where: { userId } });

    if (existingCount === 0) {
        const progress = await prisma.userProgress.findUnique({ where: { userId } });
        const legacyLessonIds = Array.isArray(progress?.lessonProgress) ? progress.lessonProgress : [];

        if (legacyLessonIds.length > 0) {
            const now = BigInt(Date.now());

            await prisma.$transaction([
                prisma.lessonProgress.createMany({
                    data: legacyLessonIds.map(lessonId => ({
                        userId,
                        lessonId,
                        language: deriveLanguage(lessonId),
                        completed: true,
                        completedAt: now
                    }))
                }),
                prisma.userProgress.update({
                    where: { userId },
                    data: { lessonProgress: [] }
                })
            ]);
        }
    }

    const rows = await prisma.lessonProgress.findMany({
        where: { userId },
        orderBy: { lessonId: "asc" }
    });

    return rows.map(row => row.lessonId);
}

export async function replaceLessonProgress(userId, lessonIds = []) {
    const now = BigInt(Date.now());

    const data = lessonIds.map(lessonId => ({
        userId,
        lessonId,
        language: deriveLanguage(lessonId),
        completed: true,
        completedAt: now
    }));

    await prisma.$transaction([
        prisma.lessonProgress.deleteMany({ where: { userId } }),
        prisma.lessonProgress.createMany({ data })
    ]);

    return data.map(row => row.lessonId);
}
