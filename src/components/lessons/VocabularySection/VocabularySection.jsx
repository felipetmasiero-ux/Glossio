import "./VocabularySection.css";

import { Icon } from "../../common/Icon/Icon";
import { Button } from "../../common/Button/Button";
import { LessonSection } from "../LessonSection/LessonSection";

import { VocabularyCard } from "../VocabularyCard/VocabularyCard";

import { WordPopup } from "../WordPopup/WordPopup";

import { useWordPopup } from "../../../hooks/useWordPopup";
import { useLessonVocabularyFlashcards } from "../../../hooks/useLessonVocabularyFlashcards";
import { DictionaryRepository } from "../../../repositories/DictionaryRepository";

// The bulk "add all" action reuses useLessonVocabularyFlashcards exactly as
// it already existed (previously only surfaced at the end of the lesson,
// via the now-removed VocabularyFlashcardsPrompt) - same hook, same
// getPendingLessonVocabulary diffing, same addFlashcard() calls, same
// FLASHCARD_ADDED analytics convention. Only hidden for an unauthenticated
// reader, who already gets InlineSignupPrompt for this same vocabulary
// elsewhere in LessonReader - showing this too would be a second,
// competing flashcard nudge they can't act on yet.
export function VocabularySection({

    lesson,

    vocabulary = [],

    isAuthenticated = false,

    moduleId = null

}) {

    const entries = vocabulary
        .map(word => DictionaryRepository.getEntry(lesson?.language, word))
        .filter(Boolean);

    const {

        selectedWord,

        openWord,

        closeWord

    } = useWordPopup(lesson ?? { vocabulary: entries });

    const { total, pendingCount, addPending } = useLessonVocabularyFlashcards(lesson, lesson?.language, moduleId);

    if (entries.length === 0) {

        return null;

    }

    return (

        <>

            <LessonSection

                className="vocabulary-section"

                icon="cards"

                title="Vocabulário"

            >

                {isAuthenticated && total > 0 && (

                    <div className="vocabulary-section__action" aria-live="polite">

                        {

                            pendingCount === 0 ? (

                                <p className="vocabulary-section__done">
                                    <Icon name="check" size={14} />
                                    Todas adicionadas
                                </p>

                            ) : (

                                <Button variant="secondary" onClick={addPending}>
                                    Adicionar todas aos flashcards
                                </Button>

                            )

                        }

                    </div>

                )}

                <div className="vocabulary-grid">

                    {

                        entries.map(entry => (

                            <VocabularyCard

                                key={entry.id}

                                word={entry}

                                onOpen={openWord}

                            />

                        ))

                    }

                </div>

            </LessonSection>

            <WordPopup

                word={selectedWord}

                onClose={closeWord}

            />

        </>

    );

}
