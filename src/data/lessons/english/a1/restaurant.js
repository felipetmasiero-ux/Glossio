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

export const restaurantLesson = {

    id: "english-a1-restaurant",

    language: "english",

    level: "A1",

    category: "Daily Life",

    topic: "restaurant",

    order: 11,

    title: "No Restaurante",

    subtitle:
        "Peça comida educadamente e peça a conta em inglês.",

    description:
        "Aprenda as frases essenciais para pedir comida, tirar dúvidas sobre o cardápio e pagar a conta em um restaurante.",

    cover: "/covers/restaurant.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "restaurant",
        "vocabulary",
        "daily life"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Ask for a table",

        "Order food and drinks politely",

        "Ask questions about the menu",

        "Ask for the bill"

    ],

    vocabulary: vocabulary([
        "menu",
        "table",
        "waiter",
        "order",
        "Can I have...?",
        "I'd like...",
        "The bill, please.",
        "reservation",
        "tip"
    ]),

    blocks: [

        heading("Ordering Food"),

        paragraph(
            "Ordering at a restaurant in English is easier if you know a few polite phrases. Instead of just naming the food, English speakers usually soften requests with expressions like 'Can I have...?' or 'I'd like...'"
        ),

        examples([
            {
                text: "Can I have a table for two, please?",
                translation: "Posso ter uma mesa para dois, por favor?"
            },

            {
                text: "I'd like the chicken with rice, please.",
                translation: "Eu gostaria do frango com arroz, por favor."
            },

            {
                text: "Could I see the menu, please?",
                translation: "Eu poderia ver o cardápio, por favor?"
            }
        ]),

        dialogue([
            { speaker: "Waiter", text: "Good evening! Do you have a reservation?" },
            { speaker: "Marco", text: "Yes, a table for two under 'Marco'." },
            { speaker: "Waiter", text: "Perfect, right this way. Here's the menu." },
            { speaker: "Marco", text: "Thank you. Could I have a few minutes?" },
            { speaker: "Waiter", text: "Of course, take your time." },
            { speaker: "Marco", text: "We're ready. I'd like the fish, and my friend would like the chicken." },
            { speaker: "Waiter", text: "Great choice! Anything to drink?" },
            { speaker: "Marco", text: "Just water, please. And the bill at the end, thank you." }
        ]),

        grammar(
            "Polite Requests",
            "Use 'Can I have...?', 'Could I have...?' or 'I'd like...' to order politely. 'Could' sounds slightly more formal than 'can', but both are perfectly polite. Avoid simply saying 'Give me...', which can sound rude in English."
        ),

        list([

            "Can I have a table for two?",

            "Could I see the menu, please?",

            "I'd like the..., please.",

            "Can I have the bill, please?"

        ]),

        tip(
            "Bill vs Check",
            "'The bill' is used in British English, and 'the check' is used in American English — both mean the same thing when you want to pay."
        ),

        culture(
            "Tipping Customs",
            "In the United States, tipping around 15-20% of the bill is expected at restaurants. In the United Kingdom and many other English-speaking countries, tipping is appreciated but smaller or sometimes already included as a 'service charge'."
        ),

        quiz(
            "Which phrase is the most polite way to order?",
            ["Give me the chicken.", "I'd like the chicken, please.", "Chicken, now.", "I want chicken."],
            1,
            "'I'd like..., please.' is a polite, natural way to order food."
        ),

        quiz(
            "What do you say when you want to pay?",
            ["The menu, please.", "The table, please.", "The bill, please.", "The order, please."],
            2,
            "'The bill, please.' is used to ask for the check at the end of the meal."
        ),

        quiz(
            "In the US, what tipping percentage is typically expected?",
            ["0%", "5%", "50%", "15-20%"],
            3,
            "In the United States, a tip of about 15-20% of the bill is standard at restaurants."
        )

    ],

    summary: {

        tip:
            "Practice the full restaurant dialogue out loud — from asking for a table to asking for the bill.",

        review: [

            "Can I have a table for two?",

            "I'd like..., please.",

            "Could I see the menu?",

            "The bill, please.",

            "Tipping: ~15-20% in the US"

        ]

    }

};
