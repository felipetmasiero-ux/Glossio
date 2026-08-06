import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { QuizCard } from "./QuizCard";

function buildQuiz(overrides = {}) {
    return {
        question: "What is 'hello'?",
        options: ["Olá", "Tchau"],
        answer: 0,
        explanation: "Hello means olá.",
        ...overrides
    };
}

function answer(index) {
    fireEvent.click(screen.getAllByRole("button")[index]);
    fireEvent.click(screen.getByText("Verificar"));
}

describe("QuizCard", () => {

    it("shows the plain explanation on a correct answer, same as before this feature existed", () => {

        render(<QuizCard quiz={buildQuiz()} onComplete={vi.fn()} />);

        answer(0);

        expect(screen.getByText("Correto!")).not.toBeNull();
        expect(screen.getByText("Hello means olá.")).not.toBeNull();

    });

    it("works with a quiz block that has no feedback field at all - every existing lesson", () => {

        const quiz = buildQuiz();

        expect(quiz.feedback).toBeUndefined();

        render(<QuizCard quiz={quiz} onComplete={vi.fn()} />);

        answer(1);

        expect(screen.getByText("Incorreto")).not.toBeNull();

    });

    it("shows structured feedback appropriate to the outcome when the block has it", () => {

        const quiz = buildQuiz({
            feedback: { hint: "Think of a greeting.", commonMistake: "Common mix-up." }
        });

        render(<QuizCard quiz={quiz} onComplete={vi.fn()} />);

        answer(1);

        expect(screen.getByText("Think of a greeting.")).not.toBeNull();
        expect(screen.getByText("Common mix-up.")).not.toBeNull();

    });

});
