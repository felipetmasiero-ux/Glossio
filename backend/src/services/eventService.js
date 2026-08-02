import { prisma } from "../config/prisma.js";
import { requireArray } from "../utils/validators.js";

const MAX_EVENTS_PER_REQUEST = 1_000;

// Same "id and type" shape check as before, but now actually requires them
// to be reasonably-sized strings rather than just truthy (a number or a
// 50,000-character type would previously have passed). Malformed events are
// still silently dropped rather than failing the whole batch - this is an
// append-only log fed by small periodic batches, and one bad entry
// shouldn't cost the rest of a legitimate batch.
function isValidClientEvent(event) {
    return (
        typeof event?.id === "string" && event.id.length > 0 && event.id.length <= 100 &&
        typeof event?.type === "string" && event.type.length > 0 && event.type.length <= 100
    );
}

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
    const data = requireArray(events, "Eventos", { maxLength: MAX_EVENTS_PER_REQUEST })
        .filter(isValidClientEvent)
        .map(event => fromClientEvent(userId, event));

    if (data.length === 0) return [];

    await prisma.studyEvent.createMany({ data, skipDuplicates: true });

    return data.map(toPublicEvent);
}
