import "./VocabularySection.css";

import { LessonSection } from "../LessonSection/LessonSection";

import { VocabularyCard } from "../VocabularyCard/VocabularyCard";

import { WordPopup } from "../WordPopup/WordPopup";

import { useWordPopup } from "../../../hooks/useWordPopup";
import { DictionaryRepository } from "../../../repositories/DictionaryRepository";

export function VocabularySection({

    lesson,

    vocabulary = []

}) {

    const entries = vocabulary
        .map(word => DictionaryRepository.getEntry(lesson?.language, word))
        .filter(Boolean);

    const {

        selectedWord,

        openWord,

        closeWord

    } = useWordPopup(lesson ?? { vocabulary: entries });

    if (entries.length === 0) {

        return null;

    }

    return (

        <>

            <LessonSection

                className="vocabulary-section"

                icon="🗂️"

                title="Vocabulary"

            >

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
