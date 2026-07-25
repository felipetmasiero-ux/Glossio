import { Icon } from "../common/Icon/Icon";
import "./StatsCard.css";

export function StatsCard({
    value,
    label,
    icon
}) {
    return (
        <div className="stats-card">
            <span className="stats-card__value text-mono-number">
                {icon && <Icon name={icon} size={18} />}
                {value}
            </span>
            <span className="stats-card__label text-mono-label">{label}</span>
        </div>
    );
}
