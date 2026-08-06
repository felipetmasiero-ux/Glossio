import "./ExampleBlock.css";

import { Card } from "../../../common/Card/Card";
import { AudioButton } from "../../../common/AudioButton/AudioButton";

import { LessonSection } from "../../LessonSection/LessonSection";
import { TextRenderer } from "../../TextRenderer/TextRenderer";
import { WordPopup } from "../../WordPopup/WordPopup";

import { useWordPopup } from "../../../../hooks/useWordPopup";

export function ExampleBlock({ block, lesson }) {

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

            icon="chat"

            title="Exemplo"

            subtitle={

                examples.length > 1

                    ? "Estude as frases."

                    : "Estude a frase."

            }

        >

            <Card>

                {

                    examples.map((example, index) => (

                        <div className="example-item" key={index}>

                            <div className="example-item__text-row">

                                <TextRenderer

                                    text={example.text}

                                    language={lesson?.language}

                                    onWordClick={openWord}

                                />

                                <AudioButton

                                    audio={example.audio}

                                    text={example.text}

                                    language={lesson?.language}

                                />

                            </div>

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
