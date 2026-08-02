import { describe, expect, it, beforeEach } from "vitest";

import { getStatisticsSummary } from "./getStatisticsSummary";
import { GoalsStorage } from "../goals/goalsStorage";

describe("getStatisticsSummary", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("includes a goalCompletionRate shape even with no goals configured", () => {

        const summary = getStatisticsSummary({ language: "English", completedLessons: [], flashcards: [], events: [] });

        expect(summary.goalCompletionRate).toEqual({
            thisWeek: { daysMet: 0, totalDays: 7, rate: 0 },
            last30Days: { daysMet: 0, totalDays: 30, rate: 0 },
            average: 0
        });

    });

    it("reflects the locally configured goals", () => {

        GoalsStorage.saveGoals({ dailyLessons: 1 });

        const summary = getStatisticsSummary({ language: "English", completedLessons: [], flashcards: [], events: [] });

        expect(summary.goalCompletionRate.thisWeek.totalDays).toBe(7);

    });

});
