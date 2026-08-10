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

export const frenchA1Module = {

    id: "french-a1",

    courseId: "french",

    language: "french",

    level: "A1",

    order: 1,

    title: "Francês A1",

    description:
        "Aprenda os fundamentos do francês com lições práticas.",

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
