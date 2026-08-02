import { getDailyLessonGoal } from "./getDailyLessonGoal";
import { getDailyReviewGoal } from "./getDailyReviewGoal";
import { getDailyVideoMinutesGoal } from "./getDailyVideoMinutesGoal";
import { getWeeklyMinutesGoal } from "./getWeeklyMinutesGoal";
import { getWeeklyLessonGoal } from "./getWeeklyLessonGoal";
import { getGoalRecommendation } from "./getGoalRecommendation";
import { LessonRepository } from "../lessons/LessonRepository";

function averageLessonMinutes(language) {

    const lessons = LessonRepository.getAll(language);

    if (lessons.length === 0) return 0;

    const total = lessons.reduce((sum, lesson) => sum + (lesson.estimatedTime ?? 0), 0);

    return total / lessons.length;

}

// The single entry point the Home card and the Goals page both read from -
// everything else in this folder is an implementation detail of this
// function (or of the per-goal getters it composes).
export function getGoalSummary({ language, flashcards = [], events = [], goals }) {

    const daily = {
        lessons: getDailyLessonGoal({ events, flashcards, language, goals }),
        reviews: getDailyReviewGoal({ events, flashcards, language, goals }),
        videoMinutes: getDailyVideoMinutesGoal({ events, flashcards, language, goals })
    };

    const weekly = {
        minutes: getWeeklyMinutesGoal({ events, flashcards, language, goals }),
        lessons: getWeeklyLessonGoal({ events, flashcards, language, goals })
    };

    const dailyConfigured = [daily.lessons, daily.reviews, daily.videoMinutes].filter(goal => goal.hasGoal);
    const weeklyConfigured = [weekly.minutes, weekly.lessons].filter(goal => goal.hasGoal);

    const estimatedMinutesRemaining = Math.round(
        daily.lessons.remaining * averageLessonMinutes(language) + daily.videoMinutes.remaining
    );

    return {
        hasAnyGoal: dailyConfigured.length > 0 || weeklyConfigured.length > 0,
        daily: {
            ...daily,
            anyConfigured: dailyConfigured.length > 0,
            allCompleted: dailyConfigured.length > 0 && dailyConfigured.every(goal => goal.completed)
        },
        weekly: {
            ...weekly,
            anyConfigured: weeklyConfigured.length > 0,
            allCompleted: weeklyConfigured.length > 0 && weeklyConfigured.every(goal => goal.completed)
        },
        estimatedMinutesRemaining,
        recommendation: getGoalRecommendation({ daily, weekly })
    };

}
