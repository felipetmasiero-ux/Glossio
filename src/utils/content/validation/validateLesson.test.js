import { describe, expect, it } from "vitest";

import { validateLesson } from "./validateLesson";

function buildLesson(overrides = {}) {
    return {
        id: "english-a1-greetings",
        language: "english",
        level: "A1",
        category: "Basics",
        topic: "greetings",
        order: 1,
        title: "Greetings",
        description: "Learn to greet people.",
        objectives: ["Greet people"],
        vocabulary: ["hello", "hi"],
        blocks: [
            { id: "b1", type: "heading", text: "Hello" },
            { id: "b2", type: "paragraph", text: "Some text." }
        ],
        ...overrides
    };
}

describe("validateLesson", () => {

    it("accepts a fully valid lesson", () => {
        expect(validateLesson(buildLesson())).toEqual([]);
    });

    it("rejects a non-object lesson", () => {
        const issues = validateLesson(null);
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("error");
    });

    it.each(["id", "language", "level", "category", "title", "description"])(
        "flags a missing required field: %s",
        (field) => {
            const lesson = buildLesson({ [field]: "" });
            const issues = validateLesson(lesson);
            expect(issues.some(i => i.message.includes(`"${field}"`))).toBe(true);
        }
    );

    it("flags an invalid CEFR level", () => {
        const issues = validateLesson(buildLesson({ level: "Z9" }));
        expect(issues.some(i => i.message.includes("Nível"))).toBe(true);
    });

    it("flags an unsupported language", () => {
        const issues = validateLesson(buildLesson({ language: "klingon" }));
        expect(issues.some(i => i.message.includes("SUPPORTED_LANGUAGES"))).toBe(true);
    });

    it("flags a lesson id that doesn't start with its module id", () => {
        const issues = validateLesson(buildLesson(), { moduleId: "english-a2" });
        expect(issues.some(i => i.category === "id")).toBe(true);
    });

    it("accepts a lesson id that does start with its module id", () => {
        const issues = validateLesson(buildLesson(), { moduleId: "english-a1" });
        expect(issues).toEqual([]);
    });

    it("flags a lesson with no objectives", () => {
        const issues = validateLesson(buildLesson({ objectives: [] }));
        expect(issues.some(i => i.message.includes("objetivos"))).toBe(true);
    });

    it("flags a lesson with no blocks", () => {
        const issues = validateLesson(buildLesson({ blocks: [] }));
        expect(issues.some(i => i.message.includes("blocos"))).toBe(true);
    });

    it("bubbles up block-level issues with an indexed, typed path", () => {
        const issues = validateLesson(buildLesson({
            blocks: [{ id: "b1", type: "heading", text: "" }]
        }));
        expect(issues).toHaveLength(1);
        expect(issues[0].path).toContain("blocks[0]");
        expect(issues[0].path).toContain("heading");
    });

    it("flags duplicate block ids within the same lesson", () => {
        const issues = validateLesson(buildLesson({
            blocks: [
                { id: "dup", type: "heading", text: "A" },
                { id: "dup", type: "paragraph", text: "B" }
            ]
        }));
        expect(issues.some(i => i.category === "id" && i.message.includes("bloco duplicado"))).toBe(true);
    });

    it("flags an empty vocabulary word", () => {
        const issues = validateLesson(buildLesson({ vocabulary: [""] }));
        expect(issues.some(i => i.message.includes("vazia"))).toBe(true);
    });

    it("flags a vocabulary word repeated within the lesson", () => {
        const issues = validateLesson(buildLesson({ vocabulary: ["hello", "Hello"] }));
        expect(issues.some(i => i.message.includes("repetida"))).toBe(true);
    });

    it("flags a vocabulary word missing from the dictionary, when a dictionary is supplied", () => {
        const dictionaryIds = new Set(["hello"]);
        const issues = validateLesson(buildLesson({ vocabulary: ["hello", "goodbye"] }), { dictionaryIds });
        expect(issues.some(i => i.message.includes('"goodbye"') && i.message.includes("dicionário"))).toBe(true);
    });

    it("does not check the dictionary when none is supplied", () => {
        const issues = validateLesson(buildLesson({ vocabulary: ["not-a-real-word"] }));
        expect(issues.some(i => i.message.includes("dicionário"))).toBe(false);
    });

    it("warns about a topic with no TOPIC_LABELS entry", () => {
        const issues = validateLesson(buildLesson({ topic: "not-a-real-topic" }));
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("warning");
    });

    it("warns when order doesn't match the lesson's real position", () => {
        const issues = validateLesson(buildLesson({ order: 5 }), { position: 1 });
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("warning");
    });

    it("does not warn about order when it matches the real position", () => {
        const issues = validateLesson(buildLesson({ order: 1 }), { position: 1 });
        expect(issues).toEqual([]);
    });

});
