import { useNavigate } from "react-router-dom";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import "./FavoritesSummaryCard.css";

export function FavoritesSummaryCard({ favoriteCount }) {

    const navigate = useNavigate();

    return (

        <Card className="favorites-summary-card" hoverable={false}>

            <div className="favorites-summary-card__body">
                <span className="favorites-summary-card__icon">
                    <Icon name="star" size={20} fill="currentColor" />
                </span>
                <div>
                    <p className="favorites-summary-card__title text-mono-label">Favoritas</p>
                    <p className="favorites-summary-card__value text-mono-number">
                        {favoriteCount} {favoriteCount === 1 ? "palavra" : "palavras"}
                    </p>
                </div>
            </div>

            <Button variant="secondary" onClick={() => navigate("/my-flashcards")}>
                Ver coleção
                <Icon name="chevron-right" size={16} />
            </Button>

        </Card>

    );

}
