import { getContinueLearning } from "../dashboard/getContinueLearning";
import { RECOMMENDATION_TYPES } from "../../constants/adaptiveLearning";

// generateRecommendations() falls back to this when every generator comes
// up empty - a brand new account (no events, no flashcards, nothing
// completed yet) or someone who has genuinely cleared every personalized
// signal. No "reason" tied to performance here, since there's no data to
// point at yet - these are always-safe, generic next steps instead.
//
// `hasTakenPlacementTest`: resolved by the caller (PlacementTestStorage
// reads localStorage directly, same as Home.jsx already does - this stays
// a pure function, storage access doesn't belong inside it).
export function getGenericRecommendations({ language, hasTakenPlacementTest = false }) {

    const recommendations = [];

    const continueLearning = getContinueLearning({ language, completedLessons: [] });

    if (continueLearning.status === "in-progress") {

        recommendations.push({
            id: "generic-first-lesson",
            type: RECOMMENDATION_TYPES.CONTINUE_MODULE,
            priority: 5,
            title: `Comece: ${continueLearning.lessonTitle}`,
            reason: "Toda jornada começa com a primeira lição.",
            href: continueLearning.href,
            icon: "book"
        });

    }

    if (!hasTakenPlacementTest) {

        recommendations.push({
            id: "generic-placement-test",
            type: RECOMMENDATION_TYPES.CONTINUE_MODULE,
            priority: 6,
            title: "Faça o teste de nivelamento",
            reason: "Descubra o nível ideal para começar a estudar.",
            href: "/placement-test",
            icon: "target"
        });

    }

    return recommendations;

}
