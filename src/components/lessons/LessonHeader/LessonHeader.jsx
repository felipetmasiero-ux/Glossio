import "./LessonHeader.css";

export function LessonHeader({ lesson }) {

    return (

        <header className="lesson-header">

            <div className="lesson-meta">

                <span className="lesson-level">
                    {lesson.level}
                </span>

                <span>
                    ⭐ {lesson.xp} XP
                </span>

                <span>
                    ⏱ {lesson.estimatedTime} min
                </span>

            </div>

            <h1>{lesson.title}</h1>

            <p className="lesson-subtitle">

                {lesson.subtitle}

            </p>

            <p className="lesson-description">

                {lesson.description}

            </p>

            <div className="lesson-objectives">

                <h3>Objectives</h3>

                <ul>

                    {lesson.objectives.map((objective) => (

                        <li key={objective.id}>

                            ✓ {objective.text}

                        </li>

                    ))}

                </ul>

            </div>

        </header>

    );

}