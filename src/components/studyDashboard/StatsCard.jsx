import "./StatsCard.css";

export function StatsCard({
    value,
    label
}) {
    return (
        <div className="stats-card">
            <h2>{value}</h2>
            <span>{label}</span>
        </div>
    );
}