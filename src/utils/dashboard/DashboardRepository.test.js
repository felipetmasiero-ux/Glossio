import { describe, expect, it } from "vitest";

import { DashboardRepository } from "./DashboardRepository";
import { ModuleRepository } from "../courses/ModuleRepository";
import { EVENT_TYPES } from "../../constants/events";

const englishLessons = ModuleRepository.getAllLessonsInOrder("English");
const allEnglishLessonIds = englishLessons.map(lesson => lesson.id);
const firstLessonId = englishLessons[0].id;
const lastA1LessonId = englishLessons.filter(lesson => lesson.level === "A1").at(-1).id;

describe("DashboardRepository.getContinueLearning", () => {

    it("points to the first lesson when nothing is completed", () => {

        const result = DashboardRepository.getContinueLearning({
            language: "English",
            completedLessons: []
        });

        expect(result.status).toBe("in-progress");
        expect(result.lessonId).toBe(firstLessonId);
        expect(result.href).toBe(`/lessons/${firstLessonId}`);

    });

    it("reports finished when every lesson is completed", () => {

        const result = DashboardRepository.getContinueLearning({
            language: "English",
            completedLessons: allEnglishLessonIds
        });

        expect(result.status).toBe("finished");

    });

    it("reports empty for a language with no course content", () => {

        const result = DashboardRepository.getContinueLearning({
            language: "Klingon",
            completedLessons: []
        });

        expect(result.status).toBe("empty");

    });

});

describe("DashboardRepository.getCoursesOverview", () => {

    it("marks every language with real course content as not coming soon", () => {

        const courses = DashboardRepository.getCoursesOverview({ completedLessons: [] });

        const english = courses.find(course => course.language === "English");
        const french = courses.find(course => course.language === "French");
        const portuguese = courses.find(course => course.language === "Portuguese");

        expect(english.comingSoon).toBe(false);
        expect(english.percentage).toBe(0);
        expect(french.comingSoon).toBe(false);
        expect(portuguese.comingSoon).toBe(false);

    });

    it("reflects real progress percentage", () => {

        const courses = DashboardRepository.getCoursesOverview({
            completedLessons: [firstLessonId]
        });

        const english = courses.find(course => course.language === "English");

        expect(english.percentage).toBe(Math.round((1 / englishLessons.length) * 100));

    });

});

describe("DashboardRepository.getQuickStats", () => {

    it("only counts completed lessons that belong to the given language", () => {

        const stats = DashboardRepository.getQuickStats({
            language: "English",
            completedLessons: [firstLessonId, "some-other-language-lesson"],
            events: []
        });

        expect(stats.completedLessons).toBe(1);
        expect(stats.currentStreak).toBe(0);
        expect(stats.studyMinutes).toBeGreaterThan(0);

    });

});

describe("DashboardRepository.getDailyGoal", () => {

    it("counts today's activity events towards the daily goal", () => {

        const events = [
            { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: Date.now(), payload: {} },
            { type: EVENT_TYPES.EXERCISE_COMPLETED, timestamp: Date.now(), payload: {} },
            { type: EVENT_TYPES.WORD_VIEWED, timestamp: Date.now(), payload: {} }
        ];

        const goal = DashboardRepository.getDailyGoal({ events });

        expect(goal.completed).toBe(2);
        expect(goal.goal).toBeGreaterThan(0);

    });

});

describe("DashboardRepository.getReviewSummary", () => {

    it("reports due flashcards for the current language only", () => {

        const flashcards = [
            { id: "1", language: "English", nextReview: Date.now() - 1000 },
            { id: "2", language: "French", nextReview: Date.now() - 1000 }
        ];

        const summary = DashboardRepository.getReviewSummary({ flashcards, language: "English" });

        expect(summary.due).toBe(1);
        expect(summary.hasReviews).toBe(true);

    });

    it("reports no reviews when there are no flashcards", () => {

        const summary = DashboardRepository.getReviewSummary({ flashcards: [], language: "English" });

        expect(summary.hasReviews).toBe(false);

    });

});

