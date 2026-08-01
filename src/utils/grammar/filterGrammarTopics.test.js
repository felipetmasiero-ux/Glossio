import { describe, expect, it } from "vitest";

import { filterGrammarTopics } from "./filterGrammarTopics";

function topic(title, overrides = {}) {
    return {
        id: title,
        title,
        topic: null,
        rules: [],
        examples: [],
        ...overrides
    };
}

describe("filterGrammarTopics", () => {

    it("returns every topic when the query is empty", () => {

        const topics = [topic("Present Simple"), topic("Present Perfect")];

        expect(filterGrammarTopics(topics, "")).toEqual(topics);
        expect(filterGrammarTopics(topics, "   ")).toEqual(topics);
        expect(filterGrammarTopics(topics, undefined)).toEqual(topics);

    });

    it("filters by title", () => {

        const topics = [topic("Present Simple"), topic("First Conditional")];

        const result = filterGrammarTopics(topics, "simple");

        expect(result.map(t => t.title)).toEqual(["Present Simple"]);

    });

    it("filters by rule text", () => {

        const topics = [
            topic("Present Simple", { rules: ["Add -s for he/she/it."] }),
            topic("First Conditional", { rules: ["If + present simple, will + base verb."] })
        ];

        const result = filterGrammarTopics(topics, "base verb");

        expect(result.map(t => t.title)).toEqual(["First Conditional"]);

    });

    it("filters by example text", () => {

        const topics = [
            topic("Present Simple", { examples: ["She works at a hospital."] }),
            topic("First Conditional", { examples: ["If it rains, we will stay home."] })
        ];

        const result = filterGrammarTopics(topics, "hospital");

        expect(result.map(t => t.title)).toEqual(["Present Simple"]);

    });

    it("filters by the grammatical/topic term", () => {

        const topics = [
            topic("Present Simple", { topic: "present-simple" }),
            topic("Comparative Adjectives", { topic: "shopping" })
        ];

        const result = filterGrammarTopics(topics, "shopping");

        expect(result.map(t => t.title)).toEqual(["Comparative Adjectives"]);

    });

    it("is case-insensitive", () => {

        const topics = [topic("Present Simple")];

        expect(filterGrammarTopics(topics, "PRESENT")).toEqual(topics);

    });

    it("returns an empty array when nothing matches", () => {

        expect(filterGrammarTopics([topic("Present Simple")], "xyz")).toEqual([]);

    });

});
