import "./VocabularySection.css";

import { LessonSection } from "../LessonSection/LessonSection";

import { VocabularyCard } from "../VocabularyCard/VocabularyCard";

import { WordPopup } from "../WordPopup/WordPopup";

import { useWordPopup } from "../../../hooks/useWordPopup";

export function VocabularySection({

    lesson,

    vocabulary = []

}) {

    const {

        selectedWord,

        openWord,

        closeWord

    } = useWordPopup(lesson ?? { vocabulary });

    if (vocabulary.length === 0) {

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

                        vocabulary.map(word => (

                            <VocabularyCard

                                key={word.word}

                                word={word}

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
