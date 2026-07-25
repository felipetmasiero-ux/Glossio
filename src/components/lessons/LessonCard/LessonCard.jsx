import "./LessonCard.css";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";

export function LessonCard({
    lesson,
    onOpen,
    locked = false,
    completed = false
}) {

    return (

        <Card

            className={`lesson-card ${locked ? "locked" : ""}`}

            hoverable={!locked}

        >

            <div className="lesson-card-header">

                <span className="lesson-level">

                    {lesson.level}

                </span>

                <span>

                    ⭐ {lesson.xp}

                </span>

            </div>

            <h2>

                {lesson.title} {completed && "✅"}

            </h2>

            <p>

                {lesson.description}

            </p>

            <div className="lesson-card-footer">

                <span>

                    ⏱ {lesson.estimatedTime} min

                </span>

                <Button

                    disabled={locked}

                    onClick={onOpen}

                >

                    {

                        locked

                            ? "🔒 Locked"

                            : completed

                                ? "Review →"

                                : "Start →"

                    }

                </Button>

            </div>

        </Card>

    );

}
