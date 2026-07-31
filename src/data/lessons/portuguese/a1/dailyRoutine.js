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

    id: "portuguese-a1-daily-routine",

    language: "portuguese",

    level: "A1",

    category: "Daily Life",

    topic: "daily-routine",

    order: 7,

    title: "Daily Routine",

    subtitle:
        "Describe your typical day from morning to night.",

    description:
        "Learn the vocabulary and time expressions you need to describe a typical day, from waking up to going to bed.",

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

        "Use time expressions like 'de manhã', 'à noite'",

        "Ask someone about their routine",

        "Use the present tense to talk about habits"

    ],

    vocabulary: vocabulary([
        "acordar",
        "levantar",
        "tomar café da manhã",
        "ir trabalhar",
        "almoçar",
        "voltar para casa",
        "jantar",
        "ir dormir",
        "de manhã",
        "à noite"
    ]),

    blocks: [

        heading("A Typical Day"),

        paragraph(
            "Describing your daily routine is a great way to practice the present tense, since routines are repeated actions. Most routine verbs in Portuguese are single words, like 'acordar' and 'almoçar'."
        ),

        examples([
            {
                text: "Eu acordo às 7h e levanto na mesma hora.",
                translation: "I wake up at 7 AM and get up right away."
            },

            {
                text: "Ela toma café da manhã em casa e vai trabalhar de ônibus.",
                translation: "She has breakfast at home and goes to work by bus."
            },

            {
                text: "Nós jantamos juntos às 20h todo dia.",
                translation: "We have dinner together at 8 PM every day."
            }
        ]),

        grammar(
            "Expressões de Tempo",
            "Use 'de manhã', 'à tarde' and 'à noite' for parts of the day. Use 'às' with clock times: 'às 7h', 'às 20h'. Note that 'à noite' covers both the evening and the night."
        ),

        dialogue([
            { speaker: "Anna", text: "Que horas você acorda?" },
            { speaker: "Marco", text: "Eu acordo às 6h30 e faço uma corrida de manhã." },
            { speaker: "Anna", text: "Nossa, que cedo! O que você faz à noite?" },
            { speaker: "Marco", text: "Eu janto com a minha família e depois leio um livro antes de dormir." }
        ]),

        list([

            "acordar → levantar → tomar café da manhã",

            "ir trabalhar / ir para a escola",

            "almoçar → trabalhar → voltar para casa",

            "jantar → relaxar → ir dormir"

        ]),

        tip(
            "Palavras de Frequência",
            "Add words like 'sempre', 'geralmente' or 'nunca' before the verb to say how often you do something: 'Eu sempre tomo café da manhã.' / 'Eu nunca pulo o almoço.'"
        ),

        culture(
            "Different Schedules",
            "Daily routines vary a lot around the world. In Brazil, lunch is traditionally an important meal, and many people still take a short break for it in the middle of the day."
        ),

        quiz(
            "Which sentence uses the correct time expression?",
            ["Eu acordo em 7h.", "Eu acordo na 7h.", "Eu acordo para 7h.", "Eu acordo às 7h."],
            3,
            "Use 'às' with clock times: 'às 7h'."
        ),

        quiz(
            "Which expression means 'in the morning'?",
            ["de manhã", "na manhã", "em manhã", "por manhã"],
            0,
            "'De manhã' is the fixed expression for 'in the morning'."
        ),

        quiz(
            "What is the correct order of a typical morning routine?",
            [
                "Tomar café da manhã, acordar, levantar",
                "Acordar, levantar, tomar café da manhã",
                "Levantar, tomar café da manhã, acordar",
                "Tomar café da manhã, levantar, acordar"
            ],
            1,
            "The natural order is: acordar, levantar, then tomar café da manhã."
        )

    ],

    summary: {

        tip:
            "Try describing your own daily routine out loud, from the moment you wake up to when you go to bed.",

        review: [

            "acordar, levantar, tomar café da manhã",

            "ir trabalhar/para a escola, almoçar, voltar para casa",

            "jantar, ir dormir",

            "de manhã, à noite",

            "sempre, geralmente, nunca + verbo"

        ]

    }

};
