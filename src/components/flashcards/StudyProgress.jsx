import { ProgressBar } from "../common/ProgressBar/ProgressBar";
import "./StudyProgress.css";

export function StudyProgress({ completedCards, total }) {
  const percentage = total === 0 ? 0 : (completedCards / total) * 100;

  return (
    <>
      <div className="study-progress-bar-wrapper">
        <ProgressBar value={percentage} />
      </div>

      <p className="study-progress text-mono-label">
        Ficha {completedCards + 1} de {total}
      </p>

      <p className="study-progress-text text-mono-label">
        {completedCards} / {total} ({Math.round(percentage)}%)
      </p>
    </>
  );
}
