import { Link } from "react-router-dom";

import { Card } from "../common/Card/Card";
import { Button } from "../common/Button/Button";
import "./StudySummary.css";

export function StudySummary({ stats, totalCards, onRestart }) {

  const totalAnswers = stats.again + stats.good + stats.easy;

  const accuracy = totalAnswers === 0
    ? 0
    : Math.round(((stats.good + stats.easy) / totalAnswers) * 100);

  return (
    <div className="study-summary">

      <span className="study-summary-badge">🎉 Session Complete</span>

      <h1>Great work!</h1>

      <p className="study-summary-subtitle">
        You reviewed {totalCards} card{totalCards === 1 ? "" : "s"} this session.
      </p>

      <div className="study-summary-accuracy">
        <span className="study-summary-accuracy-value">{accuracy}%</span>
        <span className="study-summary-accuracy-label">accuracy</span>
      </div>

      <div className="summary-stats">
        <Card className="summary-card summary-card--again">
          <span className="summary-card-value">{stats.again}</span>
          <span className="summary-card-label">🔴 Again</span>
        </Card>

        <Card className="summary-card summary-card--good">
          <span className="summary-card-value">{stats.good}</span>
          <span className="summary-card-label">🟡 Good</span>
        </Card>

        <Card className="summary-card summary-card--easy">
          <span className="summary-card-value">{stats.easy}</span>
          <span className="summary-card-label">🟢 Easy</span>
        </Card>
      </div>

      <div className="study-summary-actions">
        <Button onClick={onRestart}>Study Again</Button>

        <Link to="/my-flashcards" className="study-summary-secondary-link">
          View My Flashcards
        </Link>

        <Link to="/lessons" className="study-summary-secondary-link">
          Back to Lessons
        </Link>
      </div>

    </div>
  );
}
