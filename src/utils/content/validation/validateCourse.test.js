import { describe, expect, it } from "vitest";

import { validateCourse } from "./validateCourse";

function buildLesson(id) {
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
        vocabulary: []
    };
}

function buildModule(id, order, overrides = {}) {
    return {
        id,
        courseId: "english",
        language: "english",
        level: "A1",
        order,
        title: id,
        lessons: [buildLesson(`${id}-greetings`)],
        ...overrides
    };
}

function buildCourse(overrides = {}) {
    return {
        id: "english",
        language: "english",
        title: "English",
        modules: [buildModule("english-a1", 1)],
        ...overrides
    };
}

describe("validateCourse", () => {

    it("accepts a fully valid course", () => {
        expect(validateCourse(buildCourse())).toEqual([]);
    });

    it("rejects a non-object course", () => {
        const issues = validateCourse(null);
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("error");
    });

    it.each(["id", "language", "title"])("flags a missing required field: %s", (field) => {
        const issues = validateCourse(buildCourse({ [field]: "" }));
        expect(issues.some(i => i.message.includes(`"${field}"`))).toBe(true);
    });

    it("flags a course with no modules", () => {
        const issues = validateCourse(buildCourse({ modules: [] }));
        expect(issues.some(i => i.message.includes("sem módulos"))).toBe(true);
    });

    it("propagates module-level issues, passing the course id down for the id-prefix check", () => {
        const issues = validateCourse(buildCourse({
            modules: [buildModule("french-a1", 1)]
        }));
        expect(issues.some(i => i.category === "id" && i.message.includes("deveria começar com"))).toBe(true);
    });

    it("flags duplicate module ids within the course", () => {
        const issues = validateCourse(buildCourse({
            modules: [buildModule("english-a1", 1), buildModule("english-a1", 2)]
        }));
        expect(issues.some(i => i.category === "id" && i.message.includes("módulo duplicado"))).toBe(true);
    });

    it("warns about duplicate module order values", () => {
        const issues = validateCourse(buildCourse({
            modules: [buildModule("english-a1", 1), buildModule("english-a2", 1)]
        }));
        expect(issues.some(i => i.severity === "warning" && i.message.includes('"order"'))).toBe(true);
    });

});
