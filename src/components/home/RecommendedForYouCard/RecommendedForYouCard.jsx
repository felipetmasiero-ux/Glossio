import { memo } from "react";
import { Link } from "react-router-dom";

import { Icon } from "../../common/Icon/Icon";

import "./RecommendedForYouCard.css";

// `recommendations` stays referentially stable across renders where
// language/progress/flashcards/events/studyHistory haven't changed (see
// useDashboardData.js), same as every other dashboard card - memo lets
// this one skip re-rendering in that case.
//
// generateRecommendations() (src/utils/adaptiveLearning) never returns an
// empty array when given a real language - it falls back to generic
// suggestions itself - so there's no "no data" empty state to handle here;
// every item already has a title, a reason and somewhere to go.
export const RecommendedForYouCard = memo(function RecommendedForYouCard({ recommendations = [] }) {

    if (recommendations.length === 0) {
        return null;
    }

    return (

        <div className="recommended-for-you">

            {recommendations.map(recommendation => (

                <Link
                    key={recommendation.id}
                    to={recommendation.href}
                    className="recommended-for-you__item"
                >

                    <span className="recommended-for-you__icon">
                        <Icon name={recommendation.icon} size={18} />
                    </span>

                    <span className="recommended-for-you__body">
                        <span className="recommended-for-you__title">{recommendation.title}</span>
                        <span className="recommended-for-you__reason">{recommendation.reason}</span>
                    </span>

                    <Icon name="chevron-right" size={16} className="recommended-for-you__chevron" />

                </Link>

            ))}

        </div>

    );

});
