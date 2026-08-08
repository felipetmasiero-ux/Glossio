import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import { LessonReader } from "./LessonReader";
import { AuthContext } from "../../../contexts/AuthContext";
import { AuthGateContext } from "../../../contexts/AuthGateContext";
import { LastActivityContext } from "../../../contexts/LastActivityContext";
import { EventProvider } from "../../../contexts/EventProvider";
import { LanguageContext } from "../../../contexts/LanguageContext";

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

// WordPopup (mounted unconditionally by lesson content blocks like
// InteractiveTextCard, waiting for a word to be selected) needs this -
// mocked the same way WordPopup.test.jsx/VocabularySection.test.jsx
// already mock it, since no test in this file exercises adding a
// flashcard from lesson body text.
vi.mock("../../../hooks/useFlashcards", () => ({ useFlashcards: vi.fn(() => ({ addFlashcard: vi.fn() })) }));

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
import { greetingsLesson } from "../../../data/lessons/english/a1/greetings";

const lesson = {
    id: "english-a1-greetings",
    language: "english",
    title: "Greetings",
    objectives: [],
    // Empty, not a hand-rolled shape - lesson.vocabulary is always an array
    // of plain word strings on real lesson data (see any file under
    // src/data/lessons), resolved through the real DictionaryRepository by
    // both VocabularySection and generateExercisesForLesson (both now run
    // for real here, not mocked). A malformed shape here would either need
    // a real dictionary entry to resolve safely or crash getVocabularyEntries -
    // simplest to just have none, since no test in this file below actually
    // asserts on specific vocabulary words.
    vocabulary: [],
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

// Unlike LocationProbe above (only rendered by the catch-all "*" route, so
// it never appears for a destination that also matches "/lessons/:id" -
// e.g. navigating from one lesson straight to the next one), this is
// mounted as a permanent sibling of <Routes>, so it reflects the current
// path no matter which route (if any) matched it.
function CurrentPathBadge() {
    const location = useLocation();
    return <div data-testid="current-path">{location.pathname}</div>;
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
                    <EventProvider>
                    <LanguageContext.Provider value={{ language: lessonToRender.language, setLanguage: () => {} }}>
                    <LastActivityContext.Provider value={{ lastActivity, setActivity, clearActivity }}>
                        <CurrentPathBadge />
                        <Routes>
                            <Route path="/lessons/:id" element={<LessonReader lesson={lessonToRender} />} />
                            <Route path="*" element={<LocationProbe />} />
                        </Routes>
                    </LastActivityContext.Provider>
                    </LanguageContext.Provider>
                    </EventProvider>
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

        // "hello" is a real English dictionary entry (see
        // src/data/dictionary/english/a1.js) - needed here specifically
        // because this test's whole point is a non-empty
        // lesson.vocabulary, unlike every other test in this file which
        // uses the vocabulary-free base fixture.
        renderReader({ isAuthenticated: false, lessonToRender: { ...lesson, vocabulary: ["hello"] } });

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

    // R6: practice this lesson's own exercises right after finishing it,
    // instead of only ever discovering them at the end of the whole
    // module. greetingsLesson is real lesson data (not a synthetic
    // fixture) specifically so generateExercisesForLesson - unmocked here,
    // the same function ExerciseSessionPage's own hook already calls -
    // produces real, non-empty exercises, the same way it would in
    // production.
    describe("practice this lesson's exercises (R6)", () => {

        it("A - shows the practice CTA once the lesson (which has real exercises) reaches its last step", () => {

            renderReader({ isAuthenticated: true, lessonToRender: greetingsLesson });

            expect(screen.getByRole("button", { name: /Praticar exercícios desta lição/ })).not.toBeNull();

        });

        it("B/C - clicking it completes the lesson (correct lessonId/language) and navigates to that lesson's own exercise session", () => {

            const completeLesson = vi.fn();

            renderReader({ isAuthenticated: true, lessonToRender: greetingsLesson, completeLesson });

            fireEvent.click(screen.getByRole("button", { name: /Praticar exercícios desta lição/ }));

            expect(completeLesson).toHaveBeenCalledWith("english-a1-greetings", "english");
            expect(screen.getByTestId("location").textContent).toBe("/exercises/english-a1-greetings");

        });

        it("D - a lesson with no exercises shows no practice CTA, and normal completion still works", () => {

            const completeLesson = vi.fn();

            ModuleRepository.getByLesson.mockReturnValue(null);

            // The base `lesson` fixture has no vocabulary and no example/
            // dialogue-shaped blocks - generateExercisesForLesson genuinely
            // produces nothing for it, the same as any lesson too short to
            // generate exercises from in production.
            renderReader({ isAuthenticated: true, completeLesson });

            expect(screen.queryByRole("button", { name: /Praticar exercícios/ })).toBeNull();

            fireEvent.click(screen.getByText("Concluir lição"));

            expect(completeLesson).toHaveBeenCalledWith("english-a1-greetings", "english");

        });

        it("E - the practice CTA does not replace \"Concluir lição\" or the existing module-complete routing", () => {

            ModuleRepository.getByLesson.mockReturnValue({ id: "mod-1", lessons: [{ id: greetingsLesson.id }] });
            ModuleRepository.isLastLessonInModule.mockReturnValue(true);

            renderReader({ isAuthenticated: true, lessonToRender: greetingsLesson });

            expect(screen.getByRole("button", { name: /Praticar exercícios desta lição/ })).not.toBeNull();

            fireEvent.click(screen.getByText("Concluir lição"));

            expect(screen.getByTestId("location").textContent).toBe("/lessons/module/mod-1/complete");

        });

        it("F - \"Concluir lição\" still advances to the next lesson normally when there is one", () => {

            ModuleRepository.getByLesson.mockReturnValue(null);
            ModuleRepository.getNextLesson.mockReturnValue({ id: "english-a1-introductions" });

            renderReader({ isAuthenticated: true, lessonToRender: greetingsLesson });

            fireEvent.click(screen.getByText("Concluir lição"));

            expect(screen.getByTestId("current-path").textContent).toBe("/lessons/english-a1-introductions");

        });

        it("G - clicking the practice CTA only ever completes the lesson once (no duplicate completion)", () => {

            const completeLesson = vi.fn();

            renderReader({ isAuthenticated: true, lessonToRender: greetingsLesson, completeLesson });

            fireEvent.click(screen.getByRole("button", { name: /Praticar exercícios desta lição/ }));

            expect(completeLesson).toHaveBeenCalledTimes(1);

        });

        it("for an anonymous visitor, clicking the practice CTA gates completion behind the same auth CTA \"Concluir lição\" already uses, instead of silently completing anything", () => {

            const requestAuth = vi.fn();
            const completeLesson = vi.fn();

            renderReader({ isAuthenticated: false, lessonToRender: greetingsLesson, requestAuth, completeLesson });

            fireEvent.click(screen.getByRole("button", { name: /Praticar exercícios desta lição/ }));

            expect(completeLesson).not.toHaveBeenCalled();
            expect(requestAuth).toHaveBeenCalledWith(expect.any(String));

        });

    });

});
