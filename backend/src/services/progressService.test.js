import { describe, expect, it } from "vitest";

import { getOrCreateProgress, replaceProgress } from "./progressService.js";
import { registerUser } from "./authService.js";

function creds(overrides = {}) {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return {
        name: "Progress Svc Test",
        email: `progresssvc-${unique}@glossio-tests.local`,
        password: "TestPass123!",
        ...overrides
    };
}

describe("getOrCreateProgress", () => {

    it("creates default progress for a brand new user", async () => {
        const { user } = await registerUser(creds());

        const progress = await getOrCreateProgress(user.id);

        expect(progress.language).toBeNull();
        expect(progress.exerciseProgress).toEqual([]);
        expect(progress.studyHistory).toEqual([]);
        expect(progress.dashboard.goals.dailyLessons).toBeNull();
    });

});

describe("replaceProgress", () => {

    it("accepts normal exerciseProgress, studyHistory, and lastActivity shapes", async () => {
        const { user } = await registerUser(creds());

        const progress = await replaceProgress(user.id, {
            language: "English",
            exerciseProgress: ["english-a1-family", "english-a1-greetings"],
            studyHistory: [{ id: "rec-1", cardId: "card-1", quality: 4, reviewedAt: Date.now() }],
            dashboard: {
                lastActivity: { type: "flashcards", remaining: 3, total: 10 },
                goals: { dailyLessons: 1 }
            }
        });

        expect(progress.exerciseProgress).toEqual(["english-a1-family", "english-a1-greetings"]);
        expect(progress.studyHistory).toHaveLength(1);
        expect(progress.dashboard.lastActivity).toEqual({ type: "flashcards", remaining: 3, total: 10 });
        expect(progress.dashboard.goals.dailyLessons).toBe(1);
    });

    // Security sprint regression guard (section 3): exerciseProgress,
    // studyHistory, and dashboard.lastActivity used to pass straight through
    // as long as the outer shape (array / object-or-null) was right -
    // nothing checked what was *inside*. Every element/field was free to be
    // an arbitrary type or size.
    it("rejects an exerciseProgress entry that isn't a string", async () => {
        const { user } = await registerUser(creds());

        await expect(
            replaceProgress(user.id, { exerciseProgress: [{ lessonId: "english-a1-family" }] })
        ).rejects.toThrow();
    });

    it("rejects an oversized exerciseProgress entry", async () => {
        const { user } = await registerUser(creds());

        await expect(
            replaceProgress(user.id, { exerciseProgress: ["x".repeat(10_000)] })
        ).rejects.toThrow();
    });

    it("rejects a studyHistory record that isn't a plain object", async () => {
        const { user } = await registerUser(creds());

        await expect(
            replaceProgress(user.id, { studyHistory: ["not-an-object"] })
        ).rejects.toThrow();
    });

    it("rejects an oversized studyHistory record", async () => {
        const { user } = await registerUser(creds());

        await expect(
            replaceProgress(user.id, { studyHistory: [{ id: "rec-1", junk: "x".repeat(10_000) }] })
        ).rejects.toThrow();
    });

    it("rejects a lastActivity that isn't a plain object", async () => {
        const { user } = await registerUser(creds());

        await expect(
            replaceProgress(user.id, { dashboard: { lastActivity: "not-an-object" } })
        ).rejects.toThrow();

        await expect(
            replaceProgress(user.id, { dashboard: { lastActivity: ["not", "an", "object"] } })
        ).rejects.toThrow();
    });

    it("accepts a null lastActivity (clearing it)", async () => {
        const { user } = await registerUser(creds());

        const progress = await replaceProgress(user.id, { dashboard: { lastActivity: null } });

        expect(progress.dashboard.lastActivity).toBeNull();
    });

});
