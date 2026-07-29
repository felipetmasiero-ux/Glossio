import { describe, expect, it } from "vitest";

import { longestMatchTokenize } from "./longestMatchTokenize";

function matchOnly(...phrases) {

    const set = new Set(phrases.map(p => p.toLowerCase()));

    return candidate => set.has(candidate.toLowerCase());

}

describe("longestMatchTokenize", () => {

    it("prefers the longest available match over shorter ones", () => {

        const hasMatch = matchOnly("would like", "like");

        const chunks = longestMatchTokenize("I would like coffee", hasMatch);

        const matches = chunks.filter(c => c.isMatch).map(c => c.text);

        expect(matches).toEqual(["would like"]);
        expect(matches).not.toContain("like");

    });

    it("matches the exact worked example from the spec", () => {

        const hasMatch = matchOnly("would like", "cup of coffee", "coffee");

        const chunks = longestMatchTokenize("I would like a cup of coffee.", hasMatch);

        const matches = chunks.filter(c => c.isMatch).map(c => c.text);

        expect(matches).toEqual(["would like", "cup of coffee"]);

    });

    it("falls back to single words when no phrase matches", () => {

        const hasMatch = matchOnly("hello");

        const chunks = longestMatchTokenize("Hello there, friend.", hasMatch);

        const matches = chunks.filter(c => c.isMatch).map(c => c.text);

        expect(matches).toEqual(["Hello"]);

    });

    it("does not cross punctuation boundaries", () => {

        const hasMatch = matchOnly("good morning");

        const chunks = longestMatchTokenize("Good, morning!", hasMatch);

        const matches = chunks.filter(c => c.isMatch).map(c => c.text);

        expect(matches).toEqual([]);

    });

    it("preserves original casing and whitespace inside a matched phrase", () => {

        const hasMatch = matchOnly("how are you");

        const chunks = longestMatchTokenize("How  are you?", hasMatch);

        const match = chunks.find(c => c.isMatch);

        expect(match.text).toBe("How  are you");

    });

    it("behaves exactly like single-word matching when nothing phrase-length matches", () => {

        const hasMatch = matchOnly("coffee", "table");

        const chunks = longestMatchTokenize("The coffee is on the table.", hasMatch);

        const matches = chunks.filter(c => c.isMatch).map(c => c.text);

        expect(matches).toEqual(["coffee", "table"]);

    });

    it("reassembles the full text when concatenating all chunks", () => {

        const hasMatch = matchOnly("would like", "cup of coffee");

        const text = "I would like a cup of coffee, please.";
        const chunks = longestMatchTokenize(text, hasMatch);

        expect(chunks.map(c => c.text).join("")).toBe(text);

    });

    it("returns no matches for empty match function", () => {

        const chunks = longestMatchTokenize("Just some plain text.", () => false);

        expect(chunks.some(c => c.isMatch)).toBe(false);

    });

});
