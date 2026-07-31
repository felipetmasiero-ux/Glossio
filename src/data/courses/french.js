import { frenchA1Module } from "../lessons/french/a1/module";
import { frenchA2Module } from "../lessons/french/a2/module";

export const frenchCourse = {

    id: "french",

    language: "french",

    title: "French",

    description:
        "Learn French from the ground up, one module at a time.",

    cover: "/covers/french.webp",

    modules: [

        frenchA1Module,

        frenchA2Module

    ]

};
