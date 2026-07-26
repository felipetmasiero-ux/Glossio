import { useState } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useDashboardData } from "../../hooks/useDashboardData";

import { QuickStatsCard } from "../../components/home/QuickStatsCard/QuickStatsCard";
import { Button } from "../../components/common/Button/Button";

import "./Profile.css";

const FLAGS = {
    English: "🇺🇸",
    French: "🇫🇷",
    Portuguese: "🇧🇷"
};

const RESET_KEYS = [
    "lessonProgress",
    "exerciseProgress",
    "flashcards",
    "events",
    "studyHistory",
    "lastActivity"
];

export function Profile() {

    const { language } = useLanguage();

    const dashboard = useDashboardData();

    const [confirmingReset, setConfirmingReset] = useState(false);

    function handleReset() {
        RESET_KEYS.forEach(key => localStorage.removeItem(key));
        window.location.href = "/";
    }

    return (

        <div className="page-container profile-page">

            <p className="profile-page__label text-mono-label">Perfil</p>

            <h1 className="profile-page__title">Seu progresso</h1>

            <div className="profile-page__language">
                <span className="profile-page__flag">{FLAGS[language] ?? "🌐"}</span>
                <span className="profile-page__language-name">{language || "Nenhum idioma selecionado"}</span>
                <Link to="/" className="profile-page__switch-link">
                    Trocar idioma
                </Link>
            </div>

            <QuickStatsCard quickStats={dashboard.quickStats} />

            <div className="profile-page__danger">

                <h2 className="profile-page__danger-title">Zona de risco</h2>

                <p className="profile-page__danger-description">
                    Isso apaga todo o seu progresso salvo neste dispositivo — lições, exercícios,
                    flashcards e estatísticas. Essa ação não pode ser desfeita.
                </p>

                {
                    !confirmingReset ? (
                        <Button variant="danger" onClick={() => setConfirmingReset(true)}>
                            Resetar progresso
                        </Button>
                    ) : (
                        <div className="profile-page__confirm">
                            <span className="profile-page__confirm-label">Tem certeza?</span>
                            <Button variant="danger" onClick={handleReset}>
                                Sim, apagar tudo
                            </Button>
                            <Button variant="secondary" onClick={() => setConfirmingReset(false)}>
                                Cancelar
                            </Button>
                        </div>
                    )
                }

            </div>

        </div>

    );

}
