import { StatsGrid } from "../../studyDashboard/StatsGrid";
import { StatsCard } from "../../studyDashboard/StatsCard";

export function StudyStreakCard({ streak }) {

    return (

        <StatsGrid>

            <StatsCard value={streak.current} label="Sequência atual" icon="flame" />
            <StatsCard value={streak.longest} label="Maior sequência" icon="trophy" />
            <StatsCard value={streak.daysThisMonth} label="Dias este mês" icon="calendar" />

        </StatsGrid>

    );

}
