import { memo } from "react";

import { StatsGrid } from "../../studyDashboard/StatsGrid";
import { StatsCard } from "../../studyDashboard/StatsCard";

// streak stays referentially stable across renders where events haven't
// changed (see useDashboardData.js) - memo lets this card skip re-rendering
// in that case.
export const StudyStreakCard = memo(function StudyStreakCard({ streak }) {

    return (

        <StatsGrid>

            <StatsCard value={streak.current} label="Sequência atual" icon="flame" />
            <StatsCard value={streak.longest} label="Maior sequência" icon="trophy" />
            <StatsCard value={streak.daysThisMonth} label="Dias este mês" icon="calendar" />

        </StatsGrid>

    );

});
