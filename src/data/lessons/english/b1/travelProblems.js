import { travelProblemsBlocks } from "../../../grammar/shared/english/b1/travelProblems";
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

export const travelProblemsLesson = {

    id: "english-b1-travel-problems",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "travel-problems",

    order: 5,

    title: "Travel & Problems",

    subtitle:
        "Conte histórias de viagem e imprevistos em inglês usando o past continuous e o past simple juntos, com 'when' e 'while'.",

    description:
        "Aprenda vocabulário de viagem e imprevistos, e como combinar past continuous e past simple para narrar o que estava acontecendo quando algo deu errado.",

    cover: "/covers/travel-problems.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 40,

    tags: [
        "travel",
        "narrative-tenses",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about travel problems and unexpected situations",

        "Use the past continuous for actions in progress in the past",

        "Combine past continuous and past simple to narrate interrupted actions",

        "Use 'while' and 'when' correctly in narratives"

    ],

    vocabulary: vocabulary([
        "itinerary",
        "layover",
        "missed flight",
        "delayed flight",
        "lost luggage",
        "overbooked",
        "complain",
        "broken down",
        "stranded",
        "detour",
        "get lost",
        "ask for directions",
        "run out of",
        "stuck in traffic",
        "miss a connection",
        "travel insurance",
        "backpack",
        "road trip"
    ]),

    blocks: [

        heading("Telling a Travel Story"),

        paragraph(
            "When we tell a story about something that went wrong during a trip, we usually combine two past tenses: the past continuous for the action that was already happening, and the past simple for the shorter action that interrupted it."
        ),

        examples([
            {
                text: "We were waiting at the gate when they announced the flight was delayed.",
                translation: "Estávamos esperando no portão quando anunciaram que o voo estava atrasado."
            },
            {
                text: "While we were driving to the airport, the car broke down.",
                translation: "Enquanto estávamos dirigindo para o aeroporto, o carro quebrou."
            },
            {
                text: "I was checking in online when I realized I'd lost my passport.",
                translation: "Eu estava fazendo o check-in online quando percebi que tinha perdido meu passaporte."
            },
            {
                text: "The taxi driver got lost while we were trying to find our hotel.",
                translation: "O motorista de táxi se perdeu enquanto tentávamos encontrar nosso hotel."
            },
            {
                text: "We were having dinner when the hotel fire alarm went off.",
                translation: "Estávamos jantando quando o alarme de incêndio do hotel disparou."
            },
            {
                text: "I ran out of cash while I was traveling in the countryside.",
                translation: "Fiquei sem dinheiro enquanto viajava pelo interior."
            }
        ]),

        dialogue([
            { speaker: "Maya", text: "You'll never believe what happened on my last trip." },
            { speaker: "Leo", text: "What happened?" },
            { speaker: "Maya", text: "We were checking in at the airport when they told us our flight was overbooked!" },
            { speaker: "Leo", text: "No way! What did you do?" },
            { speaker: "Maya", text: "We had to wait for the next flight. And while we were waiting, they lost our luggage too." },
            { speaker: "Leo", text: "That's terrible! Did you get it back?" },
            { speaker: "Maya", text: "Eventually, yes. But we were stuck at the airport for almost six hours." },
            { speaker: "Leo", text: "Wow, that sounds stressful. My worst travel story was getting lost while we were driving through the mountains." }
        ]),

        grammar(travelProblemsBlocks[0].title, travelProblemsBlocks[0].text),

        list([

            "was/were + verb-ing — action in progress",

            "past continuous + when + past simple — interrupted action",

            "while + past continuous — two actions at the same time",

            "missed flight, lost luggage, stranded, detour"

        ]),

        tip(
            "Don't Use the Past Continuous for a Single Completed Action",
            "Don't say 'I was losing my passport at the airport.' For a single, completed event, use the past simple: 'I lost my passport at the airport.' The past continuous is for ongoing actions, not quick, finished ones."
        ),

        culture(
            "Travel Horror Stories",
            "Sharing dramatic 'travel horror stories' is very common small talk in English-speaking cultures, especially among people who travel a lot — it's almost a bonding ritual when meeting someone new."
        ),

        quiz(
            "Choose the correct sentence.",
            [
                "I was losing my passport at the airport.",
                "I lost my passport at the airport.",
                "I was lose my passport at the airport.",
                "I have lost my passport at the airport yesterday."
            ],
            1,
            "For a single completed action, use the past simple: 'I lost my passport.'"
        ),

        quiz(
            "\"We ___ dinner when the fire alarm went off.\" Choose the correct form.",
            ["had", "were having", "have had", "has"],
            1,
            "The past continuous ('were having') describes the action in progress that was interrupted."
        ),

        quiz(
            "Choose the correct sentence using 'while'.",
            [
                "While we drove to the airport, the car broke down.",
                "While we were driving to the airport, the car broke down.",
                "While we drive to the airport, the car broke down.",
                "While we are driving to the airport, the car broke down."
            ],
            1,
            "'While' is typically followed by the past continuous to describe an action in progress."
        )

    ],

    summary: {

        tip:
            "Practice telling your own travel story: set the scene with the past continuous, then interrupt it with a past simple event.",

        review: [

            "past continuous — action in progress",

            "when + past simple — the interruption",

            "while + past continuous — simultaneous actions",

            "lost luggage, missed flight, stranded, detour"

        ]

    }

};
