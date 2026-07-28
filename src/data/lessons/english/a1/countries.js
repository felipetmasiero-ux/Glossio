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

export const countriesLesson = {

    id: "english-a1-countries",

    language: "english",

    level: "A1",

    category: "Basics",

    topic: "countries",

    order: 3,

    title: "Countries & Nationalities",

    subtitle:
        "Learn how to talk about countries and where people come from.",

    description:
        "Build your vocabulary with common countries and nationalities used in everyday conversations.",

    cover: "/covers/countries.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 30,

    tags: [
        "countries",
        "nationalities",
        "conversation"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Name common countries",

        "Talk about nationalities",

        "Ask where someone is from",

        "Answer where you are from"

    ],

    vocabulary: vocabulary([
        "Brazil",
        "Brazilian",
        "United States",
        "American",
        "France",
        "French",
        "Japan",
        "Japanese",
        "Spain",
        "Spanish"
    ]),

    blocks: [

        heading("Talking about Countries"),

        paragraph(
            "When meeting someone, it is common to ask where they are from. In English, most nationalities are formed by adding an ending like -an, -ian or -ese to the country's name."
        ),

        examples([
            {
                text: "Where are you from? — I'm from Brazil.",
                translation: "De onde você é? — Eu sou do Brasil."
            },

            {
                text: "Are you American? — No, I'm Brazilian.",
                translation: "Você é americano? — Não, eu sou brasileiro."
            },

            {
                text: "She is from Japan. She is Japanese.",
                translation: "Ela é do Japão. Ela é japonesa."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Where are you from?" },
            { speaker: "Kenji", text: "I'm from Japan. I'm Japanese. What about you?" },
            { speaker: "Anna", text: "I'm from Spain. I'm Spanish." },
            { speaker: "Kenji", text: "Nice! Do you speak French too?" },
            { speaker: "Anna", text: "No, just Spanish and English." }
        ]),

        grammar(
            "Country vs Nationality",
            "The country name and the nationality adjective are different words: 'Brazil' is the country, 'Brazilian' is the nationality. Use 'I'm from + country' or 'I'm + nationality' to say where you are from."
        ),

        list([

            "Brazil → Brazilian",

            "France → French",

            "Japan → Japanese",

            "Spain → Spanish",

            "Italy → Italian"

        ]),

        tip(
            "Remember",
            "Countries and nationalities begin with capital letters in English, even in the middle of a sentence."
        ),

        culture(
            "One World, Many Nationalities",
            "English is often used as a common language between people from different countries, so asking about nationalities is one of the most common small-talk topics when traveling or meeting new people."
        ),

        quiz(
            "What is the nationality for someone from Japan?",
            ["Japanese", "Japan", "Japaneseish", "Japanian"],
            0,
            "The correct nationality adjective is 'Japanese'."
        ),

        quiz(
            "Which sentence is correct?",
            ["I'm from Brazilian.", "I'm from Brazil.", "I'm Brazil.", "I'm Brazils."],
            1,
            "Use 'from' with the country name: 'I'm from Brazil.'"
        ),

        quiz(
            "How do you ask where someone is from?",
            ["What's your name?", "How are you?", "Where are you from?", "Nice to meet you."],
            2,
            "'Where are you from?' is the standard way to ask about someone's origin."
        )

    ],

    summary: {

        tip:
            "Practice asking and answering 'Where are you from?' with different countries and their nationalities.",

        review: [

            "Brazil → Brazilian",

            "France → French",

            "Japan → Japanese",

            "Spain → Spanish",

            "Where are you from? — I'm from..."

        ]

    }

};
