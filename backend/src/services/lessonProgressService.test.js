import { describe, expect, it, vi, afterEach } from "vitest";

import { getOrMigrateLessonProgress, replaceLessonProgress } from "./lessonProgressService.js";
import { registerUser } from "./authService.js";
import { prisma } from "../config/prisma.js";

function creds(overrides = {}) {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return {
        name: "Lesson Progress Svc Test",
        email: `lessonprogresssvc-${unique}@glossio-tests.local`,
        password: "TestPass123!",
        ...overrides
    };
}

describe("getOrMigrateLessonProgress", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns an empty list for a brand new user without writing anything", async () => {
        const { user } = await registerUser(creds());

        const result = await getOrMigrateLessonProgress(user.id);

        expect(result).toEqual([]);
    });

    it("migrates legacy userProgress.lessonProgress into real rows exactly once", async () => {
        const { user } = await registerUser(creds());

        await prisma.userProgress.create({
            data: {
                userId: user.id,
                lessonProgress: ["english-a1-family", "english-a1-greetings"],
                exerciseProgress: [],
                flashcards: [],
                studyHistory: [],
                dashboard: {},
                videoProgress: {}
            }
        });

        const migrated = await getOrMigrateLessonProgress(user.id);
        expect(migrated.sort()).toEqual(["english-a1-family", "english-a1-greetings"]);

        const progress = await prisma.userProgress.findUnique({ where: { userId: user.id } });
        expect(progress.lessonProgress).toEqual([]);

        const second = await getOrMigrateLessonProgress(user.id);
        expect(second).toHaveLength(2);
    });

    // Performance sprint regression guard (section 9) - same fix/rationale
    // as flashcardService.test.js.
    it("only issues a single lessonProgress query when the user already has rows (no count(), no userProgress lookup)", async () => {
        const { user } = await registerUser(creds());

        await replaceLessonProgress(user.id, ["english-a1-family"]);

        const originalFindMany = prisma.lessonProgress.findMany.bind(prisma.lessonProgress);

        const countSpy = vi.spyOn(prisma.lessonProgress, "count");
        const findManySpy = vi.spyOn(prisma.lessonProgress, "findMany").mockImplementation((...args) => originalFindMany(...args));
        const userProgressSpy = vi.spyOn(prisma.userProgress, "findUnique");

        const result = await getOrMigrateLessonProgress(user.id);

        expect(result).toHaveLength(1);
        expect(countSpy).not.toHaveBeenCalled();
        expect(findManySpy).toHaveBeenCalledTimes(1);
        expect(userProgressSpy).not.toHaveBeenCalled();
    });

});
