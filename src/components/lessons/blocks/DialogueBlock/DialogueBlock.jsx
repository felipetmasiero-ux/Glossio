import "./DialogueBlock.css";

import { Card } from "../../../common/Card/Card";
import { SectionHeader } from "../../../common/SectionHeader/SectionHeader";
import { DialogueLine } from "../../DialogueLine/DialogueLine";
import { WordPopup } from "../../WordPopup/WordPopup";
import { useWordPopup } from "../../../../hooks/useWordPopup";

export function DialogueBlock({ block, lesson, wordIndex }) {

    const {

        selectedWord,
        openWord,
        closeWord

    } = useWordPopup(lesson);

    return (

        <section className="lesson-dialogue">

            <SectionHeader

                icon="💬"

                title="Dialogue"

                subtitle="Practice reading conversations."

            />

            <Card>

                <div className="dialogue-list">

                    {

                        block.lines.map((line) => (

                            <DialogueLine

                                line={line}

                                wordIndex={wordIndex}

                                onWordClick={openWord}

                            />

                        ))

                    }

                </div>

                <WordPopup

                    word={selectedWord}
                    onClose={closeWord}

                />

            </Card>

        </section>

    );

}