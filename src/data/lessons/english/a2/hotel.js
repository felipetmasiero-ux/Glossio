import { hotelBlocks } from "../../../grammar/shared/english/hotel";
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

export const hotelLesson = {

    id: "english-a2-hotel",

    language: "english",

    level: "A2",

    category: "Daily Life",

    topic: "hotel",

    order: 10,

    title: "No Hotel",

    subtitle:
        "Faça o check-in, pergunte sobre serviços do hotel e fale sobre condições com o first conditional em inglês.",

    description:
        "Aprenda vocabulário de hotel e como fazer previsões e condições simples usando o first conditional (if + presente, will + verbo).",

    cover: "/covers/hotel.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "hotel",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Check in and check out of a hotel",

        "Use the first conditional (if + present, will + verb)",

        "Ask about hotel services and amenities",

        "Talk about room types"

    ],

    vocabulary: vocabulary([
        "reception",
        "receptionist",
        "key card",
        "room service",
        "wake-up call",
        "single room",
        "double room",
        "lobby",
        "luggage",
        "amenities"
    ]),

    blocks: [

        heading("Checking In"),

        paragraph(
            "At a hotel, you'll need to check in, ask about amenities, and sometimes describe conditions — like what will happen if something goes wrong. We use the first conditional for real, possible situations in the future."
        ),

        examples([
            {
                text: "If the room isn't ready, we'll wait in the lobby.",
                translation: "Se o quarto não estiver pronto, vamos esperar no saguão."
            },

            {
                text: "If you need anything, call the reception.",
                translation: "Se precisar de algo, ligue para a recepção."
            },

            {
                text: "I'll leave my luggage with the receptionist if I arrive early.",
                translation: "Vou deixar minha bagagem com o recepcionista se eu chegar cedo."
            }
        ]),

        dialogue([
            { speaker: "Receptionist", text: "Welcome! Do you have a reservation?" },
            { speaker: "Guest", text: "Yes, I booked a double room for three nights." },
            { speaker: "Receptionist", text: "Here's your key card. If you need room service, just dial 0." },
            { speaker: "Guest", text: "Thank you! Could I also ask for a wake-up call tomorrow?" }
        ]),

        grammar(hotelBlocks[0].title, hotelBlocks[0].text),

        list([

            "If + present simple, ... will + verb",

            "check in / check out",

            "reception, key card, room service, wake-up call",

            "single room, double room, lobby, luggage, amenities"

        ]),

        tip(
            "Comma or No Comma",
            "When the 'if' clause comes first, use a comma: 'If you need help, call reception.' When it comes second, no comma is needed: 'Call reception if you need help.'"
        ),

        culture(
            "Tipping Hotel Staff",
            "In many English-speaking countries, it's common to leave a small tip for hotel staff who carry your luggage or clean your room, even though it isn't always required."
        ),

        quiz(
            "Which sentence correctly uses the first conditional?",
            ["If it rain, we will stay in.", "If it rains, we will stay in.", "If it will rain, we stay in.", "If it rains, we stay in will."],
            1,
            "First conditional: if + present simple, will + base verb: 'If it rains, we will stay in.'"
        ),

        quiz(
            "What do you use to open your hotel room door?",
            ["a key card", "a receipt", "a ticket", "a password"],
            0,
            "A 'key card' is used to open hotel room doors."
        ),

        quiz(
            "Which word means the entrance area of a hotel?",
            ["reception", "lobby", "amenities", "luggage"],
            1,
            "The 'lobby' is the entrance/waiting area of a hotel."
        )

    ],

    summary: {

        tip:
            "Practice making a first conditional sentence about your next trip, like 'If the hotel has wifi, I'll work from my room.'",

        review: [

            "If + present simple, will + verb",

            "check in / check out",

            "reception, key card, room service",

            "single room, double room, lobby, luggage"

        ]

    }

};
