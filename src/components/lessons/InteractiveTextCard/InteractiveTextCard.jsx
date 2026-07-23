import "./InteractiveTextCard.css";

import { Card } from "../../common/Card/Card";
import { SectionHeader } from "../../common/SectionHeader/SectionHeader";

import { TextRenderer } from "../TextRenderer/TextRenderer";
import { WordPopup } from "../WordPopup/WordPopup";

import { useWordPopup } from "../../../hooks/useWordPopup";

export function InteractiveTextCard({

    lesson,

    icon,

    title,

    subtitle,

    text,

    children,

    wordIndex

}) {

    const {

        selectedWord,

        openWord,

        closeWord

    } = useWordPopup(lesson);

    return (

        <section className="interactive-text-card">

            <SectionHeader

                icon={icon}

                title={title}

                subtitle={subtitle}

            />

            <Card>

                <TextRenderer

                    text={text}

                    wordIndex={wordIndex}

                    onWordClick={openWord}

                />

                {children}

            </Card>

            <WordPopup

                word={selectedWord}

                onClose={closeWord}

            />

        </section>

    );

}