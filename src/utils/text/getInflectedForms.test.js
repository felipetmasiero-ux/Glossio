import { describe, expect, it } from "vitest";

import { getInflectedForms } from "./getInflectedForms";

describe("getInflectedForms", () => {

    it("generates the study/studies/studied/studying family", () => {

        const forms = getInflectedForms("study");

        expect(forms).toEqual(expect.arrayContaining(["studies", "studied", "studying"]));

    });

    it("generates regular verb forms (work)", () => {

        const forms = getInflectedForms("work");

        expect(forms).toEqual(expect.arrayContaining(["works", "worked", "working"]));

    });

    it("drops the trailing e before -ed/-ing (like)", () => {

        const forms = getInflectedForms("like");

        expect(forms).toEqual(expect.arrayContaining(["liked", "liking", "likes"]));

    });

    it("doubles the final consonant on short CVC words (stop)", () => {

        const forms = getInflectedForms("stop");

        expect(forms).toEqual(expect.arrayContaining(["stopped", "stopping"]));

    });

    it("does not double the final consonant when the word isn't CVC (work)", () => {

        const forms = getInflectedForms("work");

        expect(forms).not.toContain("workked");
        expect(forms).not.toContain("workking");

    });

    it("pluralizes nouns ending in s/x/z/ch/sh with -es", () => {

        expect(getInflectedForms("watch")).toContain("watches");
        expect(getInflectedForms("bus")).toContain("buses");

    });

    it("generates comparative and superlative forms", () => {

        const forms = getInflectedForms("big");

        expect(forms).toEqual(expect.arrayContaining(["bigger", "biggest"]));

    });

    it("never includes the original word", () => {

        const forms = getInflectedForms("work");

        expect(forms).not.toContain("work");

    });

    it("returns an empty array for empty or non a-z input", () => {

        expect(getInflectedForms("")).toEqual([]);
        expect(getInflectedForms(null)).toEqual([]);
        expect(getInflectedForms("good morning")).toEqual([]);

    });

});
