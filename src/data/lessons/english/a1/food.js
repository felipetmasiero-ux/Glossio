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

export const foodLesson = {

    id: "english-a1-food",

    language: "english",

    level: "A1",

    category: "Daily Life",

    order: 10,

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

        "Use 'some' and 'any' correctly",

        "Talk about meals of the day"

    ],

    vocabulary: vocabulary([

        { word: "bread", translation: "pão" },

        { word: "rice", translation: "arroz" },

        { word: "chicken", translation: "frango" },

        { word: "fish", translation: "peixe" },

        { word: "vegetables", translation: "vegetais" },

        { word: "fruit", translation: "fruta" },

        { word: "water", translation: "água" },

        { word: "coffee", translation: "café" },

        {
            word: "I'm hungry.",
            translation: "Estou com fome."
        },

        {
            word: "I'm thirsty.",
            translation: "Estou com sede."
        }

    ]),

    blocks: [

        heading("Everyday Food"),

        paragraph(
            "Food is one of the most useful topics for beginners, since you'll use it every day — ordering, shopping and talking about your preferences. Most food nouns in English are uncountable, so they don't have a plural form."
        ),

        examples([
            {
                text: "I like rice and chicken.",
                translation: "Eu gosto de arroz e frango."
            },

            {
                text: "Do you want some coffee?",
                translation: "Você quer um pouco de café?"
            },

            {
                text: "I don't eat fish, but I love vegetables.",
                translation: "Eu não como peixe, mas eu adoro vegetais."
            }
        ]),

        dialogue([
            { speaker: "Waiter", text: "Are you hungry? What would you like to eat?" },
            { speaker: "Sofia", text: "Yes, I'm hungry! Do you have any fish?" },
            { speaker: "Waiter", text: "Yes, we do. Would you like some rice with it?" },
            { speaker: "Sofia", text: "Yes, please. And some water too." }
        ]),

        grammar(
            "Some vs Any",
            "Use 'some' in affirmative sentences and offers: 'I want some bread.' Use 'any' in negatives and questions: 'I don't have any coffee.' / 'Do you have any fruit?'"
        ),

        list([

            "breakfast: bread, coffee, fruit",

            "lunch: rice, chicken, vegetables",

            "dinner: fish, vegetables, water",

            "I like... / I don't like...",

            "Do you want some...?"

        ]),

        tip(
            "A Coffee, Please",
            "In casual conversation, people often say 'a coffee' or 'a water' to mean 'a cup of coffee' or 'a bottle/glass of water', even though these are usually uncountable words."
        ),

        culture(
            "Meal Times",
            "Meal times vary between countries: lunch can be a quick sandwich around noon or the biggest meal of the day, and dinner can happen anywhere from 6 PM to 9 PM or later, depending on where you are."
        ),

        quiz(
            "Which word is correct? 'Do you have ___ bread?'",
            ["some", "a", "any", "the"],
            2,
            "Use 'any' in questions: 'Do you have any bread?'"
        ),

        quiz(
            "Which word is correct? 'I want ___ water, please.'",
            ["any", "a", "many", "some"],
            3,
            "Use 'some' in offers and affirmative requests: 'I want some water.'"
        ),

        quiz(
            "How do you say you are hungry?",
            ["I'm hungry.", "I'm hunger.", "I have hungry.", "I'm hungering."],
            0,
            "The correct expression is 'I'm hungry.'"
        )

    ],

    summary: {

        tip:
            "Practice describing your favorite meal using 'I like...' and 'some/any' with food words.",

        review: [

            "bread, rice, chicken, fish, vegetables, fruit",

            "I'm hungry. / I'm thirsty.",

            "some (affirmative/offers) vs any (negative/questions)",

            "breakfast, lunch, dinner"

        ]

    }

};
