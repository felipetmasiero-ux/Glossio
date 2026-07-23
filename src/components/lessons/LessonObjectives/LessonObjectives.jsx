import "./LessonObjectives.css";

import { Card } from "../../common/Card/Card";
import { SectionHeader } from "../../common/SectionHeader/SectionHeader";

export function LessonObjectives({

    objectives = []

}) {

    if (objectives.length === 0) {

        return null;

    }

    return (

        <section className="lesson-objectives animate-fade-in">

            <SectionHeader

                icon="🎯"

                title="Learning Objectives"

                subtitle="By the end of this lesson you will be able to:"

            />

            <div className="lesson-objectives-grid">

                {

                    objectives.map((objective) => (

                        <Card

                            key={objective}

                            className="lesson-objective-card"

                        >

                            <span className="lesson-objective-icon">

                                ✓

                            </span>

                            <p>

                                {objective}

                            </p>

                        </Card>

                    ))

                }

            </div>

        </section>

    );

}