import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import { LessonReader } from "./LessonReader";
import { AuthContext } from "../../../contexts/AuthContext";
import { AuthGateContext } from "../../../contexts/AuthGateContext";

vi.mock("../../../hooks/useLessonProgress", () => ({ useLessonProgress: vi.fn() }));

vi.mock("../../../utils/courses/ModuleRepository", () => ({
    ModuleRepository: {
        getNextLesson: vi.fn(() => null),
        getPreviousLesson: vi.fn(() => null),
        getByLesson: vi.fn(() => null),
        getProgress: vi.fn(() => ({ completed: 0, total: 1 })),
        getAllLessonsInOrder: vi.fn(() => []),
        isLastLessonInModule: vi.fn(() => false)
    }
}));

vi.mock("../../../repositories/VideoRepository", () => ({
    VideoRepository: { getAll: vi.fn(() => []) }
}));

vi.mock("../../../repositories/VideoProgressRepository", () => ({
    VideoProgressRepository: { getProgress: vi.fn(() => ({})) }
}));

vi.mock("../../../utils/recommendations", () => ({ getRelatedContent: vi.fn(() => []) }));

// Real VocabularySection resolves each vocabulary entry through
// DictionaryRepository, which needs real dictionary data this test's
// fixture lesson doesn't have - WordPopup.test.jsx already covers the
// add-to-flashcards gating in isolation, so here a lightweight stub is
// enough to assert the InlineSignupPrompt placement.
vi.mock("../VocabularySection/VocabularySection", () => ({
    VocabularySection: ({ vocabulary }) => <div data-testid="vocabulary-section">{vocabulary.length} words</div>
}));

import { useLessonProgress } from "../../../hooks/useLessonProgress";
import { ModuleRepository } from "../../../utils/courses/ModuleRepository";

const lesson = {
    id: "english-a1-greetings",
    language: "english",
    title: "Greetings",
    objectives: [],
    vocabulary: [{ word: "hello", translation: "olá" }],
    summary: "",
    blocks: [{ type: "step", title: "Passo 1" }, { type: "text", content: "Olá!" }]
};

function LocationProbe() {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
}

function renderReader({ isAuthenticated, requestAuth = vi.fn(), completeLesson = vi.fn() }) {

    useLessonProgress.mockReturnValue({ completedLessons: {}, completeLesson });

    return render(
        <MemoryRouter initialEntries={["/lessons/english-a1-greetings"]}>
            <AuthContext.Provider value={{ isAuthenticated }}>
                <AuthGateContext.Provider value={{ requestAuth }}>
                    <Routes>
                        <Route path="/lessons/:id" element={<LessonReader lesson={lesson} />} />
                        <Route path="*" element={<LocationProbe />} />
                    </Routes>
                </AuthGateContext.Provider>
            </AuthContext.Provider>
        </MemoryRouter>
    );

}

describe("LessonReader", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("shows the inline signup prompt to an anonymous visitor when the lesson has vocabulary", () => {

        renderReader({ isAuthenticated: false });

        expect(screen.getByText(/Crie uma conta grátis/)).not.toBeNull();

    });

    it("does not show the inline signup prompt to an authenticated user", () => {

        renderReader({ isAuthenticated: true });

        expect(screen.queryByText(/Crie uma conta grátis/)).toBeNull();

    });

    it("gates lesson completion behind the auth CTA for a visitor, without saving progress", () => {

        const requestAuth = vi.fn();
        const completeLesson = vi.fn();

        renderReader({ isAuthenticated: false, requestAuth, completeLesson });

        fireEvent.click(screen.getByText("Concluir lição"));

        expect(completeLesson).not.toHaveBeenCalled();
        expect(requestAuth).toHaveBeenCalledWith(expect.any(String));

    });

    it("completes the lesson directly for an authenticated user and navigates onward", () => {

        const completeLesson = vi.fn();

        ModuleRepository.getByLesson.mockReturnValue(null);

        renderReader({ isAuthenticated: true, completeLesson });

        fireEvent.click(screen.getByText("Concluir lição"));

        expect(completeLesson).toHaveBeenCalledWith("english-a1-greetings", "english");
        expect(screen.getByTestId("location").textContent).toBe("/lessons");

    });

    it("sends a visitor finishing the lesson to the public module list instead of the protected one", () => {

        ModuleRepository.getByLesson.mockReturnValue(null);

        renderReader({ isAuthenticated: false });

        fireEvent.click(screen.getByText("Concluir lição"));

        expect(screen.getByTestId("location").textContent).toBe("/lessons/language/english");

    });

});
