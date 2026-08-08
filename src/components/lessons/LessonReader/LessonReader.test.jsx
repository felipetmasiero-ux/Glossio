import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import { LessonReader } from "./LessonReader";
import { AuthContext } from "../../../contexts/AuthContext";
import { AuthGateContext } from "../../../contexts/AuthGateContext";
import { LastActivityContext } from "../../../contexts/LastActivityContext";

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
// add-to-flashcards gating in isolation, and VocabularySection.test.jsx
// covers the bulk add-to-flashcards action in isolation. Here a
// lightweight stub is enough to assert the InlineSignupPrompt placement
// and that LessonReader passes the right props down (isAuthenticated,
// moduleId - see the "bulk add to flashcards" describe block below).
vi.mock("../VocabularySection/VocabularySection", () => ({
    VocabularySection: ({ vocabulary, isAuthenticated, moduleId }) => (
        <div data-testid="vocabulary-section" data-authenticated={String(isAuthenticated)} data-module-id={String(moduleId)}>
            {vocabulary.length} words
        </div>
    )
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

// A second step means "Continuar leitura" appears instead of "Concluir
// lição" right away - needed to exercise mid-lesson engagement (L4)
// without touching the single-step fixture every other test above relies on.
const multiStepLesson = {
    ...lesson,
    blocks: [
        { type: "step", title: "Passo 1" },
        { type: "text", content: "Primeiro passo" },
        { type: "step", title: "Passo 2" },
        { type: "text", content: "Segundo passo" }
    ]
};

function LocationProbe() {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
}

function renderReader({
    isAuthenticated,
    requestAuth = vi.fn(),
    completeLesson = vi.fn(),
    lessonToRender = lesson,
    lastActivity = null,
    setActivity = vi.fn(),
    clearActivity = vi.fn()
}) {

    useLessonProgress.mockReturnValue({ completedLessons: {}, completeLesson });

    return render(
        <MemoryRouter initialEntries={["/lessons/english-a1-greetings"]}>
            <AuthContext.Provider value={{ isAuthenticated }}>
                <AuthGateContext.Provider value={{ requestAuth }}>
                    <LastActivityContext.Provider value={{ lastActivity, setActivity, clearActivity }}>
                        <Routes>
                            <Route path="/lessons/:id" element={<LessonReader lesson={lessonToRender} />} />
                            <Route path="*" element={<LocationProbe />} />
                        </Routes>
                    </LastActivityContext.Provider>
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

    it("passes isAuthenticated through to VocabularySection, so its bulk add-to-flashcards action can gate on it", () => {

        renderReader({ isAuthenticated: true });

        expect(screen.getByTestId("vocabulary-section").dataset.authenticated).toBe("true");

    });

    it("passes isAuthenticated=false through to VocabularySection for an anonymous visitor", () => {

        renderReader({ isAuthenticated: false });

        expect(screen.getByTestId("vocabulary-section").dataset.authenticated).toBe("false");

    });

    it("passes the current module's id through to VocabularySection, so bulk-added cards carry it", () => {

        ModuleRepository.getByLesson.mockReturnValue({ id: "mod-1", lessons: [{ id: lesson.id }] });

        renderReader({ isAuthenticated: true });

        expect(screen.getByTestId("vocabulary-section").dataset.moduleId).toBe("mod-1");

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

    describe("Last Activity (L4)", () => {

        it("does not register any activity just from opening the lesson - only genuine engagement counts", () => {

            const setActivity = vi.fn();

            renderReader({ isAuthenticated: true, lessonToRender: multiStepLesson, setActivity });

            expect(setActivity).not.toHaveBeenCalled();

        });

        it("registers Last Activity with the right identifiers once the reader advances past the first step", () => {

            const setActivity = vi.fn();

            ModuleRepository.getByLesson.mockReturnValue({ id: "mod-1", lessons: [{ id: multiStepLesson.id }] });

            renderReader({ isAuthenticated: true, lessonToRender: multiStepLesson, setActivity });

            fireEvent.click(screen.getByText("Continuar leitura"));

            expect(setActivity).toHaveBeenCalledWith({
                type: "lesson",
                language: "english",
                lessonId: "english-a1-greetings",
                moduleId: "mod-1",
                remaining: 0,
                total: 2
            });

        });

        it("also registers on Anterior (previous step), not only Continuar leitura", () => {

            const setActivity = vi.fn();

            renderReader({ isAuthenticated: true, lessonToRender: multiStepLesson, setActivity });

            fireEvent.click(screen.getByText("Continuar leitura"));
            setActivity.mockClear();

            fireEvent.click(screen.getByText("Anterior"));

            expect(setActivity).toHaveBeenCalledWith(expect.objectContaining({
                type: "lesson",
                lessonId: "english-a1-greetings",
                remaining: 1
            }));

        });

        it("clears Last Activity on completion when it is still about this same lesson", () => {

            const clearActivity = vi.fn();

            ModuleRepository.getByLesson.mockReturnValue(null);

            renderReader({
                isAuthenticated: true,
                lastActivity: { type: "lesson", lessonId: "english-a1-greetings" },
                clearActivity
            });

            fireEvent.click(screen.getByText("Concluir lição"));

            expect(clearActivity).toHaveBeenCalled();

        });

        it("does not clear Last Activity on completion when it belongs to a different activity - e.g. a video watched afterwards", () => {

            const clearActivity = vi.fn();

            ModuleRepository.getByLesson.mockReturnValue(null);

            renderReader({
                isAuthenticated: true,
                lastActivity: { type: "video", videoId: "some-other-video" },
                clearActivity
            });

            fireEvent.click(screen.getByText("Concluir lição"));

            expect(clearActivity).not.toHaveBeenCalled();

        });

        it("does not clear Last Activity on completion when it belongs to a different lesson", () => {

            const clearActivity = vi.fn();

            ModuleRepository.getByLesson.mockReturnValue(null);

            renderReader({
                isAuthenticated: true,
                lastActivity: { type: "lesson", lessonId: "some-other-lesson" },
                clearActivity
            });

            fireEvent.click(screen.getByText("Concluir lição"));

            expect(clearActivity).not.toHaveBeenCalled();

        });

        it("does not clear Last Activity when completion is gated behind the auth CTA for a visitor", () => {

            const clearActivity = vi.fn();

            ModuleRepository.getByLesson.mockReturnValue(null);

            renderReader({
                isAuthenticated: false,
                lastActivity: { type: "lesson", lessonId: "english-a1-greetings" },
                clearActivity
            });

            fireEvent.click(screen.getByText("Concluir lição"));

            expect(clearActivity).not.toHaveBeenCalled();

        });

        it("tolerates an old/partial Last Activity object without crashing - compatibility with pre-existing data", () => {

            ModuleRepository.getByLesson.mockReturnValue(null);

            expect(() => renderReader({
                isAuthenticated: true,
                lastActivity: { type: "exercise" }
            })).not.toThrow();

        });

    });

});
