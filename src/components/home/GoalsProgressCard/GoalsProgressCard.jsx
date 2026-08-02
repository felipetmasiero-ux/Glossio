import { useNavigate } from "react-router-dom";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";
import { ProgressBar } from "../../common/ProgressBar/ProgressBar";
import { EmptyState } from "../../common/EmptyState/EmptyState";

import "./GoalsProgressCard.css";

const ROWS = [
    { key: "lessons", label: "Lições", unit: "" },
    { key: "reviews", label: "Revisões", unit: "" },
    { key: "videoMinutes", label: "Vídeos", unit: " min" }
];

export function GoalsProgressCard({ summary }) {

    const navigate = useNavigate();

    if (!summary.hasAnyGoal) {
        return (
            <EmptyState
                icon="target"
                title="Nenhuma meta configurada"
                description="Defina metas diárias de lições, revisões e vídeos para acompanhar seu progresso."
                actionLabel="Configurar metas"
                onAction={() => navigate("/goals")}
            />
        );
    }

    const configuredRows = ROWS.filter(row => summary.daily[row.key].hasGoal);

    return (

        <Card className="goals-progress-card" hoverable={false}>

            {configuredRows.map(row => {

                const goal = summary.daily[row.key];

                return (
                    <div className="goals-progress-card__row" key={row.key}>

                        <div className="goals-progress-card__row-header">
                            <span className="goals-progress-card__label">{row.label}</span>
                            <span className="goals-progress-card__count text-mono-number">
                                {goal.current} / {goal.target}{row.unit}
                            </span>
                        </div>

                        <ProgressBar value={goal.percentage} variant={goal.completed ? "success" : "primary"} />

                    </div>
                );

            })}

            {summary.recommendation && (
                <p className="goals-progress-card__recommendation">{summary.recommendation}</p>
            )}

            <Button variant="secondary" onClick={() => navigate("/goals")}>
                <Icon name="target" size={16} />
                Ver metas
            </Button>

        </Card>

    );

}
