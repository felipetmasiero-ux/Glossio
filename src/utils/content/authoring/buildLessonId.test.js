import { describe, expect, it } from "vitest";

import { buildLessonId } from "./buildLessonId";

describe("buildLessonId", () => {

    it("joins language, lowercased level and topic with dashes", () => {
        expect(buildLessonId("english", "A1", "greetings")).toBe("english-a1-greetings");
    });

    it("lowercases the level regardless of how it was typed", () => {
        expect(buildLessonId("french", "a2", "hobbies")).toBe("french-a2-hobbies");
    });

    it("matches the convention used by every real lesson id", () => {
        expect(buildLessonId("portuguese", "A1", "family")).toBe("portuguese-a1-family");
    });

});
