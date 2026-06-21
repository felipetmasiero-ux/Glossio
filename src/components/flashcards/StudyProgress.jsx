import "./StudyProgress.css"

export function StudyProgress({
  completedCards,
  total
}) {

  const percentage =
    total === 0
      ? 0
      : (completedCards / total) * 100;

  return (
    <>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`
          }}
        />
      </div>

      <p className="study-progress">
        {completedCards} / {total}
      </p>

      <p className="study-progress">
        Card {completedCards + 1} of {total}
      </p>

      <p className="study-progress-text">
        {completedCards} / {total} ({Math.round((completedCards / total) * 100)}%)
      </p>
    </>
  );
}