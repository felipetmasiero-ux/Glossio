import { describe, expect, it } from "vitest";

import { isDayGoalMet } from "./isDayGoalMet";
import { DEFAULT_GOALS } from "./goalsStorage";

describe("isDayGoalMet", () => {

    it("is false when no goal is configured at all, even with real activity", () => {
        expect(isDayGoalMet({ lessons: 5, reviews: 5, videoMinutes: 5 }, DEFAULT_GOALS)).toBe(false);
    });

    it("is true only when every configured goal was reached", () => {

        const goals = { ...DEFAULT_GOALS, dailyLessons: 2, dailyReviews: 10 };

        expect(isDayGoalMet({ lessons: 2, reviews: 10, videoMinutes: 0 }, goals)).toBe(true);
        expect(isDayGoalMet({ lessons: 1, reviews: 10, videoMinutes: 0 }, goals)).toBe(false);
        expect(isDayGoalMet({ lessons: 2, reviews: 9, videoMinutes: 0 }, goals)).toBe(false);

    });

    it("ignores goals that were never configured", () => {

        const goals = { ...DEFAULT_GOALS, dailyVideoMinutes: 15 };

        expect(isDayGoalMet({ lessons: 0, reviews: 0, videoMinutes: 15 }, goals)).toBe(true);

    });

});
