import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import { Home } from "./Home";

import { useDashboardData } from "../../hooks/useDashboardData";
import { useStatistics } from "../../hooks/useStatistics";
import { useAchievements } from "../../hooks/useAchievements";
import { useGoalsSummary } from "../../hooks/useGoalsSummary";
import { PlacementTestStorage } from "../../utils/placementTest/placementTestStorage";

// R4 (post-sprint audit, H3/H4): Home.jsx sits on top of several
// independent hooks/repositories (useDashboardData, useStatistics,
// useAchievements, useGoalsSummary, PlacementTestStorage) - these are
// mocked at that boundary, matching the task's own preference, instead of
// mocking each of the ~20 child card components individually. Every card
// still renders for real, so these are composition/behavior tests (what
// actually ends up in the DOM for a given data shape), not implementation
// tests of any single card.
vi.mock("../../hooks/useDashboardData", () => ({ useDashboardData: vi.fn() }));
vi.mock("../../hooks/useStatistics", () => ({ useStatistics: vi.fn() }));
vi.mock("../../hooks/useAchievements", () => ({ useAchievements: vi.fn() }));
vi.mock("../../hooks/useGoalsSummary", () => ({ useGoalsSummary: vi.fn() }));
vi.mock("../../utils/placementTest/placementTestStorage", () => ({
    PlacementTestStorage: { getLatestResult: vi.fn() }
}));

// Every field useDashboardData actually returns (see useDashboardData.js),
// with neutral/empty defaults so each test only overrides what it cares
// about. Shapes match what each real consuming card expects - not a mock
// of the cards themselves, just of the data they're handed.
function createDashboard(overrides = {}) {
    return {
        greeting: "Boa tarde",
        userName: null,
        language: "English",
        continueLearning: { status: "empty" },
        dailyGoal: { completed: 0, goal: 10, progress: 0 },
        reviews: { due: 0, total: 0, hasReviews: false },
        courses: [],
        quickStats: { wordsLearned: 0, completedLessons: 0, currentStreak: 0, studyMinutes: 0 },
        recentAchievement: null,
        lastActivity: null,
        heatmap: [],
        streakSummary: { current: 0, longest: 0, daysThisMonth: 0 },
        upcomingReviews: { today: 0, tomorrow: 0, next7Days: 0 },
        recentActivity: [],
        vocabularyDistribution: [],
        weeklyActivity: [],
        nextStep: null,
        recommendations: [],
        ...overrides
    };
}

function createStatistics(overrides = {}) {
    return {
        totalWordsLearned: 0,
        wordsByTopic: [],
        knownWordsByLevel: [],
        favoriteWords: 0,
        lessonsCompleted: 0,
        videosCompleted: 0,
        studyMinutes: 0,
        reviews: { total: 0 },
        streak: { current: 0, longest: 0 },
        goalCompletionRate: 0,
        ...overrides
    };
}

function createGoalsSummary(overrides = {}) {
    return {
        hasAnyGoal: false,
        daily: {
            lessons: { hasGoal: false },
            reviews: { hasGoal: false },
            videoMinutes: { hasGoal: false }
        },
        weekly: { anyConfigured: false },
        estimatedMinutesRemaining: 0,
        recommendation: null,
        ...overrides
    };
}

function LocationDisplay() {
    const location = useLocation();
    return <div data-testid="location-display">{location.pathname}</div>;
}

function renderHome({ dashboard, statistics, achievements = [], goalsSummary, placementResult = null } = {}) {

    useDashboardData.mockReturnValue(createDashboard(dashboard));
    useStatistics.mockReturnValue(createStatistics(statistics));
    useAchievements.mockReturnValue(achievements);
    useGoalsSummary.mockReturnValue(createGoalsSummary(goalsSummary));
    PlacementTestStorage.getLatestResult.mockReturnValue(placementResult);

    return render(
        <MemoryRouter initialEntries={["/home"]}>
            <LocationDisplay />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<div>other page</div>} />
            </Routes>
        </MemoryRouter>
    );

}

