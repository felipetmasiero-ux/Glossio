import { ProgressBar } from "../common/ProgressBar/ProgressBar";
import "./StudyProgress.css";

export function StudyProgress({ completedCards, total }) {
  const percentage = total === 0 ? 0 : (completedCards / total) * 100;

  return (
    <>
      <div className="study-progress-bar-wrapper">
        <ProgressBar value={percentage} />
      </div>

      <p className="study-progress">
        Card {completedCards + 1} of {total}
      </p>

      <p className="study-progress-text">
        {completedCards} / {total} ({Math.round(percentage)}%)
      </p>
    </>
  );
}