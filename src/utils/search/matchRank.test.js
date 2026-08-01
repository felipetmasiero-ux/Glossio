import { describe, expect, it } from "vitest";

import { getFieldMatchRank, computeMatchRank, MATCH_RANK } from "./matchRank";

describe("getFieldMatchRank", () => {

    it("ranks an exact match highest", () => {
        expect(getFieldMatchRank("hello", "hello")).toBe(MATCH_RANK.EXACT);
    });

    it("is case-insensitive for exact matches", () => {
        expect(getFieldMatchRank("Hello", "hello")).toBe(MATCH_RANK.EXACT);
    });

    it("ranks a starts-with match second", () => {
        expect(getFieldMatchRank("hello there", "hello")).toBe(MATCH_RANK.STARTS_WITH);
    });

    it("ranks a contains match third", () => {
        expect(getFieldMatchRank("say hello now", "hello")).toBe(MATCH_RANK.CONTAINS);
    });

    it("returns NONE when there is no match", () => {
        expect(getFieldMatchRank("goodbye", "hello")).toBe(MATCH_RANK.NONE);
    });

    it("returns NONE for empty candidate or query", () => {
        expect(getFieldMatchRank("", "hello")).toBe(MATCH_RANK.NONE);
        expect(getFieldMatchRank("hello", "")).toBe(MATCH_RANK.NONE);
        expect(getFieldMatchRank(null, "hello")).toBe(MATCH_RANK.NONE);
    });

});

describe("computeMatchRank", () => {

    it("prefers an exact primary match over everything else", () => {

        const { rank, matchedText } = computeMatchRank("cat", {
            primary: "cat",
            aliasCandidates: ["cat"],
            secondaryCandidates: ["cat"]
        });

        expect(rank).toBe(MATCH_RANK.EXACT);
        expect(matchedText).toBe("cat");

    });

    it("prefers a contains match on the primary field over an alias match", () => {

        const { rank, matchedText } = computeMatchRank("cat", {
            primary: "concatenate",
            aliasCandidates: ["cat"]
        });

        expect(rank).toBe(MATCH_RANK.CONTAINS);
        expect(matchedText).toBe("concatenate");

    });

    it("falls back to an alias match when the primary field doesn't match at all", () => {

        const { rank, matchedText } = computeMatchRank("feline", {
            primary: "cat",
            aliasCandidates: ["feline", "kitty"]
        });

        expect(rank).toBe(MATCH_RANK.ALIAS);
        expect(matchedText).toBe("feline");

    });

    it("falls back to a secondary (translation) match only after primary and alias fail", () => {

        const { rank, matchedText } = computeMatchRank("gato", {
            primary: "cat",
            aliasCandidates: ["feline"],
            secondaryCandidates: ["gato"]
        });

        expect(rank).toBe(MATCH_RANK.TRANSLATION);
        expect(matchedText).toBe("gato");

    });

    it("returns NONE when nothing matches any field", () => {

        const { rank, matchedText } = computeMatchRank("dog", {
            primary: "cat",
            aliasCandidates: ["feline"],
            secondaryCandidates: ["gato"]
        });

        expect(rank).toBe(MATCH_RANK.NONE);
        expect(matchedText).toBeNull();

    });

});
