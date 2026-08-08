import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { MyFlashcards } from "./MyFlashcards";
import { FlashcardContext } from "../../contexts/FlashcardContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { DeckContext } from "../../contexts/DeckContext";
import { createFlashcard } from "../../utils/flashcards/createFlashcard";

const favoriteCard = { ...createFlashcard({ word: "gato", translation: "cat", language: "english" }), favorite: true };
const otherCard = { ...createFlashcard({ word: "cachorro", translation: "dog", language: "english" }), favorite: false };

function renderPage(initialEntry = "/my-flashcards") {

    return render(
        <FlashcardContext.Provider value={{
            flashcards: [favoriteCard, otherCard],
            removeFlashcard: vi.fn(),
            toggleFavorite: vi.fn(),
            addFlashcard: vi.fn(),
            updateFlashcard: vi.fn()
        }}
        >
            <LanguageContext.Provider value={{ language: "english" }}>
                <DeckContext.Provider value={{ decks: [], addDeck: vi.fn(), updateDeck: vi.fn(), removeDeck: vi.fn() }}>
                    <MemoryRouter initialEntries={[initialEntry]}>
                        <Routes>
                            <Route path="/my-flashcards" element={<MyFlashcards />} />
                        </Routes>
                    </MemoryRouter>
                </DeckContext.Provider>
            </LanguageContext.Provider>
        </FlashcardContext.Provider>
    );

}

describe("MyFlashcards - favoritesOnly initial state (L3)", () => {

    function favoritesToggleGroup() {
        return within(screen.getByRole("group", { name: "Filtrar por favoritos" }));
    }

    it("starts with favoritesOnly active when navigated to with { state: { favoritesOnly: true } } - the FavoritesSummaryCard CTA path", () => {

        renderPage({ pathname: "/my-flashcards", state: { favoritesOnly: true } });

        expect(screen.getByText("gato")).not.toBeNull();
        expect(screen.queryByText("cachorro")).toBeNull();

        const toggle = favoritesToggleGroup();
        expect(toggle.getByRole("button", { name: /Favoritos/ }).getAttribute("aria-pressed")).toBe("true");
        expect(toggle.getByRole("button", { name: "Todos" }).getAttribute("aria-pressed")).toBe("false");

    });

    it("opens with every card visible (no filter) when navigated to directly, without state", () => {

        renderPage("/my-flashcards");

        expect(screen.getByText("gato")).not.toBeNull();
        expect(screen.getByText("cachorro")).not.toBeNull();

        const toggle = favoritesToggleGroup();
        expect(toggle.getByRole("button", { name: /Favoritos/ }).getAttribute("aria-pressed")).toBe("false");
        expect(toggle.getByRole("button", { name: "Todos" }).getAttribute("aria-pressed")).toBe("true");

    });

    it("lets the user turn the filter back off after arriving from the Favoritas CTA", () => {

        renderPage({ pathname: "/my-flashcards", state: { favoritesOnly: true } });

        expect(screen.queryByText("cachorro")).toBeNull();

        fireEvent.click(favoritesToggleGroup().getByRole("button", { name: "Todos" }));

        expect(screen.getByText("cachorro")).not.toBeNull();

    });

});

