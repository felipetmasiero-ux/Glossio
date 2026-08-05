import { useState, useEffect, useCallback, useMemo } from "react";
import { FlashcardContext } from "../contexts/FlashcardContext";
import { scheduleCard } from "../utils/study/scheduling";
import { useEvents } from "../hooks/useEvents";
import { EVENT_TYPES } from "../constants/events";
import {
    createFlashcard,
    loadFlashcards,
    saveFlashcards,
    toggleFavorite as toggleFavoriteCard,
    updateFlashcard as updateFlashcardCard,
    isDuplicateFlashcard
} from "../utils/flashcards";
import { isWordKnown } from "../utils/flashcards/isWordKnown";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";


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

        if (isDuplicateFlashcard(flashcards, { word: normalized.word, language })) return;

        setFlashcards(previous => [
            ...previous,
            createFlashcard({
                word: normalized.word,
                translation: normalized.translation ?? "",
                language,
                moduleId: normalized.moduleId ?? null,
                lessonId: normalized.lessonId ?? null,
                category: normalized.category ?? null,
                deckId: normalized.deckId ?? null,
                example: normalized.example ?? null,
                notes: normalized.notes ?? null
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
    const removeFlashcard = useCallback(cardId => {
        setFlashcards(previous =>
            previous.filter(card => card.id !== cardId)
        );
    }, []);

    // Reads `flashcards` directly (for the duplicate check), same trade-off
    // as addFlashcard above.
    const updateFlashcard = useCallback((cardId, updates) => {

        if (updates.word !== undefined && updates.language !== undefined) {
            const duplicate = isDuplicateFlashcard(flashcards, {
                word: updates.word,
                language: updates.language,
                excludeId: cardId
            });

            if (duplicate) {
                console.warn("Skipped update: duplicate flashcard", updates.word);
                return;
            }
        }

        setFlashcards(previous =>
            previous.map(card =>
                card.id === cardId
                    ? updateFlashcardCard(card, updates)
                    : card
            )
        );
    }, [flashcards]);

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

    // Reads `flashcards` directly - needed to know the card's language and
    // which way it's about to flip (computed here, not inside the setState
    // updater, since an updater can run more than once and would risk
    // double-firing the analytics event).
    const toggleFavorite = useCallback(cardId => {

        const card = flashcards.find(c => c.id === cardId);

        if (!card) return;

        setFlashcards(previous =>
            previous.map(c =>
                c.id === cardId
                    ? toggleFavoriteCard(c)
                    : c
            )
        );

        trackEvent(
            card.favorite ? ANALYTICS_EVENTS.FAVORITE_REMOVED : ANALYTICS_EVENTS.FAVORITE_ADDED,
            { cardId, language: card.language }
        );

    }, [flashcards]);

    // Reads `flashcards` directly - reference legitimately changes with it.
    const hasFlashcard = useCallback((word, language) => {
        return isWordKnown(flashcards, word, language);
    }, [flashcards]);

    const value = useMemo(() => ({
        flashcards,
        setFlashcards,
        addFlashcard,
        removeFlashcard,
        updateFlashcard,
        answerFlashcard,
        toggleFavorite,
        hasFlashcard
    }), [flashcards, addFlashcard, removeFlashcard, updateFlashcard, answerFlashcard, toggleFavorite, hasFlashcard]);

    return (
        <FlashcardContext.Provider value={value}>
            {children}
        </FlashcardContext.Provider>
    );
}
