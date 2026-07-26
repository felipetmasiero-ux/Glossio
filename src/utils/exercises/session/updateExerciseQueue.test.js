import { describe, expect, it } from "vitest";

import { updateExerciseQueue } from "./updateExerciseQueue";

describe("updateExerciseQueue", () => {

    const exercise1 = { id: 1 };
    const exercise2 = { id: 2 };
    const exercise3 = { id: 3 };

    const queue = [
        exercise1,
        exercise2,
        exercise3
    ];

    it("removes the exercise when answered correctly", () => {

        const updated = updateExerciseQueue(
            queue,
            exercise1,
            true
        );

        expect(updated).toEqual([
            exercise2,
            exercise3
        ]);

    });

    it("moves the exercise to the end when answered incorrectly", () => {

        const updated = updateExerciseQueue(
            queue,
            exercise1,
            false
        );

        expect(updated).toEqual([
            exercise2,
            exercise3,
            exercise1
        ]);

    });

    it("does not mutate the original queue", () => {

        updateExerciseQueue(
            queue,
            exercise1,
            false
        );

        expect(queue).toEqual([
            exercise1,
            exercise2,
            exercise3
        ]);

    });

    it("returns a new array", () => {

        const updated = updateExerciseQueue(
            queue,
            exercise1,
            true
        );

        expect(updated).not.toBe(queue);

    });

    it("works with a single exercise", () => {

        const updated = updateExerciseQueue(
            [exercise1],
            exercise1,
            true
        );

        expect(updated).toEqual([]);

    });

});
