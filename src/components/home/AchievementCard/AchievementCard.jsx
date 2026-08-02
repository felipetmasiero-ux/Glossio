import { Card } from "../../common/Card/Card";
import { Icon } from "../../common/Icon/Icon";

import "./AchievementCard.css";

export function AchievementCard({ achievement }) {

    if (!achievement) {

        return (
            <Card className="achievement-card achievement-card--empty" hoverable={false}>
                <span className="achievement-card__icon">
                    <Icon name="trophy" size={20} />
                </span>
                <div>
                    <p className="achievement-card__title">Nenhuma conquista ainda</p>
                    <p className="achievement-card__subtitle">
                        Complete um módulo para desbloquear sua primeira conquista.
                    </p>
                </div>
            </Card>
        );

    }

    return (
        <Card className="achievement-card" hoverable={false}>
            <span className="achievement-card__icon achievement-card__icon--earned">
                <Icon name="trophy" size={20} />
            </span>
            <p className="achievement-card__title">{achievement.title}</p>
        </Card>
    );

}
