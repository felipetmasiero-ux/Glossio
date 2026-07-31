import { prisma } from "../config/prisma.js";

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
    const existingCount = await prisma.videoProgress.count({ where: { userId } });

    if (existingCount === 0) {
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
        }
    }

    const rows = await prisma.videoProgress.findMany({
        where: { userId },
        orderBy: [{ language: "asc" }, { videoId: "asc" }]
    });

    return rows.map(toPublicEntry);
}

export async function replaceVideoProgress(userId, entries = []) {
    const data = entries.map(entry => fromClientEntry(userId, entry));

    await prisma.$transaction([
        prisma.videoProgress.deleteMany({ where: { userId } }),
        prisma.videoProgress.createMany({ data })
    ]);

    return data.map(toPublicEntry);
}
