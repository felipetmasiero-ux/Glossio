import { workCareersC1Blocks } from "../../../grammar/shared/french/workCareersC1";
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

export const workCareersLesson = {

    id: "french-c1-work-careers",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "work-careers",

    order: 3,

    title: "Travail, Carrière et Communication Professionnelle",

    subtitle:
        "Négociez et rapportez des informations professionnelles prudemment en utilisant le conditionnel passé.",

    description:
        "Développez du vocabulaire sur le leadership et la communication professionnelle, et apprenez à utiliser le conditionnel passé pour rapporter une information non confirmée.",

    cover: "/covers/work-careers-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "work-careers",
        "grammar",
        "leadership"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Negotiate and disagree diplomatically in professional settings",

        "Report unconfirmed professional information carefully",

        "Use the conditional perfect for unconfirmed information",

        "Apply professional collocations and diplomatic language naturally"

    ],

    vocabulary: vocabulary([
        "être à la tête de",
        "rationaliser",
        "redevable de",
        "aux commandes",
        "apporter une contribution",
        "des réserves",
        "régler les derniers détails",
        "lancer le mouvement",
        "réduire les effectifs",
        "avec diplomatie",
        "être sur la même longueur d'onde",
        "tirer parti de",
        "une mission ardue",
        "microgérer",
        "faire preuve de clémence",
        "une partie prenante",
        "de bonne foi",
        "contester une décision",
        "une courbe d'apprentissage abrupte",
        "une critique constructive"
    ]),

    blocks: [

        heading("Rapporter une Information avec Prudence"),

        paragraph(
            "Dans un contexte professionnel, le conditionnel passé permet de rapporter une information sans en garantir l'exactitude — une nuance essentielle avant qu'une rumeur ne soit confirmée."
        ),

        examples([
            {
                text: "Le projet aurait été annulé, mais rien n'a encore été confirmé officiellement.",
                translation: "O projeto teria sido cancelado, mas nada foi confirmado oficialmente ainda."
            },
            {
                text: "La direction aurait décidé de réduire les effectifs sans consulter les parties prenantes.",
                translation: "A diretoria teria decidido reduzir o quadro de funcionários sem consultar as partes interessadas."
            },
            {
                text: "On dit qu'elle serait à la tête du nouveau projet, mais ce n'est pas encore officiel.",
                translation: "Dizem que ela estaria à frente do novo projeto, mas ainda não é oficial."
            },
            {
                text: "Malgré des réserves de bonne foi, l'équipe a fini par être sur la même longueur d'onde.",
                translation: "Apesar de ressalvas de boa-fé, a equipe acabou ficando alinhada."
            },
            {
                text: "Il a fallu faire preuve de clémence pendant sa courbe d'apprentissage abrupte.",
                translation: "Foi preciso ser mais tolerante durante a curva de aprendizado íngreme dele."
            },
            {
                text: "Elle a réglé les derniers détails avec diplomatie, sans jamais microgérer l'équipe.",
                translation: "Ela acertou os últimos detalhes com diplomacia, sem nunca microgerenciar a equipe."
            }
        ]),

        dialogue([
            { speaker: "Aurélie", text: "Tu as entendu la rumeur sur la restructuration ?" },
            { speaker: "Mathieu", text: "Oui, il paraît que la direction aurait décidé de réduire les effectifs. Rien n'est confirmé, cela dit." },
            { speaker: "Aurélie", text: "Qui serait à la tête du projet, alors ?" },
            { speaker: "Mathieu", text: "On dit que ce serait Camille, mais ce n'est qu'une rumeur pour l'instant." },
            { speaker: "Aurélie", text: "J'ai des réserves sur cette approche, honnêtement." },
            { speaker: "Mathieu", text: "Exprime-les avec diplomatie en réunion, ça vaudra mieux que de contester la décision publiquement." },
            { speaker: "Aurélie", text: "Bien sûr. Je veux juste qu'on soit sur la même longueur d'onde avant que ça devienne officiel." },
            { speaker: "Mathieu", text: "D'accord. Tirons parti de la réunion de demain pour régler les derniers détails ensemble." }
        ]),

        grammar(workCareersC1Blocks[0].title, workCareersC1Blocks[0].text),

        list([

            "conditionnel passé (aurait + participe) — information non confirmée",

            "différent du conditionnel passé de regret ('j'aurais dû')",

            "être à la tête de, tirer parti de, régler les derniers détails",

            "avec diplomatie, une partie prenante, de bonne foi"

        ]),

        tip(
            "Prudence Professionnelle",
            "Utiliser le passé composé pour une rumeur non confirmée ('Le projet a été annulé') pourrait engager ta crédibilité si l'information est fausse. Le conditionnel passé ('aurait été annulé') te protège en signalant explicitement l'incertitude."
        ),

        culture(
            "Le Feedback à la Française",
            "Dans les entreprises françaises, la critique directe en public est souvent mal perçue, même si elle est constructive — mieux vaut souvent exprimer des réserves en privé ou utiliser des formulations prudentes comme le conditionnel avant une réunion officielle."
        ),

        quiz(
            "Choisis la phrase qui rapporte une information non confirmée.",
            [
                "Le projet a été annulé.",
                "Le projet aurait été annulé.",
                "Le projet est annulé.",
                "Le projet sera annulé."
            ],
            1,
            "Le conditionnel passé ('aurait été annulé') signale que l'information n'est pas confirmée."
        ),

        quiz(
            "Que signifie 'être sur la même longueur d'onde' ?",
            ["être en désaccord total", "être alignés / d'accord", "travailler dans des bureaux différents", "avoir des opinions opposées"],
            1,
            "'Être sur la même longueur d'onde' signifie être en accord ou alignés sur une idée."
        ),

        quiz(
            "Que signifie 'régler les derniers détails' ?",
            ["ignorer les petits problèmes restants", "résoudre les derniers points avant de finaliser quelque chose", "annuler un projet", "recommencer un projet à zéro"],
            1,
            "'Régler les derniers détails' signifie résoudre les points restants avant de finaliser quelque chose."
        )

    ],

    summary: {

        tip:
            "Pratique en rapportant une rumeur professionnelle imaginaire avec le conditionnel passé, sans l'affirmer comme un fait.",

        review: [

            "conditionnel passé pour une information non confirmée",

            "être à la tête de, tirer parti de, régler les derniers détails",

            "avec diplomatie, une partie prenante, de bonne foi"

        ]

    }

};
