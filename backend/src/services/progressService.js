import { prisma } from "../config/prisma.js";

const DEFAULT_PROGRESS = {
    language: null,
    lessonProgress: [],
    exerciseProgress: [],
    flashcards: [],
    studyHistory: [],
    dashboard: { events: [], lastActivity: null },
    videoProgress: {}
};

function toPublicProgress(row) {
    return {
        language: row.language,
        exerciseProgress: row.exerciseProgress,
        studyHistory: row.studyHistory,
        dashboard: { lastActivity: row.dashboard?.lastActivity ?? null },
        updatedAt: row.updatedAt
    };
}

export async function getOrCreateProgress(userId) {
    const existing = await prisma.userProgress.findUnique({ where: { userId } });

    if (existing) {
        return toPublicProgress(existing);
    }

    const created = await prisma.userProgress.create({
        data: { userId, ...DEFAULT_PROGRESS }
    });

    return toPublicProgress(created);
}

export async function replaceProgress(userId, payload = {}) {
    // `dashboard` is a single Json blob, so unlike top-level columns
    // (lessonProgress/flashcards/videoProgress, which are just omitted from
    // `data` below and left untouched by `update`), preserving its
    // `events` sub-field - owned by eventService.js now - requires reading
    // the current row first rather than blindly overwriting the column.
    const existing = await prisma.userProgress.findUnique({ where: { userId } });

    const data = {
        language: payload.language ?? null,
        exerciseProgress: payload.exerciseProgress ?? [],
        studyHistory: payload.studyHistory ?? [],
        dashboard: {
            events: existing?.dashboard?.events ?? [],
            lastActivity: payload.dashboard?.lastActivity ?? null
        }
    };

    const row = await prisma.userProgress.upsert({
        where: { userId },
        update: data,
        create: { userId, flashcards: [], videoProgress: {}, lessonProgress: [], ...data }
    });

    return toPublicProgress(row);
}
