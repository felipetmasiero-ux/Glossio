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

export const shoppingLesson = {

    id: "english-a2-shopping",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "shopping",

    order: 2,

    title: "Shopping",

    subtitle:
        "Shop for clothes, compare prices, and handle a store checkout in English.",

    description:
        "Learn shopping vocabulary and how to compare prices and sizes using comparative adjectives.",

    cover: "/covers/shopping.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "shopping",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Use shopping vocabulary in a store",

        "Compare prices and sizes with comparative adjectives",

        "Ask to try on clothes and ask about sizes",

        "Understand receipts, discounts and refunds"

    ],

    vocabulary: vocabulary([
        "cashier",
        "receipt",
        "price",
        "expensive",
        "cheap",
        "discount",
        "try on",
        "fitting room",
        "size",
        "refund"
    ]),

    blocks: [

        heading("Let's Go Shopping"),

        paragraph(
            "Shopping is a great topic to practice comparing things in English. When you compare two items, you often use comparative adjectives, like 'cheaper' or 'more expensive'."
        ),

        examples([
            {
                text: "This jacket is cheaper than that one.",
                translation: "Esta jaqueta é mais barata que aquela."
            },

            {
                text: "Can I try on a bigger size?",
                translation: "Posso experimentar um tamanho maior?"
            },

            {
                text: "The red shoes are more expensive than the black ones.",
                translation: "Os sapatos vermelhos são mais caros que os pretos."
            }
        ]),

        dialogue([
            { speaker: "Customer", text: "Excuse me, is this discount still valid?" },
            { speaker: "Cashier", text: "Yes, it is. Would you like to try it on first?" },
            { speaker: "Customer", text: "Yes, please. Where's the fitting room?" },
            { speaker: "Cashier", text: "It's right over there. Here's your receipt if you need a refund later." }
        ]),

        grammar(
            "Comparative Adjectives",
            "For short adjectives, add '-er': cheap → cheaper, big → bigger. For long adjectives, use 'more' before the adjective: expensive → more expensive. Use 'than' to compare two things: 'This is cheaper than that.'"
        ),

        list([

            "cheap → cheaper / expensive → more expensive",

            "Can I try on...? / Where's the fitting room?",

            "cashier, receipt, price, discount, refund",

            "This one is bigger/smaller/better than that one."

        ]),

        tip(
            "Short vs Long Adjectives",
            "A simple rule: one-syllable adjectives usually take '-er' (cheap → cheaper), while adjectives with two or more syllables usually take 'more' (expensive → more expensive). There are exceptions, like 'good' → 'better'."
        ),

        culture(
            "Bargaining and Fixed Prices",
            "In many English-speaking countries, prices in shops are fixed and bargaining isn't expected, unlike at markets or flea markets, where negotiating the price can be completely normal."
        ),

        quiz(
            "Which sentence correctly compares two items?",
            ["This is more cheap than that.", "This is cheaper than that.", "This is cheap than that.", "This is cheaper that that."],
            1,
            "Short adjectives take '-er': 'This is cheaper than that.'"
        ),

        quiz(
            "How do you form the comparative of 'expensive'?",
            ["expensiver", "more expensive", "expensive-er", "most expensive"],
            1,
            "Long adjectives use 'more' before the adjective: 'more expensive'."
        ),

        quiz(
            "What do you ask when you want to test if clothes fit?",
            ["Can I try on this shirt?", "Can I refund this shirt?", "Can I discount this shirt?", "Can I cash this shirt?"],
            0,
            "'Can I try on...?' is used to ask to test clothes before buying."
        )

    ],

    summary: {

        tip:
            "Practice comparing two products you own using comparative adjectives, like 'My phone is newer than my sister's.'",

        review: [

            "cashier, receipt, price, discount, refund",

            "cheap → cheaper, expensive → more expensive",

            "Can I try on...? / Where's the fitting room?",

            "This one is bigger/cheaper/better than that one."

        ]

    }

};
