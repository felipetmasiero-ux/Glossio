import { memo } from "react";

import "./ActivityHeatmap.css";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long" });

function formatCellLabel(cell) {

    const date = dateFormatter.format(new Date(cell.timestamp));
    const activityWord = cell.count === 1 ? "atividade" : "atividades";

    return `${cell.count} ${activityWord} em ${date}`;

}

// heatmap now stays referentially stable across renders where the
// underlying events haven't changed (see useDashboardData.js) - memo lets
// this 90-cell grid actually skip re-rendering when that's the case.
export const ActivityHeatmap = memo(function ActivityHeatmap({ heatmap }) {

    return (

        <div className="activity-heatmap">

            <div className="activity-heatmap__scroll">
                <div className="activity-heatmap__grid">
                    {heatmap.map(cell => (
                        <div
                            key={cell.date}
                            className={`activity-heatmap__cell activity-heatmap__cell--${cell.level}`}
                            role="img"
                            aria-label={formatCellLabel(cell)}
                            title={formatCellLabel(cell)}
                        />
                    ))}
                </div>
            </div>

            <div className="activity-heatmap__legend">
                <span className="activity-heatmap__legend-label text-mono-label">Menos</span>
                <span className="activity-heatmap__cell activity-heatmap__cell--0" aria-hidden="true" />
                <span className="activity-heatmap__cell activity-heatmap__cell--1" aria-hidden="true" />
                <span className="activity-heatmap__cell activity-heatmap__cell--2" aria-hidden="true" />
                <span className="activity-heatmap__cell activity-heatmap__cell--3" aria-hidden="true" />
                <span className="activity-heatmap__legend-label text-mono-label">Mais</span>
            </div>

        </div>

    );

});
