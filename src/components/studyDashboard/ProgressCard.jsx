import { ProgressBar } from "../common/ProgressBar/ProgressBar";
import "./ProgressCard.css";

export function ProgressCard({
    completed,
    goal,
    progress
}) {

    return (

        <div className="progress-card">

            <div className="progress-header">

                <span className="text-mono-label">Meta de hoje</span>

                <strong className="progress-card__value">
                    {completed}/{goal}
                </strong>

            </div>

            <ProgressBar value={progress} />

        </div>

    );

}
