import { portugueseA1Module } from "../lessons/portuguese/a1/module";
import { portugueseA2Module } from "../lessons/portuguese/a2/module";
import { portugueseB1Module } from "../lessons/portuguese/b1/module";
import { portugueseB2Module } from "../lessons/portuguese/b2/module";

export const portugueseCourse = {

    id: "portuguese",

    language: "portuguese",

    title: "Português",

    description:
        "Aprenda português do zero com lições gratuitas organizadas por nível (CEFR), vocabulário prático e revisão espaçada.",

    cover: "/covers/portuguese.webp",

    modules: [

        portugueseA1Module,

        portugueseA2Module,

        portugueseB1Module,

        portugueseB2Module

    ]

};
