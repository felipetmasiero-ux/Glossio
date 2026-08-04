import { describe, expect, it } from "vitest";

import { isDuplicateDeck } from "./isDuplicateDeck";

function deck(id, name, language) {
    return { id, name, language };
}

describe("isDuplicateDeck", () => {

    it("detects a duplicate name in the same language, case-insensitively", () => {

        const decks = [deck("1", "Verbos", "English")];

        expect(isDuplicateDeck(decks, { name: "verbos", language: "English" })).toBe(true);

    });

    it("does not flag the same name in a different language", () => {

        const decks = [deck("1", "Verbos", "English")];

        expect(isDuplicateDeck(decks, { name: "Verbos", language: "French" })).toBe(false);

    });

    it("excludes the given deck id (renaming a deck should not collide with itself)", () => {

        const decks = [deck("1", "Verbos", "English")];

        expect(isDuplicateDeck(decks, { name: "Verbos", language: "English", excludeId: "1" })).toBe(false);

    });

});
