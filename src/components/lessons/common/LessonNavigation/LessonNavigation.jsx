import "./LessonNavigation.css";

import { Button } from "../../../common/Button/Button";

export function LessonNavigation({

    hasPrevious,

    hasNext,

    nextLabel,

    onPrevious,

    onNext

}){

    return(

        <div className="lesson-navigation">

            <Button

                variant="secondary"

                disabled={!hasPrevious}

                onClick={onPrevious}

            >

                ← Previous

            </Button>

            <Button

                disabled={!hasNext}

                onClick={onNext}

            >

                {

                    nextLabel ?? (hasNext ? "Next →" : "Finish")

                }

            </Button>

        </div>

    );

}