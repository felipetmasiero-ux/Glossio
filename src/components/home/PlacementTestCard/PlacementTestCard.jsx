import { useNavigate } from "react-router-dom";

import { SummaryCard } from "../SummaryCard/SummaryCard";

import "./PlacementTestCard.css";

export function PlacementTestCard({ latestResult }) {

    const navigate = useNavigate();

    return (

        <SummaryCard
            className="placement-test-card"
            icon="target"
            title="Teste de nivelamento"
            value={latestResult ? `${latestResult.language} · ${latestResult.recommendedLevel}` : "Descubra seu nível"}
            numericValue={false}
            ctaLabel={latestResult ? "Refazer teste" : "Fazer teste"}
            onCtaClick={() => navigate("/placement-test")}
        />

    );

}
