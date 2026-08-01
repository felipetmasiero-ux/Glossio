import { Icon } from "../common/Icon/Icon";
import { SORT_OPTIONS, SORT_LABELS } from "../../utils/flashcards/sortFlashcards";
import "./FlashcardsFilterBar.css";

export function FlashcardsFilterBar({
  favoritesOnly,
  setFavoritesOnly,
  sortBy,
  setSortBy
}) {
  return (
    <div className="flashcards-filter-bar">

      <div className="flashcards-filter-bar__toggle" role="group" aria-label="Filtrar por favoritos">

        <button
          type="button"
          className={`flashcards-filter-bar__option${!favoritesOnly ? " flashcards-filter-bar__option--active" : ""}`}
          aria-pressed={!favoritesOnly}
          onClick={() => setFavoritesOnly(false)}
        >
          Todos
        </button>

        <button
          type="button"
          className={`flashcards-filter-bar__option${favoritesOnly ? " flashcards-filter-bar__option--active" : ""}`}
          aria-pressed={favoritesOnly}
          onClick={() => setFavoritesOnly(true)}
        >
          <Icon name="star" size={14} fill={favoritesOnly ? "currentColor" : "none"} />
          Favoritos
        </button>

      </div>

      <label className="flashcards-filter-bar__sort">
        <span className="text-mono-label">Ordenar por</span>
        <select
          className="input"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          {Object.values(SORT_OPTIONS).map(option => (
            <option key={option} value={option}>{SORT_LABELS[option]}</option>
          ))}
        </select>
      </label>

    </div>
  );
}
