import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { ExerciseSessionPage } from "./ExerciseSessionPage";
import { LanguageContext } from "../../contexts/LanguageContext";
import { EventContext } from "../../contexts/EventContext";
import { ExerciseProgressContext } from "../../contexts/ExerciseProgressContext";
import { LastActivityContext } from "../../contexts/LastActivityContext";
import { LessonRepository } from "../../utils/lessons/LessonRepository";
import * as exercisesModule from "../../utils/exercises";
import { EVENT_TYPES } from "../../constants/events";

function renderPage(lessonId = "english-a1-greetings", { logEvent = vi.fn() } = {}) {

    return render(
        <LanguageContext.Provider value={{ language: "english" }}>
            <EventContext.Provider value={{ logEvent }}>
                <ExerciseProgressContext.Provider value={{ practiceLesson: vi.fn() }}>
                    <LastActivityContext.Provider value={{ setActivity: vi.fn(), clearActivity: vi.fn() }}>
                        <MemoryRouter initialEntries={[`/exercises/${lessonId}`]}>
                            <Routes>
                                <Route path="/exercises/:lessonId" element={<ExerciseSessionPage />} />
                            </Routes>
                        </MemoryRouter>
                    </LastActivityContext.Provider>
                </ExerciseProgressContext.Provider>
            </EventContext.Provider>
        </LanguageContext.Provider>
    );

}

describe("ExerciseSessionPage - lesson objectives (L2)", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows the lesson's objectives before the first exercise", () => {

        const lesson = LessonRepository.getById("english", "english-a1-greetings");

        renderPage("english-a1-greetings");

        expect(screen.getByText("Objetivos")).not.toBeNull();

        lesson.objectives.forEach(objective => {
            expect(screen.getByText(objective)).not.toBeNull();
        });

    });

    it("renders every objective in the original order", () => {

        const lesson = LessonRepository.getById("english", "english-a1-greetings");

        renderPage("english-a1-greetings");

        const items = screen.getAllByRole("listitem").map(item => item.textContent);

        // The objectives list is rendered before the exercise body, so its
        // items are the first ones in document order.
        expect(items.slice(0, lesson.objectives.length)).toEqual(lesson.objectives);

    });

    it("does not render an objectives section, or crash, for a lesson without objectives", () => {

        const realLesson = LessonRepository.getById("english", "english-a1-greetings");

        vi.spyOn(LessonRepository, "getById").mockReturnValue({ ...realLesson, objectives: [] });

        renderPage("english-a1-greetings");

        expect(screen.queryByText("Objetivos")).toBeNull();

        // The rest of the session still renders normally.
        expect(screen.getByText(/Progresso/)).not.toBeNull();

    });

    it("still renders the current exercise normally alongside the objectives - no regression", () => {

        renderPage("english-a1-greetings");

        expect(screen.getByText(/Progresso/)).not.toBeNull();

    });

});

describe("ExerciseSessionPage - accessible exercise flow (E3), real content end-to-end", () => {

    it("focuses the first exercise's question as soon as the session loads", () => {

        renderPage("english-a1-greetings");

        // ExerciseShell's own mount effect (see its tests) does this for
        // every exercise type - this just confirms it actually happens
        // through the real page wiring, not only in isolation. The
        // objectives section (L2) also renders an h2, so this scopes to
        // the exercise's own question heading specifically.
        const question = document.querySelector(".exercise-shell__prompt");
        expect(question).not.toBeNull();
        expect(document.activeElement).toBe(question);

    });

});

