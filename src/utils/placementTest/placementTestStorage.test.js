import { describe, expect, it, beforeEach } from "vitest";

import { PlacementTestStorage } from "./placementTestStorage";

describe("PlacementTestStorage", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("returns null for a language with no saved result", () => {
        expect(PlacementTestStorage.getResult("English")).toBeNull();
    });

    it("saves and retrieves a result, case-insensitively", () => {

        PlacementTestStorage.saveResult("English", {
            recommendedLevel: "A2",
            recommendedModuleId: "english-a2",
            scoresByLevel: { A1: { correct: 5, total: 5, percentage: 1 } }
        });

        const result = PlacementTestStorage.getResult("english");

        expect(result.recommendedLevel).toBe("A2");
        expect(result.recommendedModuleId).toBe("english-a2");
        expect(result.language).toBe("English");
        expect(typeof result.completedAt).toBe("number");

    });

    it("keeps separate results per language", () => {

        PlacementTestStorage.saveResult("English", { recommendedLevel: "A2", recommendedModuleId: "english-a2" });
        PlacementTestStorage.saveResult("French", { recommendedLevel: "A1", recommendedModuleId: "french-a1" });

        expect(PlacementTestStorage.getResult("English").recommendedLevel).toBe("A2");
        expect(PlacementTestStorage.getResult("French").recommendedLevel).toBe("A1");

    });

    it("overwrites a previous result for the same language on retake", () => {

        PlacementTestStorage.saveResult("English", { recommendedLevel: "A1", recommendedModuleId: "english-a1" });
        PlacementTestStorage.saveResult("English", { recommendedLevel: "A2", recommendedModuleId: "english-a2" });

        const all = PlacementTestStorage.getAllResults();

        expect(Object.keys(all)).toEqual(["english"]);
        expect(all.english.recommendedLevel).toBe("A2");

    });

    it("returns the most recently completed result across languages", async () => {

        PlacementTestStorage.saveResult("French", { recommendedLevel: "A1", recommendedModuleId: "french-a1" });
        await new Promise(resolve => setTimeout(resolve, 5));
        PlacementTestStorage.saveResult("English", { recommendedLevel: "A2", recommendedModuleId: "english-a2" });

        const latest = PlacementTestStorage.getLatestResult();

        expect(latest.language).toBe("English");

    });

    it("returns null from getLatestResult when nothing has been saved", () => {
        expect(PlacementTestStorage.getLatestResult()).toBeNull();
    });

});
