import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

function setupUser() {
    return userEvent.setup({ delay: null });
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

    // Was "does not move focus away from the question ... only once
    // checked" (E3). No longer accurate by design: P2 makes focus follow
    // each token as it moves between bank and strip (a separate DOM
    // subtree for each - the old node is gone, so it has to be redirected
    // explicitly), so it moves well before `checked` becomes true.
    it("moves focus to each token as it's placed, and finally to the result once checked (E3 + P2)", () => {

        const exercise = buildExercise();

        render(<OrderSentenceExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

        const question = screen.getByRole("heading", { name: exercise.prompt });
        expect(document.activeElement).toBe(question);

        fireEvent.click(screen.getByText("This"));

        // Focus followed "This" into the strip - not stuck on <body>, and
        // not left behind on the question either.
        expect(document.activeElement).not.toBe(question);
        expect(document.activeElement.textContent).toBe("This");
        expect(screen.queryByRole("status")).toBeNull();

        fireEvent.click(screen.getByText("is"));
        expect(document.activeElement.textContent).toBe("is");

        fireEvent.click(screen.getByText("a"));
        fireEvent.click(screen.getByText("test"));
        expect(document.activeElement.textContent).toBe("test");

        fireEvent.click(screen.getByText("Verificar"));

        expect(document.activeElement).toBe(screen.getByRole("status"));

    });

    describe("keyboard support (P2)", () => {

        it("every bank token can receive focus directly - the prerequisite Tab relies on", () => {

            const exercise = buildExercise();

            render(<OrderSentenceExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            exercise.payload.tokens.forEach(word => {
                const token = screen.getByText(word);
                token.focus();
                expect(document.activeElement).toBe(token);
            });

        });

        it("Enter moves a focused bank token into the sentence strip", async () => {

            const user = setupUser();
            const exercise = buildExercise();

            render(<OrderSentenceExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            expect(screen.getByText("Toque nas palavras abaixo")).not.toBeNull();

            screen.getByText("This").focus();
            await user.keyboard("{Enter}");

            expect(screen.queryByText("Toque nas palavras abaixo")).toBeNull();
            expect(screen.getByText("This").disabled).toBe(false);

        });

        it("Space moves a focused bank token into the sentence strip", async () => {

            const user = setupUser();
            const exercise = buildExercise();

            render(<OrderSentenceExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            expect(screen.getByText("Toque nas palavras abaixo")).not.toBeNull();

            screen.getByText("This").focus();
            await user.keyboard(" ");

            expect(screen.queryByText("Toque nas palavras abaixo")).toBeNull();

        });

        it("builds a complete, correct sentence using only the keyboard", async () => {

            const user = setupUser();
            const exercise = buildExercise();
            const onComplete = vi.fn();

            render(<OrderSentenceExercise exercise={exercise} onComplete={onComplete} language="english" />);

            for (const word of exercise.payload.correctOrder) {
                screen.getByText(word).focus();
                await user.keyboard("{Enter}");
            }

            screen.getByText("Verificar").focus();
            await user.keyboard("{Enter}");

            expect(screen.getByText("Correto!")).not.toBeNull();

            screen.getByText("Continuar").focus();
            await user.keyboard("{Enter}");

            expect(onComplete).toHaveBeenCalledWith(true);

        });

        it("lets the user remove a placed token via keyboard, sending it back to the bank", async () => {

            const user = setupUser();
            const exercise = buildExercise();

            render(<OrderSentenceExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            screen.getByText("This").focus();
            await user.keyboard("{Enter}");

            // "This" is now in the strip - remove it back to the bank.
            screen.getByText("This").focus();
            await user.keyboard("{Enter}");

            expect(screen.getByText("Toque nas palavras abaixo")).not.toBeNull();

        });

        // The current mechanic has no explicit "reorder" operation - order
        // is entirely a function of click/activation sequence into the
        // strip. There's no drag-and-drop or move-left/right to replicate
        // for keyboard, so "reordering" already reduces to the same
        // remove-then-re-add-in-the-new-order flow available via mouse -
        // this test proves that flow correctly changes the final order via
        // keyboard alone, without inventing a new interaction.
        it("lets the user fix the order via keyboard by removing every token and re-adding them in the right order", async () => {

            const user = setupUser();
            const exercise = buildExercise();
            const onComplete = vi.fn();

            render(<OrderSentenceExercise exercise={exercise} onComplete={onComplete} language="english" />);

            // Wrong order first: is, This, a, test
            for (const word of exercise.payload.tokens) {
                screen.getByText(word).focus();
                await user.keyboard("{Enter}");
            }

            // New tokens are always appended to the end of the strip, so
            // fixing an order with something wrong earlier in the sequence
            // means removing everything back to the bank and re-adding in
            // the right order - there's no other way to reorder with this
            // mechanic, by mouse or by keyboard.
            for (const word of exercise.payload.tokens) {
                screen.getByText(word).focus();
                await user.keyboard("{Enter}"); // strip -> bank
            }

            for (const word of exercise.payload.correctOrder) {
                screen.getByText(word).focus();
                await user.keyboard("{Enter}"); // bank -> strip, in the right order this time
            }

            screen.getByText("Verificar").focus();
            await user.keyboard("{Enter}");

            expect(screen.getByText("Correto!")).not.toBeNull();

            fireEvent.click(screen.getByText("Continuar"));

            expect(onComplete).toHaveBeenCalledWith(true);

        });

        it("reports an incorrect result when the keyboard-built order is wrong", async () => {

            const user = setupUser();
            const exercise = buildExercise();
            const onComplete = vi.fn();

            render(<OrderSentenceExercise exercise={exercise} onComplete={onComplete} language="english" />);

            for (const word of exercise.payload.tokens) {
                screen.getByText(word).focus();
                await user.keyboard("{Enter}");
            }

            screen.getByText("Verificar").focus();
            await user.keyboard("{Enter}");

            expect(screen.getByText("Incorreto")).not.toBeNull();

            fireEvent.click(screen.getByText("Continuar"));

            expect(onComplete).toHaveBeenCalledWith(false);

        });

        it("focus follows the token into its new list after every move, staying coherent throughout", async () => {

            const user = setupUser();
            const exercise = buildExercise();

            render(<OrderSentenceExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            screen.getByText("This").focus();
            await user.keyboard("{Enter}");
            expect(document.activeElement.textContent).toBe("This");
            expect(document.activeElement.disabled).toBe(false);

            screen.getByText("is").focus();
            await user.keyboard("{Enter}");
            expect(document.activeElement.textContent).toBe("is");

            // Remove "This" back to the bank - focus follows it there too.
            screen.getByText("This").focus();
            await user.keyboard("{Enter}");
            expect(document.activeElement.textContent).toBe("This");

        });

        it("does not end the exercise prematurely - Verificar stays disabled until every token is placed", async () => {

            const user = setupUser();
            const exercise = buildExercise();

            render(<OrderSentenceExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            screen.getByText("This").focus();
            await user.keyboard("{Enter}");
            screen.getByText("is").focus();
            await user.keyboard("{Enter}");

            expect(screen.getByRole("button", { name: "Verificar" }).disabled).toBe(true);
            expect(screen.queryByText("Correto!")).toBeNull();
            expect(screen.queryByText("Incorreto")).toBeNull();

        });

        it("mouse interaction still works exactly as before, unaffected by the keyboard additions", () => {

            const exercise = buildExercise();
            const onComplete = vi.fn();

            render(<OrderSentenceExercise exercise={exercise} onComplete={onComplete} language="english" />);

            exercise.payload.correctOrder.forEach(word => fireEvent.click(screen.getByText(word)));
            fireEvent.click(screen.getByText("Verificar"));
            fireEvent.click(screen.getByText("Continuar"));

            expect(onComplete).toHaveBeenCalledWith(true);

        });

    });

});
