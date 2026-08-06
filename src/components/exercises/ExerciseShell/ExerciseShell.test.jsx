import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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

});
