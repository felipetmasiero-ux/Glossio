import { prisma } from "../config/prisma.js";
import { requireArray } from "../utils/validators.js";
import { HttpError } from "../utils/HttpError.js";

const MAX_LESSON_IDS_PER_REQUEST = 5_000;

function isValidLessonId(lessonId) {
    return typeof lessonId === "string" && lessonId.length > 0 && lessonId.length <= 200;
}

// Every real lesson id in this app follows a `{language}-{level}-{topic}`
// naming convention (e.g. "english-a1-greetings") - this is the only place
// that assumption lives, used for both the one-time legacy migration and
// regular writes, since the client's local format is just `string[]` with
// no language of its own to send.
function deriveLanguage(lessonId) {
    return lessonId?.split("-")[0] ?? "unknown";
}

export async function getOrMigrateLessonProgress(userId) {
    // Same fix as flashcardService.getOrMigrateFlashcards: read the real
    // rows first instead of a separate count() just to decide whether
    // migration is needed, since the steady state (already migrated) is
    // nearly every request after the first.
    let rows = await prisma.lessonProgress.findMany({
        where: { userId },
        orderBy: { lessonId: "asc" }
    });

    if (rows.length === 0) {
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

            rows = await prisma.lessonProgress.findMany({
                where: { userId },
                orderBy: { lessonId: "asc" }
            });
        }
    }

    return rows.map(row => row.lessonId);
}

export async function replaceLessonProgress(userId, lessonIds = []) {
    const validated = requireArray(lessonIds, "Progresso de lições", { maxLength: MAX_LESSON_IDS_PER_REQUEST });

    if (!validated.every(isValidLessonId)) {
        throw new HttpError(400, "IDs de lição inválidos.");
    }

    const now = BigInt(Date.now());

    const data = validated.map(lessonId => ({
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
