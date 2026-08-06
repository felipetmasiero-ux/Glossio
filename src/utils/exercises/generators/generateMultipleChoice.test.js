import { describe, expect, it } from "vitest";

import { generateMultipleChoice } from "./generateMultipleChoice";

function buildLesson(quizBlockOverrides = {}) {
    return {
        id: "english-a1-greetings",
        blocks: [
            { id: "b1", type: "heading", text: "Hi" },
            {
                id: "b2",
                type: "quiz",
                question: "What is 'hello'?",
                options: ["Olá", "Tchau"],
                answer: 0,
                explanation: "Hello means olá.",
                ...quizBlockOverrides
            }
        ]
    };
}

describe("generateMultipleChoice", () => {

    it("carries the quiz block's explanation through, as before", () => {
        const [exercise] = generateMultipleChoice(buildLesson());
        expect(exercise.explanation).toBe("Hello means olá.");
    });

    it("defaults feedback to null when the quiz block has none - compatibility with every existing lesson", () => {
        const [exercise] = generateMultipleChoice(buildLesson());
        expect(exercise.feedback).toBeNull();
    });

    it("carries the quiz block's feedback object through when present", () => {

        const feedback = { hint: "Think of a greeting.", commonMistake: "People mix these up." };

        const [exercise] = generateMultipleChoice(buildLesson({ feedback }));

        expect(exercise.feedback).toEqual(feedback);

    });

});
