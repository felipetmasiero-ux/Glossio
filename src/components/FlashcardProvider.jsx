import { useState } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";

export function FlashcardProvider({ children }) {

    const [flashcards, setFlashcards] = useState([]);

    function addFlashcard(card) {

        setFlashcards(previous => {

            const alreadyExists = previous.some(
                item => item.word === card.word
            );

            if (alreadyExists) {
                return previous;
            }

            return [...previous, card];
        });
    }

    function removeFlashcard(word) {

        setFlashcards(previous =>
            previous.filter(card => card.word !== word)
        );
    }

    return (
        <FlashcardContext.Provider
            value={{
                flashcards,
                addFlashcard,
                removeFlashcard
            }}
        >
            {children}
        </FlashcardContext.Provider>
    );
}