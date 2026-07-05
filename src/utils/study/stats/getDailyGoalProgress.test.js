import { describe, expect, it } from "vitest";

import { getDailyGoalProgress } from "./getDailyGoalProgress";

describe("getDailyGoalProgress", () => {

    it("returns 0% when there are no reviews", () => {

        const result = getDailyGoalProgress(0);

        expect(result).toEqual({
            goal: 10,
            completed: 0,
            progress: 0,
            completedGoal: false
        });

    });

    it("returns 50% when half the goal is completed", () => {

        const result = getDailyGoalProgress(5);

        expect(result.progress).toBe(50);

    });

    it("caps progress at 100%", () => {

        const result = getDailyGoalProgress(15);

        expect(result.progress).toBe(100);

    });

    it("marks goal as completed", () => {

        const result = getDailyGoalProgress(10);

        expect(result.completedGoal).toBe(true);

    });

});