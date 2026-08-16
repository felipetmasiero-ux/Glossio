import { experiencesLesson } from "./experiences";
import { goalsLesson } from "./goals";
import { relationshipsLesson } from "./relationships";
import { workLesson } from "./work";
import { travelProblemsLesson } from "./travelProblems";
import { healthLifestyleLesson } from "./healthLifestyle";
import { technologyHabitsLesson } from "./technologyHabits";
import { opinionsLesson } from "./opinions";
import { environmentLesson } from "./environment";
import { mediaLesson } from "./media";
import { newsStoriesLesson } from "./newsStories";
import { b1ReviewLesson } from "./review";

export const portugueseB1Module = {

    id: "portuguese-b1",

    courseId: "portuguese",

    language: "portuguese",

    level: "B1",

    order: 3,

    title: "Português B1",

    description:
        "Comunique-se com mais fluência em português: experiências de vida, planos e metas, relacionamentos, trabalho, viagens, saúde, tecnologia, opiniões, meio ambiente, mídia e notícias.",

    lessons: [

        experiencesLesson,

        goalsLesson,

        relationshipsLesson,

        workLesson,

        travelProblemsLesson,

        healthLifestyleLesson,

        technologyHabitsLesson,

        opinionsLesson,

        environmentLesson,

        mediaLesson,

        newsStoriesLesson,

        b1ReviewLesson

    ]

};
