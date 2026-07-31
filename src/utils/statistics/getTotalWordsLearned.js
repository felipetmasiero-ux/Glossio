export function getTotalWordsLearned({ flashcards = [], language }) {

    return flashcards.filter(card => card.language === language).length;

}
