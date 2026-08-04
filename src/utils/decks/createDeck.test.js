import { describe, expect, it } from "vitest";

import { createDeck } from "./createDeck";

describe("createDeck", () => {

    it("creates a deck with a generated id and timestamps", () => {

        const deck = createDeck({ name: "Verbos irregulares", language: "English" });

        expect(deck.id).toBeTruthy();
        expect(deck.name).toBe("Verbos irregulares");
        expect(deck.language).toBe("English");
        expect(deck.createdAt).toBeTypeOf("number");
        expect(deck.updatedAt).toBe(deck.createdAt);

    });

    it("generates unique ids for different decks", () => {

        const a = createDeck({ name: "A", language: "English" });
        const b = createDeck({ name: "B", language: "English" });

        expect(a.id).not.toBe(b.id);

    });

});
