import { memo } from "react";

import { Icon } from "../../common/Icon/Icon";
import { EmptyState } from "../../common/EmptyState/EmptyState";

import "./RecentActivityCard.css";

// recentActivity stays referentially stable across renders where language/
// events/flashcards haven't changed (see useDashboardData.js) - memo lets
// this card skip re-rendering in that case.
export const RecentActivityCard = memo(function RecentActivityCard({ recentActivity }) {

    if (recentActivity.length === 0) {
        return (
            <EmptyState
                icon="clock"
                title="Nenhuma atividade ainda"
                description="Suas lições, vídeos e revisões recentes aparecerão aqui."
            />
        );
    }

    return (

        <div className="recent-activity-card">

            {recentActivity.map(day => (

                <div className="recent-activity-card__day" key={day.dateLabel}>

                    <p className="recent-activity-card__date text-mono-label">{day.dateLabel}</p>

                    <ul className="recent-activity-card__items">
                        {day.items.map((item, index) => (
                            <li className="recent-activity-card__item" key={index}>
                                <Icon name={item.icon} size={15} />
                                <span>{item.label}</span>
                            </li>
                        ))}
                    </ul>

                </div>

            ))}

        </div>

    );

});
