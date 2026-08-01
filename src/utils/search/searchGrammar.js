import { computeMatchRank, MATCH_RANK } from "./matchRank";
import { TOPIC_LABELS } from "../../constants/topics";

// Same ranking algorithm as every other search source (see matchRank.js) -
// Sprint 36 only adds Grammar as a new result category, it doesn't touch how
// results are ranked. Primary field is the topic title; rules/examples/the
// topic label are the alias tier; the summary is the last-resort match.
export function searchGrammar(topics, query) {

    return topics

        .map(topic => {

            const { rank, matchedText } = computeMatchRank(query, {
                primary: topic.title,
                aliasCandidates: [
                    TOPIC_LABELS[topic.topic],
                    ...(topic.rules ?? []),
                    ...(topic.examples ?? [])
                ],
                secondaryCandidates: [topic.summary]
            });

            if (rank === MATCH_RANK.NONE) return null;

            return {
                type: "grammar",
                id: topic.id,
                label: topic.title,
                rank,
                matchedText,
                data: topic
            };

        })

        .filter(Boolean)

        .sort((a, b) => a.rank - b.rank || a.label.localeCompare(b.label));

}
