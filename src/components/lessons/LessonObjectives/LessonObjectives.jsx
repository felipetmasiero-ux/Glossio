import "./LessonObjectives.css";

import { Icon } from "../../common/Icon/Icon";
import { LessonSection } from "../LessonSection/LessonSection";

export function LessonObjectives({

    objectives = []

}) {

    if (objectives.length === 0) {

        return null;

    }

    return (

        <LessonSection

            className="lesson-objectives"

            icon="target"

            title="Objetivos"

            subtitle="Ao final desta lição você será capaz de:"

        >

            <ul className="lesson-objectives-list">

                {

                    objectives.map((objective) => (

                        <li key={objective}>

                            <Icon name="check" size={14} className="lesson-objectives-list__icon" />

                            <span>{objective}</span>

                        </li>

                    ))

                }

            </ul>

        </LessonSection>

    );

}
