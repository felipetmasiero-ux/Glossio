import { useNavigate } from "react-router-dom";

import "./PrimaryActionCard.css";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

const ICONS_BY_TYPE = {
    review: "cards",
    exercise: "pencil",
    flashcards: "cards",
    video: "play",
    lesson: "book",
    explore: "play",
    "next-level": "star",
    "review-modules": "book"
};

export function PrimaryActionCard({ nextStep }) {

    const navigate = useNavigate();

    if (!nextStep) {

        return null;

    }

    return (

        <Card className="primary-action-card" hoverable={false}>

            <span className="primary-action-card__icon">
                <Icon name={ICONS_BY_TYPE[nextStep.type] ?? "chevron-right"} size={18} />
            </span>

            <p className="primary-action-card__title">
                {nextStep.label}
            </p>

            <Button onClick={() => navigate(nextStep.href)}>
                Continuar
            </Button>

        </Card>

    );

}
