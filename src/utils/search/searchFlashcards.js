import { computeMatchRank, MATCH_RANK } from "./matchRank";
import { DictionaryRepository } from "../../repositories/DictionaryRepository";
import { TOPIC_LABELS } from "../../constants/topics";

const FAVORITE_KEYWORDS = ["favorito", "favorita", "favoritos", "favoritas"];

// Flashcards don't store their topic directly - it's looked up from the
// dictionary the same way groupFlashcardsByTopic does. "favoritos" is treated
// as a synthetic alias for favorited cards, since favorite isn't itself
// searchable text.
export function searchFlashcards(cards, query, dictionary = DictionaryRepository) {

    return cards

        .map(card => {

            const topic = dictionary.getEntry(card.language, card.word)?.topic ?? null;

            const { rank, matchedText } = computeMatchRank(query, {
                primary: card.word,
                aliasCandidates: [
                    topic,
                    TOPIC_LABELS[topic],
                    ...(card.favorite ? FAVORITE_KEYWORDS : [])
                ],
                secondaryCandidates: [card.translation]
            });

            if (rank === MATCH_RANK.NONE) return null;

            return {
                type: "flashcard",
                id: card.id,
                label: card.word,
                rank,
                matchedText,
                data: { ...card, topic }
            };

        })

        .filter(Boolean)

        .sort((a, b) => a.rank - b.rank || a.label.localeCompare(b.label));

}
