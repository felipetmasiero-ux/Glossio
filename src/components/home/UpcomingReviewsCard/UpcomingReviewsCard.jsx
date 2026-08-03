import { memo } from "react";

import { Card } from "../../common/Card/Card";

import "./UpcomingReviewsCard.css";

function wordsLabel(count) {
    return count === 1 ? "palavra" : "palavras";
}

// upcoming stays referentially stable across renders where flashcards/
// language haven't changed (see useDashboardData.js) - memo lets this card
// skip re-rendering in that case.
export const UpcomingReviewsCard = memo(function UpcomingReviewsCard({ upcoming }) {

    const rows = [
        { label: "Hoje", count: upcoming.today },
        { label: "Amanhã", count: upcoming.tomorrow },
        { label: "Próximos 7 dias", count: upcoming.next7Days }
    ];

    return (

        <Card className="upcoming-reviews-card" hoverable={false}>

            <p className="upcoming-reviews-card__title">Próximas revisões</p>

            <div className="upcoming-reviews-card__rows">
                {rows.map(row => (
                    <div className="upcoming-reviews-card__row" key={row.label}>
                        <span className="upcoming-reviews-card__row-label">{row.label}</span>
                        <span className="upcoming-reviews-card__row-count text-mono-number">
                            {row.count} <span className="upcoming-reviews-card__row-unit text-mono-label">{wordsLabel(row.count)}</span>
                        </span>
                    </div>
                ))}
            </div>

        </Card>

    );

});
