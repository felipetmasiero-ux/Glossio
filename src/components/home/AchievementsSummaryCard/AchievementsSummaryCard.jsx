import { useNavigate } from "react-router-dom";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import "./AchievementsSummaryCard.css";

export function AchievementsSummaryCard({ summary }) {

    const navigate = useNavigate();

    return (

        <Card className="achievements-summary-card" hoverable={false}>

            <div className="achievements-summary-card__body">
                <p className="achievements-summary-card__title">Conquistas desbloqueadas</p>
                <p className="achievements-summary-card__value text-mono-number">
                    {summary.unlocked} / {summary.total}
                </p>
            </div>

            <Button variant="secondary" onClick={() => navigate("/achievements")}>
                Ver detalhes
                <Icon name="chevron-right" size={16} />
            </Button>

        </Card>

    );

}
