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
                    <h2>{dashboard.due}</h2>
                    <span>Due Today</span>
                </div>

                <div className="dashboard-card">
                    <h2>{dashboard.total}</h2>
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

                <div className="dashboard-card">
                    <h2>🔥 {dashboard.streak.current}</h2>
                    <span>Current Streak</span>
                </div>

                <div className="dashboard-card">
                    <h2>🏆 {dashboard.streak.longest}</h2>
                    <span>Best Streak</span>
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