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

export const foodLesson = {

    id: "portuguese-a1-food",

    language: "portuguese",

    level: "A1",

    category: "Daily Life",

    topic: "food",

    order: 6,

    title: "Food",

    subtitle:
        "Talk about meals, drinks and food preferences.",

    description:
        "Learn common food and drink vocabulary and how to talk about what you like, want and eat every day.",

    cover: "/covers/food.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 30,

    tags: [
        "food",
        "vocabulary",
        "daily life"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Name common foods and drinks",

        "Say what you like and don't like",

        "Use 'algum/alguma' and 'nenhum/nenhuma' correctly",

        "Talk about meals of the day"

    ],

    vocabulary: vocabulary([
        "pão",
        "arroz",
        "frango",
        "peixe",
        "legumes",
        "frutas",
        "água",
        "café",
        "estou com fome",
        "estou com sede"
    ]),

    blocks: [

        heading("Everyday Food"),

        paragraph(
            "Food is one of the most useful topics for beginners, since you'll use it every day — ordering, shopping and talking about your preferences."
        ),

        examples([
            {
                text: "Eu gosto de arroz e frango.",
                translation: "I like rice and chicken."
            },

            {
                text: "Você quer um pouco de café?",
                translation: "Do you want some coffee?"
            },

            {
                text: "Eu não como peixe, mas eu adoro legumes.",
                translation: "I don't eat fish, but I love vegetables."
            }
        ]),

        dialogue([
            { speaker: "Garçom", text: "Você está com fome? O que você gostaria de comer?" },
            { speaker: "Sofia", text: "Sim, estou com fome! Vocês têm peixe?" },
            { speaker: "Garçom", text: "Sim, temos. Você quer arroz também?" },
            { speaker: "Sofia", text: "Sim, por favor. E água também." }
        ]),

        grammar(
            "Gostar de + Substantivo",
            "Use 'gostar de' to say what you like: 'Eu gosto de arroz.' / 'Eu não gosto de peixe.' The preposition 'de' is always required after 'gostar', even when the next word starts with a vowel: 'de água'."
        ),

        list([

            "café da manhã: pão, café, frutas",

            "almoço: arroz, frango, legumes",

            "jantar: peixe, legumes, água",

            "Eu gosto de... / Eu não gosto de...",

            "Você quer...?"

        ]),

        tip(
            "Um Café, Por Favor",
            "In casual conversation, people often say 'um café' or 'uma água' to mean 'a cup of coffee' or 'a bottle/glass of water'."
        ),

        culture(
            "Meal Times",
            "Meal times vary between countries: in Brazil, lunch is often the biggest meal of the day, typically eaten between noon and 2 PM, while dinner tends to be lighter and later in the evening."
        ),

        quiz(
            "Which word is correct? 'Eu gosto ___ pão.'",
            ["de", "em", "por", "para"],
            0,
            "'Gostar' is always followed by 'de': 'Eu gosto de pão.'"
        ),

        quiz(
            "Which sentence is correct?",
            ["Eu quero água, por favor.", "Eu quero de água, por favor.", "Eu quero uma de água, por favor.", "Eu quero água de, por favor."],
            0,
            "'Eu quero água, por favor' is the correct, natural request."
        ),

        quiz(
            "How do you say you are hungry?",
            ["Estou com fome.", "Eu sou fome.", "Estou fome.", "Eu tenho a fome."],
            0,
            "The correct expression is 'Estou com fome.'"
        )

    ],

    summary: {

        tip:
            "Practice describing your favorite meal using 'Eu gosto de...' and the food words from this lesson.",

        review: [

            "pão, arroz, frango, peixe, legumes, frutas",

            "Estou com fome. / Estou com sede.",

            "gostar de + substantivo",

            "café da manhã, almoço, jantar"

        ]

    }

};
