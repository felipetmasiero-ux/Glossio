import { MIN_QUALITY_TO_PASS } from "../../../constants/scheduling";
import {
    RECOMMENDATION_TYPES,
    MIN_REVIEWS_FOR_DIFFICULT_CARD,
    DIFFICULT_CARD_EASE_FACTOR_THRESHOLD
} from "../../../constants/adaptiveLearning";

// A card's SM-2 easeFactor (see scheduleCard.js) already reflects "has this
// been hard to remember" over its whole life - dropping below the 2.5
// default takes more than one bad review, so it's the cheap first filter.
// studyHistory is only consulted after that, to count *how many* recent
// low-quality reviews explain the drop, for a reason string richer than
// "the algorithm thinks this is hard".
export function recommendDifficultFlashcards({ flashcards, studyHistory, language }) {

    const difficult = flashcards
        .filter(card => card.language === language && card.easeFactor < DIFFICULT_CARD_EASE_FACTOR_THRESHOLD)
        .map(card => {

            const lowQualityCount = studyHistory.filter(
                record => record.cardId === card.id && record.quality < MIN_QUALITY_TO_PASS
            ).length;

            return { card, lowQualityCount };

        })
        .filter(({ lowQualityCount }) => lowQualityCount >= MIN_REVIEWS_FOR_DIFFICULT_CARD)
        .sort((a, b) => a.card.easeFactor - b.card.easeFactor);

    if (difficult.length === 0) {
        return [];
    }

    const [hardest] = difficult;

    return [{
        id: `difficult-flashcard-${hardest.card.id}`,
        type: RECOMMENDATION_TYPES.DIFFICULT_FLASHCARDS,
        priority: 2,
        title: `Praticar: ${hardest.card.word}`,
        reason: `Essa é uma das palavras mais difíceis para você - você errou ${hardest.lowQualityCount} vezes recentemente.`,
        href: "/flashcards",
        icon: "flame"
    }];

}
