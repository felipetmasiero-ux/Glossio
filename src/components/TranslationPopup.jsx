import { useContext } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";

export function TranslationPopup({ word }) {

    const { addFlashcard } =
        useContext(FlashcardContext);

    if (!word) return null;

    return (
        <div>

            <h3>{word.word}</h3>

            <p>{word.translation}</p>

            <button
                onClick={() => addFlashcard(word)}
            >
                Save Flashcard
            </button>

        </div>
    );
}