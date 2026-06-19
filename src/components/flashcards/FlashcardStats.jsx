export function FlashcardStats({
  total,
  due,
  learning,
  mature
}) {
  return (
    <div className="flashcard-stats">

      <div className="stat-card">
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div className="stat-card">
        <h3>Due Today</h3>
        <p>{due}</p>
      </div>

      <div className="stat-card">
        <h3>Learning</h3>
        <p>{learning}</p>
      </div>

      <div className="stat-card">
        <h3>Mature</h3>
        <p>{mature}</p>
      </div>

    </div>
  );
}