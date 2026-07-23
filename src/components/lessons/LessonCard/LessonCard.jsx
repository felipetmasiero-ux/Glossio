import "./LessonCard.css";

export function LessonCard({
    lesson,
    onOpen
}) {

    return (

        <article className="lesson-card">

            <div className="lesson-card-header">

                <span className="lesson-level">

                    {lesson.level}

                </span>

                <span>

                    ⭐ {lesson.xp}

                </span>

            </div>

            <h2>

                {lesson.title}

            </h2>

            <p>

                {lesson.description}

            </p>

            <div className="lesson-card-footer">

                <span>

                    ⏱ {lesson.estimatedTime} min

                </span>

                <button onClick={onOpen}>

                    Start →

                </button>

            </div>

        </article>

    );

}