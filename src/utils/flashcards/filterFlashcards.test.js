import { describe, expect, it } from "vitest";

import { filterFlashcards } from "./filterFlashcards";
import { NO_DECK_FILTER } from "../../constants/decks";

function card(word, overrides = {}) {
    return { id: word, word, translation: `translation-${word}`, language: "english", favorite: false, deckId: null, ...overrides };
}

describe("filterFlashcards", () => {

    it("returns every card when no filter is active", () => {

        const cards = [card("hello"), card("bye")];

        expect(filterFlashcards(cards)).toEqual(cards);

    });

    it("filters by word (case-insensitive)", () => {

        const cards = [card("Hello"), card("bye")];

        const result = filterFlashcards(cards, { search: "hel" });

        expect(result.map(c => c.word)).toEqual(["Hello"]);

    });

    it("filters by translation as well as word", () => {

        const cards = [card("hello", { translation: "olá" }), card("bye", { translation: "tchau" })];

        const result = filterFlashcards(cards, { search: "olá" });

        expect(result.map(c => c.word)).toEqual(["hello"]);

    });

    it("filters to favorites only when requested", () => {

        const cards = [card("hello", { favorite: true }), card("bye", { favorite: false })];

        const result = filterFlashcards(cards, { favoritesOnly: true });

        expect(result.map(c => c.word)).toEqual(["hello"]);

    });

    it("combines search and favoritesOnly", () => {

        const cards = [
            card("hello", { favorite: true }),
            card("help", { favorite: false }),
            card("bye", { favorite: true })
        ];

        const result = filterFlashcards(cards, { search: "hel", favoritesOnly: true });

        expect(result.map(c => c.word)).toEqual(["hello"]);

    });

    it("returns an empty array when nothing matches", () => {

        const cards = [card("hello")];

        expect(filterFlashcards(cards, { search: "xyz" })).toEqual([]);

    });

    it("filters by deckId when a deck is selected", () => {

        const cards = [
            card("hello", { deckId: "deck-1" }),
            card("bye", { deckId: "deck-2" })
        ];

        const result = filterFlashcards(cards, { deckId: "deck-1" });

        expect(result.map(c => c.word)).toEqual(["hello"]);

    });

    it("filters to cards with no deck using the NO_DECK_FILTER sentinel", () => {

        const cards = [
            card("hello", { deckId: "deck-1" }),
            card("bye", { deckId: null })
        ];

        const result = filterFlashcards(cards, { deckId: NO_DECK_FILTER });

        expect(result.map(c => c.word)).toEqual(["bye"]);

    });

});
