import "./ModuleCard.css";

import { ProgressBar } from "../../common/ProgressBar/ProgressBar";
import { Icon } from "../../common/Icon/Icon";

export function ModuleCard({ module, progress, onOpen }) {
  const pct = progress.total === 0 ? 0 : (progress.completed / progress.total) * 100;

  return (
    <button type="button" className="module-row" onClick={onOpen}>
      <span className="module-row__level text-mono-label">{module.level}</span>

      <span className="module-row__body">
        <span className="module-row__title">{module.title}</span>
        <span className="module-row__description">{module.description}</span>
        <ProgressBar value={pct} />
      </span>

      <span className="module-row__count text-mono-label">
        {progress.completed}/{progress.total}
      </span>

      <Icon name="chevron-right" size={16} className="module-row__arrow" />
    </button>
  );
}
