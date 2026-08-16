import { scienceTechnologyC1Blocks } from "../../../grammar/shared/french/scienceTechnologyC1";
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

export const scienceTechnologyLesson = {

    id: "french-c1-science-technology",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "science-technology",

    order: 5,

    title: "Science, Technologie et Innovation",

    subtitle:
        "Spéculez sur l'avenir de la science et de la technologie en utilisant le futur antérieur et des expressions de probabilité avancées.",

    description:
        "Discutez de découvertes scientifiques, d'intelligence artificielle et d'éthique, en apprenant à calibrer votre degré de certitude avec le futur antérieur et 'il se pourrait que'.",

    cover: "/covers/science-technology-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "science-technology",
        "grammar",
        "éthique"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss possibilities and consequences in science and technology",

        "Speculate about the present and future with calibrated confidence",

        "Use the futur antérieur for suppositions and future completion",

        "Evaluate ethical dilemmas around innovation and uncertainty"

    ],

    vocabulary: vocabulary([
        "novateur",
        "une avancée à double tranchant",
        "des conséquences imprévues",
        "à la pointe de",
        "une zone éthique trouble",
        "un examen minutieux",
        "empiéter sur",
        "une preuve de concept",
        "souligner",
        "freiner (une technologie)",
        "une zone grise",
        "préserver",
        "en préparation",
        "l'emporter largement sur",
        "avoir un prix",
        "de pointe",
        "un vide juridique",
        "précipité",
        "un bond en avant",
        "inné"
    ]),

    blocks: [

        heading("Spéculer avec un Degré de Certitude Précis"),

        paragraph(
            "Discuter de science et de technologie implique de spéculer sur des résultats incertains. Le futur antérieur et une série d'expressions de probabilité permettent d'exprimer exactement le degré de certitude voulu."
        ),

        examples([
            {
                text: "D'ici dix ans, cette recherche novatrice aura probablement transformé le secteur entier.",
                translation: "Daqui a dez anos, essa pesquisa inovadora provavelmente terá transformado o setor inteiro."
            },
            {
                text: "Il n'a pas répondu à mes questions — il aura sans doute jugé le sujet trop sensible.",
                translation: "Ele não respondeu às minhas perguntas — ele provavelmente achou o assunto delicado demais."
            },
            {
                text: "Il se pourrait que cette avancée à double tranchant empiète sur une zone grise qu'on n'a pas encore explorée.",
                translation: "É possível que esse avanço de mão dupla avance sobre uma zona cinzenta ainda não explorada."
            },
            {
                text: "Il n'est pas exclu que les bénéfices l'emportent largement sur les risques, mais c'est encore précipité à dire.",
                translation: "Não está descartado que os benefícios superem em muito os riscos, mas ainda é precipitado dizer isso."
            },
            {
                text: "Ce vide juridique doit être comblé avant que la technologie ne soit déployée à grande échelle.",
                translation: "Essa lacuna legal precisa ser preenchida antes que a tecnologia seja implantada em grande escala."
            },
            {
                text: "Cette preuve de concept, aussi modeste soit-elle, représente déjà un bond en avant à la pointe du domaine.",
                translation: "Essa prova de conceito, por mais modesta que seja, já representa um salto adiante na vanguarda da área."
            }
        ]),

        dialogue([
            { speaker: "Léa", text: "Qu'est-ce que tu penses de cette recherche à la pointe de l'IA ?" },
            { speaker: "Nicolas", text: "Vraiment novatrice. Mais il se pourrait qu'elle empiète sur une zone éthique trouble." },
            { speaker: "Léa", text: "Comme quoi ?" },
            { speaker: "Nicolas", text: "La vie privée, surtout. Ça doit avoir un prix, une collecte de données pareille." },
            { speaker: "Léa", text: "Tu penses que les bénéfices l'emporteront sur les risques ?" },
              { speaker: "Nicolas", text: "Il n'est pas exclu, oui — mais c'est précipité à dire sans un examen minutieux." },
            { speaker: "Léa", text: "Il y a un vide juridique pour l'instant, non ?" },
            { speaker: "Nicolas", text: "Oui, mais une nouvelle régulation est en préparation. D'ici quelques années, elle aura sans doute changé la donne." },
            { speaker: "Léa", text: "Espérons qu'elle ne sera pas trop en retard sur la technologie elle-même." }
        ]),

        grammar(scienceTechnologyC1Blocks[0].title, scienceTechnologyC1Blocks[0].text),

        list([

            "futur antérieur (aura + participe passé) — supposition ou action achevée avant un point futur",

            "'il se pourrait que' + subjonctif — possibilité modérée",

            "'il n'est pas exclu que' + subjonctif — possibilité réelle mais incertaine",

            "novateur, à la pointe de, une zone grise, un vide juridique"

        ]),

        tip(
            "Le Futur Antérieur pour Supposer",
            "'Elle aura oublié' (futur antérieur) exprime une supposition sur un événement récent, très courant à l'oral. C'est différent de 'elle a oublié', qui affirme le fait avec certitude."
        ),

        culture(
            "Le Débat sur l'IA en France",
            "La France, à travers des institutions comme le CNRS et des entreprises comme Mistral AI, participe activement au débat européen sur la régulation de l'intelligence artificielle, souvent en insistant sur un équilibre entre innovation et protection des données personnelles."
        ),

        quiz(
            "Choisis la phrase avec le futur antérieur de supposition.",
            [
                "Elle a oublié notre rendez-vous.",
                "Elle aura oublié notre rendez-vous.",
                "Elle oubliera notre rendez-vous.",
                "Elle oublie notre rendez-vous."
            ],
            1,
            "'Elle aura oublié' exprime une supposition sur un événement récent, pas un fait certain."
        ),

        quiz(
            "Quelle expression indique une possibilité réelle mais incertaine ?",
            ["il est certain que", "il se pourrait que", "il n'est pas exclu que", "il est évident que"],
            2,
            "'Il n'est pas exclu que' indique une possibilité réelle mais incertaine, plus forte que 'il se pourrait que'."
        ),

        quiz(
            "Que signifie 'un vide juridique' ?",
            ["une loi très stricte", "l'absence de loi encadrant une situation", "un tribunal vide", "une décision de justice"],
            1,
            "'Un vide juridique' désigne l'absence de loi ou de régulation encadrant une situation nouvelle."
        )

    ],

    summary: {

        tip:
            "Pratique en spéculant sur une technologie qui t'intéresse, avec au moins trois degrés de certitude différents.",

        review: [

            "futur antérieur pour la supposition et l'achèvement futur",

            "il se pourrait que / il n'est pas exclu que — degrés de probabilité",

            "novateur, à la pointe de, une zone grise, un vide juridique"

        ]

    }

};
