import "./EmptyState.css";

export function Content() {
  return (
    <div className="page-container">
      <div className="empty-state">
        <div className="empty-state__icon">📖</div>
        <h2 className="empty-state__title">Área de Conteúdo</h2>
        <p className="empty-state__description">Em breve: textos por nível com legendas inteligentes</p>
      </div>
    </div>
  );
}
