import { getVocabularyEntries } from "../exercises/getVocabularyEntries";
import { isWordKnown } from "./isWordKnown";

// The one place that decides "which of this lesson's vocabulary words are
// eligible to become flashcards, and which already are." Reuses
// getVocabularyEntries (the same lesson.vocabulary -> dictionary-entry
// resolution VocabularySection/the exercise generators already use - no
// second vocabulary source, no new dictionary lookup) and isWordKnown (the
// same word+language check FlashcardProvider.hasFlashcard exposes) rather
// than reimplementing either. Pure and framework-free on purpose, so the
// counting/diffing logic is testable without mounting FlashcardProvider.
//
// Entries are enriched with { lessonId, moduleId, category } - the exact
// same fields useWordPopup.js's withLessonContext already attaches before
// a single word goes through addFlashcard - so a card added here is
// indistinguishable from one added by hand while reading (and so
// getModuleCompletionStats' `card.moduleId === module.id` count, which
// ModuleCompletePage's new "Revisar flashcards" link depends on, actually
// includes it).
export function getPendingLessonVocabulary({ lesson, flashcards = [], language, moduleId = null }) {

    if (!lesson) {
        return { entries: [], pending: [], alreadyAdded: 0 };
    }

    const entries = getVocabularyEntries(lesson).map(entry => ({
        ...entry,
        lessonId: lesson.id,
        moduleId,
        category: lesson.category ?? null
    }));

    const pending = entries.filter(entry => !isWordKnown(flashcards, entry.word, language));

    return {
        entries,
        pending,
        alreadyAdded: entries.length - pending.length
    };

}
