import { getFavoriteCards } from "../flashcards/getFavoriteCards";

export function getFavoriteWordsCount({ flashcards = [], language }) {

    const cards = flashcards.filter(card => card.language === language);

    return getFavoriteCards(cards).length;

}
