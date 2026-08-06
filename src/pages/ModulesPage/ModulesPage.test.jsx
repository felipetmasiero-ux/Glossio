import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { ModulesPage } from "./ModulesPage";
import { LanguageContext } from "../../contexts/LanguageContext";

vi.mock("../../hooks/useLessonProgress", () => ({ useLessonProgress: vi.fn() }));

import { useLessonProgress } from "../../hooks/useLessonProgress";

function renderPage(initialEntry) {

    useLessonProgress.mockReturnValue({ completedLessons: [] });

    return render(
        // An anonymous visitor's LanguageContext is "" (never set) - this is
        // exactly the state that used to make this page silently show no
        // modules at all when reached via the public /lessons/language/:x
        // route (see ModulesPage.jsx's comment on why the URL param wins).
        <LanguageContext.Provider value={{ language: "" }}>
            <MemoryRouter initialEntries={[initialEntry]}>
                <Routes>
                    <Route path="/lessons/language/:language" element={<ModulesPage />} />
                </Routes>
            </MemoryRouter>
        </LanguageContext.Provider>
    );

}

describe("ModulesPage", () => {

    it("resolves the course from the URL language param even with an empty LanguageContext", () => {

        renderPage("/lessons/language/english");

        expect(screen.getByText("English")).not.toBeNull();
        expect(screen.queryByText("Nenhum módulo ainda")).toBeNull();

    });

    it("works the same way for a different language", () => {

        renderPage("/lessons/language/french");

        expect(screen.getByText("French")).not.toBeNull();

    });

});
