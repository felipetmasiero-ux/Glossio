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

export const jobsLesson = {

    id: "english-a1-jobs",

    language: "english",

    level: "A1",

    category: "Basics",

    order: 7,

    title: "Jobs",

    subtitle:
        "Talk about occupations and what people do for a living.",

    description:
        "Learn common job titles in English and how to ask and answer 'What do you do?'",

    cover: "/covers/jobs.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 25,

    tags: [
        "jobs",
        "vocabulary",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Name common occupations",

        "Ask 'What do you do?'",

        "Say what you do for a living",

        "Use 'a' and 'an' with professions"

    ],

    vocabulary: vocabulary([

        { word: "teacher", translation: "professor(a)" },

        { word: "doctor", translation: "médico(a)" },

        { word: "engineer", translation: "engenheiro(a)" },

        { word: "nurse", translation: "enfermeiro(a)" },

        { word: "manager", translation: "gerente" },

        { word: "student", translation: "estudante" },

        { word: "police officer", translation: "policial" },

        {
            word: "What do you do?",
            translation: "O que você faz (da vida)?"
        },

        {
            word: "I work as a...",
            translation: "Eu trabalho como..."
        }

    ]),

    blocks: [

        heading("Talking about Work"),

        paragraph(
            "In English, asking about someone's job is a common way to start a conversation. The most natural question is 'What do you do?' — not 'What is your job?', which can sound too direct."
        ),

        examples([
            {
                text: "What do you do? — I'm a teacher.",
                translation: "O que você faz? — Eu sou professor(a)."
            },

            {
                text: "She works as a nurse at the hospital.",
                translation: "Ela trabalha como enfermeira no hospital."
            },

            {
                text: "I'm a student. I study engineering.",
                translation: "Eu sou estudante. Eu estudo engenharia."
            }
        ]),

        dialogue([
            { speaker: "Sofia", text: "So, what do you do, Marco?" },
            { speaker: "Marco", text: "I'm an engineer. I work at a software company." },
            { speaker: "Sofia", text: "That's great! I'm a teacher." },
            { speaker: "Marco", text: "Nice! What do you teach?" },
            { speaker: "Sofia", text: "I teach English to beginners." }
        ]),

        grammar(
            "A vs An with Professions",
            "Use 'a' before a consonant sound: 'a teacher', 'a doctor'. Use 'an' before a vowel sound: 'an engineer', 'an artist'. Never say 'I am teacher' — the article is required in English."
        ),

        list([

            "I'm a teacher.",

            "I'm a doctor.",

            "I'm an engineer.",

            "I'm a student.",

            "I work as a nurse."

        ]),

        tip(
            "Work As vs Work At",
            "'Work as' describes your role: 'I work as a waiter.' 'Work at/for' describes the place or company: 'I work at a restaurant.' / 'I work for Google.'"
        ),

        culture(
            "Small Talk about Jobs",
            "In many English-speaking cultures, asking 'What do you do?' at a party or event is completely normal small talk — it's not considered rude or too personal, unlike some other topics such as salary."
        ),

        quiz(
            "Which question asks about someone's job?",
            ["What do you do?", "How old are you?", "Where are you from?", "What's your name?"],
            0,
            "'What do you do?' is the natural way to ask about someone's occupation."
        ),

        quiz(
            "Which sentence is correct?",
            ["I am engineer.", "I am an engineer.", "I am a engineer.", "I engineer."],
            1,
            "'Engineer' starts with a vowel sound, so it needs 'an': 'I am an engineer.'"
        ),

        quiz(
            "'I work ___ a hospital' — which word is correct?",
            ["as", "for", "at", "in a"],
            2,
            "Use 'at' to describe the workplace: 'I work at a hospital.'"
        )

    ],

    summary: {

        tip:
            "Practice saying what you do (or want to do) using 'I'm a/an...' and 'I work as/at...'",

        review: [

            "What do you do? — I'm a/an...",

            "a + consonant sound, an + vowel sound",

            "work as (role) vs work at/for (place)",

            "teacher, doctor, engineer, nurse, student"

        ]

    }

};
