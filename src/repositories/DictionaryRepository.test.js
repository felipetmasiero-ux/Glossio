import { describe, expect, it } from "vitest";

import { DictionaryRepository } from "./DictionaryRepository";

const LANG = "english";

describe("DictionaryRepository", () => {

    describe("case insensitivity", () => {

        it("finds the same entry regardless of casing", () => {

            const lower = DictionaryRepository.getEntry(LANG, "hello");
            const upper = DictionaryRepository.getEntry(LANG, "HELLO");
            const mixed = DictionaryRepository.getEntry(LANG, "Hello");

            expect(lower).not.toBeNull();
            expect(upper).toBe(lower);
            expect(mixed).toBe(lower);

        });

    });

    describe("punctuation", () => {

        const suffixedForms = ["hello.", "hello,", "hello?", "hello!", "\"hello\"", "(hello)", "hello..."];

        it.each(suffixedForms)("recognizes %s as the base word", (form) => {

            expect(DictionaryRepository.hasWord(LANG, form)).toBe(true);
            expect(DictionaryRepository.getEntry(LANG, form)).toBe(DictionaryRepository.getEntry(LANG, "hello"));

        });

    });

    describe("explicit aliases", () => {

        it("resolves irregular verb forms declared as aliases (go)", () => {

            const base = DictionaryRepository.getEntry(LANG, "go");

            expect(DictionaryRepository.getEntry(LANG, "went")).toBe(base);
            expect(DictionaryRepository.getEntry(LANG, "gone")).toBe(base);
            expect(DictionaryRepository.getEntry(LANG, "goes")).toBe(base);

        });

        it("resolves irregular verb forms declared as aliases (have)", () => {

            const base = DictionaryRepository.getEntry(LANG, "have");

            expect(DictionaryRepository.getEntry(LANG, "has")).toBe(base);
            expect(DictionaryRepository.getEntry(LANG, "had")).toBe(base);

        });

        it("does not duplicate translations between an entry and its aliases", () => {

            const base = DictionaryRepository.getEntry(LANG, "go");
            const alias = DictionaryRepository.getEntry(LANG, "went");

            expect(alias.translation).toBe(base.translation);

        });

    });

    describe("mechanically inflected forms (verbs)", () => {

        it("recognizes study/studies/studied/studying as the same entry", () => {

            const base = DictionaryRepository.getEntry(LANG, "study");

            expect(DictionaryRepository.getEntry(LANG, "studies")).toBe(base);
            expect(DictionaryRepository.getEntry(LANG, "studied")).toBe(base);
            expect(DictionaryRepository.getEntry(LANG, "studying")).toBe(base);

        });

        it("recognizes regular -s/-ed/-ing forms (work)", () => {

            const base = DictionaryRepository.getEntry(LANG, "work");

            expect(DictionaryRepository.getEntry(LANG, "works")).toBe(base);
            expect(DictionaryRepository.getEntry(LANG, "worked")).toBe(base);
            expect(DictionaryRepository.getEntry(LANG, "working")).toBe(base);

        });

    });

    describe("mechanically inflected forms (nouns)", () => {

        it("recognizes the plural form of a noun", () => {

            const base = DictionaryRepository.getEntry(LANG, "teacher");

            expect(DictionaryRepository.getEntry(LANG, "teachers")).toBe(base);

        });

    });

    describe("contractions", () => {

        const contractions = ["I'm", "you're", "we're", "they're", "he's", "she's", "it's", "I've", "we've", "don't", "can't", "won't", "didn't", "doesn't", "isn't", "aren't"];

        it.each(contractions)("recognizes %s as a dictionary entry", (contraction) => {

            expect(DictionaryRepository.hasWord(LANG, contraction)).toBe(true);
            expect(DictionaryRepository.getEntry(LANG, contraction)?.translation).toBeTruthy();

        });

        it("recognizes contractions typed without the apostrophe, as they'd arrive from stripPunctuation", () => {

            expect(DictionaryRepository.getEntry(LANG, "dont")).toBe(DictionaryRepository.getEntry(LANG, "don't"));

        });

    });

    describe("unknown words", () => {

        it("returns null/false for words that don't exist", () => {

            expect(DictionaryRepository.getEntry(LANG, "xyznotarealword")).toBeNull();
            expect(DictionaryRepository.hasWord(LANG, "xyznotarealword")).toBe(false);

        });

    });

});
