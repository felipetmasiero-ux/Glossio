import { personalDevelopmentC1Blocks } from "../../../grammar/shared/french/personalDevelopmentC1";
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

export const personalDevelopmentLesson = {

    id: "french-c1-personal-development",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "personal-development",

    order: 1,

    title: "Identité, Évolution Personnelle et Choix de Vie",

    subtitle:
        "Racontez votre évolution personnelle avec un français soutenu, en utilisant l'inversion du sujet après certains adverbes.",

    description:
        "Apprenez à utiliser l'inversion après 'peut-être', 'aussi' et 'sans doute' pour un registre plus littéraire, et développez un vocabulaire nuancé sur l'identité et les choix de vie.",

    cover: "/covers/personal-development-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "personal-development",
        "grammar",
        "identité"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Reflect on identity, change and personal growth with nuance",

        "Narrate life decisions using a more literary, formal register",

        "Use subject-verb inversion after adverbs like 'peut-être' and 'aussi'",

        "Discuss values, resilience and turning points with precision"

    ],

    vocabulary: vocabulary([
        "s'accomplir",
        "révéler son potentiel",
        "formateur",
        "composer avec",
        "affronter les conséquences",
        "se défaire",
        "se recentrer",
        "à un tournant",
        "boucler la boucle",
        "manque de confiance en soi",
        "instinct",
        "faire la paix avec",
        "aux antipodes de",
        "sous-jacent",
        "se réapproprier",
        "après coup",
        "faire écho",
        "se tenir à l'écart de",
        "des réticences à propos de",
        "finir par accepter"
    ]),

    blocks: [

        heading("Raconter un Changement avec Style"),

        paragraph(
            "Pour raconter une évolution personnelle avec un français soutenu, on utilise parfois l'inversion du sujet après certains adverbes en début de phrase — une structure qui donne une touche littéraire au récit."
        ),

        examples([
            {
                text: "Peut-être devrais-je me réapproprier cette partie de mon histoire.",
                translation: "Talvez eu devesse reconquistar essa parte da minha história."
            },
            {
                text: "Sans doute avais-je besoin de composer avec cet échec avant d'avancer.",
                translation: "Sem dúvida eu precisava lidar com esse fracasso antes de seguir em frente."
            },
            {
                text: "Aussi ai-je décidé de me tenir à l'écart de tout ce qui me freinait.",
                translation: "Por isso, decidi me afastar de tudo que me travava."
            },
            {
                text: "À peine avais-je pris cette décision que j'ai senti mes réticences disparaître.",
                translation: "Mal eu tinha tomado essa decisão e senti minhas ressalvas desaparecerem."
            },
            {
                text: "Cette expérience formatrice m'a permis de révéler mon plein potentiel.",
                translation: "Essa experiência formadora me permitiu revelar todo o meu potencial."
            },
            {
                text: "Après coup, j'ai fini par accepter que ce tournant était nécessaire.",
                translation: "Depois, acabei aceitando que aquela virada era necessária."
            },
            {
                text: "Ce choix était aux antipodes de ce que j'avais toujours imaginé pour moi.",
                translation: "Essa escolha era o oposto do que eu sempre tinha imaginado para mim."
            }
        ]),

        dialogue([
            { speaker: "Camille", text: "Tu sembles vraiment plus apaisée ces derniers temps." },
            { speaker: "Julien", text: "J'ai eu beaucoup de réticences à propos de ce changement, mais j'ai fini par accepter que c'était nécessaire." },
            { speaker: "Camille", text: "Qu'est-ce qui t'a fait changer d'avis ?" },
            { speaker: "Julien", text: "Sans doute avais-je besoin de composer avec un échec avant de me recentrer sur mes vraies priorités." },
            { speaker: "Camille", text: "Je comprends. Moi aussi, j'étais à un tournant l'année dernière." },
            { speaker: "Julien", text: "Qu'est-ce que tu as fait ?" },
            { speaker: "Camille", text: "Aussi ai-je décidé de me tenir à l'écart de tout ce qui alimentait mon manque de confiance en soi." },
            { speaker: "Julien", text: "Et rétrospectivement, tu ne regrettes rien ?" },
            { speaker: "Camille", text: "Après coup, non. J'ai enfin fait la paix avec cette période de ma vie." }
        ]),

        grammar(personalDevelopmentC1Blocks[0].title, personalDevelopmentC1Blocks[0].text),

        list([

            "adverbe (peut-être, aussi, sans doute, à peine) + inversion sujet-verbe",

            "registre soutenu — à l'oral, garder l'ordre normal avec 'que'",

            "s'accomplir, se recentrer, se réapproprier, faire la paix avec",

            "à un tournant, aux antipodes de, après coup"

        ]),

        tip(
            "Registre Soutenu vs Oral",
            "L'inversion après 'peut-être' est fréquente à l'écrit soutenu, mais sonne trop formelle dans une conversation informelle. À l'oral, dis simplement 'Peut-être que je devrais...' plutôt que 'Peut-être devrais-je...'."
        ),

        culture(
            "Le Récit de Soi en France",
            "En France, le récit personnel structuré autour d'un 'avant' et d'un 'après' — souvent marqué par une prise de conscience ou un tournant — est très présent dans la littérature autobiographique contemporaine et dans les interviews médiatiques."
        ),

        quiz(
            "Choisis la phrase avec l'inversion correcte après 'peut-être'.",
            [
                "Peut-être je devrais partir.",
                "Peut-être devrais-je partir.",
                "Peut-être je dois partir.",
                "Peut-être partir je devrais."
            ],
            1,
            "'Peut-être' en début de phrase, à l'écrit soutenu, déclenche l'inversion : 'Peut-être devrais-je...'."
        ),

        quiz(
            "Que signifie 'se réapproprier quelque chose' ?",
            ["abandonner quelque chose", "reprendre possession de quelque chose pour soi", "détruire quelque chose", "ignorer quelque chose"],
            1,
            "'Se réapproprier' signifie reprendre possession de quelque chose (une identité, une histoire) pour en faire à nouveau sienne."
        ),

        quiz(
            "Choisis la phrase correcte avec 'aussi' + inversion.",
            [
                "Aussi j'ai décidé de partir.",
                "Aussi ai-je décidé de partir.",
                "Aussi je décidé de partir.",
                "Aussi décidé-je j'ai de partir."
            ],
            1,
            "'Aussi' avec le sens de 'donc' déclenche l'inversion à l'écrit soutenu : 'Aussi ai-je décidé...'."
        )

    ],

    summary: {

        tip:
            "Pratique en racontant un changement personnel avec au moins une inversion après 'peut-être', 'sans doute' ou 'aussi'.",

        review: [

            "inversion du sujet après peut-être, aussi, sans doute, à peine",

            "s'accomplir, se recentrer, se réapproprier, faire la paix avec",

            "à un tournant, aux antipodes de, après coup"

        ]

    }

};
