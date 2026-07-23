import "./StepBlock.css";

export function StepBlock({ block }) {

    return (

        <div className="lesson-step-title">

            <span>

                {block.title}

            </span>

        </div>

    );

}