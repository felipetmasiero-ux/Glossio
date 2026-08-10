import { dailyRoutineBlocks } from "../../../grammar/shared/french/dailyRoutine";
import {
    heading,
    paragraph,
    examples,
    dialogue,
    grammar,
    list,
    tip,
    culture,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const dailyRoutineLesson = {

    id: "french-a1-daily-routine",

    language: "french",

    level: "A1",

    category: "Daily Life",

    topic: "daily-routine",

    order: 7,

    title: "Rotina Diária",

    subtitle:
        "Descreva seu dia típico do início ao fim em francês.",

    description:
        "Aprenda o vocabulário e as expressões de tempo necessárias para descrever um dia típico, do acordar ao dormir.",

    cover: "/covers/daily-routine.webp",

    estimatedTime: 9,

    difficulty: 1,

    xp: 30,

    tags: [
        "routine",
        "vocabulary",
        "daily life"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Describe a typical daily routine",

        "Use time expressions like 'le matin', 'le soir'",

        "Ask someone about their routine",

        "Use reflexive verbs to talk about habits"

    ],

    vocabulary: vocabulary([
        "se réveiller",
        "se lever",
        "prendre le petit-déjeuner",
        "aller au travail",
        "déjeuner",
        "rentrer à la maison",
        "dîner",
        "aller se coucher",
        "le matin",
        "le soir"
    ]),

    blocks: [

        heading("A Typical Day"),

        paragraph(
            "Describing your daily routine is a great way to practice reflexive verbs, since many routine actions in French are reflexive: 'se réveiller' (to wake up), 'se lever' (to get up), 'se coucher' (to go to bed)."
        ),

        examples([
            {
                text: "Je me réveille à 7h et je me lève tout de suite.",
                translation: "Eu acordo às 7h e levanto na mesma hora."
            },

            {
                text: "Elle prend le petit-déjeuner à la maison et va au travail en bus.",
                translation: "Ela toma café em casa e vai trabalhar de ônibus."
            },

            {
                text: "Nous dînons ensemble à 20h tous les jours.",
                translation: "Nós jantamos juntos às 20h todo dia."
            }
        ]),

        grammar(dailyRoutineBlocks[0].title, dailyRoutineBlocks[0].text),

        dialogue([
            { speaker: "Anna", text: "À quelle heure tu te réveilles ?" },
            { speaker: "Marco", text: "Je me réveille à 6h30 et je fais un jogging le matin." },
            { speaker: "Anna", text: "Wow, c'est tôt ! Tu fais quoi le soir ?" },
            { speaker: "Marco", text: "Je dîne avec ma famille, puis je lis un livre avant de me coucher." }
        ]),

        list([

            "se réveiller → se lever → prendre le petit-déjeuner",

            "aller au travail / aller à l'école",

            "déjeuner → travailler → rentrer à la maison",

            "dîner → se détendre → aller se coucher"

        ]),

        tip(
            "Frequency Words",
            "Add words like 'toujours', 'd'habitude' or 'jamais' before the verb to say how often you do something: 'Je prends toujours le petit-déjeuner.' / 'Je ne saute jamais le déjeuner.'"
        ),

        culture(
            "Different Schedules",
            "Daily routines vary a lot around the world. In France, lunch is traditionally an important meal, often taken around 12-1 PM, while dinner tends to happen later than in some other countries, around 7:30-8 PM."
        ),

        quiz(
            "Which sentence uses the correct reflexive pronoun?",
            ["Je se réveille à 7h.", "Je me réveille à 7h.", "Je te réveille à 7h.", "Je réveille à 7h."],
            1,
            "Use 'je me réveille' — the reflexive pronoun must match the subject 'je'."
        ),

        quiz(
            "Which expression means 'de manhã'?",
            ["le matin", "au matin", "en matin", "à matin"],
            0,
            "'Le matin' is the fixed expression for 'in the morning'."
        ),

        quiz(
            "What is the correct order of a typical morning routine?",
            [
                "Prendre le petit-déjeuner, se réveiller, se lever",
                "Se réveiller, se lever, prendre le petit-déjeuner",
                "Se lever, prendre le petit-déjeuner, se réveiller",
                "Prendre le petit-déjeuner, se lever, se réveiller"
            ],
            1,
            "The natural order is: se réveiller, se lever, then prendre le petit-déjeuner."
        )

    ],

    summary: {

        tip:
            "Try describing your own daily routine out loud, from the moment you wake up to when you go to bed.",

        review: [

            "se réveiller, se lever, prendre le petit-déjeuner",

            "aller au travail/à l'école, déjeuner, rentrer à la maison",

            "dîner, aller se coucher",

            "le matin, le soir",

            "toujours, d'habitude, jamais + verbe"

        ]

    }

};
