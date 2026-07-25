import "./HeadingBlock.css";

import { LessonSection } from "../../LessonSection/LessonSection";

export function HeadingBlock({ block }) {

    return (

        <LessonSection className="lesson-heading">

            <h2>

                {block.text}

            </h2>

        </LessonSection>

    );

}
