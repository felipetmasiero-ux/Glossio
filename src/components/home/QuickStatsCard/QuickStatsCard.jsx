import { StatsGrid } from "../../studyDashboard/StatsGrid";
import { StatsCard } from "../../studyDashboard/StatsCard";

function formatMinutes(minutes) {

    if (minutes < 60) return `${minutes}min`;

    const hours = Math.floor(minutes / 60);

    const rest = minutes % 60;

    return rest === 0 ? `${hours}h` : `${hours}h${rest}min`;

}

export function QuickStatsCard({ quickStats }) {

    return (

        <StatsGrid>

            <StatsCard
                value={quickStats.wordsLearned}
                label="Palavras aprendidas"
                icon="book"
            />

            <StatsCard
                value={quickStats.completedLessons}
                label="Lições completas"
                icon="check"
            />

            <StatsCard
                value={quickStats.currentStreak}
                label="Sequência atual"
                icon="flame"
            />

            <StatsCard
                value={formatMinutes(quickStats.studyMinutes)}
                label="Tempo de estudo"
                icon="clock"
            />

        </StatsGrid>

    );

}
