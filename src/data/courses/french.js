import { frenchA1Module } from "../lessons/french/a1/module";
import { frenchA2Module } from "../lessons/french/a2/module";
import { frenchB1Module } from "../lessons/french/b1/module";
import { frenchB2Module } from "../lessons/french/b2/module";

export const frenchCourse = {

    id: "french",

    language: "french",

    title: "Francês",

    description:
        "Aprenda francês do zero com lições gratuitas organizadas por nível (CEFR), vocabulário prático e revisão espaçada.",

    cover: "/covers/french.webp",

    modules: [

        frenchA1Module,

        frenchA2Module,

        frenchB1Module,

        frenchB2Module

    ]

};
