import { Card } from "../../../common/Card/Card";
import { SectionHeader } from "../../../common/SectionHeader/SectionHeader";

import { TextRenderer } from "../../TextRenderer/TextRenderer";

import { WordPopup } from "../../WordPopup/WordPopup";

import { Toast } from "../../../common/Toast/Toast";

import { useWordActions } from "../../../../hooks/useWordActions";

export function ExampleBlock({block, wordIndex}){

    const{

        selectedWord,

        openWord,

        closeWord,

        addWord,

        toast

    }=useWordActions();

    return(

        <section>

            <SectionHeader

                icon="💬"

                title="Example"

                subtitle="Study the sentence."

            />

            <Card>

                <TextRenderer

                    text={block.text}

                    wordIndex={wordIndex}

                    onWordClick={openWord}

                />

            </Card>

            <WordPopup

                word={selectedWord}

                onClose={closeWord}

                onAdd={addWord}

            />

            <Toast

                message={toast}

            />

        </section>

    );

}