import { describe, expect, it } from "vitest";

import { defineLesson } from "./defineLesson";

function minimalLessonInput(overrides = {}) {
    return {
        language: "english",
        level: "A1",
        topic: "greetings",
        category: "Basics",
        order: 1,
        title: "Greetings",
        subtitle: "Say hello.",
        description: "Learn to greet people.",
        objectives: ["Greet people"],
        blocks: [{ id: "b1", type: "heading", text: "Hi" }],
        summary: { tip: "Tip", review: ["Point 1"] },
        ...overrides
    };
}

describe("defineLesson", () => {

    it("derives the id from language, level and topic", () => {
        const lesson = defineLesson(minimalLessonInput());
        expect(lesson.id).toBe("english-a1-greetings");
    });

    it("passes through every authored field", () => {
        const lesson = defineLesson(minimalLessonInput());
        expect(lesson.title).toBe("Greetings");
        expect(lesson.description).toBe("Learn to greet people.");
        expect(lesson.objectives).toEqual(["Greet people"]);
        expect(lesson.blocks).toHaveLength(1);
    });

    it("fills in sensible defaults for optional fields", () => {
        const lesson = defineLesson(minimalLessonInput());
        expect(lesson.cover).toBeNull();
        expect(lesson.estimatedTime).toBe(8);
        expect(lesson.difficulty).toBe(1);
        expect(lesson.xp).toBe(25);
        expect(lesson.tags).toEqual([]);
        expect(lesson.skills).toEqual([]);
        expect(lesson.vocabulary).toEqual([]);
    });

    it("lets every default be overridden", () => {
        const lesson = defineLesson(minimalLessonInput({
            cover: "/covers/x.webp",
            estimatedTime: 12,
            difficulty: 2,
            xp: 40,
            tags: ["a"],
            skills: ["reading"],
            vocabulary: ["hello"]
        }));
        expect(lesson.cover).toBe("/covers/x.webp");
        expect(lesson.estimatedTime).toBe(12);
        expect(lesson.difficulty).toBe(2);
        expect(lesson.xp).toBe(40);
        expect(lesson.tags).toEqual(["a"]);
        expect(lesson.skills).toEqual(["reading"]);
        expect(lesson.vocabulary).toEqual(["hello"]);
    });

});
