import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getGoalRecommendation } from "./getGoalRecommendation";
import { buildGoalProgress } from "./buildGoalProgress";

const noGoal = buildGoalProgress(0, null);

function dailyShape({ lessons = noGoal, reviews = noGoal, videoMinutes = noGoal } = {}) {
    return { lessons, reviews, videoMinutes };
}

function weeklyShape({ minutes = noGoal, lessons = noGoal } = {}) {
    return { minutes, lessons };
}

describe("getGoalRecommendation", () => {

    it("returns null when nothing is configured", () => {

        const result = getGoalRecommendation({ daily: dailyShape(), weekly: weeklyShape() });

        expect(result).toBeNull();

    });

    it("prompts for the last lesson when exactly one remains", () => {

        const result = getGoalRecommendation({
            daily: dailyShape({ lessons: buildGoalProgress(1, 2) }),
            weekly: weeklyShape()
        });

        expect(result).toBe("Você só precisa de mais 1 lição hoje.");

    });

    it("prompts to complete N reviews when reviews are incomplete", () => {

        const result = getGoalRecommendation({
            daily: dailyShape({ reviews: buildGoalProgress(15, 20) }),
            weekly: weeklyShape()
        });

        expect(result).toBe("Complete mais 5 revisões para bater a meta de hoje.");

    });

    it("prompts to watch N more minutes when the video goal is incomplete", () => {

        const result = getGoalRecommendation({
            daily: dailyShape({ videoMinutes: buildGoalProgress(10, 15) }),
            weekly: weeklyShape()
        });

        expect(result).toBe("Assista mais 5 minutos para terminar seu plano de estudo de hoje.");

    });

    it("picks the incomplete daily goal with the smallest remaining amount", () => {

        const result = getGoalRecommendation({
            daily: dailyShape({
                lessons: buildGoalProgress(0, 5), // remaining 5
                reviews: buildGoalProgress(18, 20) // remaining 2 - closest
            }),
            weekly: weeklyShape()
        });

        expect(result).toBe("Complete mais 2 revisões para bater a meta de hoje.");

    });

    it("reports today's goals completed when every configured daily goal is met and no weekly goal exists", () => {

        const result = getGoalRecommendation({
            daily: dailyShape({ lessons: buildGoalProgress(2, 2) }),
            weekly: weeklyShape()
        });

        expect(result).toBe("Metas de hoje concluídas.");

    });

    it("reports the weekly goal as completed once it's fully met", () => {

        const result = getGoalRecommendation({
            daily: dailyShape({ lessons: buildGoalProgress(2, 2) }),
            weekly: weeklyShape({ minutes: buildGoalProgress(240, 240) })
        });

        expect(result).toBe("Meta semanal concluída.");

    });

    describe("weekly pacing (day-of-week dependent)", () => {

        beforeEach(() => {
            vi.useFakeTimers();
            // Wednesday 2026-08-05 -> day 3 of 7, expected fraction ~42.9%
            vi.setSystemTime(new Date(2026, 7, 5, 12, 0, 0));
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it("says the learner is ahead of schedule when weekly pace exceeds the expected fraction", () => {

            const result = getGoalRecommendation({
                daily: dailyShape({ lessons: buildGoalProgress(2, 2) }),
                weekly: weeklyShape({ minutes: buildGoalProgress(200, 240) }) // 83% vs ~43% expected
            });

            expect(result).toBe("Você está adiantado no cronograma.");

        });

        it("falls back to today's-goals-completed when weekly pace is behind and not yet done", () => {

            const result = getGoalRecommendation({
                daily: dailyShape({ lessons: buildGoalProgress(2, 2) }),
                weekly: weeklyShape({ minutes: buildGoalProgress(50, 240) }) // ~21% vs ~43% expected
            });

            expect(result).toBe("Metas de hoje concluídas.");

        });

    });

});
