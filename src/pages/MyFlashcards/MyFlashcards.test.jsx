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
