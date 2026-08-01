import { describe, expect, it } from "vitest";

import { calculatePlacementResult } from "./calculatePlacementResult";

function q(id, level, correctIndex = 0) {
    return { id, level, correctIndex };
}

describe("calculatePlacementResult", () => {

    it("recommends the lowest level when the learner fails it", () => {

        const questions = [q("a1-1", "A1"), q("a1-2", "A1"), q("a2-1", "A2")];
        const answers = { "a1-1": 1, "a1-2": 1, "a2-1": 0 }; // both A1 wrong

        const result = calculatePlacementResult({ questions, answers, availableLevels: ["A1", "A2"] });

        expect(result.recommendedLevel).toBe("A1");
        expect(result.scoresByLevel.A1.percentage).toBe(0);

    });

    it("climbs to the next level when the current one is passed", () => {

        const questions = [
            q("a1-1", "A1"), q("a1-2", "A1"), q("a1-3", "A1"),
            q("a2-1", "A2"), q("a2-2", "A2")
        ];
        const answers = {
            "a1-1": 0, "a1-2": 0, "a1-3": 0, // 100% A1
            "a2-1": 1, "a2-2": 1 // 0% A2
        };

        const result = calculatePlacementResult({ questions, answers, availableLevels: ["A1", "A2"] });

        expect(result.recommendedLevel).toBe("A1"); // passed A1, failed A2 -> stay at A1
        expect(result.scoresByLevel.A1.percentage).toBe(1);
        expect(result.scoresByLevel.A2.percentage).toBe(0);

    });

    it("recommends the highest level when every level is passed", () => {

        const questions = [q("a1-1", "A1"), q("a2-1", "A2")];
        const answers = { "a1-1": 0, "a2-1": 0 };

        const result = calculatePlacementResult({ questions, answers, availableLevels: ["A1", "A2"] });

        expect(result.recommendedLevel).toBe("A2");
        expect(result.isBeyondAvailableLevels).toBe(true);

    });

    it("does not flag isBeyondAvailableLevels when a level was failed", () => {

        const questions = [q("a1-1", "A1")];
        const answers = { "a1-1": 1 };

        const result = calculatePlacementResult({ questions, answers, availableLevels: ["A1"] });

        expect(result.isBeyondAvailableLevels).toBe(false);

    });

    it("treats a passing score right at the 70% threshold as a pass", () => {

        const questions = [q("1", "A1"), q("2", "A1"), q("3", "A1"), q("4", "A1"), q("5", "A1"),
            q("6", "A1"), q("7", "A1"), q("8", "A1"), q("9", "A1"), q("10", "A1")];
        const answers = Object.fromEntries(questions.slice(0, 7).map(question => [question.id, 0]));
        // 3 wrong answers omitted from `answers` entirely (undefined !== 0) -> 7/10 = 70%

        const result = calculatePlacementResult({ questions, answers, availableLevels: ["A1"] });

        expect(result.scoresByLevel.A1.percentage).toBe(0.7);
        expect(result.recommendedLevel).toBe("A1");
        expect(result.isBeyondAvailableLevels).toBe(true);

    });

    it("is a pure function - same input always produces the same output", () => {

        const questions = [q("a1-1", "A1"), q("a2-1", "A2")];
        const answers = { "a1-1": 0, "a2-1": 1 };

        const first = calculatePlacementResult({ questions, answers, availableLevels: ["A1", "A2"] });
        const second = calculatePlacementResult({ questions, answers, availableLevels: ["A1", "A2"] });

        expect(first).toEqual(second);

    });

    it("handles an unanswered question as incorrect, not a crash", () => {

        const questions = [q("a1-1", "A1"), q("a1-2", "A1")];
        const answers = { "a1-1": 0 }; // a1-2 never answered

        const result = calculatePlacementResult({ questions, answers, availableLevels: ["A1"] });

        expect(result.scoresByLevel.A1.correct).toBe(1);
        expect(result.scoresByLevel.A1.total).toBe(2);

    });

});
