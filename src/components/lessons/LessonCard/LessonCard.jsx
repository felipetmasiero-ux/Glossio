import "./LessonCard.css";

import { Icon } from "../../common/Icon/Icon";

export function LessonCard({
    lesson,
    onOpen,
    locked = false,
    completed = false
}) {

    return (

        <button
            type="button"
            className={`lesson-row ${locked ? "lesson-row--locked" : ""}`}
            onClick={onOpen}
            disabled={locked}
            aria-label={locked ? `${lesson.title} — lição bloqueada` : completed ? `Revisar ${lesson.title}` : `Começar ${lesson.title}`}
        >

            <span className="lesson-row__level text-mono-label">
                {lesson.level}
            </span>

            <span className="lesson-row__body">
                <span className="lesson-row__title">
                    {lesson.title}
                    {completed && <Icon name="check" size={15} className="lesson-row__completed" />}
                </span>

                <span className="lesson-row__description">
                    {lesson.description}
                </span>

                <span className="lesson-row__meta">
                    <span className="lesson-row__meta-item">
                        <Icon name="clock" size={13} /> {lesson.estimatedTime} min
                    </span>
                    <span className="lesson-row__meta-item">
                        <Icon name="star" size={13} /> {lesson.xp} xp
                    </span>
                </span>
            </span>

            <span className="lesson-row__action">
                {
                    locked
                        ? <Icon name="lock" size={17} />
                        : <Icon name="chevron-right" size={17} />
                }
            </span>

        </button>

    );

}
