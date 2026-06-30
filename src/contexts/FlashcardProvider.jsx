import { useState, useEffect } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";
import { scheduleCard } from "../utils/study/scheduling";
import {
    createFlashcard,
    loadFlashcards,
    saveFlashcards,
    toggleFavorite as toggleFavoriteCard
} from "../utils/flashcards";


export function FlashcardProvider({ children }) {

    const [flashcards, setFlashcards] = useState(loadFlashcards);



    useEffect(() => {
        saveFlashcards(flashcards);
    }, [flashcards]);

    function addFlashcard(word, language) {
        setFlashcards(previous => {

            const alreadyExists = previous.some(card =>
                card.word === word.word &&
                card.language === language
            );

            if (alreadyExists) return previous;

            return [
                ...previous,
                createFlashcard({
                    word: word.word,
                    translation: word.translation,
                    language
                })
            ];
        });
    }

    function removeFlashcard(word) {
        setFlashcards(previous =>
            previous.filter(card => card.word !== word)
        );
    }

    function answerFlashcard(cardId, quality) {
        setFlashcards(previous =>
            previous.map(card => {
                if (card.id !== cardId) return card;

                return scheduleCard(card, quality);
            })
        );
    }

    function toggleFavorite(cardId) {
        setFlashcards(previous =>
            previous.map(card =>
                card.id === cardId
                    ? toggleFavoriteCard(card)
                    : card
            )
        );
    }
    
    return (
        <FlashcardContext.Provider value={{
            flashcards,
            setFlashcards,
            addFlashcard,
            removeFlashcard,
            answerFlashcard,
            toggleFavorite
        }}>
            {children}
        </FlashcardContext.Provider>
    );
}