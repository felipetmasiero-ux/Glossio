import "./LessonNavigation.css";

import { Button } from "../../../common/Button/Button";

export function LessonNavigation({

    hasPrevious,

    hasNext,

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

                onClick={onNext}

            >

                {

                    hasNext

                        ? "Next →"

                        : "Finish"

                }

            </Button>

        </div>

    );

}