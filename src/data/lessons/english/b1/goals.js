import { goalsBlocks } from "../../../grammar/shared/english/b1/goals";
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

export const goalsLesson = {

    id: "english-b1-goals",

    language: "english",

    level: "B1",

    category: "Daily Life",

    topic: "goals",

    order: 2,

    title: "Plans, Goals & Ambitions",

    subtitle:
        "Fale sobre seus planos, metas e ambições em inglês usando 'going to', 'will' e o presente contínuo para o futuro.",

    description:
        "Aprenda a diferença entre 'going to', 'will' e o presente contínuo para falar sobre planos futuros, carreira e objetivos pessoais.",

    cover: "/covers/goals.webp",

    estimatedTime: 10,

    difficulty: 3,

    xp: 35,

    tags: [
        "goals",
        "future",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about future plans, goals and ambitions",

        "Choose correctly between 'going to', 'will' and the present continuous",

        "Describe career and education goals",

        "Discuss short-term and long-term ambitions"

    ],

    vocabulary: vocabulary([
        "ambition",
        "ambitious",
        "dream job",
        "aim",
        "determined",
        "motivated",
        "set a goal",
        "career path",
        "promotion",
        "further education",
        "intend",
        "intention",
        "resolution",
        "long-term",
        "short-term",
        "take a course",
        "apply for a job",
        "get promoted"
    ]),

    blocks: [

        heading("Talking About the Future"),

        paragraph(
            "English has more than one way to talk about the future, and the choice depends on how planned or certain something is: intentions and plans use 'going to', quick decisions and predictions use 'will', and fixed arrangements use the present continuous."
        ),

        examples([
            {
                text: "I'm going to apply for a new job — I've been planning it for months.",
                translation: "Vou me candidatar a um novo emprego — estou planejando isso há meses."
            },
            {
                text: "I don't know what I'll do after graduation yet, but I'll probably take a course.",
                translation: "Ainda não sei o que vou fazer depois da formatura, mas provavelmente vou fazer um curso."
            },
            {
                text: "We're meeting the career counselor on Monday at 10am.",
                translation: "Vamos nos encontrar com o orientador de carreira na segunda-feira às 10h."
            },
            {
                text: "I'm sure she'll achieve her goals — she's so determined.",
                translation: "Tenho certeza de que ela vai alcançar as metas dela — ela é tão determinada."
            },
            {
                text: "In five years, I'm going to have my own business.",
                translation: "Daqui a cinco anos, vou ter meu próprio negócio."
            },
            {
                text: "I'll help you prepare for the interview, don't worry.",
                translation: "Vou te ajudar a se preparar para a entrevista, não se preocupe."
            }
        ]),

        dialogue([
            { speaker: "Emma", text: "So, what are your plans after you graduate?" },
            { speaker: "Noah", text: "I'm going to take a gap year and travel a bit before I look for a job." },
            { speaker: "Emma", text: "That sounds amazing! Do you have an itinerary yet?" },
            { speaker: "Noah", text: "Not really — I'll probably decide as I go. What about you?" },
            { speaker: "Emma", text: "I already applied for a few jobs. I'm having an interview next Tuesday." },
            { speaker: "Noah", text: "That's great! I'm sure you'll get it — you're really ambitious." },
            { speaker: "Emma", text: "Thanks! I'm determined to find my dream job this year." },
            { speaker: "Noah", text: "Well, if you need help preparing, I'll be there." }
        ]),

        grammar(goalsBlocks[0].title, goalsBlocks[0].text),

        list([

            "going to + verb — plans and intentions",

            "will + verb — decisions, offers and predictions",

            "present continuous — fixed arrangements",

            "ambition, motivated, determined, set a goal"

        ]),

        tip(
            "Going To vs Will",
            "Don't use 'will' for something you already decided. 'I will go to Paris next year' sounds like a decision made right now. If you planned it already, say 'I'm going to go to Paris next year.'"
        ),

        culture(
            "Career Talk in English-Speaking Workplaces",
            "In many English-speaking workplaces, it's common to talk openly about career goals and ambitions, even with new colleagues. A question like 'What's your five-year plan?' is typical small talk in professional settings."
        ),

        quiz(
            "Which sentence shows a fixed arrangement?",
            [
                "I'll call you later.",
                "I'm meeting my manager at 3pm.",
                "I'm going to look for a new job.",
                "I think I'll take a break."
            ],
            1,
            "The present continuous is used for planned events with a specific time: 'I'm meeting my manager at 3pm.'"
        ),

        quiz(
            "Choose the correct form: \"I ___ help you move this weekend.\" (a decision made right now)",
            ["am going to", "will", "am meeting", "am"],
            1,
            "'Will' is used for decisions made at the moment of speaking, like offering help."
        ),

        quiz(
            "Which sentence expresses a plan you already decided on?",
            [
                "I'll probably visit her.",
                "I'm going to visit her next month — I already bought the ticket.",
                "I visit her sometimes.",
                "I visited her last year."
            ],
            1,
            "'Going to' is used for plans and intentions decided before the moment of speaking."
        )

    ],

    summary: {

        tip:
            "Practice describing your own goals with 'I'm going to...' for plans, 'I'll...' for quick decisions, and the present continuous for anything already scheduled.",

        review: [

            "going to — plans and intentions",

            "will — decisions, offers, predictions",

            "present continuous — fixed arrangements",

            "ambition, dream job, determined, career path"

        ]

    }

};
