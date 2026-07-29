import { DictionaryRepository } from "../../repositories/DictionaryRepository";

export const OTHER_TOPIC = "other";

function sortByWord(cards) {
    return [...cards].sort((a, b) => a.word.localeCompare(b.word));
}

export function groupFlashcardsByTopic(flashcards, dictionary = DictionaryRepository) {

    const cardsByTopic = new Map();

    flashcards.forEach(card => {

        const entry = dictionary.getEntry(card.language, card.word);
        const topic = entry?.topic ?? OTHER_TOPIC;

        if (!cardsByTopic.has(topic)) {
            cardsByTopic.set(topic, []);
        }

        cardsByTopic.get(topic).push(card);

    });

    const topics = [...cardsByTopic.keys()]
        .filter(topic => topic !== OTHER_TOPIC)
        .sort((a, b) => a.localeCompare(b));

    if (cardsByTopic.has(OTHER_TOPIC)) {
        topics.push(OTHER_TOPIC);
    }

    return topics.map(topic => ({
        topic,
        cards: sortByWord(cardsByTopic.get(topic))
    }));

}
