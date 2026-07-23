import "./LessonHero.css";

export function LessonHero({ lesson }) {

    return (

        <section className="lesson-hero">

            <div className="lesson-hero-content">

                <span className="lesson-level">
                    {lesson.level}
                </span>

                <h1>
                    {lesson.title}
                </h1>

                <p className="lesson-description">
                    {lesson.description}
                </p>

                <div className="lesson-meta">

                    <div className="lesson-meta-item">

                        ⏱ {lesson.estimatedTime}

                    </div>

                    <div className="lesson-meta-item">

                        ⭐ {lesson.difficulty}

                    </div>

                    <div className="lesson-meta-item">

                        +{lesson.xp} XP

                    </div>

                </div>

            </div>

        </section>

    );

}