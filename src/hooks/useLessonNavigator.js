import { useMemo, useState } from "react";

import { createLessonSteps } from "../utils/lessons/createLessonSteps";

export function useLessonNavigator(lesson) {

    const steps = useMemo(

        () => createLessonSteps(

            lesson.blocks

        ),

        [lesson]

    );

    const [

        current,

        setCurrent

    ] = useState(0);

    function next() {

        setCurrent(

            previous =>

                Math.min(

                    previous + 1,

                    steps.length - 1

                )

        );

    }

    function previous() {

        setCurrent(

            previous =>

                Math.max(

                    previous - 1,

                    0

                )

        );

    }

    return {

        steps,

        current,

        currentStep:

            steps[current].blocks,

        stepTitle:

            steps[current].title,

        progress:

            (current + 1) / steps.length,

        next,

        previous,

        isFirst: current === 0,

        isLast: current === steps.length - 1

    }

}