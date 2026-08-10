import { dailyRoutineA2Lesson } from "./dailyRoutine";
import { shoppingLesson } from "./shopping";
import { healthLesson } from "./health";
import { weatherLesson } from "./weather";
import { transportationLesson } from "./transportation";
import { technologyLesson } from "./technology";
import { hobbiesLesson } from "./hobbies";
import { feelingsLesson } from "./feelings";
import { restaurantA2Lesson } from "./restaurant";
import { hotelLesson } from "./hotel";
import { makingPlansLesson } from "./makingPlans";
import { lifeExperiencesLesson } from "./lifeExperiences";

export const englishA2Module = {

    id: "english-a2",

    courseId: "english",

    language: "english",

    level: "A2",

    order: 2,

    title: "Inglês A2",

    description:
        "Avance com situações do dia a dia: rotina, compras, saúde, clima, transporte, tecnologia, hobbies, sentimentos, restaurante, hotel, planos e experiências de vida.",

    lessons: [

        dailyRoutineA2Lesson,

        shoppingLesson,

        healthLesson,

        weatherLesson,

        transportationLesson,

        technologyLesson,

        hobbiesLesson,

        feelingsLesson,

        restaurantA2Lesson,

        hotelLesson,

        makingPlansLesson,

        lifeExperiencesLesson

    ]

};
