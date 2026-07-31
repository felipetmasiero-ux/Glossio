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

export const travelLesson = {

    id: "portuguese-a1-travel",

    language: "portuguese",

    level: "A1",

    category: "Travel",

    topic: "travel",

    order: 9,

    title: "Travel",

    subtitle:
        "Talk about trips, tickets and getting around.",

    description:
        "Learn essential travel vocabulary in Portuguese, from booking a ticket to checking into a hotel room.",

    cover: "/covers/travel.webp",

    estimatedTime: 9,

    difficulty: 1,

    xp: 30,

    tags: [
        "travel",
        "vocabulary",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Name common travel items and places",

        "Ask for a one-way or round-trip ticket",

        "Book a hotel room",

        "Use 'ir' to talk about future plans"

    ],

    vocabulary: vocabulary([
        "aeroporto",
        "passagem",
        "trem",
        "avião",
        "mala",
        "passaporte",
        "quarto",
        "reservar",
        "só ida",
        "ida e volta"
    ]),

    blocks: [

        heading("Getting Ready to Travel"),

        paragraph(
            "Traveling requires a specific set of words: tickets, luggage, documents and places like the airport or the train station. In Portuguese, 'ir' + infinitive is often used to talk about travel plans in the near future."
        ),

        examples([
            {
                text: "Eu gostaria de uma passagem para São Paulo, por favor.",
                translation: "I would like a ticket to São Paulo, please."
            },

            {
                text: "Onde fica o aeroporto, por favor?",
                translation: "Where is the airport, please?"
            },

            {
                text: "Não esqueça o seu passaporte e a sua mala!",
                translation: "Don't forget your passport and your suitcase!"
            }
        ]),

        dialogue([
            { speaker: "Viajante", text: "Olá, eu gostaria de reservar uma passagem para Lisboa." },
            { speaker: "Funcionário", text: "Só ida ou ida e volta?" },
            { speaker: "Viajante", text: "Ida e volta, por favor. De trem ou de avião?" },
            { speaker: "Funcionário", text: "Há um trem às 14h e um avião às 16h." },
            { speaker: "Viajante", text: "O trem está ótimo. Muito obrigado!" }
        ]),

        grammar(
            "Ir + Infinitivo",
            "Use 'ir' followed by an infinitive verb to talk about the near future: 'Eu vou viajar para Portugal.' / 'Nós vamos reservar um quarto.' This is the Portuguese equivalent of 'going to' in English."
        ),

        list([

            "reservar uma passagem",

            "reservar um quarto",

            "só ida / ida e volta",

            "pegar o trem / pegar o avião",

            "o aeroporto, a estação, o hotel"

        ]),

        tip(
            "One-Way or Round-Trip",
            "When buying a ticket, staff will often ask 'Só ida ou ida e volta?' — make sure you know which one you need before answering."
        ),

        culture(
            "Traveling in Brazil",
            "Brazil is a huge country, so domestic flights are often the fastest way to travel long distances, while buses are a common and affordable option for shorter trips between nearby cities."
        ),

        quiz(
            "Which word means 'suitcase'?",
            ["Passagem", "Mala", "Passaporte", "Quarto"],
            1,
            "'Mala' means 'suitcase' in Portuguese."
        ),

        quiz(
            "Which sentence correctly uses 'ir' for a future plan?",
            ["Eu vou viajar para Portugal.", "Eu viajo vou para Portugal.", "Eu sou vou viajar.", "Eu vai viajar para Portugal."],
            0,
            "The correct structure is 'ir' (conjugated) + infinitive: 'Eu vou viajar.'"
        ),

        quiz(
            "What do you ask for a ticket with no return?",
            ["Ida e volta", "Só ida", "Um quarto", "Um passaporte"],
            1,
            "'Só ida' is a one-way ticket."
        )

    ],

    summary: {

        tip:
            "Practice booking a fictional trip out loud: choose a destination, a ticket type and a hotel room.",

        review: [

            "aeroporto, trem, avião, mala, passaporte",

            "reservar uma passagem / um quarto",

            "só ida vs ida e volta",

            "ir + infinitivo = futuro próximo"

        ]

    }

};
