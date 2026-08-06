import { describe, expect, it } from "vitest";

import { validateModule } from "./validateModule";

function buildLesson(id, overrides = {}) {
    return {
        id,
        language: "english",
        level: "A1",
        category: "Basics",
        title: "Lesson",
        description: "Description.",
        objectives: ["Objective"],
        blocks: [{ id: "b1", type: "heading", text: "Hi" }],
        vocabulary: [],
        ...overrides
    };
}

function buildModule(overrides = {}) {
    return {
        id: "english-a1",
        courseId: "english",
        language: "english",
        level: "A1",
        title: "English A1",
        lessons: [
            buildLesson("english-a1-greetings", { order: 1 }),
            buildLesson("english-a1-family", { order: 2 })
        ],
        ...overrides
    };
}

describe("validateModule", () => {

    it("accepts a fully valid module", () => {
        expect(validateModule(buildModule())).toEqual([]);
    });

    it("rejects a non-object module", () => {
        const issues = validateModule(null);
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("error");
    });

    it.each(["id", "courseId", "language", "level", "title"])(
        "flags a missing required field: %s",
        (field) => {
            const issues = validateModule(buildModule({ [field]: "" }));
            expect(issues.some(i => i.message.includes(`"${field}"`))).toBe(true);
        }
    );

    it("flags an invalid CEFR level", () => {
        const issues = validateModule(buildModule({ level: "Z9" }));
        expect(issues.some(i => i.message.includes("Nível"))).toBe(true);
    });

    it("flags a module id that doesn't start with its course id", () => {
        const issues = validateModule(buildModule(), { courseId: "french" });
        expect(issues.some(i => i.category === "id" && i.path === "english-a1")).toBe(true);
    });

    it("flags a module with no lessons", () => {
        const issues = validateModule(buildModule({ lessons: [] }));
        expect(issues.some(i => i.message.includes("sem lições"))).toBe(true);
    });

    it("propagates lesson-level issues, passing the module id down for the id-prefix check", () => {
        const issues = validateModule(buildModule({
            lessons: [buildLesson("french-a1-greetings")]
        }));
        expect(issues.some(i => i.category === "id" && i.message.includes("deveria começar com"))).toBe(true);
    });

    it("flags duplicate lesson ids within the module", () => {
        const issues = validateModule(buildModule({
            lessons: [
                buildLesson("english-a1-greetings"),
                buildLesson("english-a1-greetings")
            ]
        }));
        expect(issues.some(i => i.category === "id" && i.message.includes("lição duplicado"))).toBe(true);
    });

    it("passes each lesson's real array position down for the order check", () => {
        const issues = validateModule(buildModule({
            lessons: [
                buildLesson("english-a1-greetings", { order: 99 })
            ]
        }));
        expect(issues.some(i => i.severity === "warning" && i.message.includes("order"))).toBe(true);
    });

});
