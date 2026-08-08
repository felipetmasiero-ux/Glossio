import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

// `delay: null` keeps user-event synchronous. It also needs real timers to
// resolve its own internal promises - see the "keyboard support" describe
// block below, which switches away from this file's fake timers for that
// reason (they're only needed for the mistake-shake timeout tests).
function setupUser() {
    return userEvent.setup({ delay: null });
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

    // Was "does not move focus away from the question ... only once the
    // attempt is checked" (E3). That assumption no longer holds by design:
    // P2 explicitly moves focus to the next word right after a correct
    // match, so a keyboard user isn't dropped to <body> once the button
    // they just activated becomes disabled. A mismatch still doesn't touch
    // focus at all (nothing gets disabled), so that part is unchanged.
    it("keeps focus on the question through a mismatch, moves it forward on a correct match, and to the result once fully checked (E3 + P2)", () => {

        const exercise = buildExercise();

        render(<MatchTranslationExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

        const question = screen.getByRole("heading", { name: exercise.prompt });
        expect(document.activeElement).toBe(question);

        matchPair("dog", "peixe"); // mismatch - nothing is disabled, focus untouched
        expect(document.activeElement).toBe(question);
        expect(screen.queryByRole("status")).toBeNull();

        matchPair("cat", "gato"); // correct - "gato" is now disabled
        expect(document.activeElement).not.toBe(question);
        expect(document.activeElement.tagName).toBe("BUTTON");
        expect(document.activeElement.disabled).toBe(false);
        expect(["dog", "bird", "fish"]).toContain(document.activeElement.textContent);

        matchPair("dog", "cachorro");
        matchPair("bird", "pássaro");
        matchPair("fish", "peixe");

        // Only now, with every pair matched, does a result exist to move
        // focus and announce - ExerciseShell's own behavior, untouched.
        expect(document.activeElement).toBe(screen.getByRole("status"));

    });

    describe("keyboard support (P2)", () => {

        // user-event's internal event loop needs real timers to resolve its
        // own promises - the outer describe's fake timers (for the 500ms
        // mistake-shake reset) would otherwise hang every `await user...`
        // call here forever. None of these tests exercise that timeout.
        beforeEach(() => {
            vi.useRealTimers();
        });

        afterEach(() => {
            vi.useFakeTimers();
        });

        it("every word and translation button can receive focus directly - the prerequisite Tab relies on", () => {

            const exercise = buildExercise();

            render(<MatchTranslationExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            exercise.payload.pairs.forEach(pair => {

                const wordButton = screen.getByText(pair.word);
                wordButton.focus();
                expect(document.activeElement).toBe(wordButton);

                const translationButton = screen.getByText(pair.translation);
                translationButton.focus();
                expect(document.activeElement).toBe(translationButton);

            });

        });

        it("Enter selects a focused word", async () => {

            const user = setupUser();
            const exercise = buildExercise();

            render(<MatchTranslationExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            const catButton = screen.getByText("cat");
            catButton.focus();
            await user.keyboard("{Enter}");

            expect(catButton.getAttribute("aria-pressed")).toBe("true");
            expect(catButton.className).toMatch(/selected/);

        });

        it("Space selects a focused word", async () => {

            const user = setupUser();
            const exercise = buildExercise();

            render(<MatchTranslationExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            const catButton = screen.getByText("cat");
            catButton.focus();
            await user.keyboard(" ");

            expect(catButton.getAttribute("aria-pressed")).toBe("true");
            expect(catButton.className).toMatch(/selected/);

        });

        it("lets the corresponding translation be selected via keyboard right after the word, forming a correct pair with no mouse", async () => {

            const user = setupUser();
            const exercise = buildExercise();

            render(<MatchTranslationExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            screen.getByText("cat").focus();
            await user.keyboard("{Enter}");

            screen.getByText("gato").focus();
            await user.keyboard("{Enter}");

            expect(screen.getByText("cat").disabled).toBe(true);
            expect(screen.getByText("gato").disabled).toBe(true);

        });

        it("a mismatch formed entirely via keyboard behaves the same as a mouse mismatch - temporary, exercise keeps going", async () => {

            const user = setupUser();
            const exercise = buildExercise();
            const onComplete = vi.fn();

            render(<MatchTranslationExercise exercise={exercise} onComplete={onComplete} language="english" />);

            screen.getByText("cat").focus();
            await user.keyboard("{Enter}");

            screen.getByText("cachorro").focus(); // dog's translation, not cat's
            await user.keyboard(" ");

            expect(screen.getByText("cachorro").className).toMatch(/mistake/);
            expect(screen.queryByText("Continuar")).toBeNull();
            expect(onComplete).not.toHaveBeenCalled();

        });

        it("a pair already matched cannot be re-selected via keyboard - it's removed from the tab order", async () => {

            const exercise = buildExercise();

            render(<MatchTranslationExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            matchPair("cat", "gato");

            const catButton = screen.getByText("cat");
            expect(catButton.disabled).toBe(true);

            catButton.focus();

            expect(document.activeElement).not.toBe(catButton);

        });

        it("focus lands on the next unmatched word right after a correct keyboard match", async () => {

            const user = setupUser();
            const exercise = buildExercise();

            render(<MatchTranslationExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            screen.getByText("cat").focus();
            await user.keyboard("{Enter}");

            screen.getByText("gato").focus();
            await user.keyboard("{Enter}");

            expect(document.activeElement.tagName).toBe("BUTTON");
            expect(document.activeElement.disabled).toBe(false);
            expect(["dog", "bird", "fish"]).toContain(document.activeElement.textContent);

        });

        it("completes the whole exercise using only the keyboard, and Continue reports the correct result", async () => {

            const user = setupUser();
            const exercise = buildExercise();
            const onComplete = vi.fn();

            render(<MatchTranslationExercise exercise={exercise} onComplete={onComplete} language="english" />);

            for (const pair of exercise.payload.pairs) {

                screen.getByText(pair.word).focus();
                await user.keyboard("{Enter}");

                screen.getByText(pair.translation).focus();
                await user.keyboard("{Enter}");

            }

            expect(screen.getByText("Correto!")).not.toBeNull();

            screen.getByText("Continuar").focus();
            await user.keyboard("{Enter}");

            expect(onComplete).toHaveBeenCalledWith(true);

        });

        it("the exercise does not end prematurely - Continuar only appears once every pair is matched", () => {

            const exercise = buildExercise();

            render(<MatchTranslationExercise exercise={exercise} onComplete={vi.fn()} language="english" />);

            matchPair("cat", "gato");
            matchPair("dog", "cachorro");

            expect(screen.queryByText("Continuar")).toBeNull();

            matchPair("bird", "pássaro");
            matchPair("fish", "peixe");

            expect(screen.getByText("Continuar")).not.toBeNull();

        });

        it("mouse interaction still works exactly as before, unaffected by the keyboard additions", () => {

            const exercise = buildExercise();
            const onComplete = vi.fn();

            render(<MatchTranslationExercise exercise={exercise} onComplete={onComplete} language="english" />);

            matchAllCorrectly(exercise.payload.pairs);
            fireEvent.click(screen.getByText("Continuar"));

            expect(onComplete).toHaveBeenCalledWith(true);

        });

    });

});
