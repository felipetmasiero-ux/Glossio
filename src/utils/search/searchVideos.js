import { computeMatchRank, MATCH_RANK } from "./matchRank";
import { TOPIC_LABELS } from "../../constants/topics";

export function searchVideos(videos, query) {

    return videos

        .map(video => {

            const { rank, matchedText } = computeMatchRank(query, {
                primary: video.title,
                aliasCandidates: [video.topic, TOPIC_LABELS[video.topic]],
                secondaryCandidates: [video.description]
            });

            if (rank === MATCH_RANK.NONE) return null;

            return {
                type: "video",
                id: video.id,
                label: video.title,
                rank,
                matchedText,
                data: video
            };

        })

        .filter(Boolean)

        .sort((a, b) => a.rank - b.rank || a.label.localeCompare(b.label));

}
