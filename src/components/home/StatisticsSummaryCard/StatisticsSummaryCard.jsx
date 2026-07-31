import { useNavigate } from "react-router-dom";

import { Card } from "../../common/Card/Card";
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import "./StatisticsSummaryCard.css";

export function StatisticsSummaryCard({ statistics }) {

    const navigate = useNavigate();

    return (

        <Card className="statistics-summary-card" hoverable={false}>

            <div className="statistics-summary-card__stats">

                <div className="statistics-summary-card__stat">
                    <span className="statistics-summary-card__value text-mono-number">{statistics.totalWordsLearned}</span>
                    <span className="statistics-summary-card__label text-mono-label">Palavras</span>
                </div>

                <div className="statistics-summary-card__stat">
                    <span className="statistics-summary-card__value text-mono-number">{statistics.videosCompleted}</span>
                    <span className="statistics-summary-card__label text-mono-label">Vídeos</span>
                </div>

                <div className="statistics-summary-card__stat">
                    <span className="statistics-summary-card__value text-mono-number">{statistics.reviews.total}</span>
                    <span className="statistics-summary-card__label text-mono-label">Flashcards</span>
                </div>

            </div>

            <Button variant="secondary" onClick={() => navigate("/statistics")}>
                Ver detalhes
                <Icon name="chevron-right" size={16} />
            </Button>

        </Card>

    );

}
