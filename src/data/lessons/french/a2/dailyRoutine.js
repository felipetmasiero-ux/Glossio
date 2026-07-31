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

export const dailyRoutineA2Lesson = {

    id: "french-a2-daily-routine",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "daily-routine",

    order: 1,

    title: "Daily Routine",

    subtitle:
        "Talk about how often you do things, and describe your habits in more detail.",

    description:
        "Go beyond simple daily routine phrases and learn to describe how often you do things using adverbs of frequency.",

    cover: "/covers/daily-routine-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "daily routine",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Use adverbs of frequency correctly",

        "Ask and answer 'À quelle fréquence...?'",

        "Describe a morning and evening routine in detail",

        "Talk about chores and housework"

    ],

    vocabulary: vocabulary([
        "souvent",
        "rarement",
        "presque jamais",
        "s'habiller",
        "se brosser les dents",
        "prendre une douche",
        "faire la navette",
        "tâches ménagères",
        "ménage",
        "routine"
    ]),

    blocks: [

        heading("À Quelle Fréquence Fais-tu Ça ?"),

        paragraph(
            "Au niveau A1, tu as appris des expressions simples comme 'se réveiller' et 'prendre le petit-déjeuner'. Maintenant, parlons de la fréquence de tes habitudes avec des adverbes comme toujours, d'habitude, souvent, parfois, rarement, presque jamais, jamais."
        ),

        examples([
            {
                text: "Je me brosse toujours les dents après le petit-déjeuner.",
                translation: "Eu sempre escovo os dentes depois do café da manhã."
            },

            {
                text: "Elle fait rarement le ménage le week-end.",
                translation: "Ela raramente faz a limpeza nos fins de semana."
            },

            {
                text: "Nous faisons souvent la navette ensemble en train.",
                translation: "Nós frequentemente vamos trabalhar juntos de trem."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "À quelle fréquence fais-tu les tâches ménagères ?" },
            { speaker: "Marco", text: "D'habitude, je nettoie la cuisine, mais je ne fais presque jamais la lessive." },
            { speaker: "Ana", text: "C'est quoi, ta routine du matin ?" },
            { speaker: "Marco", text: "Je m'habille, je prends une douche, puis je fais la navette jusqu'au travail." }
        ]),

        grammar(
            "Les Adverbes de Fréquence",
            "Les adverbes de fréquence (toujours, d'habitude, souvent, parfois, rarement, presque jamais, jamais) se placent généralement après le verbe conjugué : 'Je vais souvent au travail à pied.' Utilise 'à quelle fréquence' pour demander la fréquence : 'À quelle fréquence fais-tu du sport ?'"
        ),

        list([

            "toujours (100%) → d'habitude → souvent → parfois → rarement → presque jamais → jamais (0%)",

            "À quelle fréquence...? — D'habitude... / Je ne... presque jamais",

            "s'habiller, prendre une douche, se brosser les dents",

            "tâches ménagères, ménage, routine"

        ]),

        tip(
            "La Position Compte",
            "Ne dis pas 'Souvent je vais à la salle de sport' au milieu d'une phrase sans raison. Place l'adverbe après le verbe conjugué : 'Je vais souvent à la salle de sport.'"
        ),

        culture(
            "Les Routines Autour du Monde",
            "Les routines quotidiennes varient beaucoup selon les cultures — certains pays ont une longue pause de midi pour déjeuner et se reposer, d'autres mangent rapidement et travaillent tout l'après-midi."
        ),

        quiz(
            "Quelle phrase utilise correctement l'adverbe de fréquence ?",
            ["Je vais souvent à la salle de sport.", "Je souvent vais à la salle de sport.", "Souvent je vais à la salle de sport toujours.", "Je vais à salle souvent de sport."],
            0,
            "L'adverbe de fréquence se place après le verbe conjugué : 'Je vais souvent à la salle de sport.'"
        ),

        quiz(
            "Quel adverbe signifie une fréquence proche de zéro ?",
            ["toujours", "souvent", "presque jamais", "d'habitude"],
            2,
            "'Presque jamais' indique une fréquence très basse, proche de zéro."
        ),

        quiz(
            "Quelle question demande la fréquence d'une activité ?",
            ["Qu'est-ce que tu fais ?", "À quelle fréquence fais-tu du sport ?", "Où fais-tu du sport ?", "Pourquoi fais-tu du sport ?"],
            1,
            "'À quelle fréquence...?' est la question utilisée pour demander la fréquence."
        )

    ],

    summary: {

        tip:
            "Décris ta propre routine quotidienne à voix haute en utilisant au moins trois adverbes de fréquence différents.",

        review: [

            "toujours, d'habitude, souvent, parfois, rarement, presque jamais, jamais",

            "À quelle fréquence...?",

            "s'habiller, prendre une douche, se brosser les dents",

            "tâches ménagères, ménage, faire la navette"

        ]

    }

};
