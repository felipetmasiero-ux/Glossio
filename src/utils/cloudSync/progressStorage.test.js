import { describe, expect, it, beforeEach } from "vitest";

import { readProgressSnapshot, applyProgressSnapshot, serializeProgress } from "./progressStorage";
import { GoalsStorage, DEFAULT_GOALS } from "../goals/goalsStorage";

describe("progressStorage goals integration", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("includes the locally configured goals in the progress snapshot", () => {

        GoalsStorage.saveGoals({ dailyLessons: 2, dailyReviews: 20 });

        const snapshot = readProgressSnapshot();

        expect(snapshot.dashboard.goals).toEqual({ ...DEFAULT_GOALS, dailyLessons: 2, dailyReviews: 20 });

    });

    it("applies a server snapshot's goals back into local GoalsStorage", () => {

        applyProgressSnapshot({
            language: "English",
            exerciseProgress: [],
            studyHistory: [],
            dashboard: { lastActivity: null, goals: { ...DEFAULT_GOALS, weeklyMinutes: 240 } }
        });

        expect(GoalsStorage.getGoals()).toEqual({ ...DEFAULT_GOALS, weeklyMinutes: 240 });

    });

    it("serializes goals identically regardless of source key order", () => {

        const a = serializeProgress({
            language: "English",
            dashboard: { goals: { dailyLessons: 2, dailyReviews: null, dailyVideoMinutes: null, weeklyMinutes: null, weeklyLessons: null } }
        });

        const b = serializeProgress({
            language: "English",
            dashboard: { goals: { weeklyLessons: null, weeklyMinutes: null, dailyVideoMinutes: null, dailyReviews: null, dailyLessons: 2 } }
        });

        expect(a).toBe(b);

    });

});
