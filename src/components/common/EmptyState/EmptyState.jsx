import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import "./EmptyState.css";

export function EmptyState({
  icon = "book",
  title,
  description,
  actionLabel,
  onAction
}) {

  return (

    <div className="empty-state">

      <span className="empty-state__icon">
        <Icon name={icon} size={28} />
      </span>

      <h3 className="empty-state__title">{title}</h3>

      {description && (
        <p className="empty-state__description">{description}</p>
      )}

      {actionLabel && onAction && (
        <Button className="empty-state__action" onClick={onAction}>
          {actionLabel}
        </Button>
      )}

    </div>

  );

}