import "./StudyDashboard.css"


export function StudyDashboard({
    dashboard,
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
                    <h2>{dashboard.dueCards}</h2>
                    <span>Due Today</span>
                </div>

                <div className="dashboard-card">
                    <h2>{dashboard.totalCards}</h2>
                    <span>Total Cards</span>
                </div>

                <div className="dashboard-card">
                    <h2>{dashboard.dailyGoal.completed}/{dashboard.dailyGoal.goal}</h2>
                    <span>Today's Goal</span>
                </div>

                <div className="goal-progress">

                    <div
                        className="goal-progress-fill"
                        style={{
                            width: `${dashboard.dailyGoal.progress}%`
                        }}
                    />

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