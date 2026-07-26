import { useNavigate } from "react-router-dom";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import "./ReviewsCard.css";

export function ReviewsCard({ reviews }) {

    const navigate = useNavigate();

    if (!reviews.hasReviews) {

        return (
            <Card className="reviews-card reviews-card--done" hoverable={false}>
                <span className="reviews-card__icon">
                    <Icon name="check" size={18} />
                </span>
                <div className="reviews-card__body">
                    <p className="reviews-card__title">Tudo em dia!</p>
                    <p className="reviews-card__subtitle">Nenhuma revisão pendente hoje.</p>
                </div>
            </Card>
        );

    }

    return (

        <Card className="reviews-card" hoverable={false}>

            <div className="reviews-card__body">
                <p className="reviews-card__title">Flashcards para revisar</p>
                <p className="reviews-card__subtitle">
                    {reviews.due} {reviews.due === 1 ? "ficha esperando" : "fichas esperando"}
                </p>
            </div>

            <Button onClick={() => navigate("/flashcards")}>
                Revisar agora
                <Icon name="chevron-right" size={16} />
            </Button>

        </Card>

    );

}
