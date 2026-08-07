import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { ExerciseShell } from "./ExerciseShell";

describe("ExerciseShell", () => {

    it("shows the check button before the answer is checked", () => {

        render(
            <ExerciseShell type="multiple-choice" prompt="Question?" checked={false} correct={false} onCheck={vi.fn()} onContinue={vi.fn()}>
                <div>body</div>
            </ExerciseShell>
        );

        expect(screen.getByText("Verificar")).not.toBeNull();
        expect(screen.queryByText("Correto!")).toBeNull();

    });

    it("shows only the correct/incorrect heading when there is no explanation and no feedback - compatibility with every exercise that has neither", () => {

        render(
            <ExerciseShell type="multiple-choice" prompt="Question?" checked={true} correct={true} onContinue={vi.fn()}>
                <div>body</div>
            </ExerciseShell>
        );

        expect(screen.getByText("Correto!")).not.toBeNull();

    });

    it("shows the plain explanation when that's the only feedback available", () => {

        render(
            <ExerciseShell type="multiple-choice" prompt="Question?" explanation="Hello means olá." checked={true} correct={true} onContinue={vi.fn()}>
                <div>body</div>
            </ExerciseShell>
        );

        expect(screen.getByText("Hello means olá.")).not.toBeNull();

    });

    it("shows structured feedback fields appropriate to the outcome", () => {

        render(
            <ExerciseShell
                type="multiple-choice"
                prompt="Question?"
                explanation="Hello means olá."
                feedback={{ hint: "Think of a greeting.", funFact: "Not shown when wrong." }}
                checked={true}
                correct={false}
                onContinue={vi.fn()}
            >
                <div>body</div>
            </ExerciseShell>
        );

        expect(screen.getByText("Incorreto")).not.toBeNull();
        expect(screen.getByText("Think of a greeting.")).not.toBeNull();
        expect(screen.queryByText("Not shown when wrong.")).toBeNull();

    });

    describe("accessibility - result announcement (E3)", () => {

        it("has no aria-live status region before the answer is checked", () => {

            render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={false} correct={false} onCheck={vi.fn()} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            expect(screen.queryByRole("status")).toBeNull();

        });

        it("exposes the correct result as an aria-live status region once checked", () => {

            render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={true} correct={true} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            const status = screen.getByRole("status");
            expect(status.getAttribute("aria-live")).toBe("polite");
            expect(status.textContent).toContain("Correto!");

        });

        it("exposes the incorrect result as the same aria-live status region", () => {

            render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={true} correct={false} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            const status = screen.getByRole("status");
            expect(status.getAttribute("aria-live")).toBe("polite");
            expect(status.textContent).toContain("Incorreto");

        });

        it("does not create a status region from an intermediate, not-yet-checked interaction", () => {

            const { rerender } = render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={false} correct={false} canCheck={true} onCheck={vi.fn()} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            // Simulates the user having picked an option (canCheck flips true
            // once something is selected) without having checked yet -
            // still no announcement.
            rerender(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={false} correct={false} canCheck={true} onCheck={vi.fn()} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            expect(screen.queryByRole("status")).toBeNull();

        });

    });

    describe("accessibility - focus management (E3)", () => {

        it("focuses the exercise's question when it mounts", () => {

            render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={false} correct={false} onCheck={vi.fn()} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            expect(document.activeElement).toBe(screen.getByRole("heading", { name: "Question?", level: 2 }));

        });

        it("does not move focus to the result while the answer isn't checked yet", () => {

            render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={false} correct={false} canCheck={true} onCheck={vi.fn()} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            // Focus is still on the question (from the mount effect), not
            // anywhere related to a result that doesn't exist yet.
            expect(document.activeElement).toBe(screen.getByRole("heading", { name: "Question?", level: 2 }));
            expect(screen.queryByRole("status")).toBeNull();

        });

        it("moves focus to the result once checked flips from false to true", () => {

            const { rerender } = render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={false} correct={true} onCheck={vi.fn()} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            rerender(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={true} correct={true} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            expect(document.activeElement).toBe(screen.getByRole("status"));

        });

        it("lets Tab naturally reach Continue right after the result, once focus has moved there", () => {

            const { rerender } = render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={false} correct={true} onCheck={vi.fn()} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            rerender(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={true} correct={true} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            const status = screen.getByRole("status");
            const continueButton = screen.getByRole("button", { name: "Continuar" });

            // Both are real (non -1) participants of the DOM in the order
            // that makes Tab from the focused result land on Continue next -
            // the status region itself is only script-focusable (tabIndex
            // -1), it doesn't insert itself into that sequence.
            expect(status.getAttribute("tabIndex")).toBe("-1");
            expect(status.compareDocumentPosition(continueButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

        });

        it("does not steal focus back to the question on every render while already checked", () => {

            const onContinue = vi.fn();

            const { rerender } = render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={true} correct={true} onContinue={onContinue}>
                    <div>body</div>
                </ExerciseShell>
            );

            const status = screen.getByRole("status");
            expect(document.activeElement).toBe(status);

            // Move focus elsewhere (simulating the user tabbing to Continue)
            // and re-render with the same checked=true props (e.g. a parent
            // re-render unrelated to this transition) - focus must not jump
            // back to the result.
            const continueButton = screen.getByRole("button", { name: "Continuar" });
            continueButton.focus();

            rerender(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={true} correct={true} onContinue={onContinue}>
                    <div>body</div>
                </ExerciseShell>
            );

            expect(document.activeElement).toBe(continueButton);

        });

        it("focuses each newly mounted exercise's own question, independent of the previous instance", () => {

            const { unmount } = render(
                <ExerciseShell type="multiple-choice" prompt="First question?" checked={false} correct={false} onCheck={vi.fn()} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            expect(document.activeElement).toBe(screen.getByRole("heading", { name: "First question?" }));

            unmount();

            render(
                <ExerciseShell type="multiple-choice" prompt="Second question?" checked={false} correct={false} onCheck={vi.fn()} onContinue={vi.fn()}>
                    <div>body</div>
                </ExerciseShell>
            );

            expect(document.activeElement).toBe(screen.getByRole("heading", { name: "Second question?" }));

        });

        it("still calls onContinue when Continue is clicked - regression", () => {

            const onContinue = vi.fn();

            render(
                <ExerciseShell type="multiple-choice" prompt="Question?" checked={true} correct={true} onContinue={onContinue}>
                    <div>body</div>
                </ExerciseShell>
            );

            fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

            expect(onContinue).toHaveBeenCalledTimes(1);

        });

    });

});
