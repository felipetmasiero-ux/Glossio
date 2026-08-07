import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("../../common/AudioButton/AudioButton", () => ({
    AudioButton: ({ audio, text, language, onPlay }) => (
        <button
            type="button"
            data-testid="audio-button"
            onClick={onPlay}
            data-audio={JSON.stringify(audio)}
            data-text={text}
            data-language={language}
        >
            Play
        </button>
    )
}));

vi.mock("../../../utils/analytics", () => ({
    trackEvent: vi.fn(),
    ANALYTICS_EVENTS: { LISTENING_AUDIO_PLAYED: "listening_audio_played" }
}));

import { trackEvent } from "../../../utils/analytics";
import { OptionListExercise } from "./OptionListExercise";

function buildMultipleChoiceExercise(overrides = {}) {
    return {
        id: "ex1",
        type: "multiple-choice",
        prompt: "What is 'hello'?",
        explanation: null,
        feedback: null,
        payload: {
            options: ["Olá", "Tchau", "Bom dia", "Boa noite"],
            answerIndex: 0
        },
        ...overrides
    };
}

function buildListeningExercise(overrides = {}) {
    return {
        id: "ex-listening",
        type: "listening",
        prompt: "Ouça o áudio e escolha a frase correta.",
        explanation: "Ela trabalha em um hospital.",
        feedback: null,
        payload: {
            audio: {},
            text: "She works at a hospital.",
            options: [
                "She works at a hospital.",
                "He lives in London.",
                "They study every day.",
                "We eat breakfast at 8am."
            ],
            answerIndex: 0
        },
        ...overrides
    };
}

describe("OptionListExercise", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders the prompt and every option", () => {

        render(<OptionListExercise exercise={buildMultipleChoiceExercise()} onComplete={vi.fn()} language="english" />);

        expect(screen.getByText("What is 'hello'?")).not.toBeNull();
        expect(screen.getByText("Olá")).not.toBeNull();
        expect(screen.getByText("Tchau")).not.toBeNull();

    });

    it("lets the user select an option, check, and reports a correct answer", () => {

        const onComplete = vi.fn();
        render(<OptionListExercise exercise={buildMultipleChoiceExercise()} onComplete={onComplete} language="english" />);

        fireEvent.click(screen.getByText("Olá"));
        fireEvent.click(screen.getByText("Verificar"));

        expect(screen.getByText("Correto!")).not.toBeNull();

        fireEvent.click(screen.getByText("Continuar"));

        expect(onComplete).toHaveBeenCalledWith(true);

    });

    it("reports an incorrect answer", () => {

        const onComplete = vi.fn();
        render(<OptionListExercise exercise={buildMultipleChoiceExercise()} onComplete={onComplete} language="english" />);

        fireEvent.click(screen.getByText("Tchau"));
        fireEvent.click(screen.getByText("Verificar"));

        expect(screen.getByText("Incorreto")).not.toBeNull();

        fireEvent.click(screen.getByText("Continuar"));

        expect(onComplete).toHaveBeenCalledWith(false);

    });

    it("does not render an audio button when the payload has no audio - compatibility with multiple-choice/select-word", () => {

        render(<OptionListExercise exercise={buildMultipleChoiceExercise()} onComplete={vi.fn()} language="english" />);

        expect(screen.queryByTestId("audio-button")).toBeNull();

    });

    it("renders the audio button with the payload's text/language for a listening exercise", () => {

        render(<OptionListExercise exercise={buildListeningExercise()} onComplete={vi.fn()} language="french" />);

        const button = screen.getByTestId("audio-button");
        expect(button.dataset.text).toBe("She works at a hospital.");
        expect(button.dataset.language).toBe("french");

    });

    it("shows the translation as the post-answer explanation for a listening exercise", () => {

        render(<OptionListExercise exercise={buildListeningExercise()} onComplete={vi.fn()} language="english" />);

        fireEvent.click(screen.getByText("She works at a hospital."));
        fireEvent.click(screen.getByText("Verificar"));

        expect(screen.getByText("Ela trabalha em um hospital.")).not.toBeNull();

    });

    it("tracks a play with replay:false the first time and replay:true afterwards", () => {

        render(<OptionListExercise exercise={buildListeningExercise()} onComplete={vi.fn()} language="english" />);

        const button = screen.getByTestId("audio-button");

        fireEvent.click(button);
        expect(trackEvent).toHaveBeenCalledWith("listening_audio_played", {
            language: "english",
            exerciseType: "listening",
            replay: false
        });

        fireEvent.click(button);
        expect(trackEvent).toHaveBeenLastCalledWith("listening_audio_played", {
            language: "english",
            exerciseType: "listening",
            replay: true
        });

    });

    it("resets the play count between exercises (continuing to the next one)", () => {

        const onComplete = vi.fn();
        render(<OptionListExercise exercise={buildListeningExercise()} onComplete={onComplete} language="english" />);

        fireEvent.click(screen.getByTestId("audio-button"));
        fireEvent.click(screen.getByText("She works at a hospital."));
        fireEvent.click(screen.getByText("Verificar"));
        fireEvent.click(screen.getByText("Continuar"));

        expect(onComplete).toHaveBeenCalledWith(true);

    });

});
