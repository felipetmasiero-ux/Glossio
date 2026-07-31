import { DictionaryRepository } from "../../repositories/DictionaryRepository";
import { groupFlashcardsByTopic } from "../flashcards/groupFlashcardsByTopic";

export function getWordsByTopic({ flashcards = [], language }, dictionary = DictionaryRepository) {

    const cards = flashcards.filter(card => card.language === language);

    return groupFlashcardsByTopic(cards, dictionary)
        .map(group => ({ topic: group.topic, count: group.cards.length }))
        .sort((a, b) => b.count - a.count);

}
