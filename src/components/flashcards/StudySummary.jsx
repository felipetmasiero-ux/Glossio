import { Link } from "react-router-dom";

import { Card } from "../common/Card/Card";
import { Button } from "../common/Button/Button";
import { Icon } from "../common/Icon/Icon";
import "./StudySummary.css";

export function StudySummary({ stats, totalCards, onRestart }) {

  const totalAnswers = stats.again + stats.good + stats.easy;

  const accuracy = totalAnswers === 0
    ? 0
    : Math.round(((stats.good + stats.easy) / totalAnswers) * 100);

  return (
    <div className="study-summary animate-fade-in">

      <span className="study-summary-badge animate-celebrate">
        <Icon name="check" size={13} /> Sessão concluída
      </span>

      <h1>Muito bem!</h1>

      <p className="study-summary-subtitle">
        Você revisou {totalCards} {totalCards === 1 ? "ficha" : "fichas"} nesta sessão.
      </p>

      <div className="study-summary-accuracy">
        <span className="study-summary-accuracy-value">{accuracy}%</span>
        <span className="study-summary-accuracy-label">precisão</span>
      </div>

      <div className="summary-stats">
        <Card className="summary-card summary-card--again">
          <span className="summary-card-value">{stats.again}</span>
          <span className="summary-card-label"><Icon name="x" size={13} /> De novo</span>
        </Card>

        <Card className="summary-card summary-card--good">
          <span className="summary-card-value">{stats.good}</span>
          <span className="summary-card-label"><Icon name="check" size={13} /> Bom</span>
        </Card>

        <Card className="summary-card summary-card--easy">
          <span className="summary-card-value">{stats.easy}</span>
          <span className="summary-card-label"><Icon name="star" size={13} /> Fácil</span>
        </Card>
      </div>

      <div className="study-summary-actions">
        <Button onClick={onRestart}>Estudar de novo</Button>

        <Link to="/my-flashcards" className="study-summary-secondary-link">
          Ver meus flashcards
        </Link>

        <Link to="/lessons" className="study-summary-secondary-link">
          Voltar às lições
        </Link>
      </div>

    </div>
  );
}
