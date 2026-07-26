import { useNavigate } from "react-router-dom";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import "./ResumeActivityCard.css";

export function ResumeActivityCard({ activity }) {

    const navigate = useNavigate();

    if (!activity) return null;

    return (

        <Card className="resume-activity-card" hoverable={false}>

            <span className="resume-activity-card__icon">
                <Icon name={activity.type === "exercise" ? "pencil" : "cards"} size={18} />
            </span>

            <div className="resume-activity-card__body">
                <p className="resume-activity-card__title">{activity.label}</p>
                {typeof activity.remaining === "number" && (
                    <p className="resume-activity-card__subtitle">
                        {activity.remaining} {activity.remaining === 1 ? "restante" : "restantes"}
                    </p>
                )}
            </div>

            <Button onClick={() => navigate(activity.href)}>
                Continuar
            </Button>

        </Card>

    );

}
