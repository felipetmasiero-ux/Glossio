import "./ProgressCard.css";

export function ProgressCard({
    completed,
    goal,
    progress
}) {

    return (

        <div className="progress-card">

            <div className="progress-header">

                <span>Today's Goal</span>

                <strong>
                    {completed}/{goal}
                </strong>

            </div>

            <div className="goal-progress">

                <div
                    className="goal-progress-fill"
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>

        </div>

    );

}