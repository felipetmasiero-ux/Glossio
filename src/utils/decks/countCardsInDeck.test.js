import { describe, expect, it } from "vitest";

import { countCardsInDeck } from "./countCardsInDeck";

describe("countCardsInDeck", () => {

    it("counts only cards assigned to the given deck", () => {

        const cards = [
            { id: "1", deckId: "deck-1" },
            { id: "2", deckId: "deck-1" },
            { id: "3", deckId: "deck-2" },
            { id: "4", deckId: null }
        ];

        expect(countCardsInDeck(cards, "deck-1")).toBe(2);
        expect(countCardsInDeck(cards, "deck-2")).toBe(1);

    });

    it("returns 0 for a deck with no cards", () => {

        const cards = [{ id: "1", deckId: "deck-1" }];

        expect(countCardsInDeck(cards, "deck-empty")).toBe(0);

    });

});
