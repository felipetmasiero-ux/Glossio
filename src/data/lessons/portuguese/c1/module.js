import { personalDevelopmentLesson } from "./personalDevelopment";
import { educationLesson } from "./education";
import { workCareersLesson } from "./workCareers";
import { societyLesson } from "./society";
import { scienceTechnologyLesson } from "./scienceTechnology";
import { environmentC1Lesson } from "./environment";
import { mediaNewsLesson } from "./mediaNews";
import { cultureArtsLesson } from "./cultureArts";
import { psychologyLesson } from "./psychology";
import { economicsLesson } from "./economics";
import { debateLesson } from "./debate";
import { c1ReviewLesson } from "./review";

export const portugueseC1Module = {

    id: "portuguese-c1",

    courseId: "portuguese",

    language: "portuguese",

    level: "C1",

    order: 5,

    title: "Português C1",

    description:
        "Comunique-se com precisão, nuance e fluência avançada em português: identidade e desenvolvimento pessoal, educação, liderança, sociedade, ciência e tecnologia, meio ambiente, mídia, cultura, psicologia, economia e argumentação sofisticada.",

    lessons: [

        personalDevelopmentLesson,

        educationLesson,

        workCareersLesson,

        societyLesson,

        scienceTechnologyLesson,

        environmentC1Lesson,

        mediaNewsLesson,

        cultureArtsLesson,

        psychologyLesson,

        economicsLesson,

        debateLesson,

        c1ReviewLesson

    ]

};
