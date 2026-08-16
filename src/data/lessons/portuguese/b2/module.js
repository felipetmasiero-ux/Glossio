import { personalDevelopmentLesson } from "./personalDevelopment";
import { educationLesson } from "./education";
import { workCareersLesson } from "./workCareers";
import { societyLesson } from "./society";
import { scienceTechnologyLesson } from "./scienceTechnology";
import { environmentB2Lesson } from "./environment";
import { mediaNewsLesson } from "./mediaNews";
import { cultureArtsLesson } from "./cultureArts";
import { relationshipsConflictLesson } from "./relationshipsConflict";
import { economicsLesson } from "./economics";
import { debateLesson } from "./debate";
import { b2ReviewLesson } from "./review";

export const portugueseB2Module = {

    id: "portuguese-b2",

    courseId: "portuguese",

    language: "portuguese",

    level: "B2",

    order: 4,

    title: "Português B2",

    description:
        "Comunique-se com precisão e sofisticação em português: desenvolvimento pessoal, educação, carreira, sociedade, ciência e tecnologia, meio ambiente, mídia, cultura, relacionamentos, economia e pensamento crítico.",

    lessons: [

        personalDevelopmentLesson,

        educationLesson,

        workCareersLesson,

        societyLesson,

        scienceTechnologyLesson,

        environmentB2Lesson,

        mediaNewsLesson,

        cultureArtsLesson,

        relationshipsConflictLesson,

        economicsLesson,

        debateLesson,

        b2ReviewLesson

    ]

};
