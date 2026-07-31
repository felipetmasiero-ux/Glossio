import { prisma } from "../config/prisma.js";

function toPublicEvent(row) {
    return {
        id: row.id,
        type: row.type,
        payload: row.payload,
        timestamp: Number(row.createdAt)
    };
}

function fromClientEvent(userId, event) {
    return {
        id: event.id,
        userId,
        type: event.type,
        payload: event.payload ?? {},
        createdAt: BigInt(Math.trunc(event.timestamp ?? Date.now()))
    };
}

export async function getOrMigrateEvents(userId) {
    const existingCount = await prisma.studyEvent.count({ where: { userId } });

    if (existingCount === 0) {
        const progress = await prisma.userProgress.findUnique({ where: { userId } });
        const legacyEvents = Array.isArray(progress?.dashboard?.events) ? progress.dashboard.events : [];

        if (legacyEvents.length > 0) {
            await prisma.$transaction([
                prisma.studyEvent.createMany({
                    data: legacyEvents
                        .filter(event => event?.id && event?.type)
                        .map(event => fromClientEvent(userId, event)),
                    skipDuplicates: true
                }),
                prisma.userProgress.update({
                    where: { userId },
                    data: { dashboard: { ...progress.dashboard, events: [] } }
                })
            ]);
        }
    }

    const rows = await prisma.studyEvent.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" }
    });

    return rows.map(toPublicEvent);
}

export async function appendEvents(userId, events = []) {
    const data = events
        .filter(event => event?.id && event?.type)
        .map(event => fromClientEvent(userId, event));

    if (data.length === 0) return [];

    await prisma.studyEvent.createMany({ data, skipDuplicates: true });

    return data.map(toPublicEvent);
}
