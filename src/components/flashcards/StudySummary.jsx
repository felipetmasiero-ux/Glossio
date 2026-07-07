import { Card } from "../common/Card/Card";
import { Button } from "../common/Button/Button";
import "./StudySummary.css";

export function StudySummary({ stats, totalCards, onRestart }) {
  return (
    <div className="study-summary">
      <h1>🎉 Session Complete</h1>

      <div className="summary-stats">
        <Card className="summary-card"><p>Cards studied: {totalCards}</p></Card>
        <Card className="summary-card"><p>🔴 Again: {stats.again}</p></Card>
        <Card className="summary-card"><p>🟡 Good: {stats.good}</p></Card>
        <Card className="summary-card"><p>🟢 Easy: {stats.easy}</p></Card>
      </div>

      <Button onClick={onRestart}>Study Again</Button>
    </div>
  );
}