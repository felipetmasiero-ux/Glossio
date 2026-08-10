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

export const transportationLesson = {

    id: "english-a2-transportation",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "transportation",

    order: 5,

    title: "Transporte",

    subtitle:
        "Fale sobre como você se desloca, e peça direções e informações sobre transporte em inglês.",

    description:
        "Aprenda vocabulário de transporte e como falar sobre como você se desloca usando 'by' e 'on foot'.",

    cover: "/covers/transportation.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "transportation",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Talk about different ways to travel",

        "Use 'by' with transport and 'on foot' for walking",

        "Ask 'How do I get to...?'",

        "Understand delays and traffic"

    ],

    vocabulary: vocabulary([
        "bus stop",
        "subway",
        "platform",
        "traffic",
        "traffic jam",
        "fare",
        "board",
        "delay",
        "passenger",
        "driver"
    ]),

    blocks: [

        heading("Getting Around"),

        paragraph(
            "Whether you're a passenger or a driver, you'll need transportation vocabulary almost every day. To say how you travel, English uses 'by' with most vehicles, but 'on foot' for walking."
        ),

        examples([
            {
                text: "I usually go to work by subway, but today I'm walking.",
                translation: "Eu normalmente vou trabalhar de metrô, mas hoje estou indo a pé."
            },

            {
                text: "There's a lot of traffic, so the bus is late.",
                translation: "Tem muito trânsito, então o ônibus está atrasado."
            },

            {
                text: "Excuse me, how do I get to the train platform?",
                translation: "Com licença, como eu chego à plataforma do trem?"
            }
        ]),

        dialogue([
            { speaker: "Tourist", text: "Excuse me, how do I get to the bus stop?" },
            { speaker: "Local", text: "Go straight ahead, it's next to the subway station." },
            { speaker: "Tourist", text: "Thanks! Do you know if there's a delay today?" },
            { speaker: "Local", text: "I don't think so, but there's a lot of traffic outside." }
        ]),

        grammar(
            "By + Transport / On Foot",
            "Use 'by' with most types of transport: by bus, by car, by subway, by train, by plane. For walking, use 'on foot' (not 'by foot'): 'I go to school on foot.' Ask 'How do I get to...?' to request directions."
        ),

        list([

            "by bus / by car / by subway / by train — on foot",

            "How do I get to...?",

            "bus stop, subway, platform, traffic jam",

            "board the train / miss the train / catch a train"

        ]),

        tip(
            "On Foot, Not By Foot",
            "A common mistake is saying 'by foot'. In English, walking is always 'on foot': 'She goes to work on foot every day.'"
        ),

        culture(
            "Public Transport Habits",
            "In many big cities, public transport is the fastest way to get around, especially during rush hour, when traffic jams can make driving much slower than taking the subway."
        ),

        quiz(
            "Which preposition is used for walking?",
            ["by foot", "on foot", "with foot", "in foot"],
            1,
            "Walking is expressed with 'on foot', not 'by foot'."
        ),

        quiz(
            "Which sentence asks for directions?",
            ["How do I get to the station?", "How much is the station?", "How often is the station?", "How long is the station?"],
            0,
            "'How do I get to...?' is used to ask for directions to a place."
        ),

        quiz(
            "What causes buses to be late in a big city?",
            ["fare", "traffic", "platform", "passenger"],
            1,
            "'Traffic' (heavy traffic or a traffic jam) is a common cause of delays."
        )

    ],

    summary: {

        tip:
            "Practice describing how you get to work or school, using 'by' or 'on foot'.",

        review: [

            "by bus/car/subway/train — on foot",

            "How do I get to...?",

            "bus stop, subway, platform, traffic jam",

            "board, delay, passenger, driver"

        ]

    }

};
