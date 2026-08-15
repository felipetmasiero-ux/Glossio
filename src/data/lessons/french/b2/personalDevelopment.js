import { personalDevelopmentB2Blocks } from "../../../grammar/shared/french/personalDevelopmentB2";
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

    id: "french-b2-personal-development",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "personal-development",

    order: 1,

    title: "Développement Personnel et Choix de Vie",

    subtitle:
        "Fale sobre desenvolvimento pessoal e mudanças de vida em francês usando o plus-que-parfait e expressões de duração.",

    description:
        "Aprenda a usar o plus-que-parfait com precisão e expressões de duração como 'depuis' e 'ça fait...que' para falar sobre sua trajetória pessoal.",

    cover: "/covers/personal-development-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "personal-development",
        "grammar",
        "plus-que-parfait"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss personal development, priorities and life changes",

        "Use the plus-que-parfait to sequence past events precisely",

        "Use 'depuis' to express a starting point",

        "Use 'ça fait...que' and 'il y a...que' to express duration"

    ],

    vocabulary: vocabulary([
        "épanouissement",
        "remise en question",
        "bilan",
        "cheminement",
        "déclencheur",
        "prise de conscience",
        "lâcher prise",
        "se remettre en question",
        "évoluer",
        "évolution personnelle",
        "accomplissement",
        "renoncer à",
        "faire le point",
        "depuis",
        "ça fait...que",
        "il y a...que",
        "au fil du temps",
        "à l'époque",
        "rétrospectivement",
        "se réinventer"
    ]),

    blocks: [

        heading("Raconter son Parcours avec Précision"),

        paragraph(
            "Pour parler de développement personnel avec précision, le plus-que-parfait permet de bien situer les événements les uns par rapport aux autres, et les expressions de durée précisent depuis combien de temps une situation existe."
        ),

        examples([
            {
                text: "Quand j'ai commencé ce travail, j'avais déjà changé de carrière deux fois.",
                translation: "Quando comecei esse trabalho, eu já tinha mudado de carreira duas vezes."
            },
            {
                text: "Ça fait cinq ans que je travaille sur mon épanouissement personnel.",
                translation: "Faz cinco anos que trabalho na minha realização pessoal."
            },
            {
                text: "Depuis cette prise de conscience, tout a changé pour moi.",
                translation: "Desde essa tomada de consciência, tudo mudou pra mim."
            },
            {
                text: "Avant de déménager, j'avais déjà fait le point sur mes priorités.",
                translation: "Antes de me mudar, eu já tinha feito um balanço das minhas prioridades."
            },
            {
                text: "Il y a longtemps que je voulais me réinventer, mais je n'osais pas.",
                translation: "Fazia muito tempo que eu queria me reinventar, mas não ousava."
            },
            {
                text: "Au fil du temps, j'ai appris à lâcher prise sur ce que je ne contrôle pas.",
                translation: "Com o passar do tempo, aprendi a deixar de lado o que não controlo."
            },
            {
                text: "À l'époque, je n'aurais jamais imaginé un tel changement.",
                translation: "Na época, eu nunca teria imaginado uma mudança dessas."
            }
        ]),

        dialogue([
            { speaker: "Léna", text: "Ça fait combien de temps que tu ne travailles plus dans la finance ?" },
            { speaker: "Karim", text: "Ça fait déjà deux ans. Avant de démissionner, j'avais longuement réfléchi à mon épanouissement personnel." },
            { speaker: "Léna", text: "Qu'est-ce qui a déclenché cette remise en question ?" },
            { speaker: "Karim", text: "Honnêtement, un simple burn-out. J'avais accumulé trop de stress sans m'en rendre compte." },
            { speaker: "Léna", text: "Et rétrospectivement, tu es content de ce choix ?" },
            { speaker: "Karim", text: "Complètement. Au fil du temps, j'ai appris à lâcher prise sur beaucoup de choses." },
            { speaker: "Léna", text: "C'est inspirant. Moi, depuis quelques mois, je me remets aussi en question." },
            { speaker: "Karim", text: "Prends ton temps. Fais le point, et tu sauras ce dont tu as vraiment besoin." }
        ]),

        grammar(personalDevelopmentB2Blocks[0].title, personalDevelopmentB2Blocks[0].text),

        list([

            "plus-que-parfait — avant une autre action passée",

            "depuis + point de départ",

            "ça fait...que / il y a...que + durée",

            "épanouissement, prise de conscience, lâcher prise"

        ]),

        tip(
            "Depuis vs Pendant",
            "Ne confonds pas 'depuis' et 'pendant'. 'Depuis' indique un point de départ ('depuis 2020', 'depuis que je travaille ici'). 'Pendant' indique une durée complète et terminée ('pendant deux ans'). 'Depuis' s'utilise avec une action qui continue encore maintenant."
        ),

        culture(
            "Le Bilan de Vie",
            "En France, il est courant de parler ouvertement de 'faire le point' sur sa vie, sa carrière ou ses relations, souvent à l'occasion d'un anniversaire marquant ou d'un changement important — cette introspection est vue positivement, pas comme un signe de faiblesse."
        ),

        quiz(
            "Choisis la bonne phrase.",
            [
                "Quand je suis arrivé, il est déjà parti.",
                "Quand je suis arrivé, il avait déjà parti.",
                "Quand je suis arrivé, il était déjà parti.",
                "Quand je suis arrivé, il a déjà parti."
            ],
            2,
            "'Partir' se conjugue avec 'être' ; au plus-que-parfait : 'il était déjà parti'."
        ),

        quiz(
            "Complète : \"Ça fait trois ans ___ j'habite à Lyon.\"",
            ["que", "depuis", "il y a", "pendant"],
            0,
            "'Ça fait trois ans que' est la structure complète pour exprimer une durée."
        ),

        quiz(
            "Choisis la bonne phrase avec 'depuis'.",
            [
                "J'habite ici depuis trois ans.",
                "J'habite ici pendant trois ans.",
                "J'habite ici il y a trois ans.",
                "J'habite ici que trois ans."
            ],
            0,
            "'Depuis' indique un point de départ pour une action qui continue : 'depuis trois ans'."
        )

    ],

    summary: {

        tip:
            "Pratique à raconter ton propre parcours en utilisant le plus-que-parfait pour l'ordre des événements et 'depuis'/'ça fait...que' pour la durée.",

        review: [

            "plus-que-parfait — avant une autre action passée",

            "depuis + point de départ",

            "ça fait...que / il y a...que + durée",

            "épanouissement, lâcher prise, se réinventer"

        ]

    }

};
