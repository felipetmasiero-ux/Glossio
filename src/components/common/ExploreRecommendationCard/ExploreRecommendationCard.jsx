import { useNavigate } from "react-router-dom";

import { Icon } from "../Icon/Icon";

import { TOPIC_LABELS } from "../../../constants/topics";

export function ExploreRecommendationCard({ video }) {

    const navigate = useNavigate();

    return (

        <button
            type="button"
            className="recommendation-card"
            onClick={() => navigate(`/explore/${video.id}`)}
        >

            <span className="recommendation-card__thumbnail">
                {
                    video.thumbnail
                        ? <img src={video.thumbnail} alt="" className="recommendation-card__thumbnail-img" />
                        : <Icon name="play" size={16} />
                }
            </span>

            <span className="recommendation-card__body">

                <span className="recommendation-card__title">
                    {video.title}
                </span>

                {video.topic && (
                    <span className="recommendation-card__topic text-mono-label">
                        {TOPIC_LABELS[video.topic] ?? video.topic}
                    </span>
                )}

            </span>

            <Icon name="chevron-right" size={16} className="recommendation-card__action" />

        </button>

    );

}
