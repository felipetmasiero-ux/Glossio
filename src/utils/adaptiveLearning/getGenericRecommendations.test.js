import { describe, expect, it } from "vitest";

import { getGenericRecommendations } from "./getGenericRecommendations";

describe("getGenericRecommendations", () => {

    it("suggests the first lesson and the placement test for a brand new account", () => {

        const result = getGenericRecommendations({ language: "english" });

        expect(result.some(r => r.id === "generic-first-lesson")).toBe(true);
        expect(result.some(r => r.id === "generic-placement-test")).toBe(true);

    });

    it("does not suggest the placement test again once it's already been taken", () => {

        const result = getGenericRecommendations({ language: "english", hasTakenPlacementTest: true });

        expect(result.some(r => r.id === "generic-placement-test")).toBe(false);

    });

    it("does not suggest a first lesson for a language with no course", () => {

        const result = getGenericRecommendations({ language: "klingon" });

        expect(result.some(r => r.id === "generic-first-lesson")).toBe(false);

    });

    it("every item has the fields a recommendation card needs", () => {

        const result = getGenericRecommendations({ language: "english" });

        result.forEach(recommendation => {
            expect(recommendation).toMatchObject({
                id: expect.any(String),
                type: expect.any(String),
                priority: expect.any(Number),
                title: expect.any(String),
                reason: expect.any(String),
                href: expect.any(String),
                icon: expect.any(String)
            });
        });

    });

});
