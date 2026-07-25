import { LessonSection } from "../../LessonSection/LessonSection";
import { InfoBox } from "../../common/InfoBox/InfoBox";

export function TipBlock({

    block

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

            </InfoBox>

        </LessonSection>

    );

}
