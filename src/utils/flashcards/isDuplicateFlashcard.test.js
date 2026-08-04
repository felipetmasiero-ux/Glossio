import { describe, expect, it } from "vitest";

import { isDuplicateFlashcard } from "./isDuplicateFlashcard";

function card(id, word, language) {
    return { id, word, language };
}

describe("isDuplicateFlashcard", () => {

    it("detects a duplicate word in the same language, case-insensitively", () => {

        const cards = [card("1", "Casa", "English")];

        expect(isDuplicateFlashcard(cards, { word: "casa", language: "English" })).toBe(true);

    });

    it("does not flag the same word in a different language", () => {

        const cards = [card("1", "casa", "English")];

        expect(isDuplicateFlashcard(cards, { word: "casa", language: "French" })).toBe(false);

    });

    it("excludes the given card id (editing a card should not collide with itself)", () => {

        const cards = [card("1", "casa", "English")];

        expect(isDuplicateFlashcard(cards, { word: "casa", language: "English", excludeId: "1" })).toBe(false);

    });

    it("returns false for an empty/blank word", () => {

        const cards = [card("1", "casa", "English")];

        expect(isDuplicateFlashcard(cards, { word: "  ", language: "English" })).toBe(false);

    });

});
