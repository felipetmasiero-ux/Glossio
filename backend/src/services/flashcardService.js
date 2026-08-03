import { prisma } from "../config/prisma.js";
import { requireString, optionalString, requireNumber, requireTimestamp, requireArray } from "../utils/validators.js";
import { HttpError } from "../utils/HttpError.js";

const MAX_FLASHCARDS_PER_REQUEST = 10_000;

// Only applied to real client input (the PUT /flashcards path) - the
// legacy-migration path below reads a user's own already-stored data and
// stays lenient on purpose, so an old, slightly-off legacy row can't lock a
// user out of ever loading their flashcards again.
function validateClientCard(card) {
    if (!card || typeof card !== "object") {
        throw new HttpError(400, "Flashcard inválido.");
    }

    return {
        id: requireString(card.id, "ID do flashcard", { min: 1, max: 100 }),
        word: requireString(card.word, "Palavra", { min: 1, max: 200 }),
        translation: requireString(card.translation, "Tradução", { min: 1, max: 200 }),
        language: requireString(card.language, "Idioma", { min: 1, max: 50 }),
        moduleId: optionalString(card.moduleId, "ID do módulo", { max: 100 }),
        lessonId: optionalString(card.lessonId, "ID da lição", { max: 100 }),
        category: optionalString(card.category, "Categoria", { max: 100 }),
        favorite: Boolean(card.favorite),
        easeFactor: requireNumber(card.easeFactor, "Fator de facilidade", { min: 0, max: 10 }),
        interval: requireNumber(card.interval, "Intervalo", { min: 0, max: 100_000 }),
        repetitions: requireNumber(card.repetitions, "Repetições", { min: 0, max: 100_000 }),
        createdAt: requireTimestamp(card.createdAt, "Data de criação"),
        updatedAt: requireTimestamp(card.updatedAt, "Data de atualização"),
        nextReview: requireTimestamp(card.nextReview, "Próxima revisão"),
        lastReviewedAt: card.lastReviewedAt == null ? null : requireTimestamp(card.lastReviewedAt, "Última revisão")
    };
}

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
    // Reads the real rows first instead of a separate count() purely to
    // decide whether migration is needed - a user who's already migrated
    // (the steady state, for nearly every request after their first) used
    // to cost 2 queries (count + findMany) on every single read. Now it's
    // just the one findMany(); the legacy check only runs on the empty-rows
    // path, and re-queries afterward only if it actually wrote something.
    let rows = await prisma.flashcard.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" }
    });

    if (rows.length === 0) {
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

            rows = await prisma.flashcard.findMany({
                where: { userId },
                orderBy: { createdAt: "asc" }
            });
        }
    }

    return rows.map(toPublicFlashcard);
}

export async function replaceFlashcards(userId, cards = []) {
    const validated = requireArray(cards, "Flashcards", { maxLength: MAX_FLASHCARDS_PER_REQUEST }).map(validateClientCard);
    const data = validated.map(card => fromClientCard(userId, card));

    await prisma.$transaction([
        prisma.flashcard.deleteMany({ where: { userId } }),
        prisma.flashcard.createMany({ data })
    ]);

    return data.map(toPublicFlashcard);
}
