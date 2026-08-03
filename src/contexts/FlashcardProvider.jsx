import { useState, useEffect, useCallback, useMemo } from "react";
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
import { isWordKnown } from "../utils/flashcards/isWordKnown";


export function FlashcardProvider({ children }) {

    const [flashcards, setFlashcards] = useState(loadFlashcards);

    const { logEvent } = useEvents();

    useEffect(() => {
        saveFlashcards(flashcards);
    }, [flashcards]);

    // Reads `flashcards` directly (for the duplicate check), so this
    // reference legitimately changes whenever flashcards does - same as
    // before, just no longer *also* changing on every unrelated render.
    const addFlashcard = useCallback((wordData, language) => {

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

        if (!normalized.translation?.trim()) {
            console.warn("Skipped flashcard with no translation:", normalized.word);
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
    }, [flashcards, logEvent]);

    // Functional updates only - never needs to read `flashcards` directly,
    // so these stay referentially stable across renders regardless of how
    // often flashcards (or anything else in the app) changes.
    const removeFlashcard = useCallback(word => {
        setFlashcards(previous =>
            previous.filter(card => card.word !== word)
        );
    }, []);

    const answerFlashcard = useCallback((cardId, quality) => {
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
    }, [logEvent]);

    const toggleFavorite = useCallback(cardId => {
        setFlashcards(previous =>
            previous.map(card =>
                card.id === cardId
                    ? toggleFavoriteCard(card)
                    : card
            )
        );
    }, []);

    // Reads `flashcards` directly - reference legitimately changes with it.
    const hasFlashcard = useCallback((word, language) => {
        return isWordKnown(flashcards, word, language);
    }, [flashcards]);

    const value = useMemo(() => ({
        flashcards,
        setFlashcards,
        addFlashcard,
        removeFlashcard,
        answerFlashcard,
        toggleFavorite,
        hasFlashcard
    }), [flashcards, addFlashcard, removeFlashcard, answerFlashcard, toggleFavorite, hasFlashcard]);

    return (
        <FlashcardContext.Provider value={value}>
            {children}
        </FlashcardContext.Provider>
    );
}
