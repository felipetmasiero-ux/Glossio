import "./LessonHero.css";

import { Icon } from "../../common/Icon/Icon";

export function LessonHero({ lesson }) {

    return (

        <section className="lesson-hero">

            <div className="lesson-hero-content">

                <span className="lesson-level text-mono-label">
                    {lesson.level}
                </span>

                <h1>
                    {lesson.title}
                </h1>

                <p className="lesson-description">
                    {lesson.description}
                </p>

                <div className="lesson-meta">

                    <span className="lesson-meta-item">
                        <Icon name="clock" size={14} /> {lesson.estimatedTime} min
                    </span>

                    <span className="lesson-meta-item">
                        <Icon name="target" size={14} /> {lesson.difficulty}
                    </span>

                    <span className="lesson-meta-item">
                        <Icon name="star" size={14} /> +{lesson.xp} xp
                    </span>

                </div>

            </div>

        </section>

    );

}
