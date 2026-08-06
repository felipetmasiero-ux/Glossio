import { generateRecommendations } from "./generateRecommendations";

// Thin namespace, same shape as DashboardRepository/CourseRepository/etc. -
// the "specific recommendation layer" the feature asked for. There's no
// RecommendationRepository alongside it on purpose: a repository implies
// something stored/fetched, and recommendations are never persisted -
// they're recomputed fresh from data that already lives in
// EventProvider/FlashcardProvider/LessonProgressProvider/StudyHistoryProvider
// every time generate() runs (see generateRecommendations.js and each
// generator's own comment on which existing source it reads).
export const RecommendationEngine = {
    generate: generateRecommendations
};
