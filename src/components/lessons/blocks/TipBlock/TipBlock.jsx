import { LessonSection } from "../../LessonSection/LessonSection";
import { InfoBox } from "../../common/InfoBox/InfoBox";

export function TipBlock({

    block

}) {

    return (

        <LessonSection>

            <InfoBox

                variant="tip"

                icon="💡"

                title={block.title ?? "Tip"}

            >

                <p>

                    {block.text}

                </p>

            </InfoBox>

        </LessonSection>

    );

}
