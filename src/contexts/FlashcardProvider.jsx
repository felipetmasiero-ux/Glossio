import { useState, useEffect } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";
import { updateCard } from "../utils/flashcards/spacedRepetition";

export function FlashcardProvider({ children }) {

    const [flashcards, setFlashcards] = useState(() => {
        const saved = localStorage.getItem("flashcards");

        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "flashcards",
            JSON.stringify(flashcards)
        );
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
                {
                    id: crypto.randomUUID(),
                    word: word.word,
                    translation: word.translation,
                    language,

                    ease: 2.5,
                    interval: 1,
                    repetitions: 0,
                    nextReview: Date.now()
                }
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

                return updateCard(card, quality);
            })
        );
    }

    return (
        <FlashcardContext.Provider value={{
            flashcards,
            setFlashcards,
            addFlashcard,
            removeFlashcard,
            answerFlashcard
        }}>
            {children}
        </FlashcardContext.Provider>
    );
}