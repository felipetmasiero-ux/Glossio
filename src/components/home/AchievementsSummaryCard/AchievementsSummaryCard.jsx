import { useNavigate } from "react-router-dom";

import { SummaryCard } from "../SummaryCard/SummaryCard";

export function AchievementsSummaryCard({ summary }) {

    const navigate = useNavigate();

    return (

        <SummaryCard
            className="achievements-summary-card"
            layout="inline"
            title="Conquistas desbloqueadas"
            value={`${summary.unlocked} / ${summary.total}`}
            ctaLabel="Ver detalhes"
            onCtaClick={() => navigate("/achievements")}
        />

    );

}
