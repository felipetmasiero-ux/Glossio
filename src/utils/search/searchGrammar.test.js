import { describe, expect, it } from "vitest";

import { searchGrammar } from "./searchGrammar";
import { MATCH_RANK } from "./matchRank";

function topic(title, overrides = {}) {
    return {
        id: title,
        title,
        topic: null,
        summary: `Summary for ${title}`,
        rules: [],
        examples: [],
        ...overrides
    };
}

describe("searchGrammar", () => {

    it("matches by title", () => {

        const topics = [topic("Present Simple"), topic("Present Perfect")];

        const results = searchGrammar(topics, "simple");

        expect(results.map(r => r.label)).toEqual(["Present Simple"]);
        expect(results[0].rank).toBe(MATCH_RANK.CONTAINS);

    });

    it("matches by rule", () => {

        const topics = [topic("Present Simple", { rules: ["Add -s for he/she/it."] })];

        const results = searchGrammar(topics, "he/she/it");

        expect(results[0].rank).toBe(MATCH_RANK.ALIAS);

    });

    it("matches by example", () => {

        const topics = [topic("Present Simple", { examples: ["She works at a hospital."] })];

        const results = searchGrammar(topics, "hospital");

        expect(results[0].rank).toBe(MATCH_RANK.ALIAS);

    });

    it("matches by the grammatical/topic term (via the topic label)", () => {

        const topics = [topic("Present Simple", { topic: "present-simple" })];

        const results = searchGrammar(topics, "presente simples");

        expect(results.map(r => r.label)).toEqual(["Present Simple"]);

    });

    it("falls back to the summary as a last resort", () => {

        const topics = [topic("Present Simple", { summary: "Talk about routines and facts." })];

        const results = searchGrammar(topics, "routines");

        expect(results[0].rank).toBe(MATCH_RANK.TRANSLATION);

    });

    it("ranks an exact title match above a rule/example match", () => {

        const topics = [
            topic("Simple", {}),
            topic("Present Perfect", { rules: ["Use simple past for finished actions."] })
        ];

        const results = searchGrammar(topics, "simple");

        expect(results.map(r => r.label)).toEqual(["Simple", "Present Perfect"]);

    });

    it("excludes topics that don't match any field", () => {

        expect(searchGrammar([topic("Present Simple")], "xyz")).toEqual([]);

    });

});
