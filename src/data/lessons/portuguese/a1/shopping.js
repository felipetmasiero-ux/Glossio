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

export const shoppingLesson = {

    id: "portuguese-a1-shopping",

    language: "portuguese",

    level: "A1",

    category: "Daily Life",

    topic: "shopping",

    order: 11,

    title: "Shopping",

    subtitle:
        "Ask about prices and shop with confidence.",

    description:
        "Learn how to ask for things, ask about prices and pay in a store using common Portuguese shopping expressions.",

    cover: "/covers/shopping.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 30,

    tags: [
        "shopping",
        "vocabulary",
        "daily life"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Ask how much something costs",

        "Say if something is expensive or cheap",

        "Ask to try something on",

        "Pay in cash or by card"

    ],

    vocabulary: vocabulary([
        "quanto custa",
        "caro",
        "barato",
        "preço",
        "pagar",
        "em dinheiro",
        "no cartão",
        "loja",
        "caixa",
        "experimentar"
    ]),

    blocks: [

        heading("At the Store"),

        paragraph(
            "Shopping in Portuguese requires a few key questions and expressions: asking for something politely, checking the price, and choosing how to pay. 'Eu gostaria...' is the most polite way to ask for something in a shop."
        ),

        examples([
            {
                text: "Eu gostaria de experimentar essa jaqueta, por favor.",
                translation: "I would like to try on this jacket, please."
            },

            {
                text: "Quanto custa? — O preço é vinte reais.",
                translation: "How much does it cost? — The price is twenty reais."
            },

            {
                text: "Está muito caro! Vocês têm algo mais barato?",
                translation: "It's too expensive! Do you have something cheaper?"
            }
        ]),

        dialogue([
            { speaker: "Cliente", text: "Com licença, onde fica o caixa?" },
            { speaker: "Vendedor", text: "É logo ali, ao lado da porta." },
            { speaker: "Cliente", text: "Obrigado. Quanto custa esse suéter?" },
            { speaker: "Vendedor", text: "Trinta reais. Você vai pagar em dinheiro ou no cartão?" },
            { speaker: "Cliente", text: "No cartão, por favor." }
        ]),

        grammar(
            "Muito + Adjetivo",
            "Use 'muito' before an adjective to say something is 'too much': 'Está muito caro.' (It's too expensive.) To ask for a cheaper option, say 'Vocês têm algo mais barato?'"
        ),

        list([

            "Quanto custa?",

            "Está caro / Está barato.",

            "Eu gostaria de experimentar...",

            "Em dinheiro ou no cartão?",

            "Onde fica o caixa?"

        ]),

        tip(
            "Polite Requests",
            "Starting a request with 'Eu gostaria...' instead of 'Eu quero...' sounds much more polite in Portuguese, similar to using 'I would like' instead of 'I want' in English."
        ),

        culture(
            "Shopping Hours",
            "In Brazil, most shopping malls stay open late, including on Sundays, while smaller neighborhood shops often close for lunch and earlier in the evening."
        ),

        quiz(
            "How do you ask the price of something?",
            ["Quanto custa?", "Onde fica o caixa?", "Eu gostaria de experimentar", "Está caro"],
            0,
            "'Quanto custa?' is the standard way to ask about a price."
        ),

        quiz(
            "Which word means 'expensive'?",
            ["Barato", "Caro", "Pagar", "Experimentar"],
            1,
            "'Caro' means 'expensive' in Portuguese."
        ),

        quiz(
            "Which sentence politely asks to try something on?",
            ["Eu quero isso.", "Eu gostaria de experimentar isso, por favor.", "Quanto custa?", "Está muito caro."],
            1,
            "'Eu gostaria de experimentar...' is the polite way to ask to try something on."
        )

    ],

    summary: {

        tip:
            "Practice a short shopping conversation out loud: ask the price, say if it's expensive, and choose how to pay.",

        review: [

            "Quanto custa? — O preço é...",

            "caro vs barato",

            "Eu gostaria de experimentar...",

            "em dinheiro vs no cartão"

        ]

    }

};
