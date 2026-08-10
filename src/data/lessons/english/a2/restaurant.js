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

export const restaurantA2Lesson = {

    id: "english-a2-restaurant",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "restaurant",

    order: 9,

    title: "No Restaurante",

    subtitle:
        "Faça pedidos educados, peça uma refeição completa e lide com uma reserva de restaurante em inglês.",

    description:
        "Vá além do pedido básico e aprenda a fazer pedidos educados com 'could' e 'would', pedindo entrada, prato principal e sobremesa.",

    cover: "/covers/restaurant-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "restaurant",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Make polite requests with 'could' and 'would'",

        "Order a starter, a main course and a dessert",

        "Make a reservation and mention allergies",

        "Handle a complaint politely"

    ],

    vocabulary: vocabulary([
        "starter",
        "main course",
        "dessert",
        "side dish",
        "vegetarian",
        "allergic",
        "recommend",
        "complaint",
        "service charge",
        "reservation"
    ]),

    blocks: [

        heading("A Complete Meal"),

        paragraph(
            "In A1, you learned simple requests like 'I'd like...'. Now let's make more polite requests using 'could' and 'would', which sound more formal and are common when speaking to waiters."
        ),

        examples([
            {
                text: "Could I have the menu, please?",
                translation: "Eu poderia ver o cardápio, por favor?"
            },

            {
                text: "Would you recommend the fish as a main course?",
                translation: "Você recomendaria o peixe como prato principal?"
            },

            {
                text: "I'm allergic to nuts, so I'll have a vegetarian starter.",
                translation: "Sou alérgico a nozes, então vou querer uma entrada vegetariana."
            }
        ]),

        dialogue([
            { speaker: "Waiter", text: "Good evening! Do you have a reservation?" },
            { speaker: "Customer", text: "Yes, I made a reservation for two people." },
            { speaker: "Waiter", text: "Perfect. Would you like to start with a starter?" },
            { speaker: "Customer", text: "Could you recommend something? I'm allergic to shellfish." }
        ]),

        grammar(
            "Polite Requests with Could/Would",
            "Use 'Could I have...?' and 'Would you...?' for polite requests: 'Could I have the bill, please?' / 'Would you bring some water?' These sound more polite than 'Can I have...?' and are common in restaurants and formal situations."
        ),

        list([

            "Could I have...? / Would you recommend...?",

            "starter → main course → dessert",

            "I'm allergic to... / I'm vegetarian.",

            "make a reservation, service charge, complaint"

        ]),

        tip(
            "Could vs Can",
            "'Can I have...?' is common and friendly, but 'Could I have...?' is a bit more polite and formal — a good choice with waiters, hotel staff, or people you don't know well."
        ),

        culture(
            "Service Charge",
            "In some countries, restaurants automatically add a service charge to the bill instead of leaving tipping optional, so it's worth checking the bill before adding an extra tip."
        ),

        quiz(
            "Which sentence is a polite request?",
            ["Give me the menu.", "Could I have the menu, please?", "Menu now, please.", "I want the menu."],
            1,
            "'Could I have...?' is a polite way to make a request."
        ),

        quiz(
            "Which course comes first in a meal?",
            ["dessert", "main course", "starter", "service charge"],
            2,
            "The 'starter' is the first course of a meal, before the main course and dessert."
        ),

        quiz(
            "How do you say you cannot eat something for health reasons?",
            ["I'm vegetarian.", "I'm allergic to it.", "I recommend it.", "I made a reservation."],
            1,
            "'I'm allergic to...' explains you cannot eat something for health reasons."
        )

    ],

    summary: {

        tip:
            "Practice ordering a full meal out loud: a starter, a main course, and a dessert, using 'Could I have...?'",

        review: [

            "Could I have...? / Would you recommend...?",

            "starter, main course, dessert, side dish",

            "vegetarian, allergic, recommend",

            "make a reservation, service charge, complaint"

        ]

    }

};
