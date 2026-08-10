import { greetingsLesson } from "./greetings";
import { introductionsLesson } from "./introductions";
import { countriesLesson } from "./countries";
import { numbersLesson } from "./numbers";
import { daysMonthsLesson } from "./daysMonths";
import { familyLesson } from "./family";
import { jobsLesson } from "./jobs";
import { presentSimpleLesson } from "./presentSimple";
import { dailyRoutineLesson } from "./dailyRoutine";
import { foodLesson } from "./food";
import { restaurantLesson } from "./restaurant";
import { reviewLesson } from "./review";

export const englishA1Module = {

    id: "english-a1",

    courseId: "english",

    language: "english",

    level: "A1",

    order: 1,

    title: "Inglês A1",

    description:
        "Aprenda os fundamentos do inglês com lições práticas.",

    lessons: [

        greetingsLesson,

        introductionsLesson,

        countriesLesson,

        numbersLesson,

        daysMonthsLesson,

        familyLesson,

        jobsLesson,

        presentSimpleLesson,

        dailyRoutineLesson,

        foodLesson,

        restaurantLesson,

        reviewLesson

    ]

};
