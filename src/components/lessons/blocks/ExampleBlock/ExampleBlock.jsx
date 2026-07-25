import "./ExampleBlock.css";

import { Card } from "../../../common/Card/Card";

import { LessonSection } from "../../LessonSection/LessonSection";
import { TextRenderer } from "../../TextRenderer/TextRenderer";
import { WordPopup } from "../../WordPopup/WordPopup";

import { useWordPopup } from "../../../../hooks/useWordPopup";

export function ExampleBlock({ block, lesson, wordIndex }) {

    const {

        selectedWord,

        openWord,

        closeWord

    } = useWordPopup(lesson);

    const examples = block.examples ?? [

        { text: block.text, translation: block.translation }

    ];

    return (

        <LessonSection

            icon="💬"

            title="Example"

            subtitle={

                examples.length > 1

                    ? "Study the sentences."

                    : "Study the sentence."

            }

        >

            <Card>

                {

                    examples.map((example, index) => (

                        <div className="example-item" key={index}>

                            <TextRenderer

                                text={example.text}

                                wordIndex={wordIndex}

                                onWordClick={openWord}

                            />

                            {

                                example.translation && (

                                    <p className="example-translation">

                                        {example.translation}

                                    </p>

                                )

                            }

                        </div>

                    ))

                }

            </Card>

            <WordPopup

                word={selectedWord}

                onClose={closeWord}

            />

        </LessonSection>

    );

}