describe("DashboardRepository.getRecentAchievement", () => {

    it("returns null when no module has been completed", () => {

        const achievement = DashboardRepository.getRecentAchievement({
            language: "English",
            events: []
        });

        expect(achievement).toBeNull();

    });

    it("returns an achievement when the last lesson of a module was completed", () => {

        const achievement = DashboardRepository.getRecentAchievement({
            language: "English",
            events: [
                { type: EVENT_TYPES.LESSON_COMPLETED, timestamp: Date.now(), payload: { lessonId: lastA1LessonId } }
            ]
        });

        expect(achievement).not.toBeNull();
        expect(achievement.title).toContain("Inglês A1");

    });

});

describe("DashboardRepository.getContinueLastActivity", () => {

    it("returns null when there is no ongoing activity", () => {
        expect(DashboardRepository.getContinueLastActivity({ lastActivity: null })).toBeNull();
    });

    it("formats an in-progress exercise session", () => {

        const result = DashboardRepository.getContinueLastActivity({
            lastActivity: { type: "exercise", lessonId: firstLessonId, remaining: 3 }
        });

        expect(result.href).toBe(`/exercises/${firstLessonId}`);
        expect(result.remaining).toBe(3);

    });

    it("formats an in-progress flashcards session - regression", () => {

        const result = DashboardRepository.getContinueLastActivity({
            lastActivity: { type: "flashcards", remaining: 5 }
        });

        expect(result.href).toBe("/flashcards");
        expect(result.remaining).toBe(5);

    });

    it("formats an in-progress lesson (L4)", () => {

        const result = DashboardRepository.getContinueLastActivity({
            lastActivity: { type: "lesson", language: "english", lessonId: firstLessonId, moduleId: "mod-1", remaining: 2, total: 5 }
        });

        expect(result).toEqual({
            type: "lesson",
            label: "Continuar lição",
            remaining: 2,
            href: `/lessons/${firstLessonId}`
        });

    });

    it("formats an in-progress video (L4)", () => {

        const result = DashboardRepository.getContinueLastActivity({
            lastActivity: { type: "video", language: "english", videoId: "en-a1-cafe-order" }
        });

        expect(result).toEqual({
            type: "video",
            label: "Continuar vídeo",
            href: "/explore/en-a1-cafe-order"
        });

    });

    it("does not crash on an unrecognized or corrupted activity type - compatibility with old/partial data", () => {

        expect(() => DashboardRepository.getContinueLastActivity({
            lastActivity: { type: "something-old-and-unknown" }
        })).not.toThrow();

        expect(DashboardRepository.getContinueLastActivity({
            lastActivity: { type: "something-old-and-unknown" }
        })).toBeNull();

    });

});

describe("DashboardRepository.getDashboardData", () => {

    it("returns the full aggregated shape without throwing", () => {

        const data = DashboardRepository.getDashboardData({
            language: "English",
            completedLessons: [firstLessonId],
            flashcards: [],
            events: [],
            lastActivity: null
        });

        expect(data.userName).toBeNull();
        expect(data.language).toBe("English");
        expect(data.continueLearning.status).toBe("in-progress");
        expect(data.courses).toHaveLength(3);
        expect(data.quickStats.completedLessons).toBe(1);
        expect(data.lastActivity).toBeNull();

    });

    it("includes the Sprint 38 dashboard-intelligence fields", () => {

        const data = DashboardRepository.getDashboardData({
            language: "English",
            completedLessons: [],
            flashcards: [],
            events: [],
            lastActivity: null
        });

        expect(data.heatmap).toHaveLength(90);
        expect(data.streakSummary).toEqual({ current: 0, longest: 0, daysThisMonth: 0 });
        expect(data.upcomingReviews).toEqual({ today: 0, tomorrow: 0, next7Days: 0 });
        expect(data.recentActivity).toEqual([]);
        expect(data.vocabularyDistribution.map(entry => entry.level)).toEqual(["A1", "A2", "B1", "B2"]);
        expect(data.weeklyActivity).toHaveLength(8);

    });

});
