import { englishA1Module } from "../lessons/english/a1/module";
import { englishA2Module } from "../lessons/english/a2/module";

export const englishCourse = {

    id: "english",

    language: "english",

    title: "English",

    description:
        "Learn English from the ground up, one module at a time.",

    cover: "/covers/english.webp",

    modules: [

        englishA1Module,

        englishA2Module

    ]

};
