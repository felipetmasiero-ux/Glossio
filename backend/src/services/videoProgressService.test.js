import { describe, expect, it, vi, afterEach } from "vitest";

import { getOrMigrateVideoProgress, replaceVideoProgress } from "./videoProgressService.js";
import { registerUser } from "./authService.js";
import { prisma } from "../config/prisma.js";

function creds(overrides = {}) {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return {
        name: "Video Progress Svc Test",
        email: `videoprogresssvc-${unique}@glossio-tests.local`,
        password: "TestPass123!",
        ...overrides
    };
}

function sampleEntry(overrides = {}) {
    return {
        videoId: "en-a1-meeting-family",
        language: "English",
        currentTime: 10,
        duration: 350,
        completed: false,
        updatedAt: Date.now(),
        ...overrides
    };
}

describe("getOrMigrateVideoProgress", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns an empty list for a brand new user without writing anything", async () => {
        const { user } = await registerUser(creds());

        const result = await getOrMigrateVideoProgress(user.id);

        expect(result).toEqual([]);
    });

    it("migrates legacy userProgress.videoProgress (nested by language/videoId) into real rows exactly once", async () => {
        const { user } = await registerUser(creds());

        await prisma.userProgress.create({
            data: {
                userId: user.id,
                lessonProgress: [],
                exerciseProgress: [],
                flashcards: [],
                studyHistory: [],
                dashboard: {},
                videoProgress: {
                    English: {
                        "en-a1-meeting-family": { currentTime: 20, duration: 350, completed: false, updatedAt: Date.now() }
                    }
                }
            }
        });

        const migrated = await getOrMigrateVideoProgress(user.id);
        expect(migrated).toHaveLength(1);
        expect(migrated[0].videoId).toBe("en-a1-meeting-family");

        const progress = await prisma.userProgress.findUnique({ where: { userId: user.id } });
        expect(progress.videoProgress).toEqual({});

        const second = await getOrMigrateVideoProgress(user.id);
        expect(second).toHaveLength(1);
    });

    // Performance sprint regression guard (section 9) - same fix/rationale
    // as flashcardService.test.js.
    it("only issues a single videoProgress query when the user already has rows (no count(), no userProgress lookup)", async () => {
        const { user } = await registerUser(creds());

        await replaceVideoProgress(user.id, [sampleEntry()]);

        const originalFindMany = prisma.videoProgress.findMany.bind(prisma.videoProgress);

        const countSpy = vi.spyOn(prisma.videoProgress, "count");
        const findManySpy = vi.spyOn(prisma.videoProgress, "findMany").mockImplementation((...args) => originalFindMany(...args));
        const userProgressSpy = vi.spyOn(prisma.userProgress, "findUnique");

        const result = await getOrMigrateVideoProgress(user.id);

        expect(result).toHaveLength(1);
        expect(countSpy).not.toHaveBeenCalled();
        expect(findManySpy).toHaveBeenCalledTimes(1);
        expect(userProgressSpy).not.toHaveBeenCalled();
    });

});

// Security sprint regression guard (section 3): clickedWords/addedWords used
// to only be checked as *arrays* (type + max length) - every element inside
// was free to be any type, or an arbitrarily large string. Unlike events'
// payload (silently dropped per-event), this whole endpoint validates the
// entire batch up front and rejects it as one HttpError - matching how
// every other field on this same entry (videoId, language, ...) already
// behaves on invalid input.
describe("replaceVideoProgress - clickedWords/addedWords validation", () => {

    it("accepts a normal list of short words", async () => {
        const { user } = await registerUser(creds());

        const result = await replaceVideoProgress(user.id, [
            sampleEntry({ clickedWords: ["casa", "livro"], addedWords: ["carro"] })
        ]);

        expect(result[0].clickedWords).toEqual(["casa", "livro"]);
        expect(result[0].addedWords).toEqual(["carro"]);
    });

    it("rejects a clickedWords entry that isn't a string", async () => {
        const { user } = await registerUser(creds());

        await expect(
            replaceVideoProgress(user.id, [sampleEntry({ clickedWords: [{ word: "casa" }] })])
        ).rejects.toThrow();
    });

    it("rejects an oversized word", async () => {
        const { user } = await registerUser(creds());

        await expect(
            replaceVideoProgress(user.id, [sampleEntry({ clickedWords: ["x".repeat(10_000)] })])
        ).rejects.toThrow();
    });

});
