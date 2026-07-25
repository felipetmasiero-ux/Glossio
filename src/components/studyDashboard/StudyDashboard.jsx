import "./StudyDashboard.css";

import { DashboardHeader } from "./DashboardHeader";
import { StatsCard } from "./StatsCard";
import { ProgressCard } from "./ProgressCard";
import { StatsGrid } from "./StatsGrid";
import { StartStudyButton } from "./StartStudyButton";

export function StudyDashboard({
    dashboard,
    onStart
}) {

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

            <StartStudyButton
                onClick={onStart}
            />

        </div>

    );

}