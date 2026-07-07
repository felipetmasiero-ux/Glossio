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
                title="Study Mode"
                subtitle="Ready for today's review?"
            />

            <ProgressCard
                completed={dashboard.dailyGoal.completed}
                goal={dashboard.dailyGoal.goal}
                progress={dashboard.dailyGoal.progress}
            />

            <StatsGrid>

                <StatsCard
                    value={dashboard.due}
                    label="Due Today"
                />

                <StatsCard
                    value={dashboard.total}
                    label="Total Cards"
                />

                <StatsCard
                    value={`🔥 ${dashboard.streak.current}`}
                    label="Current Streak"
                />

                <StatsCard
                    value={`🏆 ${dashboard.streak.longest}`}
                    label="Best Streak"
                />

            </StatsGrid>

            <StartStudyButton
                onClick={onStart}
            />

        </div>

    );

}