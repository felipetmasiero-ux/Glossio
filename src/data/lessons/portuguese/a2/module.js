import { pastWeekendLesson } from "./pastWeekend";
import { comparisonsLesson } from "./comparisons";
import { healthLesson } from "./health";
import { weatherForecastLesson } from "./weatherForecast";
import { directionsLesson } from "./directions";
import { pastHabitsLesson } from "./pastHabits";
import { freeTimeLesson } from "./freeTime";
import { feelingsLesson } from "./feelings";
import { restaurantLesson } from "./restaurant";
import { hotelLesson } from "./hotel";
import { makingPlansLesson } from "./makingPlans";
import { lifeJourneyLesson } from "./lifeJourney";

export const portugueseA2Module = {

    id: "portuguese-a2",

    courseId: "portuguese",

    language: "portuguese",

    level: "A2",

    order: 2,

    title: "Portuguese A2",

    description:
        "Build on the basics with real communication: narrating the past, comparing things, giving advice, making predictions, giving directions, expressing feelings and making plans.",

    lessons: [

        pastWeekendLesson,

        comparisonsLesson,

        healthLesson,

        weatherForecastLesson,

        directionsLesson,

        pastHabitsLesson,

        freeTimeLesson,

        feelingsLesson,

        restaurantLesson,

        hotelLesson,

        makingPlansLesson,

        lifeJourneyLesson

    ]

};
