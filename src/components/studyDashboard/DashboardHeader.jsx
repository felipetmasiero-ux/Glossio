import "./DashboardHeader.css";

export function DashboardHeader({
    title,
    subtitle
}) {
    return (
        <header className="dashboard-header">

            <h1>{title}</h1>

            <p>{subtitle}</p>

        </header>
    );
}