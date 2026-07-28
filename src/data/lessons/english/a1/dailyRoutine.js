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

export const dailyRoutineLesson = {

    id: "english-a1-daily-routine",

    language: "english",

    level: "A1",

    category: "Daily Life",

    topic: "daily-routine",

    order: 9,

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

        "Use time expressions like 'at', 'in the morning'",

        "Ask someone about their routine",

        "Use the present simple to talk about habits"

    ],

    vocabulary: vocabulary([
        "wake up",
        "get up",
        "have breakfast",
        "go to work",
        "have lunch",
        "go home",
        "have dinner",
        "go to bed",
        "in the morning",
        "at night"
    ]),

    blocks: [

        heading("A Typical Day"),

        paragraph(
            "Describing your daily routine is a great way to practice the present simple, since routines are repeated actions. Most routine verbs in English are made of two words, like 'wake up' and 'have breakfast'."
        ),

        examples([
            {
                text: "I wake up at 7 AM and get up right away.",
                translation: "Eu acordo às 7h e levanto na mesma hora."
            },

            {
                text: "She has breakfast at home and goes to work by bus.",
                translation: "Ela toma café em casa e vai trabalhar de ônibus."
            },

            {
                text: "We have dinner together at 8 PM every day.",
                translation: "Nós jantamos juntos às 20h todo dia."
            }
        ]),

        grammar(
            "Time Expressions",
            "Use 'at' with clock times: 'at 7 AM', 'at night'. Use 'in' with parts of the day: 'in the morning', 'in the afternoon', 'in the evening'. The only exception is 'at night', which uses 'at' instead of 'in'."
        ),

        dialogue([
            { speaker: "Anna", text: "What time do you wake up?" },
            { speaker: "Marco", text: "I wake up at 6:30 and go for a run in the morning." },
            { speaker: "Anna", text: "Wow, that's early! What do you do at night?" },
            { speaker: "Marco", text: "I have dinner with my family and then I read a book before bed." }
        ]),

        list([

            "wake up → get up → have breakfast",

            "go to work / go to school",

            "have lunch → work → go home",

            "have dinner → relax → go to bed"

        ]),

        tip(
            "Frequency Words",
            "Add words like 'always', 'usually' or 'never' before the verb to say how often you do something: 'I always have breakfast.' / 'I never skip lunch.'"
        ),

        culture(
            "Different Schedules",
            "Daily routines vary a lot around the world. In some countries, lunch is the biggest meal and includes a short rest afterward, while in others people eat a quick lunch and have a bigger dinner in the evening."
        ),

        quiz(
            "Which sentence uses the correct preposition?",
            ["I wake up in 7 AM.", "I wake up on 7 AM.", "I wake up for 7 AM.", "I wake up at 7 AM."],
            3,
            "Use 'at' with clock times: 'at 7 AM'."
        ),

        quiz(
            "Which expression means 'de manhã'?",
            ["in the morning", "at morning", "on the morning", "for the morning"],
            0,
            "Use 'in the morning' for parts of the day."
        ),

        quiz(
            "What is the correct order of a typical morning routine?",
            [
                "Have breakfast, wake up, get up",
                "Wake up, get up, have breakfast",
                "Get up, have breakfast, wake up",
                "Have breakfast, get up, wake up"
            ],
            1,
            "The natural order is: wake up, get up, then have breakfast."
        )

    ],

    summary: {

        tip:
            "Try describing your own daily routine out loud, from the moment you wake up to when you go to bed.",

        review: [

            "wake up, get up, have breakfast",

            "go to work/school, have lunch, go home",

            "have dinner, go to bed",

            "at + clock time, in + part of the day",

            "always, usually, never + verb"

        ]

    }

};