describe("MyFlashcards - content survives narrow layouts (U4)", () => {

    // This suite can't check pixels/overflow (no visual browser here) - it
    // confirms the responsive CSS changes didn't strip, hide behind
    // conditional logic, or otherwise remove any content/actions, which is
    // the one thing Testing Library *can* verify about a CSS-only change.

    function renderWith({ flashcards = [], decks = [], toggleFavorite = vi.fn(), removeFlashcard = vi.fn(), updateFlashcard = vi.fn(), addFlashcard = vi.fn() }) {

        return render(
            <FlashcardContext.Provider value={{ flashcards, removeFlashcard, toggleFavorite, addFlashcard, updateFlashcard }}>
                <LanguageContext.Provider value={{ language: "english" }}>
                    <DeckContext.Provider value={{ decks, addDeck: vi.fn(), updateDeck: vi.fn(), removeDeck: vi.fn() }}>
                        <MemoryRouter initialEntries={["/my-flashcards"]}>
                            <Routes>
                                <Route path="/my-flashcards" element={<MyFlashcards />} />
                            </Routes>
                        </MemoryRouter>
                    </DeckContext.Provider>
                </LanguageContext.Provider>
            </FlashcardContext.Provider>
        );

    }

    it("shows the empty state when there are no flashcards at all", () => {

        renderWith({ flashcards: [] });

        expect(screen.getByText("Nenhum flashcard ainda")).not.toBeNull();

    });

    it("keeps a very long word and translation fully in the DOM - CSS only wraps them, nothing is truncated or removed", () => {

        const longWord = "pneumonoultramicroscopicsilicovolcanoconiosis-um-exemplo-de-palavra-extremamente-longa";
        const longTranslation = "uma tradução propositalmente muito longa para verificar que o card não corta nem remove o texto em telas estreitas";

        const card = createFlashcard({ word: longWord, translation: longTranslation, language: "english" });

        renderWith({ flashcards: [card] });

        expect(screen.getByText(longWord)).not.toBeNull();
        expect(screen.getByText(longTranslation)).not.toBeNull();

    });

    it("keeps a flashcard with an example and notes fully rendered", () => {

        const card = createFlashcard({
            word: "casa",
            translation: "house",
            language: "english",
            example: "Minha casa é grande.",
            notes: "Cuidado para não confundir com 'caza'."
        });

        renderWith({ flashcards: [card] });

        expect(screen.getByText('"Minha casa é grande."')).not.toBeNull();
        expect(screen.getByText("Cuidado para não confundir com 'caza'.")).not.toBeNull();

    });

    it("keeps every action (favorite, edit, delete) reachable for a card with all of them", () => {

        const card = createFlashcard({ word: "gato", translation: "cat", language: "english" });

        renderWith({ flashcards: [card] });

        expect(screen.getByRole("button", { name: "Adicionar aos favoritos" })).not.toBeNull();
        expect(screen.getByRole("button", { name: /Editar/ })).not.toBeNull();
        expect(screen.getByRole("button", { name: "Excluir" })).not.toBeNull();

    });

    it("renders a deck with a very long name without losing the filter chip or the card's deck badge", () => {

        const longDeckName = "Um nome de deck extremamente longo que poderia estourar a largura do card em telas estreitas";
        const deck = { id: "deck-1", name: longDeckName, language: "english" };
        const card = createFlashcard({ word: "gato", translation: "cat", language: "english", deckId: "deck-1" });

        renderWith({ flashcards: [card], decks: [deck] });

        // Appears twice: once as the filter chip in DecksBar, once as the
        // card's own deck badge in FlashcardItem - both must stay present.
        expect(screen.getAllByText(longDeckName).length).toBeGreaterThanOrEqual(2);

    });

    it("keeps multiple decks all selectable as filters", () => {

        const decks = [
            { id: "deck-1", name: "Verbos", language: "english" },
            { id: "deck-2", name: "Substantivos", language: "english" },
            { id: "deck-3", name: "Adjetivos", language: "english" }
        ];

        renderWith({ flashcards: [], decks });

        expect(screen.getByRole("button", { name: "Verbos 0" })).not.toBeNull();
        expect(screen.getByRole("button", { name: "Substantivos 0" })).not.toBeNull();
        expect(screen.getByRole("button", { name: "Adjetivos 0" })).not.toBeNull();

    });

    it("still opens and closes the 'novo flashcard' overlay - unaffected by the layout changes", () => {

        renderWith({ flashcards: [] });

        expect(screen.queryByRole("dialog")).toBeNull();

        fireEvent.click(screen.getByText("+ Novo flashcard"));

        expect(screen.getByRole("dialog")).not.toBeNull();

        fireEvent.click(screen.getByText("Cancelar"));

        expect(screen.queryByRole("dialog")).toBeNull();

    });

    it("still combines search, favorites and deck filters correctly", () => {

        const deck = { id: "deck-1", name: "Animais", language: "english" };

        const matching = { ...createFlashcard({ word: "gato", translation: "cat", language: "english", deckId: "deck-1" }), favorite: true };
        const wrongDeck = { ...createFlashcard({ word: "gata", translation: "female cat", language: "english", deckId: null }), favorite: true };
        const notFavorite = { ...createFlashcard({ word: "galo", translation: "rooster", language: "english", deckId: "deck-1" }), favorite: false };

        renderWith({ flashcards: [matching, wrongDeck, notFavorite], decks: [deck] });

        fireEvent.click(within(screen.getByRole("group", { name: "Filtrar por favoritos" })).getByRole("button", { name: /Favoritos/ }));
        fireEvent.click(screen.getByRole("button", { name: "Animais 2" }));

        expect(screen.getByText("gato")).not.toBeNull();
        expect(screen.queryByText("gata")).toBeNull();
        expect(screen.queryByText("galo")).toBeNull();

    });

});
