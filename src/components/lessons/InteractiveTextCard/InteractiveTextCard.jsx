import "./InteractiveTextCard.css";

import { Card } from "../../common/Card/Card";
import { AudioButton } from "../../common/AudioButton/AudioButton";

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

    audio,

    variant = "card",

    children

}) {

    const {

        selectedWord,

        openWord,

        closeWord

    } = useWordPopup(lesson);

    if (variant === "quote") {

        return (

            <LessonSection className="interactive-quote">

                <blockquote className="interactive-quote__mark">
                    <TextRenderer
                        text={text}
                        language={lesson?.language}
                        onWordClick={openWord}
                    />
                </blockquote>

                <AudioButton audio={audio} text={text} language={lesson?.language} className="interactive-quote__audio" />

                <WordPopup
                    word={selectedWord}
                    onClose={closeWord}
                />

            </LessonSection>

        );

    }

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

                <AudioButton audio={audio} text={text} language={lesson?.language} className="interactive-text-card__audio" />

                {children}

            </Card>

            <WordPopup

                word={selectedWord}

                onClose={closeWord}

            />

        </LessonSection>

    );

}
