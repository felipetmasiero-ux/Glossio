import { useContext } from "react";
import { FlashcardContext } from "../../../contexts/FlashcardContext";
import { LanguageContext } from "../../../contexts/LanguageContext";

export function TranslationPopup({ word }) {

    const { addFlashcard } = useContext(FlashcardContext);
    const { language } = useContext(LanguageContext);

    if (!word) return null;

    return (
        <div>
            <h3>{word.word}</h3>

            <p>{word.translation}</p>

            <button
                onClick={() => addFlashcard(word, language)}
            >
                Save Flashcard
            </button>
        </div>
    );
}