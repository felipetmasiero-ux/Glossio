export function StudyProgress({
  completed,
  total
}) {

  const percentage =
    total === 0
      ? 0
      : (completed / total) * 100;

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
        {completed} / {total}
      </p>

      <p className="study-progress">
        Card {completed + 1} of {total}
      </p>
    </>
  );
}