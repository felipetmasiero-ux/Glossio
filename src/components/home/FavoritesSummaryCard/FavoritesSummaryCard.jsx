import { useNavigate } from "react-router-dom";

import { SummaryCard } from "../SummaryCard/SummaryCard";

import "./FavoritesSummaryCard.css";

export function FavoritesSummaryCard({ favoriteCount }) {

    const navigate = useNavigate();

    return (

        <SummaryCard
            className="favorites-summary-card"
            icon="star"
            iconFill="currentColor"
            title="Favoritas"
            value={`${favoriteCount} ${favoriteCount === 1 ? "palavra" : "palavras"}`}
            ctaLabel="Ver coleção"
            onCtaClick={() => navigate("/my-flashcards", { state: { favoritesOnly: true } })}
        />

    );

}
