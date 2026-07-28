import { useNavigate } from "react-router-dom";

import { Icon } from "../Icon/Icon";

import { TOPIC_LABELS } from "../../../constants/topics";

export function LessonRecommendationCard({ lesson }) {

    const navigate = useNavigate();

    return (

        <button
            type="button"
            className="recommendation-card"
            onClick={() => navigate(`/lessons/${lesson.id}`)}
        >

            <span className="recommendation-card__thumbnail">
                {
                    lesson.cover
                        ? <img src={lesson.cover} alt="" className="recommendation-card__thumbnail-img" />
                        : <Icon name="book" size={16} />
                }
            </span>

            <span className="recommendation-card__body">

                <span className="recommendation-card__title">
                    {lesson.title}
                </span>

                {lesson.topic && (
                    <span className="recommendation-card__topic text-mono-label">
                        {TOPIC_LABELS[lesson.topic] ?? lesson.topic}
                    </span>
                )}

            </span>

            <Icon name="chevron-right" size={16} className="recommendation-card__action" />

        </button>

    );

}
