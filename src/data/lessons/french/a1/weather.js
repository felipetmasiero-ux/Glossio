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

    id: "french-a1-weather",

    language: "french",

    level: "A1",

    category: "Daily Life",

    topic: "weather",

    order: 10,

    title: "Weather",

    subtitle:
        "Describe the weather and talk about the seasons.",

    description:
        "Learn how to describe the weather in French using the impersonal 'il' and common weather expressions.",

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

        "Describe the weather using 'il fait...'",

        "Talk about rain and snow with 'il pleut' and 'il neige'",

        "Ask 'Quel temps fait-il ?'",

        "Name basic weather nouns"

    ],

    vocabulary: vocabulary([
        "il fait beau",
        "il fait froid",
        "il fait chaud",
        "il pleut",
        "il neige",
        "soleil",
        "pluie",
        "vent",
        "nuage",
        "quel temps fait-il ?"
    ]),

    blocks: [

        heading("Talking about the Weather"),

        paragraph(
            "In French, most weather expressions use the impersonal subject 'il', which doesn't refer to a person: 'il fait beau' (it's nice), 'il pleut' (it's raining). This is very similar to how English uses 'it' for weather."
        ),

        examples([
            {
                text: "Aujourd'hui, il fait beau et il y a du soleil.",
                translation: "Hoje está bonito e tem sol."
            },

            {
                text: "Il pleut, prends ton parapluie !",
                translation: "Está chovendo, pegue seu guarda-chuva!"
            },

            {
                text: "En hiver, il fait froid et il neige souvent.",
                translation: "No inverno, faz frio e neva com frequência."
            }
        ]),

        dialogue([
            { speaker: "Léa", text: "Quel temps fait-il aujourd'hui ?" },
            { speaker: "Marco", text: "Il fait chaud et il y a du vent." },
            { speaker: "Léa", text: "Il y a des nuages aussi ?" },
            { speaker: "Marco", text: "Oui, mais je pense qu'il ne va pas pleuvoir." }
        ]),

        grammar(
            "Il fait vs Il y a",
            "Use 'il fait' with adjectives: 'il fait beau', 'il fait froid'. Use 'il y a' with nouns: 'il y a du soleil', 'il y a du vent', 'il y a des nuages'. For rain and snow, use the verbs directly: 'il pleut', 'il neige'."
        ),

        list([

            "il fait beau / il fait mauvais",

            "il fait chaud / il fait froid",

            "il pleut / il neige",

            "il y a du soleil / du vent / des nuages"

        ]),

        tip(
            "Small Talk",
            "Talking about the weather is common small talk in French too. 'Quel temps fait-il ?' is a safe, friendly question to start a casual conversation."
        ),

        culture(
            "Four Seasons",
            "Most of France has four distinct seasons, so weather is a frequent topic of conversation — especially before a trip or a weekend outdoors."
        ),

        quiz(
            "Which phrase describes rain?",
            ["Il fait beau", "Il pleut", "Il fait froid", "Il neige"],
            1,
            "'Il pleut' means 'it's raining'."
        ),

        quiz(
            "Which word is correct? 'Il y a ___ soleil.'",
            ["de", "du", "des", "le"],
            1,
            "Use 'du' before a masculine noun: 'il y a du soleil'."
        ),

        quiz(
            "How do you ask about the weather?",
            ["Comment ça va ?", "Quel âge as-tu ?", "Quel temps fait-il ?", "Tu viens d'où ?"],
            2,
            "'Quel temps fait-il ?' is the standard way to ask about the weather."
        )

    ],

    summary: {

        tip:
            "Practice describing today's weather out loud using 'il fait...', 'il y a...' and 'il pleut/il neige'.",

        review: [

            "il fait beau / froid / chaud",

            "il pleut, il neige",

            "il y a du soleil / du vent / des nuages",

            "Quel temps fait-il ?"

        ]

    }

};
