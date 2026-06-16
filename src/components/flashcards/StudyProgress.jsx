export function StudyProgress({
  totalCards,
  sessionCards
}) {

  const completed =
    totalCards - sessionCards.length;

  const percentage =
    totalCards === 0
      ? 100
      : (completed / totalCards) * 100;

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
        {completed} / {totalCards}
      </p>

      <p className="study-progress">
        Card {completed + 1} of {totalCards}
      </p>

    </>
  );
}