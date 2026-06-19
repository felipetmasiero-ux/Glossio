import "./StudyDashboard.css"

export function StudyDashboard({
    dueCards,
    totalCards,
    onStart
}) {
    return (
        <div className="study-dashboard">

            <h1>Study Mode</h1>

            <p className="dashboard-subtitle">
                Ready for today's review?
            </p>

            <div className="dashboard-stats">

                <div className="dashboard-card">
                    <h2>{dueCards}</h2>
                    <span>Due Today</span>
                </div>

                <div className="dashboard-card">
                    <h2>{totalCards}</h2>
                    <span>Total Cards</span>
                </div>

            </div>

            <button
                className="start-button"
                onClick={onStart}
            >
                Start Studying
            </button>

        </div>
    );
}