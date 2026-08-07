import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";
import { LessonSection } from "../LessonSection/LessonSection";

import { useLessonVocabularyFlashcards } from "../../../hooks/useLessonVocabularyFlashcards";

import "./VocabularyFlashcardsPrompt.css";

// Closes the Lesson -> Vocabulary -> Flashcards loop: shown at the end of
// a lesson (see LessonReader.jsx), opt-in (the user has to click - nothing
// is added just for finishing the lesson), and only ever offers the
// lesson's own vocabulary (via useLessonVocabularyFlashcards ->
// getVocabularyEntries), never the wider dictionary. Renders nothing when
// the lesson has no vocabulary at all - same "nothing to show" contract
// VocabularySection itself already follows.
export function VocabularyFlashcardsPrompt({ lesson, language, moduleId = null }) {

    const { total, alreadyAdded, pendingCount, lastAddedCount, addPending } = useLessonVocabularyFlashcards(lesson, language, moduleId);

    if (total === 0) {
        return null;
    }

    const justAdded = lastAddedCount !== null;

    return (

        <LessonSection
            icon="cards"
            title="Vocabulário"
            subtitle={`${total} ${total === 1 ? "palavra aprendida" : "palavras aprendidas"} nesta lição.`}
            className="vocabulary-flashcards-prompt"
        >

            {/* aria-live: the meaningful change here is the transition after
            a click (button -> success message), not the initial render -
            same pattern Toast/AuthGateBanner already use elsewhere. */}
            <div className="vocabulary-flashcards-prompt__body" aria-live="polite">

                {
                    pendingCount === 0 ? (

                        <p className="vocabulary-flashcards-prompt__message">
                            <Icon name="check" size={14} />
                            {
                                justAdded
                                    ? `${lastAddedCount} ${lastAddedCount === 1 ? "palavra adicionada" : "palavras adicionadas"} aos flashcards.`
                                    : "Todas as palavras desta lição já estão nos seus flashcards."
                            }
                        </p>

                    ) : (

                        <>

                            {
                                alreadyAdded > 0 && (
                                    <p className="vocabulary-flashcards-prompt__note">
                                        {alreadyAdded} {alreadyAdded === 1 ? "já está" : "já estão"} nos seus flashcards.
                                    </p>
                                )
                            }

                            <Button onClick={addPending}>
                                Adicionar {pendingCount} {pendingCount === 1 ? "palavra" : "palavras"} aos flashcards
                            </Button>

                        </>

                    )
                }

            </div>

        </LessonSection>

    );

}
