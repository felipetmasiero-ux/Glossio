import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { OrderSentenceExercise } from "./OrderSentenceExercise";

function buildExercise(overrides = {}) {
    return {
        id: "ex1",
        type: "order-sentence",
        prompt: "Ordene a frase.",
        explanation: null,
        feedback: null,
        payload: {
            tokens: ["is", "This", "a", "test"],
            correctOrder: ["This", "is", "a", "test"]
        },
        ...overrides
    };
}

describe("OrderSentenceExercise", () => {

    it("reports a correct result when the tokens are placed in the right order", () => {

        const exercise = buildExercise();
        const onComplete = vi.fn();

        render(<OrderSentenceExercise exercise={exercise} onComplete={onComplete} language="english" />);

        exercise.payload.correctOrder.forEach(word => fireEvent.click(screen.getByText(word)));
        fireEvent.click(screen.getByText("Verificar"));

        expect(screen.getByText("Correto!")).not.toBeNull();

        fireEvent.click(screen.getByText("Continuar"));

        expect(onComplete).toHaveBeenCalledWith(true);

    });

    it("reports an incorrect result for the wrong order", () => {

        const exercise = buildExercise();
        const onComplete = vi.fn();

        render(<OrderSentenceExercise exercise={exercise} onComplete={onComplete} language="english" />);

        exercise.payload.tokens.forEach(word => fireEvent.click(screen.getByText(word)));
        fireEvent.click(screen.getByText("Verificar"));

        expect(screen.getByText("Incorreto")).not.toBeNull();

        fireEvent.click(screen.getByText("Continuar"));

        expect(onComplete).toHaveBeenCalledWith(false);

    });

    it("does not move focus away from the question while building the sentence - only once checked (E3)", () => {

        const exercise = buildExercise();

        render(<OrderSentenceExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

        const question = screen.getByRole("heading", { name: exercise.prompt });
        expect(document.activeElement).toBe(question);

        fireEvent.click(screen.getByText("This"));
        expect(document.activeElement).toBe(question);
        expect(screen.queryByRole("status")).toBeNull();

        fireEvent.click(screen.getByText("is"));
        fireEvent.click(screen.getByText("a"));
        fireEvent.click(screen.getByText("test"));
        expect(document.activeElement).toBe(question);

        fireEvent.click(screen.getByText("Verificar"));

        expect(document.activeElement).toBe(screen.getByRole("status"));

    });

});
