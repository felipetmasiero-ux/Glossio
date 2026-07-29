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

    title: "English A2",

    description:
        "Build on the basics with everyday situations: routines, shopping, health, weather, transportation, technology, hobbies, feelings, restaurants, hotels, plans and life experiences.",

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
