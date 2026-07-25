import { LessonSection } from "../../LessonSection/LessonSection";

import { QuizCard } from "../../QuizCard/QuizCard";

import { useEvents } from "../../../../hooks/useEvents";
import { EVENT_TYPES } from "../../../../constants/events";

export function QuizBlock({

    block,

    lesson

}){

    const { logEvent } = useEvents();

    function handleComplete(correct) {

        logEvent(EVENT_TYPES.QUIZ_COMPLETED, {

            question: block.question,

            correct,

            lessonId: lesson?.id ?? null

        });

    }

    return(

        <LessonSection

            icon="pencil"

            title="Prática"

            subtitle="Responda antes de continuar."

        >

            <QuizCard

                quiz={block}

                onComplete={handleComplete}

            />

        </LessonSection>

    );

}
