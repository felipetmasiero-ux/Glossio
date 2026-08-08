import { useNavigate } from "react-router-dom";

import { SummaryCard } from "../SummaryCard/SummaryCard";

import "./StatisticsSummaryCard.css";

export function StatisticsSummaryCard({ statistics }) {

    const navigate = useNavigate();

    return (

        <SummaryCard
            className="statistics-summary-card"
            ctaLabel="Ver detalhes"
            onCtaClick={() => navigate("/statistics")}
        >

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

        </SummaryCard>

    );

}
