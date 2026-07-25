import "./ModuleCard.css";

import { Card } from "../../common/Card/Card";
import { ProgressIndicator } from "../common/ProgressIndicator/ProgressIndicator";

export function ModuleCard({

    module,

    progress,

    onOpen

}) {

    return (

        <Card

            className="module-card"

            onClick={onOpen}

        >

            <div className="module-card-header">

                <span className="lesson-level">

                    {module.level}

                </span>

                <span>

                    {progress.completed}/{progress.total} lessons

                </span>

            </div>

            <h2>

                {module.title}

            </h2>

            <p>

                {module.description}

            </p>

            <ProgressIndicator

                current={progress.completed}

                total={progress.total}

                label="Progress"

            />

        </Card>

    );

}
