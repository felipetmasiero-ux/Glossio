import { StatsGrid } from "../studyDashboard/StatsGrid";
import { StatsCard } from "../studyDashboard/StatsCard";

export function FlashcardStats({
  total,
  due,
  learning,
  mature
}) {
  return (
    <StatsGrid>
      <StatsCard value={total} label="Total" />
      <StatsCard value={due} label="Pendentes" />
      <StatsCard value={learning} label="Aprendendo" />
      <StatsCard value={mature} label="Maduro" />
    </StatsGrid>
  );
}
