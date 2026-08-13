import { healthLifestyleBlocks } from "../../../grammar/shared/english/b1/healthLifestyle";
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

export const healthLifestyleLesson = {

    id: "english-b1-health-lifestyle",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "health-lifestyle",

    order: 6,

    title: "Health & Lifestyle",

    subtitle:
        "Dê conselhos sobre saúde e estilo de vida em inglês usando 'should', 'ought to' e 'had better'.",

    description:
        "Aprenda vocabulário de saúde e estilo de vida, e a diferença entre 'should', 'ought to' e o mais forte 'had better' para dar conselhos.",

    cover: "/covers/health-lifestyle.webp",

    estimatedTime: 10,

    difficulty: 3,

    xp: 35,

    tags: [
        "health",
        "advice",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about lifestyle habits and well-being",

        "Give advice using 'should' and 'ought to'",

        "Give a stronger warning using 'had better'",

        "Discuss stress, sleep and healthy habits"

    ],

    vocabulary: vocabulary([
        "lifestyle",
        "balanced diet",
        "junk food",
        "work out",
        "stay fit",
        "stress",
        "stressed out",
        "burnout",
        "sleep deprived",
        "cut down on",
        "give up",
        "quit smoking",
        "get enough sleep",
        "mental health",
        "well-being",
        "in shape",
        "out of shape",
        "take a break"
    ]),

    blocks: [

        heading("Giving Advice About Health"),

        paragraph(
            "'Should' and 'ought to' are the everyday way to give advice, but when there's a real risk or consequence, English speakers often switch to the stronger 'had better' (usually shortened to 'you'd better')."
        ),

        examples([
            {
                text: "You should try to work out at least three times a week.",
                translation: "Você deveria tentar malhar pelo menos três vezes por semana."
            },
            {
                text: "You ought to cut down on junk food if you want more energy.",
                translation: "Você deveria reduzir a comida industrializada se quiser mais energia."
            },
            {
                text: "You'd better get enough sleep tonight, or you'll be exhausted tomorrow.",
                translation: "É melhor você dormir o suficiente hoje à noite, ou vai ficar exausto amanhã."
            },
            {
                text: "You'd better not skip breakfast again — you always feel dizzy afterward.",
                translation: "É melhor você não pular o café da manhã de novo — você sempre fica tonto depois."
            },
            {
                text: "I think you should talk to a doctor about your stress levels.",
                translation: "Acho que você deveria conversar com um médico sobre seus níveis de estresse."
            },
            {
                text: "We ought to take a break — we've been working for hours without stopping.",
                translation: "Deveríamos fazer uma pausa — estamos trabalhando há horas sem parar."
            }
        ]),

        dialogue([
            { speaker: "Chloe", text: "You look really tired lately. Are you okay?" },
            { speaker: "Ryan", text: "Honestly, I've been feeling burned out. I haven't been sleeping well." },
            { speaker: "Chloe", text: "You should really try to get enough sleep — it makes such a difference." },
            { speaker: "Ryan", text: "I know, I know. I just have such a busy lifestyle right now." },
            { speaker: "Chloe", text: "Well, you'd better slow down, or you'll end up sick. Maybe you should also cut down on coffee." },
            { speaker: "Ryan", text: "You're probably right. I ought to start working out again too." },
            { speaker: "Chloe", text: "That's a great idea. Even a short walk can help with stress." },
            { speaker: "Ryan", text: "Thanks, Chloe. I'd better start taking better care of myself." }
        ]),

        grammar(healthLifestyleBlocks[0].title, healthLifestyleBlocks[0].text),

        list([

            "should / ought to — general advice",

            "had better (you'd better) — strong advice + warning",

            "had better not — negative warning",

            "burnout, stressed out, well-being, work out"

        ]),

        tip(
            "Had Better Takes the Base Verb",
            "'Had better' is followed by the base verb, not 'to': say 'You'd better go', not 'You'd better to go.' Save 'had better' for situations with a real consequence — for everyday advice, 'should' sounds more natural."
        ),

        culture(
            "Talking About Mental Health",
            "In recent years, English-speaking cultures have become much more open about discussing stress, burnout and mental health at work and among friends. A phrase like 'I've been feeling burned out' is common and not seen as oversharing."
        ),

        quiz(
            "Choose the correct form: \"You ___ get more sleep.\" (general advice)",
            ["had better to", "should", "must to", "ought"],
            1,
            "'Should' is the most common way to give general advice."
        ),

        quiz(
            "Choose the correct sentence with 'had better'.",
            [
                "You'd better to rest.",
                "You'd better rest.",
                "You had better resting.",
                "You better to rest."
            ],
            1,
            "'Had better' is followed by the base verb with no 'to': 'You'd better rest.'"
        ),

        quiz(
            "Which sentence is a stronger warning?",
            [
                "You should rest more.",
                "You ought to rest more.",
                "You'd better rest, or you'll get sick.",
                "You could rest more."
            ],
            2,
            "'Had better' warns about a negative consequence if the advice isn't followed, making it stronger than 'should' or 'ought to'."
        )

    ],

    summary: {

        tip:
            "Practice giving advice to a friend about their habits — start with 'should' for gentle advice, then try 'you'd better' when there's a real consequence.",

        review: [

            "should / ought to — general advice",

            "had better — strong advice with a warning",

            "burnout, stressed out, well-being",

            "cut down on, work out, get enough sleep"

        ]

    }

};
