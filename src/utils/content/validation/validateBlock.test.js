import { describe, expect, it } from "vitest";

import { validateBlock } from "./validateBlock";

function severities(issues) {
    return issues.map(issue => issue.severity);
}

describe("validateBlock", () => {

    it("flags a non-object block", () => {
        const issues = validateBlock(null, "lesson.blocks[0]");
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("error");
    });

    it("flags an unknown block type", () => {
        const issues = validateBlock({ id: "1", type: "carousel" }, "lesson.blocks[0]");
        expect(issues).toHaveLength(1);
        expect(issues[0].message).toContain("carousel");
    });

    it.each(["heading", "paragraph", "quote"])("accepts a valid %s block", (type) => {
        const issues = validateBlock({ id: "1", type, text: "Hello" }, "path");
        expect(issues).toEqual([]);
    });

    it.each(["heading", "paragraph", "quote"])("flags a %s block with empty text", (type) => {
        const issues = validateBlock({ id: "1", type, text: "  " }, "path");
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("error");
    });

    it.each(["tip", "grammar", "culture"])("accepts a valid %s block", (type) => {
        const issues = validateBlock({ id: "1", type, title: "Title", text: "Text" }, "path");
        expect(issues).toEqual([]);
    });

    it.each(["tip", "grammar", "culture"])("flags a %s block missing title or text", (type) => {
        expect(validateBlock({ id: "1", type, text: "Text" }, "path")).toHaveLength(1);
        expect(validateBlock({ id: "1", type, title: "Title" }, "path")).toHaveLength(1);
    });

    it("accepts a valid example block", () => {
        const issues = validateBlock({
            id: "1",
            type: "example",
            examples: [{ text: "Hi!", translation: "Oi!" }]
        }, "path");
        expect(issues).toEqual([]);
    });

    it("requires at least one example", () => {
        const issues = validateBlock({ id: "1", type: "example", examples: [] }, "path");
        expect(issues).toHaveLength(1);
        expect(issues[0].severity).toBe("error");
    });

    it("warns (not errors) about a missing translation on an example", () => {
        const issues = validateBlock({
            id: "1",
            type: "example",
            examples: [{ text: "Hi!" }]
        }, "path");
        expect(severities(issues)).toEqual(["warning"]);
    });

    it("accepts a valid dialogue block and flags missing speaker/text", () => {

        expect(validateBlock({
            id: "1",
            type: "dialogue",
            lines: [{ speaker: "Ana", text: "Oi!" }]
        }, "path")).toEqual([]);

        const issues = validateBlock({
            id: "1",
            type: "dialogue",
            lines: [{ speaker: "", text: "" }]
        }, "path");

        expect(issues).toHaveLength(2);

    });

    it("accepts a valid list block and flags empty items", () => {

        expect(validateBlock({ id: "1", type: "list", items: ["a", "b"] }, "path")).toEqual([]);

        expect(validateBlock({ id: "1", type: "list", items: ["a", ""] }, "path")).toHaveLength(1);

        expect(validateBlock({ id: "1", type: "list", items: [] }, "path")).toHaveLength(1);

    });

    it("accepts a valid step block and flags a missing title", () => {
        expect(validateBlock({ id: "1", type: "step", title: "Step 1" }, "path")).toEqual([]);
        expect(validateBlock({ id: "1", type: "step", title: "" }, "path")).toHaveLength(1);
    });

    describe("quiz block", () => {

        const validQuiz = {
            id: "1",
            type: "quiz",
            question: "What is 'hello'?",
            options: ["Olá", "Tchau", "Obrigado"],
            answer: 0,
            explanation: "Hello means olá."
        };

        it("accepts a fully valid quiz", () => {
            expect(validateBlock(validQuiz, "path")).toEqual([]);
        });

        it("requires a non-empty question", () => {
            const issues = validateBlock({ ...validQuiz, question: "" }, "path");
            expect(issues.some(i => i.message.includes("question"))).toBe(true);
        });

        it("requires at least 2 options", () => {
            const issues = validateBlock({ ...validQuiz, options: ["only one"] }, "path");
            expect(issues[0].severity).toBe("error");
        });

        it("flags an out-of-range answer index", () => {
            const issues = validateBlock({ ...validQuiz, answer: 5 }, "path");
            expect(issues.some(i => i.message.includes("fora do intervalo"))).toBe(true);
        });

        it("flags a negative answer index", () => {
            const issues = validateBlock({ ...validQuiz, answer: -1 }, "path");
            expect(issues.some(i => i.message.includes("fora do intervalo"))).toBe(true);
        });

        it("flags duplicate options", () => {
            const issues = validateBlock({ ...validQuiz, options: ["Olá", "olá", "Tchau"] }, "path");
            expect(issues.some(i => i.message.includes("duplicadas"))).toBe(true);
        });

        it("warns (not errors) about a missing explanation", () => {
            const { explanation, ...withoutExplanation } = validQuiz;
            void explanation;
            const issues = validateBlock(withoutExplanation, "path");
            expect(severities(issues)).toEqual(["warning"]);
        });

        it("warns when there are more than 6 options", () => {
            const issues = validateBlock({
                ...validQuiz,
                options: ["a", "b", "c", "d", "e", "f", "g"],
                answer: 0
            }, "path");
            expect(issues.some(i => i.severity === "warning" && i.message.includes("rotula"))).toBe(true);
        });

    });

});
