import { personalDevelopmentBlocks } from "../../../grammar/shared/english/b2/personalDevelopment";
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

    id: "english-b2-personal-development",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "personal-development",

    order: 1,

    title: "Personal Development & Life Choices",

    subtitle:
        "Fale sobre desenvolvimento pessoal e decisões de vida em inglês usando present perfect continuous e past perfect com precisão.",

    description:
        "Aprenda a diferença entre present perfect continuous e past perfect para falar sobre mudanças, arrependimentos e desenvolvimento pessoal com mais nuance.",

    cover: "/covers/personal-development.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "personal-development",
        "grammar",
        "perfect-tenses"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss personal development, priorities and life decisions",

        "Use the present perfect continuous to emphasize duration",

        "Use the past perfect to sequence past events precisely",

        "Reflect on past experiences and regrets with more nuance"

    ],

    vocabulary: vocabulary([
        "self-awareness",
        "fulfillment",
        "priorities",
        "reassess",
        "come to terms with",
        "step out of your comfort zone",
        "hindsight",
        "in hindsight",
        "take stock of",
        "life-altering",
        "soul-searching",
        "drift apart",
        "reinvent yourself",
        "worthwhile",
        "second-guess",
        "no regrets",
        "pivotal",
        "self-improvement",
        "burn bridges",
        "in the grand scheme of things"
    ]),

    blocks: [

        heading("Reflecting on Change"),

        paragraph(
            "When we reflect on personal growth, we often combine two structures: the present perfect continuous, to show how long something has been happening, and the past perfect, to make the order of past events completely clear."
        ),

        examples([
            {
                text: "I've been thinking about a career change for months, but I still haven't made a decision.",
                translation: "Tenho pensado em mudar de carreira há meses, mas ainda não tomei uma decisão."
            },
            {
                text: "By the time I turned thirty, I had already changed jobs twice and moved to another city.",
                translation: "Quando fiz trinta anos, eu já tinha trocado de emprego duas vezes e me mudado de cidade."
            },
            {
                text: "She'd been saving for years before she finally quit her job to travel.",
                translation: "Ela vinha economizando havia anos antes de finalmente largar o emprego para viajar."
            },
            {
                text: "In hindsight, I wish I'd taken that opportunity when I had the chance.",
                translation: "Em retrospectiva, eu queria ter aproveitado aquela oportunidade quando tive a chance."
            },
            {
                text: "We'd been drifting apart for a while before we finally talked about it.",
                translation: "A gente vinha se afastando havia um tempo antes de finalmente conversar sobre isso."
            },
            {
                text: "I've been reassessing my priorities ever since that pivotal conversation with my mentor.",
                translation: "Tenho reavaliado minhas prioridades desde aquela conversa decisiva com meu mentor."
            }
        ]),

        dialogue([
            { speaker: "Naomi", text: "You seem really thoughtful today. Everything okay?" },
            { speaker: "Theo", text: "Yeah, I've just been doing a lot of soul-searching lately, actually." },
            { speaker: "Naomi", text: "Oh? What's brought that on?" },
            { speaker: "Theo", text: "Honestly, I've been thinking about a career change for months. I keep second-guessing myself, though." },
            { speaker: "Naomi", text: "That's completely normal. What's holding you back?" },
            { speaker: "Theo", text: "I guess I'm scared of burning bridges at my current job. But in hindsight, I've stayed way longer than I should have." },
            { speaker: "Naomi", text: "Well, take stock of what actually matters to you. In the grand scheme of things, a bit of short-term discomfort is worth it if it leads somewhere better." },
            { speaker: "Theo", text: "You're right. By the time I turn forty, I don't want to still be wondering 'what if.'" },
            { speaker: "Naomi", text: "Exactly. No regrets, right?" },
            { speaker: "Theo", text: "No regrets." }
        ]),

        grammar(personalDevelopmentBlocks[0].title, personalDevelopmentBlocks[0].text),

        list([

            "have/has been + verb-ing — duration, relevant now",

            "had + past participle — before another point in the past",

            "had been + verb-ing — a duration before another past point",

            "in hindsight, pivotal, reassess, soul-searching",

            "step out of your comfort zone, no regrets"

        ]),

        tip(
            "Present Perfect Continuous vs Present Perfect Simple",
            "Use the continuous to emphasize the activity or its duration: 'I've been writing all morning' (the process matters). Use the simple form to emphasize the result or a completed quantity: 'I've written three chapters' (the outcome matters). Both connect the past to now, but they highlight different things."
        ),

        culture(
            "Career Changes Later in Life",
            "In many English-speaking countries, changing careers in your thirties, forties or even later is increasingly common and no longer seen as a sign of instability — it's often described admiringly as 'reinventing yourself.'"
        ),

        quiz(
            "Choose the sentence that emphasizes duration.",
            ["I've read that book.", "I've been reading that book all week.", "I read that book.", "I had read that book."],
            1,
            "The present perfect continuous emphasizes the ongoing duration of an activity."
        ),

        quiz(
            "Choose the correct sentence using the past perfect.",
            [
                "By the time I arrived, the meeting already started.",
                "By the time I arrived, the meeting had already started.",
                "By the time I arrived, the meeting has already started.",
                "By the time I arrived, the meeting was already starting."
            ],
            1,
            "The past perfect ('had started') shows the meeting started before another past moment (my arrival)."
        ),

        quiz(
            "\"I ___ about this decision for weeks before I finally made up my mind.\" Choose the best form.",
            ["thought", "have thought", "had been thinking", "think"],
            2,
            "The past perfect continuous shows a duration before another past event ('finally made up my mind')."
        )

    ],

    summary: {

        tip:
            "Practice describing your own personal growth: use the present perfect continuous for ongoing changes, and the past perfect to clarify what happened before what.",

        review: [

            "present perfect continuous — duration, relevant now",

            "past perfect — before another point in the past",

            "in hindsight, pivotal, reassess, soul-searching",

            "reinvent yourself, no regrets, worthwhile"

        ]

    }

};
