import { SectionHeader } from "../../../common/SectionHeader/SectionHeader";

import { QuizCard } from "../../QuizCard/QuizCard";

export function QuizBlock({

    block

}){

    return(

        <section>

            <SectionHeader

                icon="📝"

                title="Practice"

                subtitle="Answer before continuing."

            />

            <QuizCard

                quiz={block}

            />

        </section>

    );

}