describe("Home - composition (R4)", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // A. Brand new user: nothing due, no in-flight activity, first lesson of
    // the curriculum still in progress by definition (nobody has completed
    // anything yet).
    it("A - new user: PrimaryActionCard and ContinueLearningCard agree on the first lesson, no ResumeActivity section", () => {

        renderHome({
            dashboard: {
                continueLearning: {
                    status: "in-progress",
                    lessonId: "greetings",
                    lessonTitle: "Saudações",
                    lessonCategory: null,
                    moduleId: "m1",
                    moduleTitle: "Módulo 1",
                    moduleLevel: "A1",
                    href: "/lessons/greetings"
                },
                nextStep: { type: "lesson", label: "Continuar lição", href: "/lessons/greetings", priority: 3 }
            }
        });

        expect(screen.getByText("Continuar lição")).not.toBeNull();
        expect(screen.getByText("Saudações")).not.toBeNull();
        expect(screen.queryByText("Continuar de onde parou")).toBeNull();

    });

    // B. Reviews pending while a lesson is also in progress: reviews win
    // getNextStep's priority race, so ContinueLearningCard must not present
    // a second, disagreeing "next action" next to PrimaryActionCard.
    it("B - reviews pending + continueLearning in progress: PrimaryActionCard represents reviews, ContinueLearningCard is hidden, ReviewsCard stays available, no duplicate CTA", () => {

        renderHome({
            dashboard: {
                continueLearning: {
                    status: "in-progress",
                    lessonId: "family",
                    lessonTitle: "Família",
                    href: "/lessons/family"
                },
                reviews: { due: 5, total: 12, hasReviews: true },
                nextStep: { type: "review", label: "Revisar agora", href: "/flashcards", priority: 1 }
            }
        });

        // Exactly one "Revisar agora" on the whole page - PrimaryActionCard's
        // own label. ReviewsCard's CTA was changed to "Ver revisões"
        // specifically so it never repeats the same call to action.
        expect(screen.getAllByText("Revisar agora")).toHaveLength(1);
        expect(screen.queryByText("Família")).toBeNull();
        expect(screen.getByText("Ver revisões")).not.toBeNull();
        expect(screen.getByText(/5 fichas esperando/)).not.toBeNull();

    });

    // C. lastActivity itself is the nextStep winner (priority 2):
    // PrimaryActionCard already represents it - ResumeActivityCard showing
    // the same activity again in its own section would be a pure duplicate.
    it("C - lastActivity is the nextStep winner: PrimaryActionCard represents it, ResumeActivityCard section does not duplicate it", () => {

        renderHome({
            dashboard: {
                continueLearning: { status: "in-progress", lessonId: "food", lessonTitle: "Comida", href: "/lessons/food" },
                lastActivity: { type: "flashcards", label: "Continuar revisão de flashcards", remaining: 4, href: "/flashcards" },
                nextStep: { type: "flashcards", label: "Continuar revisão de flashcards", href: "/flashcards", priority: 2 }
            }
        });

        expect(screen.getAllByText("Continuar revisão de flashcards")).toHaveLength(1);
        expect(screen.queryByText("Continuar de onde parou")).toBeNull();
        // continueLearning also loses the priority race here (priority 2
        // beats it), so it must not show a third disagreeing CTA either.
        expect(screen.queryByText("Comida")).toBeNull();

    });

    // D. lastActivity exists but lost to reviews: the activity must still be
    // reachable (not silently dropped), but only as de-emphasized contextual
    // information below the main action - never a second competing CTA.
    it("D - lastActivity exists but reviews have priority: PrimaryActionCard represents reviews, the lost activity stays reachable as contextual fallback only", () => {

        renderHome({
            dashboard: {
                lastActivity: { type: "lesson", label: "Continuar lição", remaining: 2, href: "/lessons/greetings" },
                reviews: { due: 3, total: 8, hasReviews: true },
                nextStep: { type: "review", label: "Revisar agora", href: "/flashcards", priority: 1 }
            }
        });

        expect(screen.getAllByText("Revisar agora")).toHaveLength(1);

        // The fallback section exists, clearly separated under its own
        // heading, and the activity's own info is still there...
        expect(screen.getByText("Continuar de onde parou")).not.toBeNull();
        expect(screen.getByText("2 restantes")).not.toBeNull();

        // ...but its CTA no longer reads as a second main action: only one
        // "Continuar" button in the whole page belongs to PrimaryActionCard
        // (labelled "Revisar agora" right above it) - the fallback's own
        // button is still literally labelled "Continuar" (unchanged copy,
        // per the "no data lost" requirement) but visually de-emphasized
        // (secondary variant) rather than styled as the primary action.
        const continuarButtons = screen.getAllByRole("button", { name: "Continuar" });
        expect(continuarButtons).toHaveLength(2); // PrimaryActionCard + the fallback
        expect(continuarButtons[1].className).toContain("button--secondary");

    });

    // E. Curriculum in progress, nothing else competing - the everyday case.
    it("E - curriculum in progress, no reviews/lastActivity: PrimaryActionCard and ContinueLearningCard both work as before", () => {

        renderHome({
            dashboard: {
                continueLearning: {
                    status: "in-progress",
                    lessonId: "travel",
                    lessonTitle: "Viagem",
                    moduleLevel: "A2",
                    href: "/lessons/travel"
                },
                nextStep: { type: "lesson", label: "Continuar lição", href: "/lessons/travel", priority: 3 }
            }
        });

        expect(screen.getByText("Viagem")).not.toBeNull();
        expect(screen.getByText("A2")).not.toBeNull();
        expect(screen.getByText("Continuar lição")).not.toBeNull();

    });

    // F. Curriculum finished - preserve the existing finished/review-modules/
    // next-level behavior untouched.
    it("F - curriculum finished: ContinueLearningCard's finished state and PrimaryActionCard's review-modules step both still render", () => {

        renderHome({
            dashboard: {
                continueLearning: { status: "finished" },
                nextStep: { type: "review-modules", label: "Revisar módulos", href: "/lessons", priority: 5 }
            }
        });

        expect(screen.getByText("Você concluiu todo o conteúdo disponível!")).not.toBeNull();
        expect(screen.getByText("Revisar módulos")).not.toBeNull();

    });

    // G. Goals: DailyGoalCard is gone; GoalsProgressCard is the only goal
    // system shown, in both its empty and configured states.
    it("G - DailyGoalCard no longer exists; GoalsProgressCard renders its empty state when no goal is configured", () => {

        renderHome({ goalsSummary: { hasAnyGoal: false } });

        expect(screen.getByText("Nenhuma meta configurada")).not.toBeNull();
        expect(screen.getByText("Configurar metas")).not.toBeNull();
        // DailyGoalCard used to render a plain progress bar with no label of
        // its own and no CTA - there is no such second, unlabeled goal
        // widget anywhere on the page now.
        expect(screen.queryByText("Ver metas")).toBeNull();

    });

    it("G - GoalsProgressCard renders configured goals when goals exist", () => {

        renderHome({
            goalsSummary: {
                hasAnyGoal: true,
                daily: {
                    lessons: { hasGoal: true, current: 2, target: 5, percentage: 40, completed: false },
                    reviews: { hasGoal: false },
                    videoMinutes: { hasGoal: false }
                }
            }
        });

        // "Lições" alone isn't unique on the page - WeeklyEvolutionCard has
        // its own unrelated "Lições" legend entry - so the goal row is
        // identified by its actual progress text instead.
        expect(screen.getByText("2 / 5")).not.toBeNull();
        expect(screen.getByText("Ver metas")).not.toBeNull();
        expect(screen.queryByText("Nenhuma meta configurada")).toBeNull();

    });

    // H. Navigation: the destinations that still exist must still work.
    it("H - PrimaryActionCard navigates to nextStep's href", () => {

        renderHome({
            dashboard: {
                nextStep: { type: "review", label: "Revisar agora", href: "/flashcards", priority: 1 },
                reviews: { due: 2, total: 2, hasReviews: true }
            }
        });

        fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

        expect(screen.getByTestId("location-display").textContent).toBe("/flashcards");

    });

    it("H - GoalsProgressCard's CTA navigates to /goals", () => {

        renderHome({ goalsSummary: { hasAnyGoal: false } });

        fireEvent.click(screen.getByText("Configurar metas"));

        expect(screen.getByTestId("location-display").textContent).toBe("/goals");

    });

    it("H - ResumeActivityCard fallback CTA still navigates to the activity's own href", () => {

        renderHome({
            dashboard: {
                lastActivity: { type: "video", label: "Continuar vídeo", href: "/explore/some-video" },
                reviews: { due: 1, total: 1, hasReviews: true },
                nextStep: { type: "review", label: "Revisar agora", href: "/flashcards", priority: 1 }
            }
        });

        const continuarButtons = screen.getAllByRole("button", { name: "Continuar" });
        fireEvent.click(continuarButtons[1]);

        expect(screen.getByTestId("location-display").textContent).toBe("/explore/some-video");

    });

});
