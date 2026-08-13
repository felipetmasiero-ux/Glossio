import { experiencesBlocks } from "../../../grammar/shared/english/b1/experiences";
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

export const experiencesLesson = {

    id: "english-b1-experiences",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "experiences",

    order: 1,

    title: "Experiences & Life Events",

    subtitle:
        "Fale sobre experiências e marcos da sua vida usando present perfect e past simple, com 'ever', 'never', 'already', 'yet' e 'just' em inglês.",

    description:
        "Aprenda a diferença entre present perfect e past simple para falar sobre experiências de vida, e como usar 'ever', 'never', 'already', 'yet' e 'just' naturalmente.",

    cover: "/covers/experiences.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 40,

    tags: [
        "experiences",
        "grammar",
        "present-perfect"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about life experiences and memorable events",

        "Use the present perfect vs the past simple correctly",

        "Use 'ever', 'never', 'already', 'yet' and 'just'",

        "Ask someone about their life experiences"

    ],

    vocabulary: vocabulary([
        "memorable",
        "unforgettable",
        "childhood",
        "turning point",
        "graduate",
        "graduation",
        "get married",
        "move overseas",
        "backpacking",
        "look back on",
        "regret",
        "life-changing",
        "journey",
        "breakthrough",
        "just",
        "achieve",
        "settle down",
        "make a decision"
    ]),

    blocks: [

        heading("Talking About Experiences"),

        paragraph(
            "When we talk about life experiences, we usually choose between the present perfect and the past simple depending on whether the exact time matters. The present perfect connects the past to now; the past simple is about a finished moment."
        ),

        examples([
            {
                text: "I've visited London twice, but I've never stayed there for more than a few days.",
                translation: "Já visitei Londres duas vezes, mas nunca fiquei lá por mais de alguns dias."
            },
            {
                text: "She graduated from university last year, and she's already found a great job.",
                translation: "Ela se formou na faculdade no ano passado, e já conseguiu um ótimo emprego."
            },
            {
                text: "Have you ever lived in another country?",
                translation: "Você já morou em outro país?"
            },
            {
                text: "We just got back from our trip to Portugal, so everything is still fresh in my memory.",
                translation: "Acabamos de voltar da nossa viagem a Portugal, então está tudo ainda fresco na memória."
            },
            {
                text: "He hasn't called me back yet, and it's been three days.",
                translation: "Ele ainda não me ligou de volta, e já faz três dias."
            },
            {
                text: "That trip to Thailand was such a turning point in my life — I decided to change careers right after.",
                translation: "Aquela viagem à Tailândia foi um verdadeiro ponto de virada na minha vida — decidi mudar de carreira logo depois."
            }
        ]),

        dialogue([
            { speaker: "Sofia", text: "Hey, I haven't seen you in ages! What have you been up to?" },
            { speaker: "Lucas", text: "A lot, actually! I just got back from backpacking around Southeast Asia." },
            { speaker: "Sofia", text: "Wow, that's amazing! Have you ever traveled alone before?" },
            { speaker: "Lucas", text: "No, this was my first time. It was a real turning point — I feel so much more confident now." },
            { speaker: "Sofia", text: "That's great. Did you visit Thailand?" },
            { speaker: "Lucas", text: "Yes, twice! I've never seen beaches like that in my life." },
            { speaker: "Sofia", text: "I'm a little jealous. I haven't traveled much this year — I've just been really busy with work." },
            { speaker: "Lucas", text: "You should take some time off. Life's too short not to have a few unforgettable experiences!" }
        ]),

        grammar(experiencesBlocks[0].title, experiencesBlocks[0].text),

        list([

            "Present perfect: have/has + past participle",

            "ever / never — talk about general experience",

            "already / yet — done sooner than expected / not done",

            "just — happened a very short time ago",

            "Past simple — a specific, finished time"

        ]),

        tip(
            "Don't Mix Present Perfect With a Specific Time",
            "Don't say 'I have visited Paris in 2019.' If you give a specific finished time ('in 2019', 'last year', 'yesterday'), use the past simple: 'I visited Paris in 2019.'"
        ),

        culture(
            "Small Talk About Experiences",
            "In English-speaking cultures, asking 'Have you ever...?' is a common way to start a conversation or get to know someone at a party or a networking event. Sharing personal experiences, even with people you've just met, is completely normal small talk."
        ),

        quiz(
            "Which sentence correctly uses the present perfect?",
            [
                "I have visited Paris in 2019.",
                "I have visited Paris.",
                "I have visit Paris.",
                "I visited Paris since 2019."
            ],
            1,
            "The present perfect doesn't take a specific past time like 'in 2019' — for that, use the past simple: 'I visited Paris in 2019.'"
        ),

        quiz(
            "Choose the correct word: \"She ___ finished her homework, so she can go out now.\"",
            ["yet", "already", "ever", "since"],
            1,
            "'Already' shows that something was done sooner than expected, used in affirmative sentences."
        ),

        quiz(
            "Choose the correct word: \"Have you ___ tried Thai food?\"",
            ["already", "just", "ever", "yet"],
            2,
            "'Ever' is used in questions to ask about experience at any point up to now."
        )

    ],

    summary: {

        tip:
            "Practice talking about your own life using 'I've never...', 'I've already...' and 'I just...', then switch to the past simple when you give a specific time.",

        review: [

            "Present perfect: have/has + past participle",

            "ever / never / already / yet / just",

            "Past simple for a specific finished time",

            "turning point, graduation, backpacking, unforgettable"

        ]

    }

};
