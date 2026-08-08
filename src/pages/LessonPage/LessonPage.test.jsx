import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { LessonPage } from "./LessonPage";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthGateContext } from "../../contexts/AuthGateContext";
import { EventContext } from "../../contexts/EventContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { FlashcardContext } from "../../contexts/FlashcardContext";
import { LastActivityContext } from "../../contexts/LastActivityContext";

vi.mock("../../hooks/useLessonProgress", () => ({ useLessonProgress: vi.fn() }));

import { useLessonProgress } from "../../hooks/useLessonProgress";

function renderPage(initialEntry) {

    useLessonProgress.mockReturnValue({ completedLessons: [], completeLesson: vi.fn() });

    // Mirrors the real anonymous tree from App.jsx: every provider is
    // mounted above every route regardless of auth state, an anonymous
    // visitor just gets logged-out/empty values for each of them.
    return render(
        <AuthContext.Provider value={{ isAuthenticated: false }}>
            <AuthGateContext.Provider value={{ requestAuth: vi.fn() }}>
                <EventContext.Provider value={{ logEvent: vi.fn() }}>
                    <LanguageContext.Provider value={{ language: "" }}>
                        <FlashcardContext.Provider value={{ addFlashcard: vi.fn() }}>
                            <LastActivityContext.Provider value={{ lastActivity: null, setActivity: vi.fn(), clearActivity: vi.fn() }}>
                                <MemoryRouter initialEntries={[initialEntry]}>
                                    <Routes>
                                        <Route path="/lessons/:id" element={<LessonPage />} />
                                    </Routes>
                                </MemoryRouter>
                            </LastActivityContext.Provider>
                        </FlashcardContext.Provider>
                    </LanguageContext.Provider>
                </EventContext.Provider>
            </AuthGateContext.Provider>
        </AuthContext.Provider>
    );

}

describe("LessonPage", () => {

    // No AuthContext, AuthGateContext or LanguageContext provider anywhere
    // here - this is the exact tree an anonymous visitor (or a crawler)
    // gets on a direct lesson link, and the page must resolve real content
    // from nothing but the :id param (see LessonPage.jsx's getLanguageFromId
    // comment - useLessons()/LanguageContext would have returned nothing).

    it("renders the first lesson of a module for an anonymous visitor", () => {

        renderPage("/lessons/english-a1-greetings");

        expect(screen.getByRole("heading", { name: /Greetings/i })).not.toBeNull();

    });

    it("shows a not-found state for an unknown lesson id, without crashing", () => {

        renderPage("/lessons/klingon-a1-greetings");

        expect(screen.getByText("Lição não encontrada")).not.toBeNull();

    });

    it("shows a locked state for a lesson beyond what's been completed", () => {

        renderPage("/lessons/english-a1-review");

        expect(screen.getByText("Lição bloqueada")).not.toBeNull();

    });

});
