import { describe, expect, it, vi, afterEach } from "vitest";

import { getOrMigrateFlashcards, replaceFlashcards } from "./flashcardService.js";
import { registerUser } from "./authService.js";
import { prisma } from "../config/prisma.js";

// Exercises against the real database, same pattern as authService.test.js.
function creds(overrides = {}) {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return {
        name: "Flashcard Svc Test",
        email: `flashcardsvc-${unique}@glossio-tests.local`,
        password: "TestPass123!",
        ...overrides
    };
}

function sampleCard(overrides = {}) {
    const now = Date.now();
    return {
        id: `card-${Math.random().toString(36).slice(2, 8)}`,
        word: "casa",
        translation: "house",
        language: "Portuguese",
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        createdAt: now,
        updatedAt: now,
        nextReview: now,
        ...overrides
    };
}

describe("getOrMigrateFlashcards", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns an empty list for a brand new user without writing anything", async () => {
        const { user } = await registerUser(creds());

        const result = await getOrMigrateFlashcards(user.id);

        expect(result).toEqual([]);
    });

    it("migrates legacy userProgress.flashcards into real rows exactly once", async () => {
        const { user } = await registerUser(creds());

        // Flashcard.id is a client-supplied primary key, not auto-generated -
        // sampleCard() already mints a unique random id per call, since a
        // fixed id would collide across test runs against the same
        // persistent test database.
        const legacyCards = [sampleCard(), sampleCard()];

        await prisma.userProgress.create({
            data: {
                userId: user.id,
                lessonProgress: [],
                exerciseProgress: [],
                flashcards: legacyCards,
                studyHistory: [],
                dashboard: {},
                videoProgress: {}
            }
        });

        const migrated = await getOrMigrateFlashcards(user.id);
        expect(migrated).toHaveLength(2);
        expect(migrated.map(card => card.id).sort()).toEqual(legacyCards.map(card => card.id).sort());

        // Legacy blob should be cleared so it isn't re-migrated on the next call.
        const progress = await prisma.userProgress.findUnique({ where: { userId: user.id } });
        expect(progress.flashcards).toEqual([]);

        // Calling again must not duplicate the migrated rows.
        const second = await getOrMigrateFlashcards(user.id);
        expect(second).toHaveLength(2);
    });

    // Performance sprint regression guard (section 9): this used to run a
    // separate count() purely to decide whether migration was needed, then
    // *always* ran findMany() right after - 2 queries per read, even in the
    // steady state where a user already has rows (nearly every request,
    // after the first). It's now a single findMany() unless that comes back
    // empty. This proves the steady-state path no longer touches count() or
    // userProgress at all.
    it("only issues a single flashcard query when the user already has rows (no count(), no userProgress lookup)", async () => {
        const { user } = await registerUser(creds());

        await replaceFlashcards(user.id, [sampleCard()]);

        const originalFindMany = prisma.flashcard.findMany.bind(prisma.flashcard);

        const countSpy = vi.spyOn(prisma.flashcard, "count");
        const findManySpy = vi.spyOn(prisma.flashcard, "findMany").mockImplementation((...args) => originalFindMany(...args));
        const userProgressSpy = vi.spyOn(prisma.userProgress, "findUnique");

        const result = await getOrMigrateFlashcards(user.id);

        expect(result).toHaveLength(1);
        expect(countSpy).not.toHaveBeenCalled();
        expect(findManySpy).toHaveBeenCalledTimes(1);
        expect(userProgressSpy).not.toHaveBeenCalled();
    });

});
