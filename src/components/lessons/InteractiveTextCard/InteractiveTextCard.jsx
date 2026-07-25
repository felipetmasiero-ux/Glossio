import { Card } from "../../common/Card/Card";

import { LessonSection } from "../LessonSection/LessonSection";
import { TextRenderer } from "../TextRenderer/TextRenderer";
import { WordPopup } from "../WordPopup/WordPopup";

import { useWordPopup } from "../../../hooks/useWordPopup";

export function InteractiveTextCard({

    lesson,

    icon,

    title,

    subtitle,

    text,

    children

}) {

    const {

        selectedWord,

        openWord,

        closeWord

    } = useWordPopup(lesson);

    return (

        <LessonSection

            icon={icon}

            title={title}

            subtitle={subtitle}

        >

            <Card>

                <TextRenderer

                    text={text}

                    language={lesson?.language}

                    onWordClick={openWord}

                />

                {children}

            </Card>

            <WordPopup

                word={selectedWord}

                onClose={closeWord}

            />

        </LessonSection>

    );

}