describe("ExerciseSessionPage - keyboard-accessible Match/Order exercises (P2), real content end-to-end", () => {

    // The real generator's own shuffle() makes exercise order (and which
    // type lands first) non-deterministic - unrelated to this task and not
    // something to work around by faking exercise data. Instead this pulls
    // a real match-translation/order-sentence exercise straight out of the
    // real generator's real output for a real lesson, and only fixes the
    // *order* of an otherwise 100% real queue, so the session always starts
    // on the type under test.
    function realQueueStartingWith(type) {

        const lesson = LessonRepository.getById("english", "english-a1-greetings");
        const generated = exercisesModule.generateExercisesForLesson(lesson);

        const target = generated.find(exercise => exercise.type === type);
        const rest = generated.filter(exercise => exercise !== target);

        if (!target) {
            throw new Error(`No real exercise of type "${type}" was generated for this lesson - fixture assumption broken`);
        }

        return [target, ...rest];

    }

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("starts a real Match Translation exercise, accepts keyboard input, and correctly advances to the next real exercise", async () => {

        const user = userEvent.setup({ delay: null });
        const logEvent = vi.fn();

        vi.spyOn(exercisesModule, "generateExercisesForLesson")
            .mockReturnValue(realQueueStartingWith("match-translation"));

        renderPage("english-a1-greetings", { logEvent });

        // ExerciseShell's own initial-focus behavior still works through
        // the full real page.
        const question = document.querySelector(".exercise-shell__prompt");
        expect(document.activeElement).toBe(question);

        const exercise = exercisesModule.generateExercisesForLesson(
            LessonRepository.getById("english", "english-a1-greetings")
        ).find(item => item.type === "match-translation");

        // Complete every real pair via keyboard alone - Tab-equivalent
        // focus() + real Enter key events reaching MatchTranslationExercise's
        // actual production handlers through React's real event system.
        for (const pair of exercise.payload.pairs) {

            screen.getByText(pair.word).focus();
            await user.keyboard("{Enter}");

            screen.getByText(pair.translation).focus();
            await user.keyboard("{Enter}");

        }

        expect(screen.getByText("Correto!")).not.toBeNull();

        screen.getByText("Continuar").focus();
        await user.keyboard("{Enter}");

        // correct: true reached the real event log exactly as it would for
        // a mouse-driven attempt.
        expect(logEvent).toHaveBeenCalledWith(EVENT_TYPES.EXERCISE_COMPLETED, expect.objectContaining({
            exerciseId: exercise.id,
            exerciseType: "match-translation",
            correct: true
        }));

        // The session moved on - a different real exercise is now current,
        // proven by the previous one's own prompt no longer being on screen
        // and a fresh question receiving focus again.
        expect(screen.queryByText(exercise.prompt)).toBeNull();
        expect(document.activeElement?.className).toBe("exercise-shell__prompt");

    });

    it("starts a real Order Sentence exercise and completes it entirely via keyboard, reporting an incorrect result for a wrong order", async () => {

        const user = userEvent.setup({ delay: null });
        const logEvent = vi.fn();

        vi.spyOn(exercisesModule, "generateExercisesForLesson")
            .mockReturnValue(realQueueStartingWith("order-sentence"));

        renderPage("english-a1-greetings", { logEvent });

        const exercise = exercisesModule.generateExercisesForLesson(
            LessonRepository.getById("english", "english-a1-greetings")
        ).find(item => item.type === "order-sentence");

        // Deliberately the wrong order (unless tokens already equal
        // correctOrder, which chunkPairs-style generators avoid by design
        // for a meaningful exercise) - placed via keyboard alone.
        for (const token of exercise.payload.tokens) {
            screen.getByText(token).focus();
            await user.keyboard("{Enter}");
        }

        screen.getByRole("button", { name: "Verificar" }).focus();
        await user.keyboard("{Enter}");

        const isActuallyCorrect = exercise.payload.tokens.join(" ") === exercise.payload.correctOrder.join(" ");

        expect(screen.getByText(isActuallyCorrect ? "Correto!" : "Incorreto")).not.toBeNull();

        screen.getByText("Continuar").focus();
        await user.keyboard("{Enter}");

        expect(logEvent).toHaveBeenCalledWith(EVENT_TYPES.EXERCISE_COMPLETED, expect.objectContaining({
            exerciseId: exercise.id,
            exerciseType: "order-sentence",
            correct: isActuallyCorrect
        }));

        expect(screen.queryByText(exercise.prompt)).toBeNull();

    });

});
