import "./DashboardHeader.css";

export function DashboardHeader({
    eyebrow,
    title,
    subtitle
}) {
    return (
        <header className="dashboard-header">

            {eyebrow && <span className="dashboard-header__label text-mono-label">{eyebrow}</span>}

            <h1>{title}</h1>

            <p>{subtitle}</p>

        </header>
    );
}