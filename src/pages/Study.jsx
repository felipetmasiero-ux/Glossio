import "./EmptyState.css";

export function Study() {
  return (
    <div className="page-container">
      <div className="empty-state">
        <div className="empty-state__icon">✏️</div>
        <h2 className="empty-state__title">Área de Estudo</h2>
        <p className="empty-state__description">Em breve: exercícios interativos tipo Duolingo</p>
      </div>
    </div>
  );
}
