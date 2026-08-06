import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { ModuleLessonsPage } from "./ModuleLessonsPage";

vi.mock("../../hooks/useLessonProgress", () => ({ useLessonProgress: vi.fn() }));

import { useLessonProgress } from "../../hooks/useLessonProgress";

function renderPage(initialEntry) {

    useLessonProgress.mockReturnValue({ completedLessons: [], isLessonCompleted: () => false });

    return render(
        <MemoryRouter initialEntries={[initialEntry]}>
            <Routes>
                <Route path="/lessons/module/:moduleId" element={<ModuleLessonsPage />} />
            </Routes>
        </MemoryRouter>
    );

}

describe("ModuleLessonsPage", () => {

    // No LanguageContext provider anywhere in this render tree - the
    // language for this page comes entirely from the moduleId in the URL
    // (getLanguageFromId), which is what makes it safe as a public route.

    it("resolves the module and its lessons from the id alone", () => {

        renderPage("/lessons/module/english-a1");

        expect(screen.getByText("English A1")).not.toBeNull();

    });

    it("shows a not-found state for an unknown module id, without crashing", () => {

        renderPage("/lessons/module/klingon-a1");

        expect(screen.getByText("Módulo não encontrado")).not.toBeNull();

    });

});
