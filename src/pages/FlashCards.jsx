import "./EmptyState.css";

export function Flashcards() {
  return (
    <div className="page-container">
      <div className="empty-state">
        <div className="empty-state__icon">🃏</div>
        <h2 className="empty-state__title">Flashcards</h2>
        <p className="empty-state__description">Em breve: revisão espaçada estilo Anki</p>
      </div>
    </div>
  );
}
