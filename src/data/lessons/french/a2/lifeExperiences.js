import { lifeExperiencesBlocks } from "../../../grammar/shared/french/lifeExperiences";
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

export const lifeExperiencesLesson = {

    id: "french-a2-life-experiences",

    language: "french",

    level: "A2",

    category: "Grammar",

    topic: "life-experiences",

    order: 12,

    title: "Life Experiences",

    subtitle:
        "Talk about things you have and haven't done in your life using the passé composé.",

    description:
        "Learn how to talk about life experiences using the passé composé with 'déjà', 'jamais' and 'ne... pas encore'.",

    cover: "/covers/life-experiences.webp",

    estimatedTime: 10,

    difficulty: 2,

    xp: 40,

    tags: [
        "grammar",
        "vocabulary",
        "review"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Use the passé composé to talk about experiences",

        "Ask 'As-tu déjà...?'",

        "Use 'déjà' and 'ne... pas encore' correctly",

        "Talk about achievements and challenges in your life"

    ],

    vocabulary: vocabulary([
        "expérience",
        "réussite",
        "étranger",
        "aventure",
        "défi",
        "accomplir",
        "carrière",
        "jalon",
        "déjà",
        "jamais"
    ]),

    blocks: [

        heading("As-tu Déjà...?"),

        paragraph(
            "Le passé composé est utilisé pour parler d'expériences de vie, sans dire exactement quand elles se sont passées. C'est parfait pour parler de réussites, d'aventures et de défis."
        ),

        examples([
            {
                text: "As-tu déjà voyagé à l'étranger ?",
                translation: "Você já viajou para o exterior alguma vez?"
            },

            {
                text: "J'ai déjà eu beaucoup de défis dans ma carrière.",
                translation: "Eu já tive muitos desafios na minha carreira."
            },

            {
                text: "Elle n'a pas encore accompli cet objectif, mais c'est un grand jalon pour elle.",
                translation: "Ela ainda não alcançou esse objetivo, mas é um grande marco para ela."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "As-tu déjà vécu une aventure à l'étranger ?" },
            { speaker: "Marco", text: "Oui, j'ai déjà voyagé dans trois pays." },
            { speaker: "Ana", text: "Quelle belle expérience ! Des grands défis ?" },
            { speaker: "Marco", text: "Certainement. Mais c'est une de mes plus grandes réussites." }
        ]),

        grammar(lifeExperiencesBlocks[0].title, lifeExperiencesBlocks[0].text),

        list([

            "As-tu déjà...? — Oui, j'ai déjà... / Non, je n'ai jamais...",

            "Je n'ai jamais... / J'ai déjà...",

            "Tu as fini ? — Pas encore.",

            "expérience, réussite, aventure, défi, jalon"

        ]),

        tip(
            "Déjà vs Pas Encore",
            "'Déjà' se place généralement entre l'auxiliaire et le participe passé dans les phrases affirmatives : 'J'ai déjà fini.' 'Ne... pas encore' encadre l'auxiliaire dans les négations : 'Je n'ai pas encore fini.'"
        ),

        culture(
            "Parler de ses Réussites",
            "Dans de nombreuses cultures francophones, il est courant de parler ouvertement de ses réussites et de ses grands moments, comme obtenir un diplôme, voyager à l'étranger, ou atteindre un objectif de carrière."
        ),

        quiz(
            "Quelle question demande une expérience de vie ?",
            ["Tu voyages à l'étranger ?", "As-tu déjà voyagé à l'étranger ?", "Tu voyageais à l'étranger ?", "Tu voyageras à l'étranger ?"],
            1,
            "'As-tu déjà...?' + participe passé demande une expérience de vie."
        ),

        quiz(
            "Quel mot accompagne une expérience négative ?",
            ["déjà", "jamais", "encore", "toujours"],
            1,
            "'Jamais' s'utilise pour quelque chose qui ne s'est jamais produit : 'Je n'ai jamais visité le Japon.'"
        ),

        quiz(
            "Comment dit-on qu'on n'a pas encore fini quelque chose ?",
            ["J'ai déjà fini.", "Je n'ai pas encore fini.", "Je finis jamais.", "J'ai fini jamais."],
            1,
            "'Je n'ai pas encore fini' exprime qu'une action n'est pas encore accomplie."
        )

    ],

    summary: {

        tip:
            "Pratique à parler de trois expériences de vie en utilisant 'j'ai déjà...' et une chose que tu 'n'as jamais' faite.",

        review: [

            "As-tu déjà...? / Je n'ai jamais...",

            "J'ai déjà... / pas encore",

            "expérience, réussite, aventure, défi",

            "carrière, jalon, accomplir, étranger"

        ]

    }

};
