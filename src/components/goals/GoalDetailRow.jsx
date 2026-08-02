import { ProgressBar } from "../common/ProgressBar/ProgressBar";

import "./GoalDetailRow.css";

export function GoalDetailRow({ label, goal, unit = "" }) {

    if (!goal.hasGoal) return null;

    return (

        <div className="goal-detail-row">

            <div className="goal-detail-row__header">
                <span className="goal-detail-row__label">{label}</span>
                <span className="goal-detail-row__count text-mono-number">{goal.current} / {goal.target}{unit}</span>
            </div>

            <ProgressBar value={goal.percentage} variant={goal.completed ? "success" : "primary"} />

            <div className="goal-detail-row__meta text-mono-label">
                <span>{goal.percentage}%</span>
                <span>{goal.completed ? "Concluído" : `Faltam ${goal.remaining}${unit}`}</span>
            </div>

        </div>

    );

}
