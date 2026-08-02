import { describe, expect, it, beforeEach } from "vitest";

import { GoalsStorage, DEFAULT_GOALS } from "./goalsStorage";

describe("GoalsStorage", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("returns all-null defaults when nothing is saved", () => {
        expect(GoalsStorage.getGoals()).toEqual(DEFAULT_GOALS);
    });

    it("saves and reads back a partial configuration", () => {

        GoalsStorage.saveGoals({ dailyLessons: 2, dailyReviews: 20 });

        expect(GoalsStorage.getGoals()).toEqual({
            ...DEFAULT_GOALS,
            dailyLessons: 2,
            dailyReviews: 20
        });

    });

    it("sanitizes invalid values (zero, negative, non-numeric) back to null", () => {

        GoalsStorage.saveGoals({ dailyLessons: 0, dailyReviews: -5, dailyVideoMinutes: "15", weeklyMinutes: 240 });

        expect(GoalsStorage.getGoals()).toEqual({
            ...DEFAULT_GOALS,
            weeklyMinutes: 240
        });

    });

    it("recovers from corrupted storage", () => {

        localStorage.setItem("studyGoals", "{not json");

        expect(GoalsStorage.getGoals()).toEqual(DEFAULT_GOALS);

    });

    it("hasAnyGoal reports whether any goal is configured", () => {

        expect(GoalsStorage.hasAnyGoal(DEFAULT_GOALS)).toBe(false);
        expect(GoalsStorage.hasAnyGoal({ ...DEFAULT_GOALS, weeklyLessons: 10 })).toBe(true);

    });

});
