import { describe, expect, it } from "vitest";

import { RecommendationEngine } from "./RecommendationEngine";

// generateRecommendations.js's own test file covers the actual behavior
// (merging, priority, fallback, compatibility) in depth - this only checks
// that the public entry point is wired to it correctly.
describe("RecommendationEngine", () => {

    it("exposes generate(), delegating to generateRecommendations", () => {

        const result = RecommendationEngine.generate({ language: "english" });

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);

    });

    it("returns an empty array with no language, same as generateRecommendations", () => {
        expect(RecommendationEngine.generate({ language: null })).toEqual([]);
    });

});
