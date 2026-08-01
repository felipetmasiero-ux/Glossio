// Deterministic ranking - no fuzzy matching, no scoring heuristics. A field
// either matches one of three ways (exact, starts-with, contains) or it
// doesn't; which *field* matched (primary, alias, or translation/secondary)
// sets the tier. Lower rank always sorts first.
export const MATCH_RANK = {
    EXACT: 0,
    STARTS_WITH: 1,
    CONTAINS: 2,
    ALIAS: 3,
    TRANSLATION: 4,
    NONE: Infinity
};

export function getFieldMatchRank(candidate, query) {

    if (!candidate || !query) {
        return MATCH_RANK.NONE;
    }

    const normalizedCandidate = candidate.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (normalizedCandidate === normalizedQuery) return MATCH_RANK.EXACT;
    if (normalizedCandidate.startsWith(normalizedQuery)) return MATCH_RANK.STARTS_WITH;
    if (normalizedCandidate.includes(normalizedQuery)) return MATCH_RANK.CONTAINS;

    return MATCH_RANK.NONE;

}

// `primary` is checked first (exact/starts-with/contains); only if it has no
// match at all do alias candidates get a look, and only then secondary
// ("translation") candidates - matching the priority order asked for:
// exact, starts-with, contains, alias, translation.
export function computeMatchRank(query, { primary, aliasCandidates = [], secondaryCandidates = [] } = {}) {

    const primaryRank = getFieldMatchRank(primary, query);

    if (primaryRank !== MATCH_RANK.NONE) {
        return { rank: primaryRank, matchedText: primary };
    }

    const aliasMatch = aliasCandidates.find(candidate => getFieldMatchRank(candidate, query) !== MATCH_RANK.NONE);

    if (aliasMatch) {
        return { rank: MATCH_RANK.ALIAS, matchedText: aliasMatch };
    }

    const secondaryMatch = secondaryCandidates.find(candidate => getFieldMatchRank(candidate, query) !== MATCH_RANK.NONE);

    if (secondaryMatch) {
        return { rank: MATCH_RANK.TRANSLATION, matchedText: secondaryMatch };
    }

    return { rank: MATCH_RANK.NONE, matchedText: null };

}
