import "./DialogueBlock.css";

import { Card } from "../../../common/Card/Card";
import { LessonSection } from "../../LessonSection/LessonSection";
import { DialogueLine } from "../../DialogueLine/DialogueLine";
import { WordPopup } from "../../WordPopup/WordPopup";
import { useWordPopup } from "../../../../hooks/useWordPopup";

export function DialogueBlock({ block, lesson }) {

    const {

        selectedWord,
        openWord,
        closeWord

    } = useWordPopup(lesson);

    return (

        <LessonSection

            className="lesson-dialogue"

            icon="💬"

            title="Dialogue"

            subtitle="Practice reading conversations."

        >

            <Card>

                <div className="dialogue-list">

                    {

                        block.lines.map((line, index) => (

                            <DialogueLine

                                key={index}

                                line={line}

                                language={lesson?.language}

                                onWordClick={openWord}

                            />

                        ))

                    }

                </div>

            </Card>

            <WordPopup

                word={selectedWord}
                onClose={closeWord}

            />

        </LessonSection>

    );

}
