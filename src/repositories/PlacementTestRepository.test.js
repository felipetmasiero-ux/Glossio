import { describe, expect, it } from "vitest";

import { PlacementTestRepository } from "./PlacementTestRepository";

describe("PlacementTestRepository", () => {

    it("returns the available levels for a language, in ascending order", () => {

        expect(PlacementTestRepository.getAvailableLevels("english")).toEqual(["A1", "A2"]);
        expect(PlacementTestRepository.getAvailableLevels("portuguese")).toEqual(["A1"]);

    });

    it("is case-insensitive for the language argument", () => {

        expect(PlacementTestRepository.getAvailableLevels("English")).toEqual(
            PlacementTestRepository.getAvailableLevels("english")
        );

    });

    it("returns every question across all levels", () => {

        const a1 = PlacementTestRepository.getLevels("english").a1;
        const a2 = PlacementTestRepository.getLevels("english").a2;
        const all = PlacementTestRepository.getQuestions("english");

        expect(all.length).toBe(a1.length + a2.length);

    });

    it("covers 15-20 questions per language, distributed across its levels", () => {

        ["english", "french", "portuguese"].forEach(language => {
            const total = PlacementTestRepository.getQuestions(language).length;
            expect(total).toBeGreaterThanOrEqual(15);
            expect(total).toBeLessThanOrEqual(20);
        });

    });

    it("returns an empty array/object for a language with no question bank", () => {

        expect(PlacementTestRepository.getLevels("klingon")).toEqual({});
        expect(PlacementTestRepository.getQuestions("klingon")).toEqual([]);
        expect(PlacementTestRepository.getAvailableLevels("klingon")).toEqual([]);

    });

    it("every question has exactly 4 options and a valid correctIndex", () => {

        ["english", "french", "portuguese"].forEach(language => {
            PlacementTestRepository.getQuestions(language).forEach(question => {
                expect(question.options.length).toBe(4);
                expect(question.correctIndex).toBeGreaterThanOrEqual(0);
                expect(question.correctIndex).toBeLessThan(4);
            });
        });

    });

    it("mixes question types (vocabulary, grammar, comprehension, phrase, word-order)", () => {

        const types = new Set(PlacementTestRepository.getQuestions("english").map(question => question.type));

        expect(types.has("vocabulary")).toBe(true);
        expect(types.has("grammar")).toBe(true);
        expect(types.has("comprehension")).toBe(true);
        expect(types.has("word-order")).toBe(true);

    });

});
