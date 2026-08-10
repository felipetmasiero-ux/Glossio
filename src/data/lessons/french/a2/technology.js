import { technologyBlocks } from "../../../grammar/shared/french/technology";
import {
    heading,
    paragraph,
    examples,
    dialogue,
    grammar,
    tip,
    culture,
    list,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const technologyLesson = {

    id: "french-a2-technology",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "technology",

    order: 6,

    title: "Tecnologia",

    subtitle:
        "Fale sobre aparelhos e aplicativos, e descreva como a tecnologia mudou usando o imparfait em francês.",

    description:
        "Aprenda vocabulário de tecnologia e como contrastar hábitos do passado com o presente usando o imparfait.",

    cover: "/covers/technology.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "technology",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Talk about everyday devices and apps",

        "Use the imparfait to describe past habits",

        "Contrast the past with the present",

        "Understand basic tech problems"

    ],

    vocabulary: vocabulary([
        "smartphone",
        "ordinateur portable",
        "mot de passe",
        "télécharger",
        "mettre en ligne",
        "wifi",
        "batterie",
        "chargeur",
        "écran",
        "application"
    ]),

    blocks: [

        heading("La Vie Avant les Smartphones"),

        paragraph(
            "La technologie change vite ! Pour parler de choses qui étaient vraies dans le passé mais qui ne le sont plus, on utilise l'imparfait."
        ),

        examples([
            {
                text: "Avant, les gens écrivaient des lettres, mais maintenant ils envoient des messages depuis leur smartphone.",
                translation: "As pessoas costumavam escrever cartas, mas agora enviam mensagens pelo smartphone."
            },

            {
                text: "Avant, j'avais un petit écran, mais maintenant mon ordinateur portable en a un grand.",
                translation: "Eu costumava ter uma tela pequena, mas agora meu notebook tem uma grande."
            },

            {
                text: "Ma batterie ne durait pas aussi longtemps avant.",
                translation: "Minha bateria não costumava durar tanto tempo."
            }
        ]),

        dialogue([
            { speaker: "Petit-fils", text: "Tu avais un smartphone quand tu étais jeune ?" },
            { speaker: "Grand-mère", text: "Non, on n'en avait pas. On écrivait des lettres à la place." },
            { speaker: "Petit-fils", text: "C'est tellement différent ! Maintenant je télécharge chaque application dont j'ai besoin." },
            { speaker: "Grand-mère", text: "Je sais. La technologie était tellement plus simple avant." }
        ]),

        grammar(technologyBlocks[0].title, technologyBlocks[0].text),

        list([

            "l'imparfait (habitude passée, plus vraie maintenant)",

            "Avant... / Maintenant...",

            "smartphone, ordinateur portable, wifi, batterie, chargeur",

            "télécharger une application / mettre à jour l'application / charger la batterie"

        ]),

        tip(
            "Imparfait vs Passé Composé",
            "Utilise l'imparfait pour décrire une habitude ou une situation qui durait dans le temps : 'On écrivait des lettres.' Le passé composé, lui, décrit une action précise et terminée : 'J'ai écrit une lettre hier.'"
        ),

        culture(
            "La Technologie Change Vite",
            "Beaucoup de personnes qui ont grandi avant les smartphones se souviennent des téléphones fixes, des cartes en papier et des lettres — des habitudes qui ont presque disparu chez les jeunes générations."
        ),

        quiz(
            "Quelle phrase utilise correctement l'imparfait ?",
            ["J'ai avait un téléphone à clapet.", "J'avais un téléphone à clapet.", "J'ai eu un téléphone à clapet hier.", "Je suis avait un téléphone à clapet."],
            1,
            "L'imparfait pour une habitude passée : 'J'avais un téléphone à clapet.'"
        ),

        quiz(
            "Quand utilise-t-on l'imparfait plutôt que le passé composé ?",
            ["Pour une action précise et terminée", "Pour une habitude ou un état qui durait", "Seulement au futur", "Jamais avec 'avant'"],
            1,
            "L'imparfait décrit des habitudes ou des états qui duraient dans le passé."
        ),

        quiz(
            "Comment appelle-t-on la partie d'un ordinateur portable qui affiche les images ?",
            ["batterie", "chargeur", "écran", "application"],
            2,
            "'L'écran' est la partie d'un appareil qui affiche les images et le texte."
        )

    ],

    summary: {

        tip:
            "Pratique à décrire quelque chose que tu faisais avant d'avoir un smartphone, en utilisant l'imparfait.",

        review: [

            "l'imparfait + habitude passée",

            "Avant... / Maintenant...",

            "smartphone, ordinateur portable, wifi, batterie, chargeur",

            "télécharger, mettre à jour, application, écran"

        ]

    }

};
