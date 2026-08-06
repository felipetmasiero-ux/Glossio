import { describe, expect, it } from "vitest";

import { validateContent } from "./validateContent";

function buildLesson(id, vocabulary = []) {
    return {
        id,
        language: "english",
        level: "A1",
        category: "Basics",
        title: "Lesson",
        description: "Description.",
        order: 1,
        objectives: ["Objective"],
        blocks: [{ id: "b1", type: "heading", text: "Hi" }],
        vocabulary
    };
}

function buildCourse(language, courseId, moduleId, lessonId, vocabulary = []) {
    return {
        id: courseId,
        language,
        title: courseId,
        modules: [{
            id: moduleId,
            courseId,
            language,
            level: "A1",
            order: 1,
            title: moduleId,
            lessons: [buildLesson(lessonId, vocabulary)]
        }]
    };
}

describe("validateContent", () => {

    it("accepts fully valid, self-consistent content across languages", () => {

        const courses = {
            english: buildCourse("english", "english", "english-a1", "english-a1-greetings", ["hello"]),
            french: buildCourse("french", "french", "french-a1", "french-a1-greetings", ["bonjour"])
        };

        const dictionaries = {
            english: [{ id: "hello", word: "hello", translation: "olá" }],
            french: [{ id: "bonjour", word: "bonjour", translation: "olá" }]
        };

        expect(validateContent({ courses, dictionaries })).toEqual([]);

    });

    it("cross-checks vocabulary against the matching language's dictionary", () => {

        const courses = {
            english: buildCourse("english", "english", "english-a1", "english-a1-greetings", ["hello", "goodbye"])
        };

        const dictionaries = {
            english: [{ id: "hello", word: "hello", translation: "olá" }]
        };

        const issues = validateContent({ courses, dictionaries });

        expect(issues.some(i => i.category === "vocabulary" && i.message.includes("goodbye"))).toBe(true);

    });

    it("flags a course id reused across two different languages", () => {

        const courses = {
            english: buildCourse("english", "shared-id", "english-a1", "english-a1-greetings"),
            french: buildCourse("french", "shared-id", "french-a1", "french-a1-greetings")
        };

        const issues = validateContent({ courses, dictionaries: {} });

        expect(issues.some(i => i.category === "id" && i.message.includes("curso duplicado"))).toBe(true);

    });

    it("flags a module id reused across two different courses", () => {

        const courses = {
            english: buildCourse("english", "english", "shared-module", "english-a1-greetings"),
            french: buildCourse("french", "french", "shared-module", "french-a1-greetings")
        };

        const issues = validateContent({ courses, dictionaries: {} });

        expect(issues.some(i => i.category === "id" && i.message.includes("módulo duplicado globalmente"))).toBe(true);

    });

    it("flags a lesson id reused across two different modules", () => {

        const courses = {
            english: buildCourse("english", "english", "english-a1", "shared-lesson"),
            french: buildCourse("french", "french", "french-a1", "shared-lesson")
        };

        const issues = validateContent({ courses, dictionaries: {} });

        expect(issues.some(i => i.category === "id" && i.message.includes("lição duplicado globalmente"))).toBe(true);

    });

    it("still surfaces per-course structural issues (not just the global id checks)", () => {

        const courses = {
            english: { id: "english", language: "english", title: "English", modules: [] }
        };

        const issues = validateContent({ courses, dictionaries: {} });

        expect(issues.some(i => i.message.includes("sem módulos"))).toBe(true);

    });

    it("still surfaces dictionary issues", () => {

        const courses = {
            english: buildCourse("english", "english", "english-a1", "english-a1-greetings")
        };

        const dictionaries = {
            english: [{ word: "hello" }]
        };

        const issues = validateContent({ courses, dictionaries });

        expect(issues.some(i => i.category === "dictionary" && i.message.includes("translation"))).toBe(true);

    });

});
