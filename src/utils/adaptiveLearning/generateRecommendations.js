import { recommendWeakLessons } from "./generators/recommendWeakLessons";
import { recommendWeakTopics } from "./generators/recommendWeakTopics";
import { recommendOverdueFlashcards } from "./generators/recommendOverdueFlashcards";
import { recommendDifficultFlashcards } from "./generators/recommendDifficultFlashcards";
import { recommendPendingFlashcards } from "./generators/recommendPendingFlashcards";
import { recommendContinueModule } from "./generators/recommendContinueModule";
import { getGenericRecommendations } from "./getGenericRecommendations";
import { MAX_RECOMMENDATIONS } from "../../constants/adaptiveLearning";

// Every generator takes the exact same context object and returns 0+
// recommendations of its own type - adding a new recommendation type never
// touches an existing generator, just adds one more function to this list
// (see docs/ADAPTIVE_LEARNING.md's "how to add a new recommendation type").
const GENERATORS = [
    recommendWeakLessons,
    recommendWeakTopics,
    recommendOverdueFlashcards,
    recommendDifficultFlashcards,
    recommendPendingFlashcards,
    recommendContinueModule
];

// The single entry point (see RecommendationEngine.js) - runs every
// generator against whatever progress/history/flashcard/event data the
// caller already has (nothing here is stored anywhere new, see each
// generator's own comment on which existing source it reads), merges the
// results, and sorts by priority ascending (1 = most urgent, matching
// getNextStep.js's existing convention). Falls back to generic,
// data-independent suggestions when nothing personalized qualifies yet -
// a brand new account, or someone who has cleared every weak spot.
export function generateRecommendations({
    language,
    completedLessons = [],
    flashcards = [],
    studyHistory = [],
    events = [],
    hasTakenPlacementTest = false
}) {

    if (!language) {
        return [];
    }

    const context = { language, completedLessons, flashcards, studyHistory, events };

    const generated = GENERATORS
        .flatMap(generate => generate(context))
        .sort((a, b) => a.priority - b.priority)
        .slice(0, MAX_RECOMMENDATIONS);

    if (generated.length > 0) {
        return generated;
    }

    return getGenericRecommendations({ language, hasTakenPlacementTest });

}
