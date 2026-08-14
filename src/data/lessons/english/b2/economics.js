import { economicsBlocks } from "../../../grammar/shared/english/b2/economics";
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

export const economicsLesson = {

    id: "english-b2-economics",

    language: "english",

    level: "B2",

    category: "Daily Life",

    topic: "economics",

    order: 10,

    title: "Economics, Money & Consumer Behavior",

    subtitle:
        "Fale sobre hábitos de consumo e finanças pessoais em inglês usando frases de ênfase (cleft sentences) como 'What...' e 'It's... that...'.",

    description:
        "Aprenda vocabulário de finanças pessoais e comportamento do consumidor, e como usar cleft sentences para dar ênfase ao que realmente importa numa frase.",

    cover: "/covers/economics.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "economics",
        "emphasis",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss personal finance and consumer behavior",

        "Use 'What...' cleft sentences to emphasize the subject",

        "Use 'It's/It was... that...' to emphasize a specific part of a sentence",

        "Recognize emphasis structures in everyday spoken English"

    ],

    vocabulary: vocabulary([
        "disposable income",
        "budget",
        "impulse buying",
        "spending habits",
        "live within your means",
        "live beyond your means",
        "splurge",
        "frugal",
        "investment",
        "inflation",
        "purchasing power",
        "consumer trends",
        "brand loyalty",
        "bargain hunting",
        "subscription-based",
        "cut corners",
        "break even",
        "financial security",
        "rainy day fund",
        "worth every penny"
    ]),

    blocks: [

        heading("Emphasizing What Matters"),

        paragraph(
            "When we talk about money and priorities, we often want to emphasize one specific part of what we're saying. Cleft sentences — starting with 'What...' or 'It's/It was...' — do exactly that."
        ),

        examples([
            {
                text: "What really bothers me is impulse buying — I always regret it later.",
                translation: "O que realmente me incomoda é a compra por impulso — sempre me arrependo depois."
            },
            {
                text: "It's the little expenses that add up the most.",
                translation: "São os pequenos gastos que mais se acumulam."
            },
            {
                text: "What I really want is financial security, not more stuff.",
                translation: "O que eu realmente quero é segurança financeira, não mais coisas."
            },
            {
                text: "It was inflation that changed our spending habits, not choice.",
                translation: "Foi a inflação que mudou nossos hábitos de consumo, não escolha."
            },
            {
                text: "What surprised me most was how easy it is to live beyond your means.",
                translation: "O que mais me surpreendeu foi o quão fácil é viver acima das suas possibilidades."
            },
            {
                text: "It's brand loyalty, not price, that drives a lot of purchases.",
                translation: "É a lealdade à marca, não o preço, que impulsiona muitas compras."
            }
        ]),

        dialogue([
            { speaker: "Mia", text: "I've been trying to stick to a budget this month, but it's harder than I thought." },
            { speaker: "Owen", text: "What's the biggest problem for you?" },
            { speaker: "Mia", text: "Honestly, what really bothers me is impulse buying. I always regret it later." },
            { speaker: "Owen", text: "I get that. For me, it's the little expenses that add up the most — coffee, subscriptions, stuff like that." },
            { speaker: "Mia", text: "Exactly. It's brand loyalty, not price, that drives a lot of my purchases, if I'm honest." },
            { speaker: "Owen", text: "Same here. What I really want is financial security, not more stuff, but old habits are hard to break." },
            { speaker: "Mia", text: "Have you tried a rainy day fund? It's helped me stop living beyond my means." },
            { speaker: "Owen", text: "I should start one. What surprised me most was how easy it is to lose track of your spending habits." },
            { speaker: "Mia", text: "Totally. Small changes add up, though — that's what I keep telling myself." }
        ]),

        grammar(economicsBlocks[0].title, economicsBlocks[0].text),

        list([

            "What + clause + is/was ... — emphasizes the subject",

            "It's/It was ... that ... — emphasizes a specific part",

            "budget, disposable income, frugal, financial security",

            "live within/beyond your means"

        ]),

        tip(
            "Cleft Sentences Are Common in Speech Too",
            "Cleft sentences aren't just for formal writing — they're common in everyday spoken English too, especially to correct a misunderstanding or make a point stronger: 'It wasn't the price that bothered me, it was the quality.'"
        ),

        culture(
            "Talking About Money",
            "Discussing personal finances openly is more common in some English-speaking contexts than others — many younger English speakers now talk openly online about budgeting and 'money mindset', a shift from the more private attitude toward money in earlier generations."
        ),

        quiz(
            "Choose the correct cleft sentence emphasizing the subject.",
            [
                "It what bothers me is the price.",
                "What bothers me is the price.",
                "What bothers me the price.",
                "It's what bothers me the price."
            ],
            1,
            "'What bothers me is...' is the correct cleft structure to emphasize the subject."
        ),

        quiz(
            "Choose the correct cleft sentence.",
            [
                "It's the little expenses add up.",
                "It's the little expenses that add up.",
                "It the little expenses that add up.",
                "Is the little expenses that add up."
            ],
            1,
            "'It's... that...' is the correct structure: 'It's the little expenses that add up.'"
        ),

        quiz(
            "What does a cleft sentence do?",
            ["Makes a sentence shorter", "Emphasizes a specific part of the sentence", "Changes the tense", "Makes the sentence passive"],
            1,
            "Cleft sentences reorganize a sentence to emphasize one specific part of it."
        )

    ],

    summary: {

        tip:
            "Practice emphasizing your own spending priorities using 'What I really want is...' and 'It's... that...'.",

        review: [

            "What + clause + is/was — emphasis",

            "It's/It was ... that ... — emphasis",

            "budget, frugal, financial security, rainy day fund",

            "live within/beyond your means"

        ]

    }

};
