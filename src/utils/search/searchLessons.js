import { computeMatchRank, MATCH_RANK } from "./matchRank";
import { TOPIC_LABELS } from "../../constants/topics";

// `lessons` items are expected to already carry a `moduleTitle` (attached by
// the caller from ModuleRepository, since normalized lessons don't know
// their own module) - see useUniversalSearch.
export function searchLessons(lessons, query) {

    return lessons

        .map(lesson => {

            const { rank, matchedText } = computeMatchRank(query, {
                primary: lesson.title,
                aliasCandidates: [lesson.topic, TOPIC_LABELS[lesson.topic], lesson.moduleTitle, ...(lesson.tags ?? [])],
                secondaryCandidates: [lesson.subtitle, lesson.description]
            });

            if (rank === MATCH_RANK.NONE) return null;

            return {
                type: "lesson",
                id: lesson.id,
                label: lesson.title,
                rank,
                matchedText,
                data: lesson
            };

        })

        .filter(Boolean)

        .sort((a, b) => a.rank - b.rank || a.label.localeCompare(b.label));

}
