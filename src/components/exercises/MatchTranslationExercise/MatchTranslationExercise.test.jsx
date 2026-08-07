import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { MatchTranslationExercise } from "./MatchTranslationExercise";

function buildExercise(overrides = {}) {
    return {
        id: "ex1",
        type: "match-translation",
        prompt: "Associe cada palavra à sua tradução.",
        explanation: null,
        feedback: null,
        payload: {
            pairs: [
                { id: "a", word: "cat", translation: "gato" },
                { id: "b", word: "dog", translation: "cachorro" },
                { id: "c", word: "bird", translation: "pássaro" },
                { id: "d", word: "fish", translation: "peixe" }
            ]
        },
        ...overrides
    };
}

function matchPair(word, translation) {
    fireEvent.click(screen.getByText(word));
    fireEvent.click(screen.getByText(translation));
}

function matchAllCorrectly(pairs) {
    pairs.forEach(pair => matchPair(pair.word, pair.translation));
}

describe("MatchTranslationExercise", () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        act(() => {
            vi.runOnlyPendingTimers();
        });
        vi.useRealTimers();
    });

    it("reports a correct result when every pair is matched without any mistake", () => {

        const exercise = buildExercise();
        const onComplete = vi.fn();

        render(<MatchTranslationExercise exercise={exercise} onComplete={onComplete} language="english" />);

        matchAllCorrectly(exercise.payload.pairs);

        expect(screen.getByText("Correto!")).not.toBeNull();

        fireEvent.click(screen.getByText("Continuar"));

        expect(onComplete).toHaveBeenCalledWith(true);

    });

    it("reports an incorrect result after a single mismatch, even after the user corrects it and finishes", () => {

        const exercise = buildExercise();
        const onComplete = vi.fn();

        render(<MatchTranslationExercise exercise={exercise} onComplete={onComplete} language="english" />);

        // mismatch: "cat" paired with "cachorro" (dog's translation)
        matchPair("cat", "cachorro");

        // user corrects and finishes every pair correctly afterwards
        matchAllCorrectly(exercise.payload.pairs);

        expect(screen.getByText("Incorreto")).not.toBeNull();

        fireEvent.click(screen.getByText("Continuar"));

        expect(onComplete).toHaveBeenCalledWith(false);

    });

    it("reports an incorrect result after multiple mismatches", () => {

        const exercise = buildExercise();
        const onComplete = vi.fn();

        render(<MatchTranslationExercise exercise={exercise} onComplete={onComplete} language="english" />);

        matchPair("cat", "cachorro");
        matchPair("dog", "peixe");
        matchPair("bird", "gato");

        matchAllCorrectly(exercise.payload.pairs);

        expect(screen.getByText("Incorreto")).not.toBeNull();

        fireEvent.click(screen.getByText("Continuar"));

        expect(onComplete).toHaveBeenCalledWith(false);

    });

    it("keeps the mistake record even when the last action before completion is the mismatch itself - no async state race", () => {

        const exercise = buildExercise();
        const onComplete = vi.fn();

        render(<MatchTranslationExercise exercise={exercise} onComplete={onComplete} language="english" />);

        matchPair("cat", "gato");
        matchPair("dog", "cachorro");
        matchPair("bird", "peixe");

        // Immediately (no timer advance, no separate render) complete the
        // last pair right after the mismatch above.
        matchPair("bird", "pássaro");
        matchPair("fish", "peixe");

        fireEvent.click(screen.getByText("Continuar"));

        expect(onComplete).toHaveBeenCalledWith(false);

    });

    it("treats a mismatch as temporary and visual only - user can keep matching, exercise doesn't end early", () => {

        const exercise = buildExercise();
        const onComplete = vi.fn();

        render(<MatchTranslationExercise exercise={exercise} onComplete={onComplete} language="english" />);

        matchPair("cat", "gato");

        matchPair("dog", "peixe");

        const wrongButton = screen.getByText("peixe");
        expect(wrongButton.className).toMatch(/mistake/);

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(wrongButton.className).not.toMatch(/mistake/);

        // exercise did not end after the mismatch or after the timeout
        expect(onComplete).not.toHaveBeenCalled();
        expect(screen.queryByText("Continuar")).toBeNull();

        // remaining pairs still work normally
        matchPair("dog", "cachorro");
        matchPair("bird", "pássaro");
        matchPair("fish", "peixe");

        expect(screen.getByText("Continuar")).not.toBeNull();

    });

    it("does not move focus away from the question while matching pairs, including through a mismatch - only once the attempt is checked (E3)", () => {

        const exercise = buildExercise();

        render(<MatchTranslationExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

        const question = screen.getByRole("heading", { name: exercise.prompt });
        expect(document.activeElement).toBe(question);

        matchPair("cat", "gato");
        expect(document.activeElement).toBe(question);

        matchPair("dog", "peixe"); // mismatch
        expect(document.activeElement).toBe(question);
        expect(screen.queryByRole("status")).toBeNull();

        matchPair("dog", "cachorro");
        matchPair("bird", "pássaro");
        expect(document.activeElement).toBe(question);

        matchPair("fish", "peixe");

        // Only now, with every pair matched, does a result exist to move
        // focus and announce.
        expect(document.activeElement).toBe(screen.getByRole("status"));

    });

});
