import { prisma } from "../config/prisma.js";
import { requireString, requireNumber, requireArray, requireStringArray, requireTimestamp } from "../utils/validators.js";

const MAX_VIDEO_PROGRESS_ENTRIES = 5_000;
const MAX_WORD_LIST_LENGTH = 2_000;
const MAX_WORD_LENGTH = 200;

// Only applied to real client input (PUT /video-progress) - same reasoning
// as flashcardService's validateClientCard: the legacy-migration path below
// reads a user's own already-stored data and stays lenient on purpose.
function validateClientEntry(entry) {
    return {
        videoId: requireString(entry?.videoId, "ID do vídeo", { min: 1, max: 200 }),
        language: requireString(entry?.language, "Idioma", { min: 1, max: 50 }),
        currentTime: requireNumber(entry?.currentTime ?? 0, "Tempo atual", { min: 0, max: 100_000 }),
        duration: requireNumber(entry?.duration ?? 0, "Duração", { min: 0, max: 100_000 }),
        completed: Boolean(entry?.completed),
        completedAt: entry?.completedAt == null ? null : requireTimestamp(entry.completedAt, "Data de conclusão"),
        updatedAt: requireTimestamp(entry?.updatedAt ?? Date.now(), "Data de atualização"),
        // Each entry is meant to be a single normalized word - requireArray
        // alone only checked the list's length, not what was inside it,
        // leaving every element free to be an arbitrarily large string (or
        // any type at all).
        clickedWords: requireStringArray(entry?.clickedWords ?? [], "Palavras clicadas", { maxLength: MAX_WORD_LIST_LENGTH, maxItemLength: MAX_WORD_LENGTH }),
        addedWords: requireStringArray(entry?.addedWords ?? [], "Palavras adicionadas", { maxLength: MAX_WORD_LIST_LENGTH, maxItemLength: MAX_WORD_LENGTH })
    };
}

function toPublicEntry(row) {
    return {
        videoId: row.videoId,
        language: row.language,
        currentTime: row.currentTime,
        duration: row.duration,
        completed: row.completed,
        completedAt: row.completedAt === null ? null : Number(row.completedAt),
        updatedAt: Number(row.lastWatchedAt),
        clickedWords: row.clickedWords,
        addedWords: row.addedWords
    };
}

function fromClientEntry(userId, entry) {
    return {
        userId,
        videoId: entry.videoId,
        language: entry.language,
        currentTime: entry.currentTime ?? 0,
        duration: entry.duration ?? 0,
        completed: Boolean(entry.completed),
        completedAt: entry.completedAt == null ? null : BigInt(Math.trunc(entry.completedAt)),
        lastWatchedAt: BigInt(Math.trunc(entry.updatedAt ?? Date.now())),
        clickedWords: entry.clickedWords ?? [],
        addedWords: entry.addedWords ?? []
    };
}

function flattenLegacyVideoProgress(legacy) {
    const entries = [];

    if (!legacy || typeof legacy !== "object") {
        return entries;
    }

    for (const language of Object.keys(legacy)) {
        const videos = legacy[language];
        if (!videos || typeof videos !== "object") continue;

        for (const videoId of Object.keys(videos)) {
            entries.push({ ...videos[videoId], language, videoId });
        }
    }

    return entries;
}

export async function getOrMigrateVideoProgress(userId) {
    // Same fix as flashcardService.getOrMigrateFlashcards: read the real
    // rows first instead of a separate count() just to decide whether
    // migration is needed, since the steady state (already migrated) is
    // nearly every request after the first.
    let rows = await prisma.videoProgress.findMany({
        where: { userId },
        orderBy: [{ language: "asc" }, { videoId: "asc" }]
    });

    if (rows.length === 0) {
        const progress = await prisma.userProgress.findUnique({ where: { userId } });
        const legacyEntries = flattenLegacyVideoProgress(progress?.videoProgress);

        if (legacyEntries.length > 0) {
            await prisma.$transaction([
                prisma.videoProgress.createMany({
                    data: legacyEntries.map(entry => fromClientEntry(userId, entry))
                }),
                prisma.userProgress.update({
                    where: { userId },
                    data: { videoProgress: {} }
                })
            ]);

            rows = await prisma.videoProgress.findMany({
                where: { userId },
                orderBy: [{ language: "asc" }, { videoId: "asc" }]
            });
        }
    }

    return rows.map(toPublicEntry);
}

export async function replaceVideoProgress(userId, entries = []) {
    const validated = requireArray(entries, "Progresso de vídeo", { maxLength: MAX_VIDEO_PROGRESS_ENTRIES }).map(validateClientEntry);
    const data = validated.map(entry => fromClientEntry(userId, entry));

    await prisma.$transaction([
        prisma.videoProgress.deleteMany({ where: { userId } }),
        prisma.videoProgress.createMany({ data })
    ]);

    return data.map(toPublicEntry);
}
