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

export const weatherLesson = {

    id: "portuguese-a1-weather",

    language: "portuguese",

    level: "A1",

    category: "Daily Life",

    topic: "weather",

    order: 10,

    title: "Weather",

    subtitle:
        "Describe the weather and talk about the seasons.",

    description:
        "Learn how to describe the weather in Portuguese using 'estar' and common weather expressions.",

    cover: "/covers/weather.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 25,

    tags: [
        "weather",
        "vocabulary",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Describe the weather using 'está...'",

        "Talk about rain and snow with 'está chovendo' and 'está nevando'",

        "Ask 'Que tempo está fazendo?'",

        "Name basic weather nouns"

    ],

    vocabulary: vocabulary([
        "está bonito",
        "está frio",
        "está quente",
        "está chovendo",
        "está nevando",
        "sol",
        "chuva",
        "vento",
        "nuvem",
        "que tempo está fazendo"
    ]),

    blocks: [

        heading("Talking about the Weather"),

        paragraph(
            "In Portuguese, most weather expressions use 'está' + adjective or gerund: 'está bonito' (it's nice), 'está chovendo' (it's raining). This is similar to how English uses 'it's' for weather."
        ),

        examples([
            {
                text: "Hoje está bonito e tem sol.",
                translation: "Today it's nice out and there's sun."
            },

            {
                text: "Está chovendo, pegue o seu guarda-chuva!",
                translation: "It's raining, grab your umbrella!"
            },

            {
                text: "No inverno, está frio e neva com frequência.",
                translation: "In winter, it's cold and it snows often."
            }
        ]),

        dialogue([
            { speaker: "Léa", text: "Que tempo está fazendo hoje?" },
            { speaker: "Marco", text: "Está quente e tem vento." },
            { speaker: "Léa", text: "Tem nuvens também?" },
            { speaker: "Marco", text: "Sim, mas eu acho que não vai chover." }
        ]),

        grammar(
            "Estar + Adjetivo / Ter",
            "Use 'está' with adjectives: 'está bonito', 'está frio'. Use 'tem' with nouns: 'tem sol', 'tem vento', 'tem nuvens'. For rain and snow, use the verbs directly: 'está chovendo', 'está nevando'."
        ),

        list([

            "está bonito / está ruim",

            "está quente / está frio",

            "está chovendo / está nevando",

            "tem sol / tem vento / tem nuvens"

        ]),

        tip(
            "Small Talk",
            "Talking about the weather is common small talk in Portuguese too. 'Que tempo está fazendo?' is a safe, friendly question to start a casual conversation."
        ),

        culture(
            "Four Seasons",
            "Southern Brazil has four distinct seasons, while the north stays warm year-round, so weather is a frequent topic of conversation, especially before a trip or a weekend outdoors."
        ),

        quiz(
            "Which phrase describes rain?",
            ["Está bonito", "Está chovendo", "Está frio", "Está nevando"],
            1,
            "'Está chovendo' means 'it's raining'."
        ),

        quiz(
            "Which word is correct? 'Tem ___ sol.'",
            ["de", "muito", "uns", "a"],
            1,
            "Use 'tem muito sol' to say there's a lot of sun."
        ),

        quiz(
            "How do you ask about the weather?",
            ["Como vai?", "Quantos anos você tem?", "Que tempo está fazendo?", "De onde você é?"],
            2,
            "'Que tempo está fazendo?' is the standard way to ask about the weather."
        )

    ],

    summary: {

        tip:
            "Practice describing today's weather out loud using 'está...', 'tem...' and 'está chovendo/nevando'.",

        review: [

            "está bonito / frio / quente",

            "está chovendo, está nevando",

            "tem sol / tem vento / tem nuvens",

            "Que tempo está fazendo?"

        ]

    }

};
