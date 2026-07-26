import { ProgressCard } from "../../studyDashboard/ProgressCard";

export function DailyGoalCard({ dailyGoal }) {

    return (
        <ProgressCard
            completed={dailyGoal.completed}
            goal={dailyGoal.goal}
            progress={dailyGoal.progress}
        />
    );

}
