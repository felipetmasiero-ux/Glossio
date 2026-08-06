import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ExerciseFeedback } from "./ExerciseFeedback";

describe("ExerciseFeedback", () => {

    it("renders nothing when there is neither an explanation nor feedback (compatibility with exercises that have none)", () => {
        const { container } = render(<ExerciseFeedback correct={true} explanation={null} feedback={null} />);
        expect(container.firstChild).toBeNull();
    });

    it("renders just the explanation when that's all there is - today's exact behavior for every non-quiz exercise type", () => {
        render(<ExerciseFeedback correct={true} explanation="Hello means olá." feedback={null} />);
        expect(screen.getByText("Hello means olá.")).not.toBeNull();
        expect(screen.queryByText("Dica para lembrar")).toBeNull();
    });

    it("shows grammarNote and extraExample on a correct answer", () => {

        render(
            <ExerciseFeedback
                correct={true}
                explanation={null}
                feedback={{ grammarNote: "Use the present simple.", extraExample: "She works here too." }}
            />
        );

        expect(screen.getByText("Use the present simple.")).not.toBeNull();
        expect(screen.getByText("She works here too.")).not.toBeNull();

    });

    it("shows a fun fact only on a correct answer", () => {

        const { rerender } = render(
            <ExerciseFeedback correct={true} explanation={null} feedback={{ funFact: "Curious fact." }} />
        );

        expect(screen.getByText("Curious fact.")).not.toBeNull();

        rerender(
            <ExerciseFeedback correct={false} explanation={null} feedback={{ funFact: "Curious fact." }} />
        );

        expect(screen.queryByText("Curious fact.")).toBeNull();

    });

    it("shows hint and commonMistake only on an incorrect answer", () => {

        const { rerender } = render(
            <ExerciseFeedback
                correct={false}
                explanation={null}
                feedback={{ hint: "Remember this trick.", commonMistake: "People often mix these up." }}
            />
        );

        expect(screen.getByText("Remember this trick.")).not.toBeNull();
        expect(screen.getByText("People often mix these up.")).not.toBeNull();

        rerender(
            <ExerciseFeedback
                correct={true}
                explanation={null}
                feedback={{ hint: "Remember this trick.", commonMistake: "People often mix these up." }}
            />
        );

        expect(screen.queryByText("Remember this trick.")).toBeNull();
        expect(screen.queryByText("People often mix these up.")).toBeNull();

    });

    it("shows the explanation together with structured feedback fields", () => {

        render(
            <ExerciseFeedback
                correct={false}
                explanation="Hello means olá."
                feedback={{ hint: "Think of a greeting.", commonMistake: "Common mix-up." }}
            />
        );

        expect(screen.getByText("Hello means olá.")).not.toBeNull();
        expect(screen.getByText("Think of a greeting.")).not.toBeNull();
        expect(screen.getByText("Common mix-up.")).not.toBeNull();

    });

    it("renders a field's plain-string value with no audio button, when it has no audio() reference", () => {

        render(
            <ExerciseFeedback
                correct={false}
                explanation={null}
                feedback={{ hint: "Think of a greeting." }}
                language="english"
            />
        );

        expect(screen.getByText("Think of a greeting.")).not.toBeNull();
        expect(screen.queryByRole("button")).toBeNull();

    });

    it("renders an audio button for a field authored with an audio() reference", () => {

        render(
            <ExerciseFeedback
                correct={false}
                explanation={null}
                feedback={{ hint: { text: "Think of a greeting.", audio: { file: "/audio/hint.mp3" } } }}
                language="english"
            />
        );

        expect(screen.getByText("Think of a greeting.")).not.toBeNull();
        expect(screen.getByRole("button", { name: "Reproduzir áudio" })).not.toBeNull();

    });

});
