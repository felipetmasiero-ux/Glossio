import { describe, expect, it, vi, afterEach } from "vitest";

import { getOrMigrateEvents, appendEvents } from "./eventService.js";
import { registerUser } from "./authService.js";
import { prisma } from "../config/prisma.js";

function creds(overrides = {}) {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return {
        name: "Event Svc Test",
        email: `eventsvc-${unique}@glossio-tests.local`,
        password: "TestPass123!",
        ...overrides
    };
}

function sampleEvent(overrides = {}) {
    return {
        id: `event-${Math.random().toString(36).slice(2, 8)}`,
        type: "LESSON_COMPLETED",
        payload: { lessonId: "english-a1-family" },
        timestamp: Date.now(),
        ...overrides
    };
}

describe("getOrMigrateEvents", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns an empty list for a brand new user without writing anything", async () => {
        const { user } = await registerUser(creds());

        const result = await getOrMigrateEvents(user.id);

        expect(result).toEqual([]);
    });

    it("migrates legacy userProgress.dashboard.events into real rows exactly once", async () => {
        const { user } = await registerUser(creds());

        // StudyEvent.id is a client-supplied primary key, not auto-generated -
        // sampleEvent() already mints a unique random id per call, since a
        // fixed id would collide across test runs against the same
        // persistent test database.
        const legacyEvents = [sampleEvent(), sampleEvent()];

        await prisma.userProgress.create({
            data: {
                userId: user.id,
                lessonProgress: [],
                exerciseProgress: [],
                flashcards: [],
                studyHistory: [],
                dashboard: { events: legacyEvents },
                videoProgress: {}
            }
        });

        const migrated = await getOrMigrateEvents(user.id);
        expect(migrated).toHaveLength(2);
        expect(migrated.map(event => event.id).sort()).toEqual(legacyEvents.map(event => event.id).sort());

        const progress = await prisma.userProgress.findUnique({ where: { userId: user.id } });
        expect(progress.dashboard.events).toEqual([]);

        const second = await getOrMigrateEvents(user.id);
        expect(second).toHaveLength(2);
    });

    // Performance sprint regression guard (section 9) - same fix/rationale
    // as flashcardService.test.js: a separate count() to decide whether
    // migration is needed is redundant with the findMany() that always ran
    // right after it. Proves the steady-state path is down to one query.
    it("only issues a single studyEvent query when the user already has rows (no count(), no userProgress lookup)", async () => {
        const { user } = await registerUser(creds());

        await appendEvents(user.id, [sampleEvent()]);

        const originalFindMany = prisma.studyEvent.findMany.bind(prisma.studyEvent);

        const countSpy = vi.spyOn(prisma.studyEvent, "count");
        const findManySpy = vi.spyOn(prisma.studyEvent, "findMany").mockImplementation((...args) => originalFindMany(...args));
        const userProgressSpy = vi.spyOn(prisma.userProgress, "findUnique");

        const result = await getOrMigrateEvents(user.id);

        expect(result).toHaveLength(1);
        expect(countSpy).not.toHaveBeenCalled();
        expect(findManySpy).toHaveBeenCalledTimes(1);
        expect(userProgressSpy).not.toHaveBeenCalled();
    });

});

// Security sprint regression guard (section 3): `payload` used to pass
// through completely unvalidated - any type, any size. A malformed event is
// silently dropped (not a hard failure) so one bad entry in a batch never
// costs the rest of it, matching isValidClientEvent's existing behavior for
// a bad id/type.
describe("appendEvents - payload validation", () => {

    it("accepts every real payload shape the app actually logs", async () => {
        const { user } = await registerUser(creds());

        const events = [
            sampleEvent({ payload: { lessonId: "english-a1-family" } }),
            sampleEvent({ payload: { cardId: "card-1", quality: 4 } }),
            sampleEvent({ payload: { videoId: "en-a1-meeting-family" } }),
            sampleEvent({ payload: { question: "What is the capital?", correct: true } })
        ];

        const result = await appendEvents(user.id, events);
        expect(result).toHaveLength(4);
    });

    it("drops an event whose payload is not a plain object", async () => {
        const { user } = await registerUser(creds());

        const events = [
            sampleEvent({ payload: ["not", "an", "object"] }),
            sampleEvent({ payload: "also not an object" }),
            sampleEvent()
        ];

        const result = await appendEvents(user.id, events);
        expect(result).toHaveLength(1);
    });

    it("drops an event whose payload is oversized", async () => {
        const { user } = await registerUser(creds());

        const events = [
            sampleEvent({ payload: { junk: "x".repeat(10_000) } }),
            sampleEvent()
        ];

        const result = await appendEvents(user.id, events);
        expect(result).toHaveLength(1);
    });

});
