import { describe, expect, it } from "vitest";

import { defineModule } from "./defineModule";

describe("defineModule", () => {

    it("derives the id from courseId and level", () => {
        const module = defineModule({
            courseId: "english",
            language: "english",
            level: "A1",
            order: 1,
            title: "English A1",
            lessons: []
        });
        expect(module.id).toBe("english-a1");
    });

    it("defaults description to an empty string", () => {
        const module = defineModule({
            courseId: "english",
            language: "english",
            level: "A1",
            order: 1,
            title: "English A1",
            lessons: []
        });
        expect(module.description).toBe("");
    });

    it("passes through lessons and an explicit description unchanged", () => {
        const lessons = [{ id: "english-a1-greetings" }];
        const module = defineModule({
            courseId: "english",
            language: "english",
            level: "A1",
            order: 1,
            title: "English A1",
            description: "Custom description.",
            lessons
        });
        expect(module.lessons).toBe(lessons);
        expect(module.description).toBe("Custom description.");
    });

});
