import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { WordPopup } from "./WordPopup";
import { AuthContext } from "../../../contexts/AuthContext";
import { AuthGateContext } from "../../../contexts/AuthGateContext";

vi.mock("../../../hooks/useFlashcards", () => ({ useFlashcards: vi.fn() }));
vi.mock("../../../hooks/useLanguage", () => ({ useLanguage: vi.fn() }));

import { useFlashcards } from "../../../hooks/useFlashcards";
import { useLanguage } from "../../../hooks/useLanguage";

const word = { word: "hello", translation: "olá" };

function renderPopup({ isAuthenticated, requestAuth = vi.fn(), ...props }) {
    return render(
        <AuthContext.Provider value={{ isAuthenticated }}>
            <AuthGateContext.Provider value={{ requestAuth }}>
                <WordPopup word={word} onClose={vi.fn()} {...props} />
            </AuthGateContext.Provider>
        </AuthContext.Provider>
    );
}

describe("WordPopup", () => {

    let addFlashcard;
    let onClose;
    let onAdd;

    beforeEach(() => {
        addFlashcard = vi.fn();
        onClose = vi.fn();
        onAdd = vi.fn();

        useFlashcards.mockReturnValue({ addFlashcard });
        useLanguage.mockReturnValue({ language: "english" });
    });

    it("saves the flashcard directly when the visitor is authenticated", () => {

        renderPopup({ isAuthenticated: true, onClose, onAdd });

        fireEvent.click(screen.getByText("Adicionar"));

        expect(addFlashcard).toHaveBeenCalledWith(word, "english");
        expect(onAdd).toHaveBeenCalledWith("hello");
        expect(onClose).toHaveBeenCalled();

    });

    it("gates the add behind the auth CTA for an anonymous visitor, without saving anything", () => {

        const requestAuth = vi.fn();

        renderPopup({ isAuthenticated: false, requestAuth, onClose, onAdd });

        fireEvent.click(screen.getByText("Adicionar"));

        expect(addFlashcard).not.toHaveBeenCalled();
        expect(onAdd).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
        expect(requestAuth).toHaveBeenCalledWith(expect.any(String));

    });

});
