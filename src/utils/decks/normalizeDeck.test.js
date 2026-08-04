import { describe, expect, it } from "vitest";

import { normalizeDeck } from "./normalizeDeck";
import { normalizeDecks } from "./normalizeDecks";

describe("normalizeDeck", () => {

    it("fills in missing timestamps", () => {

        const result = normalizeDeck({ id: "1", name: "Deck", language: "English" });

        expect(result.createdAt).toBeTypeOf("number");
        expect(result.updatedAt).toBeTypeOf("number");

    });

    it("preserves existing timestamps", () => {

        const result = normalizeDeck({ id: "1", name: "Deck", language: "English", createdAt: 100, updatedAt: 200 });

        expect(result.createdAt).toBe(100);
        expect(result.updatedAt).toBe(200);

    });

});

describe("normalizeDecks", () => {

    it("drops decks with a blank/missing name", () => {

        const result = normalizeDecks([
            { id: "1", name: "Deck", language: "English" },
            { id: "2", name: "  ", language: "English" },
            { id: "3", language: "English" }
        ]);

        expect(result.map(deck => deck.id)).toEqual(["1"]);

    });

});
