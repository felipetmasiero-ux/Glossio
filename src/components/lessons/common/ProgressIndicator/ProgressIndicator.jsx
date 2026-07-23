import "./ProgressIndicator.css";

export function ProgressIndicator({

    current,

    total

}) {

    const progress = (current / total) * 100;

    return (

        <div className="lesson-progress">

            <div className="lesson-progress-top">

                <span>

                    Section {current}

                </span>

                <span>

                    {current}/{total}

                </span>

            </div>

            <div className="lesson-progress-track">

                <div

                    className="lesson-progress-fill"

                    style={{

                        width:`${progress}%`

                    }}

                />

            </div>

        </div>

    );

}