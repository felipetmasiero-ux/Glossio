import { greetingsLesson } from "./greetings";
import { introductionsLesson } from "./introductions";
import { countriesLesson } from "./countries";
import { numbersLesson } from "./numbers";
import { familyLesson } from "./family";
import { foodLesson } from "./food";
import { dailyRoutineLesson } from "./dailyRoutine";
import { jobsLesson } from "./jobs";
import { travelLesson } from "./travel";
import { weatherLesson } from "./weather";
import { shoppingLesson } from "./shopping";
import { hobbiesLesson } from "./hobbies";

export const portugueseA1Module = {

    id: "portuguese-a1",

    courseId: "portuguese",

    language: "portuguese",

    level: "A1",

    order: 1,

    title: "Portuguese A1",

    description:
        "Learn the foundations of Portuguese through practical lessons.",

    lessons: [

        greetingsLesson,

        introductionsLesson,

        countriesLesson,

        numbersLesson,

        familyLesson,

        foodLesson,

        dailyRoutineLesson,

        jobsLesson,

        travelLesson,

        weatherLesson,

        shoppingLesson,

        hobbiesLesson

    ]

};
