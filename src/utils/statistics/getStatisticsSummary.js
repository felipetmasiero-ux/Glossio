import { getStreak } from "../study/history/stats/getStreak";
import { adaptEventsToHistory } from "../dashboard/adaptEventsToHistory";
import { ACTIVITY_EVENT_TYPES } from "../../constants/dashboard";

import { getTotalWordsLearned } from "./getTotalWordsLearned";
import { getWordsByTopic } from "./getWordsByTopic";
import { getLessonsCompleted } from "./getLessonsCompleted";
import { getVideosCompleted } from "./getVideosCompleted";
import { getStudyTimeEstimate } from "./getStudyTimeEstimate";
import { getReviewStatistics } from "./getReviewStatistics";
import { getKnownWordsByLevel } from "./getKnownWordsByLevel";

export function getStatisticsSummary({ language, completedLessons = [], flashcards = [], events = [] }) {

    const activityRecords = adaptEventsToHistory(events, ACTIVITY_EVENT_TYPES);

    return {
        totalWordsLearned: getTotalWordsLearned({ flashcards, language }),
        wordsByTopic: getWordsByTopic({ flashcards, language }),
        knownWordsByLevel: getKnownWordsByLevel({ flashcards, language }),
        lessonsCompleted: getLessonsCompleted({ completedLessons, language }),
        videosCompleted: getVideosCompleted({ language }),
        studyMinutes: getStudyTimeEstimate({ completedLessons, language }),
        reviews: getReviewStatistics({ flashcards, events, language }),
        streak: getStreak(activityRecords)
    };

}
