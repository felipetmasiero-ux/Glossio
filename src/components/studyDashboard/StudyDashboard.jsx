import "./StudyDashboard.css";

import { Link, useNavigate } from "react-router-dom";

import { DashboardHeader } from "./DashboardHeader";
import { StatsCard } from "./StatsCard";
import { ProgressCard } from "./ProgressCard";
import { StatsGrid } from "./StatsGrid";
import { StartStudyButton } from "./StartStudyButton";
import { EmptyState } from "../common/EmptyState/EmptyState";

import { MAX_SESSION_SIZE } from "../../constants/studySession";

export function StudyDashboard({
    dashboard,
    onStart
}) {

    const navigate = useNavigate();

    if (dashboard.total === 0) {

        return (

            <div className="study-dashboard">

                <DashboardHeader
                    eyebrow="Revisão"
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
                    <>
                        <StartStudyButton
                            onClick={onStart}
                        />

                        {
                            // A session never includes more than
                            // MAX_SESSION_SIZE cards (see useStudySession.js)
                            // - said here so a large backlog is disclosed
                            // before starting, not discovered mid-session.
                            dashboard.due > MAX_SESSION_SIZE && (
                                <p className="study-dashboard__no-reviews">
                                    Esta sessão cobre {MAX_SESSION_SIZE} fichas — {dashboard.due - MAX_SESSION_SIZE} continuam pendentes para uma próxima sessão.
                                </p>
                            )
                        }
                    </>
                )
            }

            <Link to="/my-flashcards" className="study-dashboard__collection-link">
                Ver coleção completa
            </Link>

        </div>

    );

}