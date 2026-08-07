import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

vi.mock("../../hooks/useLanguage", () => ({ useLanguage: vi.fn() }));
vi.mock("../../hooks/useEvents", () => ({ useEvents: vi.fn() }));
vi.mock("../../hooks/useFlashcards", () => ({ useFlashcards: vi.fn() }));

vi.mock("../../utils/courses/ModuleRepository", () => ({
    ModuleRepository: {
        getById: vi.fn(),
        getNextModule: vi.fn(() => null)
    }
}));

vi.mock("../../utils/courses/getModuleCompletionStats", () => ({
    getModuleCompletionStats: vi.fn()
}));

import { useLanguage } from "../../hooks/useLanguage";
import { useEvents } from "../../hooks/useEvents";
import { useFlashcards } from "../../hooks/useFlashcards";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";
import { getModuleCompletionStats } from "../../utils/courses/getModuleCompletionStats";
import { ModuleCompletePage } from "./ModuleCompletePage";

const module_ = { id: "english-a1", title: "English A1", lessons: [{ id: "english-a1-greetings" }] };

const baseStats = {
    lessonCount: 1,
    wordsLearned: 5,
    flashcardsAdded: 0,
    quizAccuracy: 80,
    quizzesAnswered: 5,
    estimatedMinutes: 10
};

function renderPage() {
    return render(
        <MemoryRouter initialEntries={["/lessons/module/english-a1/complete"]}>
            <Routes>
                <Route path="/lessons/module/:moduleId/complete" element={<ModuleCompletePage />} />
            </Routes>
        </MemoryRouter>
    );
}

describe("ModuleCompletePage", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        useLanguage.mockReturnValue({ language: "english" });
        useEvents.mockReturnValue({ events: [] });
        useFlashcards.mockReturnValue({ flashcards: [] });
        ModuleRepository.getById.mockReturnValue(module_);
        ModuleRepository.getNextModule.mockReturnValue(null);
        getModuleCompletionStats.mockReturnValue(baseStats);
    });

    it("always shows a link to practice the module's exercises, using the real module route", () => {

        renderPage();

        const link = screen.getByRole("link", { name: "Praticar exercícios" });
        expect(link.getAttribute("href")).toBe("/exercises/module/english-a1");

    });

    it("does not show a flashcards review link when no flashcards were added for this module", () => {

        getModuleCompletionStats.mockReturnValue({ ...baseStats, flashcardsAdded: 0 });

        renderPage();

        expect(screen.queryByRole("link", { name: "Revisar flashcards" })).toBeNull();

    });

    it("shows a flashcards review link, to the real study route, when flashcards were added for this module", () => {

        getModuleCompletionStats.mockReturnValue({ ...baseStats, flashcardsAdded: 4 });

        renderPage();

        const link = screen.getByRole("link", { name: "Revisar flashcards" });
        expect(link.getAttribute("href")).toBe("/flashcards");

    });

    it("still renders the not-found state when the module doesn't exist - unaffected by the new CTAs", () => {

        ModuleRepository.getById.mockReturnValue(null);

        renderPage();

        expect(screen.getByText("Módulo não encontrado")).not.toBeNull();
        expect(screen.queryByRole("link", { name: "Praticar exercícios" })).toBeNull();

    });

    it("still shows the existing stats and primary continue button", () => {

        renderPage();

        expect(screen.getByText("English A1")).not.toBeNull();
        expect(screen.getByRole("button", { name: "Voltar aos módulos" })).not.toBeNull();

    });

});
