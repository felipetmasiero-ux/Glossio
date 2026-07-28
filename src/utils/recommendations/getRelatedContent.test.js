import { describe, expect, it } from "vitest";

import { getRelatedContent } from "./getRelatedContent";

const source = { id: "lesson-food", language: "english", level: "A1", topic: "food" };

describe("getRelatedContent", () => {

    it("returns candidates matching the same topic and language", () => {

        const candidates = [
            { id: "video-food", language: "english", level: "A1", topic: "food" },
            { id: "video-family", language: "english", level: "A1", topic: "family" }
        ];

        const result = getRelatedContent({ source, candidates, language: "english" });

        expect(result).toEqual([candidates[0]]);

    });

    it("never crosses languages", () => {

        const candidates = [
            { id: "video-food-fr", language: "french", level: "A1", topic: "food" },
            { id: "video-food-en", language: "english", level: "A1", topic: "food" }
        ];

        const result = getRelatedContent({ source, candidates, language: "english" });

        expect(result).toEqual([candidates[1]]);

    });

    it("excludes already completed items", () => {

        const candidates = [
            { id: "video-food-1", language: "english", level: "A1", topic: "food" },
            { id: "video-food-2", language: "english", level: "A1", topic: "food" }
        ];

        const result = getRelatedContent({
            source,
            candidates,
            language: "english",
            completedIds: ["video-food-1"]
        });

        expect(result).toEqual([candidates[1]]);

    });

    it("caps results at two, even with more same-topic matches", () => {

        const candidates = [
            { id: "video-1", language: "english", level: "A1", topic: "food" },
            { id: "video-2", language: "english", level: "A1", topic: "food" },
            { id: "video-3", language: "english", level: "A1", topic: "food" }
        ];

        const result = getRelatedContent({ source, candidates, language: "english" });

        expect(result).toHaveLength(2);

    });

    it("falls back to same language + level when no topic matches", () => {

        const candidates = [
            { id: "video-travel", language: "english", level: "A1", topic: "travel" },
            { id: "video-jobs", language: "english", level: "A2", topic: "jobs" }
        ];

        const result = getRelatedContent({ source, candidates, language: "english" });

        expect(result).toEqual([candidates[0]]);

    });

    it("returns an empty array when nothing matches at all", () => {

        const candidates = [
            { id: "video-jobs", language: "english", level: "A2", topic: "jobs" }
        ];

        const result = getRelatedContent({ source, candidates, language: "english" });

        expect(result).toEqual([]);

    });

});
