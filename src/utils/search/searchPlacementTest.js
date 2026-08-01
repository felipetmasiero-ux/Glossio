import { computeMatchRank, MATCH_RANK } from "./matchRank";

// A single static page, not a collection - still ranked through the exact
// same algorithm as every other search source, just with one candidate.
const PLACEMENT_TEST_PAGE = {
    id: "placement-test",
    title: "Placement Test",
    aliases: ["Teste de Nivelamento", "Teste de nível", "Nivelamento"],
    description: "Descubra o nível recomendado para começar a estudar."
};

export function searchPlacementTest(query) {

    const { rank, matchedText } = computeMatchRank(query, {
        primary: PLACEMENT_TEST_PAGE.title,
        aliasCandidates: PLACEMENT_TEST_PAGE.aliases,
        secondaryCandidates: [PLACEMENT_TEST_PAGE.description]
    });

    if (rank === MATCH_RANK.NONE) {
        return [];
    }

    return [{
        type: "placement-test",
        id: PLACEMENT_TEST_PAGE.id,
        label: PLACEMENT_TEST_PAGE.title,
        rank,
        matchedText,
        data: PLACEMENT_TEST_PAGE
    }];

}
