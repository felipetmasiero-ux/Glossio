import "./ProgressIndicator.css";

import { ProgressBar } from "../../../common/ProgressBar/ProgressBar";

export function ProgressIndicator({

    current,

    total,

    label

}) {

    const progress = total === 0 ? 0 : (current / total) * 100;

    return (

        <div className="lesson-progress">

            <div className="lesson-progress-top">

                <span>

                    {label ?? `Seção ${current}`}

                </span>

                <span>

                    {current}/{total}

                </span>

            </div>

            <ProgressBar value={progress} />

        </div>

    );

}
