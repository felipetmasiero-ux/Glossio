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

export const weatherLesson = {

    id: "english-a2-weather",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "weather",

    order: 4,

    title: "Clima",

    subtitle:
        "Fale sobre o tempo e faça previsões simples com 'will' em inglês.",

    description:
        "Aprenda vocabulário de clima e como fazer previsões sobre o futuro usando 'will'.",

    cover: "/covers/weather.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "weather",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Describe current weather conditions",

        "Make predictions using 'will'",

        "Understand a simple weather forecast",

        "Ask 'What's the weather like?'"

    ],

    vocabulary: vocabulary([
        "sunny",
        "cloudy",
        "rainy",
        "windy",
        "snowy",
        "foggy",
        "temperature",
        "forecast",
        "storm",
        "freezing"
    ]),

    blocks: [

        heading("What's the Weather Like?"),

        paragraph(
            "Talking about the weather is small talk in most English-speaking countries. To talk about the future — like tomorrow's forecast — we often use 'will' plus the base verb."
        ),

        examples([
            {
                text: "It's sunny today, but it will be cloudy tomorrow.",
                translation: "Está ensolarado hoje, mas vai ficar nublado amanhã."
            },

            {
                text: "The forecast says it will rain this weekend.",
                translation: "A previsão diz que vai chover neste fim de semana."
            },

            {
                text: "It's freezing outside, so wear a coat.",
                translation: "Está congelante lá fora, então use um casaco."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "What's the weather like today?" },
            { speaker: "Marco", text: "It's windy and cloudy, but it won't rain." },
            { speaker: "Ana", text: "What about tomorrow?" },
            { speaker: "Marco", text: "The forecast says there will be a storm in the afternoon." }
        ]),

        grammar(
            "Predictions with 'Will'",
            "Use 'will' + base verb to make predictions about the future: 'It will rain tomorrow.' For negatives, use 'won't' (will not): 'It won't be sunny.' Ask questions with 'Will it...?': 'Will it snow this weekend?'"
        ),

        list([

            "sunny, cloudy, rainy, windy, snowy, foggy",

            "It will rain. / It won't rain.",

            "Will it...? — Yes, it will. / No, it won't.",

            "temperature, forecast, storm, freezing"

        ]),

        tip(
            "Talking About Temperature",
            "You can describe temperature with adjectives (freezing, cold, warm, hot) or with numbers: 'It's ten degrees today.' In everyday conversation, adjectives are more common than exact numbers."
        ),

        culture(
            "Small Talk About Weather",
            "In the UK especially, talking about the weather is one of the most common ways to start a conversation, even with strangers — it's considered a safe, neutral topic."
        ),

        quiz(
            "Which sentence correctly makes a prediction?",
            ["It will rains tomorrow.", "It will rain tomorrow.", "It wills rain tomorrow.", "It will to rain tomorrow."],
            1,
            "'Will' is followed by the base verb, with no '-s' or 'to': 'It will rain tomorrow.'"
        ),

        quiz(
            "What is the negative form of 'will'?",
            ["willn't", "won't", "not will", "will not to"],
            1,
            "The negative contraction of 'will not' is 'won't'."
        ),

        quiz(
            "Which word describes weather with a lot of wind?",
            ["sunny", "rainy", "windy", "foggy"],
            2,
            "'Windy' describes weather with strong wind."
        )

    ],

    summary: {

        tip:
            "Practice making a weather prediction for tomorrow using 'will' or 'won't'.",

        review: [

            "sunny, cloudy, rainy, windy, snowy, foggy",

            "It will rain. / It won't rain.",

            "Will it...?",

            "temperature, forecast, storm, freezing"

        ]

    }

};
