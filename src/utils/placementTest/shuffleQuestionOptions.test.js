import { describe, expect, it } from "vitest";

import { shuffleQuestionOptions } from "./shuffleQuestionOptions";

function buildQuestion(overrides = {}) {
    return {
        id: "q1",
        level: "A1",
        type: "vocabulary",
        prompt: "What does 'hello' mean?",
        options: ["olá", "tchau", "obrigado", "por favor"],
        correctIndex: 0,
        ...overrides
    };
}

describe("shuffleQuestionOptions", () => {

    it("keeps correctIndex pointing at the same correct option text after shuffling", () => {

        const question = buildQuestion();

        const shuffled = shuffleQuestionOptions(question);

        expect(shuffled.options[shuffled.correctIndex]).toBe("olá");

    });

    it("keeps the same set of options, just reordered", () => {

        const question = buildQuestion();

        const shuffled = shuffleQuestionOptions(question);

        expect([...shuffled.options].sort()).toEqual([...question.options].sort());
        expect(shuffled.options.length).toBe(question.options.length);

    });

    it("does not mutate the original question", () => {

        const question = buildQuestion();
        const originalOptions = [...question.options];

        shuffleQuestionOptions(question);

        expect(question.options).toEqual(originalOptions);
        expect(question.correctIndex).toBe(0);

    });

    it("preserves every other field on the question unchanged", () => {

        const question = buildQuestion();

        const shuffled = shuffleQuestionOptions(question);

        expect(shuffled.id).toBe(question.id);
        expect(shuffled.level).toBe(question.level);
        expect(shuffled.type).toBe(question.type);
        expect(shuffled.prompt).toBe(question.prompt);

    });

    it("correctly remaps correctIndex when the correct option isn't first", () => {

        const question = buildQuestion({
            options: ["a", "b", "c", "d"],
            correctIndex: 2
        });

        const shuffled = shuffleQuestionOptions(question);

        expect(shuffled.options[shuffled.correctIndex]).toBe("c");

    });

    it("does not always place the correct answer in the same spot across many questions - regression test for the original bug", () => {

        const positions = new Set();

        for (let i = 0; i < 50; i++) {
            const shuffled = shuffleQuestionOptions(buildQuestion());
            positions.add(shuffled.correctIndex);
        }

        expect(positions.size).toBeGreaterThan(1);

    });

});
