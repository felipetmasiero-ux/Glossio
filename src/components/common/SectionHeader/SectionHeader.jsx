import { Icon } from "../Icon/Icon";
import "./SectionHeader.css";

export function SectionHeader({ title, subtitle, icon }) {
  return (
    <header className="section-header">
      <div className="section-header-top">
        {icon && (
          <span className="section-header-icon">
            <Icon name={icon} size={18} />
          </span>
        )}

        <h2>{title}</h2>
      </div>

      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
