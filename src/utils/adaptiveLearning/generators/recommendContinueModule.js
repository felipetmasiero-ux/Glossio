import { getContinueLearning } from "../../dashboard/getContinueLearning";
import { RECOMMENDATION_TYPES } from "../../../constants/adaptiveLearning";

// Reuses getContinueLearning() (already computes "what's the next
// uncompleted lesson", used by the dashboard's own Continue Learning card)
// instead of re-deriving "where did the user leave off" a second way. Lower
// priority than anything performance-based - always continuing forward is
// a fine suggestion, but a lesson the user is actively struggling with (see
// recommendWeakLessons) or an overdue review is more urgent.
export function recommendContinueModule({ language, completedLessons }) {

    const continueLearning = getContinueLearning({ language, completedLessons });

    if (continueLearning.status !== "in-progress") {
        return [];
    }

    return [{
        id: `continue-module-${continueLearning.lessonId}`,
        type: RECOMMENDATION_TYPES.CONTINUE_MODULE,
        priority: 5,
        title: `Continuar: ${continueLearning.lessonTitle}`,
        reason: continueLearning.moduleTitle
            ? `Você está no módulo ${continueLearning.moduleTitle}.`
            : "Continue de onde parou.",
        href: continueLearning.href,
        icon: "book"
    }];

}
