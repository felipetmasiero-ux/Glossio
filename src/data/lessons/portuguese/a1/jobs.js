import { jobsBlocks } from "../../../grammar/shared/portuguese/jobs";
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

export const jobsLesson = {

    id: "portuguese-a1-jobs",

    language: "portuguese",

    level: "A1",

    category: "Basics",

    topic: "jobs",

    order: 8,

    title: "Jobs",

    subtitle:
        "Talk about occupations and what people do for a living.",

    description:
        "Learn common job titles in Portuguese and how to ask and answer 'O que você faz?'",

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

        "Ask 'O que você faz?'",

        "Say what you do for a living",

        "Use masculine and feminine job titles"

    ],

    vocabulary: vocabulary([
        "professor",
        "médico",
        "engenheiro",
        "enfermeiro",
        "gerente",
        "estudante",
        "policial",
        "o que você faz",
        "eu trabalho como"
    ]),

    blocks: [

        heading("Talking about Work"),

        paragraph(
            "In Portuguese, asking about someone's job is a common way to start a conversation. A natural question is 'O que você faz?' — literally 'What do you do?'"
        ),

        examples([
            {
                text: "O que você faz? — Eu sou professor.",
                translation: "What do you do? — I'm a teacher."
            },

            {
                text: "Ela trabalha como enfermeira no hospital.",
                translation: "She works as a nurse at the hospital."
            },

            {
                text: "Eu sou estudante. Eu estudo engenharia.",
                translation: "I'm a student. I study engineering."
            }
        ]),

        dialogue([
            { speaker: "Sofia", text: "Então, o que você faz, Marco?" },
            { speaker: "Marco", text: "Eu sou engenheiro. Eu trabalho em uma empresa de software." },
            { speaker: "Sofia", text: "Que legal! Eu sou professora." },
            { speaker: "Marco", text: "Ótimo! O que você ensina?" },
            { speaker: "Sofia", text: "Eu ensino português para iniciantes." }
        ]),

        grammar(jobsBlocks[0].title, jobsBlocks[0].text),

        list([

            "Eu sou professor / professora.",

            "Eu sou médico / médica.",

            "Eu sou engenheiro / engenheira.",

            "Eu sou estudante.",

            "Eu trabalho como enfermeiro / enfermeira."

        ]),

        tip(
            "Trabalhar Como vs Trabalhar Em",
            "'Trabalhar como' describes your role: 'Eu trabalho como garçom.' 'Trabalhar em/para' describes the company: 'Eu trabalho em um restaurante.' / 'Eu trabalho para a Google.'"
        ),

        culture(
            "Small Talk about Jobs",
            "In Brazil, asking 'O que você faz?' at a party or event is common small talk, though topics like salary usually remain more private."
        ),

        quiz(
            "Which question asks about someone's job?",
            ["O que você faz?", "Quantos anos você tem?", "De onde você é?", "Qual é o seu nome?"],
            0,
            "'O que você faz?' is the natural way to ask about someone's occupation."
        ),

        quiz(
            "Which sentence is correct for a woman?",
            ["Eu sou enfermeiro.", "Eu sou enfermeira.", "Eu sou um enfermeiro.", "Eu enfermeira."],
            1,
            "The feminine form of 'enfermeiro' is 'enfermeira'."
        ),

        quiz(
            "Which job title does not change between masculine and feminine?",
            ["Professor", "Enfermeiro", "Estudante", "Engenheiro"],
            2,
            "'Estudante' stays the same for both genders."
        )

    ],

    summary: {

        tip:
            "Practice saying what you do (or want to do) using 'Eu sou...' and 'Eu trabalho como...'",

        review: [

            "O que você faz? — Eu sou...",

            "Most job titles change with gender: professor/professora",

            "Estudante and gerente stay the same for both genders",

            "professor, médico, engenheiro, enfermeiro, estudante"

        ]

    }

};
