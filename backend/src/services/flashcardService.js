import { prisma } from "../config/prisma.js";

function toPublicFlashcard(card) {
    return {
        id: card.id,
        word: card.word,
        translation: card.translation,
        language: card.language,
        moduleId: card.moduleId,
        lessonId: card.lessonId,
        category: card.category,
        favorite: card.favorite,
        easeFactor: card.easeFactor,
        interval: card.interval,
        repetitions: card.repetitions,
        createdAt: Number(card.createdAt),
        updatedAt: Number(card.updatedAt),
        nextReview: Number(card.nextReview),
        lastReviewedAt: card.lastReviewedAt === null ? null : Number(card.lastReviewedAt)
    };
}

function fromClientCard(userId, card) {
    return {
        id: card.id,
        userId,
        word: card.word,
        translation: card.translation,
        language: card.language,
        moduleId: card.moduleId ?? null,
        lessonId: card.lessonId ?? null,
        category: card.category ?? null,
        favorite: Boolean(card.favorite),
        easeFactor: card.easeFactor,
        interval: card.interval,
        repetitions: card.repetitions,
        createdAt: BigInt(Math.trunc(card.createdAt)),
        updatedAt: BigInt(Math.trunc(card.updatedAt)),
        nextReview: BigInt(Math.trunc(card.nextReview)),
        lastReviewedAt: card.lastReviewedAt == null ? null : BigInt(Math.trunc(card.lastReviewedAt))
    };
}

export async function getOrMigrateFlashcards(userId) {
    const existingCount = await prisma.flashcard.count({ where: { userId } });

    if (existingCount === 0) {
        const progress = await prisma.userProgress.findUnique({ where: { userId } });
        const legacyCards = Array.isArray(progress?.flashcards) ? progress.flashcards : [];

        if (legacyCards.length > 0) {
            await prisma.$transaction([
                prisma.flashcard.createMany({
                    data: legacyCards.map(card => fromClientCard(userId, card)),
                    skipDuplicates: true
                }),
                prisma.userProgress.update({
                    where: { userId },
                    data: { flashcards: [] }
                })
            ]);
        }
    }

    const rows = await prisma.flashcard.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" }
    });

    return rows.map(toPublicFlashcard);
}

export async function replaceFlashcards(userId, cards = []) {
    const data = cards.map(card => fromClientCard(userId, card));

    await prisma.$transaction([
        prisma.flashcard.deleteMany({ where: { userId } }),
        prisma.flashcard.createMany({ data })
    ]);

    return data.map(toPublicFlashcard);
}
