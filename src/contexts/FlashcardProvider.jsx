import { useState, useEffect } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";
import { scheduleCard } from "../utils/study/scheduling";
import { useEvents } from "../hooks/useEvents";
import { EVENT_TYPES } from "../constants/events";
import {
    createFlashcard,
    loadFlashcards,
    saveFlashcards,
    toggleFavorite as toggleFavoriteCard
} from "../utils/flashcards";


export function FlashcardProvider({ children }) {

    const [flashcards, setFlashcards] = useState(loadFlashcards);

    const { logEvent } = useEvents();

    useEffect(() => {
        saveFlashcards(flashcards);
    }, [flashcards]);

    function addFlashcard(wordData, language) {

        const normalized =
            typeof wordData === "string"
                ? {
                    word: wordData,
                    translation: ""
                }
                : wordData;

        if (!normalized?.word) {
            console.warn("Invalid flashcard:", wordData);
            return;
        }

        const alreadyExists = flashcards.some(card =>
            card.word?.toLowerCase() === normalized.word.toLowerCase() &&
            card.language === language
        );

        if (alreadyExists) return;

        setFlashcards(previous => [
            ...previous,
            createFlashcard({
                word: normalized.word,
                translation: normalized.translation ?? "",
                language,
                moduleId: normalized.moduleId ?? null,
                lessonId: normalized.lessonId ?? null,
                category: normalized.category ?? null
            })
        ]);

        logEvent(EVENT_TYPES.VOCABULARY_ADDED, {
            word: normalized.word,
            translation: normalized.translation ?? "",
            language,
            moduleId: normalized.moduleId ?? null,
            lessonId: normalized.lessonId ?? null
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

        logEvent(EVENT_TYPES.FLASHCARD_REVIEWED, {
            cardId,
            quality
        });
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
