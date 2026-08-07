import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { ExerciseSessionPage } from "./ExerciseSessionPage";
import { LanguageContext } from "../../contexts/LanguageContext";
import { EventContext } from "../../contexts/EventContext";
import { ExerciseProgressContext } from "../../contexts/ExerciseProgressContext";
import { LastActivityContext } from "../../contexts/LastActivityContext";
import { LessonRepository } from "../../utils/lessons/LessonRepository";

function renderPage(lessonId = "english-a1-greetings") {

    return render(
        <LanguageContext.Provider value={{ language: "english" }}>
            <EventContext.Provider value={{ logEvent: vi.fn() }}>
                <ExerciseProgressContext.Provider value={{ practiceLesson: vi.fn() }}>
                    <LastActivityContext.Provider value={{ setActivity: vi.fn(), clearActivity: vi.fn() }}>
                        <MemoryRouter initialEntries={[`/exercises/${lessonId}`]}>
                            <Routes>
                                <Route path="/exercises/:lessonId" element={<ExerciseSessionPage />} />
                            </Routes>
                        </MemoryRouter>
                    </LastActivityContext.Provider>
                </ExerciseProgressContext.Provider>
            </EventContext.Provider>
        </LanguageContext.Provider>
    );

}

describe("ExerciseSessionPage - lesson objectives (L2)", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("shows the lesson's objectives before the first exercise", () => {

        const lesson = LessonRepository.getById("english", "english-a1-greetings");

        renderPage("english-a1-greetings");

        expect(screen.getByText("Objetivos")).not.toBeNull();

        lesson.objectives.forEach(objective => {
            expect(screen.getByText(objective)).not.toBeNull();
        });

    });

    it("renders every objective in the original order", () => {

        const lesson = LessonRepository.getById("english", "english-a1-greetings");

        renderPage("english-a1-greetings");

        const items = screen.getAllByRole("listitem").map(item => item.textContent);

        // The objectives list is rendered before the exercise body, so its
        // items are the first ones in document order.
        expect(items.slice(0, lesson.objectives.length)).toEqual(lesson.objectives);

    });

    it("does not render an objectives section, or crash, for a lesson without objectives", () => {

        const realLesson = LessonRepository.getById("english", "english-a1-greetings");

        vi.spyOn(LessonRepository, "getById").mockReturnValue({ ...realLesson, objectives: [] });

        renderPage("english-a1-greetings");

        expect(screen.queryByText("Objetivos")).toBeNull();

        // The rest of the session still renders normally.
        expect(screen.getByText(/Progresso/)).not.toBeNull();

    });

    it("still renders the current exercise normally alongside the objectives - no regression", () => {

        renderPage("english-a1-greetings");

        expect(screen.getByText(/Progresso/)).not.toBeNull();

    });

});
