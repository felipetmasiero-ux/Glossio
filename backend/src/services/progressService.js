import { prisma } from "../config/prisma.js";
import { optionalString, optionalPositiveNumber, requireArray } from "../utils/validators.js";

const DEFAULT_GOALS = {
    dailyLessons: null,
    dailyReviews: null,
    dailyVideoMinutes: null,
    weeklyMinutes: null,
    weeklyLessons: null
};

// Every goal is either unset (null) or a positive number within a sane
// ceiling - matches the sprint's "Goals: somente números positivos" rule.
function validateGoals(goals = {}) {
    return {
        dailyLessons: optionalPositiveNumber(goals.dailyLessons, "Meta diária de lições", { max: 100 }),
        dailyReviews: optionalPositiveNumber(goals.dailyReviews, "Meta diária de revisões", { max: 10_000 }),
        dailyVideoMinutes: optionalPositiveNumber(goals.dailyVideoMinutes, "Meta diária de minutos de vídeo", { max: 1_440 }),
        weeklyMinutes: optionalPositiveNumber(goals.weeklyMinutes, "Meta semanal de minutos", { max: 10_080 }),
        weeklyLessons: optionalPositiveNumber(goals.weeklyLessons, "Meta semanal de lições", { max: 700 })
    };
}

const DEFAULT_PROGRESS = {
    language: null,
    lessonProgress: [],
    exerciseProgress: [],
    flashcards: [],
    studyHistory: [],
    dashboard: { events: [], lastActivity: null, goals: DEFAULT_GOALS },
    videoProgress: {}
};

function toPublicProgress(row) {
    return {
        language: row.language,
        exerciseProgress: row.exerciseProgress,
        studyHistory: row.studyHistory,
        dashboard: {
            lastActivity: row.dashboard?.lastActivity ?? null,
            goals: row.dashboard?.goals ?? DEFAULT_GOALS
        },
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
        language: optionalString(payload.language, "Idioma", { max: 50 }),
        exerciseProgress: requireArray(payload.exerciseProgress ?? [], "Progresso de exercícios", { maxLength: 5_000 }),
        studyHistory: requireArray(payload.studyHistory ?? [], "Histórico de estudo", { maxLength: 5_000 }),
        dashboard: {
            events: existing?.dashboard?.events ?? [],
            lastActivity: payload.dashboard?.lastActivity ?? null,
            goals: validateGoals(payload.dashboard?.goals)
        }
    };

    const row = await prisma.userProgress.upsert({
        where: { userId },
        update: data,
        create: { userId, flashcards: [], videoProgress: {}, lessonProgress: [], ...data }
    });

    return toPublicProgress(row);
}
