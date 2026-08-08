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

    it("shows no audio button for a word with no audio() reference - compatibility with every existing dictionary entry", () => {

        renderPopup({ isAuthenticated: true });

        expect(screen.queryByLabelText(/áudio/i)).toBeNull();

    });

    it("shows an audio button for a word authored with an audio() reference", () => {

        render(
            <AuthContext.Provider value={{ isAuthenticated: true }}>
                <AuthGateContext.Provider value={{ requestAuth: vi.fn() }}>
                    <WordPopup
                        word={{ word: "hello", translation: "olá", audio: { file: "/audio/hello.mp3" }, language: "english" }}
                        onClose={vi.fn()}
                    />
                </AuthGateContext.Provider>
            </AuthContext.Provider>
        );

        expect(screen.getByLabelText("Reproduzir áudio")).not.toBeNull();

    });

    describe("accessible dialog (U3) - default 'lesson' variant", () => {

        it("exposes dialog semantics labelled by the visible word heading", () => {

            renderPopup({ isAuthenticated: true });

            const dialog = screen.getByRole("dialog");
            expect(dialog.getAttribute("aria-modal")).toBe("true");

            const labelledBy = dialog.getAttribute("aria-labelledby");
            expect(document.getElementById(labelledBy).textContent).toContain("hello");

        });

        it("moves focus into the dialog on open", () => {

            renderPopup({ isAuthenticated: true });

            const dialog = screen.getByRole("dialog");
            expect(dialog.contains(document.activeElement)).toBe(true);

        });

        it("wraps Tab from the last button (Fechar) back to the first (Adicionar)", () => {

            renderPopup({ isAuthenticated: true });

            screen.getByRole("button", { name: "Fechar" }).focus();
            fireEvent.keyDown(document, { key: "Tab" });

            expect(document.activeElement).toBe(screen.getByRole("button", { name: /Adicionar/ }));

        });

        it("still closes on Escape - existing dismiss behavior preserved", () => {

            const onClose = vi.fn();
            renderPopup({ isAuthenticated: true, onClose });

            fireEvent.keyDown(document, { key: "Escape" });

            expect(onClose).toHaveBeenCalled();

        });

    });

    describe("'explore' variant is not treated as a modal dialog (U3)", () => {

        function renderExplorePopup() {

            const anchorElement = document.createElement("button");
            document.body.appendChild(anchorElement);
            anchorElement.getBoundingClientRect = () => ({ top: 100, left: 100, bottom: 120, right: 160, width: 60, height: 20 });

            return render(
                <AuthContext.Provider value={{ isAuthenticated: true }}>
                    <AuthGateContext.Provider value={{ requestAuth: vi.fn() }}>
                        <WordPopup word={word} onClose={vi.fn()} variant="explore" anchorElement={anchorElement} />
                    </AuthGateContext.Provider>
                </AuthContext.Provider>
            );

        }

        it("has no dialog role and does not steal focus on open - it's a transient anchored tooltip, not a modal", () => {

            const trigger = document.createElement("button");
            document.body.appendChild(trigger);
            trigger.focus();

            renderExplorePopup();

            expect(screen.queryByRole("dialog")).toBeNull();
            expect(document.activeElement).toBe(trigger);

        });

    });

});
