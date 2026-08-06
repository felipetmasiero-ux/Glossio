import { LessonSection } from "../../LessonSection/LessonSection";
import { InfoBox } from "../../common/InfoBox/InfoBox";
import { AudioButton } from "../../../common/AudioButton/AudioButton";

import "./TipBlock.css";

export function TipBlock({

    block,

    lesson

}) {

    return (

        <LessonSection>

            <InfoBox

                variant="tip"

                icon="lightbulb"

                title={block.title ?? "Dica"}

            >

                <p>

                    {block.text}

                </p>

                <AudioButton

                    audio={block.audio}

                    text={block.text}

                    language={lesson?.language}

                    className="tip-block__audio"

                />

            </InfoBox>

        </LessonSection>

    );

}
