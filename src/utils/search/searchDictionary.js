import { computeMatchRank, MATCH_RANK } from "./matchRank";

// Dictionary entries already carry `aliases` (irregular forms) and
// `translation` directly, so this maps onto the requested priority order
// (exact/starts-with/contains on the word, then alias, then translation)
// with no extra bookkeeping needed.
export function searchDictionary(entries, query) {

    return entries

        .map(entry => {

            const { rank, matchedText } = computeMatchRank(query, {
                primary: entry.word,
                aliasCandidates: entry.aliases ?? [],
                secondaryCandidates: [entry.translation]
            });

            if (rank === MATCH_RANK.NONE) return null;

            return {
                type: "dictionary",
                id: entry.id ?? entry.word,
                label: entry.word,
                rank,
                matchedText,
                data: entry
            };

        })

        .filter(Boolean)

        .sort((a, b) => a.rank - b.rank || a.label.localeCompare(b.label));

}
