import { englishA1Module } from "../lessons/english/a1/module";
import { englishA2Module } from "../lessons/english/a2/module";
import { englishB1Module } from "../lessons/english/b1/module";
import { englishB2Module } from "../lessons/english/b2/module";

export const englishCourse = {

    id: "english",

    language: "english",

    title: "Inglês",

    description:
        "Aprenda inglês do zero com lições gratuitas organizadas por nível (CEFR), vocabulário prático e revisão espaçada.",

    cover: "/covers/english.webp",

    modules: [

        englishA1Module,

        englishA2Module,

        englishB1Module,

        englishB2Module

    ]

};
