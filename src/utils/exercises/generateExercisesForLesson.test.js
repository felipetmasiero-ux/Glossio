import { describe, expect, it } from "vitest";

import { generateExercisesForLesson } from "./generateExercisesForLesson";
import { normalizeLesson } from "../lessons/normalizeLesson";
import { greetingsLesson } from "../../data/lessons/english/a1/greetings";
import { reviewLesson } from "../../data/lessons/english/a1/review";
import { EXERCISE_TYPES } from "../../constants/exerciseTypes";

describe("generateExercisesForLesson", () => {

    const greetings = normalizeLesson(greetingsLesson);
    const review = normalizeLesson(reviewLesson);

    it("returns an empty array when there is no lesson", () => {
        expect(generateExercisesForLesson(null)).toEqual([]);
    });

    it("generates every exercise type for a lesson rich in vocabulary and examples", () => {

        const exercises = generateExercisesForLesson(greetings);

        const types = new Set(exercises.map(exercise => exercise.type));

        expect(types).toEqual(new Set(Object.values(EXERCISE_TYPES)));

    });

    it("tags every generated exercise with the source lesson id", () => {

        const exercises = generateExercisesForLesson(greetings);

        expect(exercises.length).toBeGreaterThan(0);

        exercises.forEach(exercise => {
            expect(exercise.lessonId).toBe(greetings.id);
        });

    });

    it("keeps a valid answer index on every multiple-choice/select-word exercise", () => {

        const exercises = generateExercisesForLesson(greetings).filter(
            exercise => exercise.type === EXERCISE_TYPES.MULTIPLE_CHOICE || exercise.type === EXERCISE_TYPES.SELECT_WORD
        );

        exercises.forEach(exercise => {
            expect(exercise.payload.options[exercise.payload.answerIndex]).toBeDefined();
        });

    });

    it("degrades gracefully for a lesson with no vocabulary or example sentences", () => {

        expect(review.vocabulary).toEqual([]);

        const exercises = generateExercisesForLesson(review);

        expect(exercises.length).toBeGreaterThan(0);

        expect(
            exercises.every(exercise => exercise.type === EXERCISE_TYPES.MULTIPLE_CHOICE)
        ).toBe(true);

    });

});
