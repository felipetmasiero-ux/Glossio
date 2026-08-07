import { useCallback, useState } from "react";

import { useFlashcards } from "./useFlashcards";
import { getPendingLessonVocabulary } from "../utils/flashcards/getPendingLessonVocabulary";
import { trackEvent, ANALYTICS_EVENTS } from "../utils/analytics";

// Distinguishes this bulk entry point from WordPopup's own
// `source: variant` ("lesson"/"explore") in the exact same
// ANALYTICS_EVENTS.FLASHCARD_ADDED event - not a new event, just a new
// value for the field that already exists to say where an add came from.
const SOURCE = "lesson-summary";

// The one hook the lesson-completion "add vocabulary to flashcards" UI
// goes through - keeps the diff/add logic out of the component (see
// docs/AUDIT findings on business logic living in components) and reuses
// FlashcardProvider.addFlashcard exactly as WordPopup.jsx does, one call
// per word: addFlashcard already no-ops on a duplicate word+language pair
// (isDuplicateFlashcard) without touching that card's SRS fields, so
// nothing here needs its own duplicate handling beyond pre-filtering the
// list shown to the user.
export function useLessonVocabularyFlashcards(lesson, language, moduleId = null) {

    const { flashcards, addFlashcard } = useFlashcards();

    const [lastAddedCount, setLastAddedCount] = useState(null);

    const { entries, pending, alreadyAdded } = getPendingLessonVocabulary({ lesson, flashcards, language, moduleId });

    const addPending = useCallback(() => {

        pending.forEach(entry => {
            addFlashcard(entry, language);
            trackEvent(ANALYTICS_EVENTS.FLASHCARD_ADDED, { language, source: SOURCE });
        });

        setLastAddedCount(pending.length);

    }, [pending, addFlashcard, language]);

    return {
        total: entries.length,
        alreadyAdded,
        pendingCount: pending.length,
        lastAddedCount,
        addPending
    };

}
