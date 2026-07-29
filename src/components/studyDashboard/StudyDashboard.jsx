import "./StudyDashboard.css";

import { Link, useNavigate } from "react-router-dom";

import { DashboardHeader } from "./DashboardHeader";
import { StatsCard } from "./StatsCard";
import { ProgressCard } from "./ProgressCard";
import { StatsGrid } from "./StatsGrid";
import { StartStudyButton } from "./StartStudyButton";
import { EmptyState } from "../common/EmptyState/EmptyState";

export function StudyDashboard({
    dashboard,
    onStart
}) {

    const navigate = useNavigate();

    if (dashboard.total === 0) {

        return (

            <div className="study-dashboard">

                <DashboardHeader
                    title="Modo de estudo"
                    subtitle="Pronto para a revisão de hoje?"
                />

                <EmptyState
                    icon="cards"
                    title="Nenhum flashcard ainda"
                    description="Salve palavras enquanto estuda as lições ou explora os vídeos, e elas aparecem aqui para revisão."
                    actionLabel="Ir para as lições"
                    onAction={() => navigate("/lessons")}
                />

            </div>

        );

    }

    return (

        <div className="study-dashboard">

            <DashboardHeader
                title="Modo de estudo"
                subtitle="Pronto para a revisão de hoje?"
            />

            <ProgressCard
                completed={dashboard.dailyGoal.completed}
                goal={dashboard.dailyGoal.goal}
                progress={dashboard.dailyGoal.progress}
            />

            <StatsGrid>

                <StatsCard
                    value={dashboard.due}
                    label="Pendentes hoje"
                />

                <StatsCard
                    value={dashboard.total}
                    label="Total de fichas"
                />

                <StatsCard
                    value={dashboard.streak.current}
                    label="Sequência atual"
                    icon="flame"
                />

                <StatsCard
                    value={dashboard.streak.longest}
                    label="Melhor sequência"
                    icon="star"
                />

            </StatsGrid>

            {
                dashboard.due === 0 ? (
                    <p className="study-dashboard__no-reviews">
                        Você está em dia! Nenhuma ficha pendente para revisar hoje.
                    </p>
                ) : (
                    <StartStudyButton
                        onClick={onStart}
                    />
                )
            }

            <Link to="/my-flashcards" className="study-dashboard__collection-link">
                Ver coleção completa
            </Link>

        </div>

    );

}