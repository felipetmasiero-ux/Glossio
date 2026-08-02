import { describe, expect, it } from "vitest";

import { buildGoalProgress } from "./buildGoalProgress";

describe("buildGoalProgress", () => {

    it("returns hasGoal: false and zeroed-out fields when target is null", () => {

        expect(buildGoalProgress(5, null)).toEqual({
            current: 5,
            target: null,
            hasGoal: false,
            remaining: 0,
            percentage: 0,
            completed: false
        });

    });

    it("computes remaining and percentage for an in-progress goal", () => {

        expect(buildGoalProgress(3, 10)).toEqual({
            current: 3,
            target: 10,
            hasGoal: true,
            remaining: 7,
            percentage: 30,
            completed: false
        });

    });

    it("caps percentage at 100 and remaining at 0 once the goal is met or exceeded", () => {

        expect(buildGoalProgress(12, 10)).toEqual({
            current: 12,
            target: 10,
            hasGoal: true,
            remaining: 0,
            percentage: 100,
            completed: true
        });

    });

});
