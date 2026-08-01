import { travelBlocks } from "../../../grammar/shared/french/travel";
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

    id: "french-a1-travel",

    language: "french",

    level: "A1",

    category: "Travel",

    topic: "travel",

    order: 9,

    title: "Travel",

    subtitle:
        "Talk about trips, tickets and getting around.",

    description:
        "Learn essential travel vocabulary in French, from booking a ticket to checking into a hotel room.",

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

        "Use 'aller' to talk about future plans"

    ],

    vocabulary: vocabulary([
        "aéroport",
        "billet",
        "train",
        "avion",
        "valise",
        "passeport",
        "chambre",
        "réserver",
        "aller simple",
        "aller-retour"
    ]),

    blocks: [

        heading("Getting Ready to Travel"),

        paragraph(
            "Traveling requires a specific set of words: tickets, luggage, documents and places like the airport or the train station. In French, 'aller' + infinitive is often used to talk about travel plans in the near future."
        ),

        examples([
            {
                text: "Je voudrais un billet pour Paris, s'il vous plaît.",
                translation: "Eu gostaria de uma passagem para Paris, por favor."
            },

            {
                text: "Où est l'aéroport, s'il vous plaît ?",
                translation: "Onde fica o aeroporto, por favor?"
            },

            {
                text: "N'oublie pas ton passeport et ta valise !",
                translation: "Não esqueça seu passaporte e sua mala!"
            }
        ]),

        dialogue([
            { speaker: "Voyageur", text: "Bonjour, je voudrais réserver un billet pour Lyon." },
            { speaker: "Employé", text: "Un aller simple ou un aller-retour ?" },
            { speaker: "Voyageur", text: "Un aller-retour, s'il vous plaît. Le train ou l'avion ?" },
            { speaker: "Employé", text: "Il y a un train à 14h et un avion à 16h." },
            { speaker: "Voyageur", text: "Le train, c'est parfait. Merci beaucoup !" }
        ]),

        grammar(travelBlocks[0].title, travelBlocks[0].text),

        list([

            "réserver un billet",

            "réserver une chambre",

            "un aller simple / un aller-retour",

            "prendre le train / prendre l'avion",

            "l'aéroport, la gare, l'hôtel"

        ]),

        tip(
            "One-Way or Round-Trip",
            "When buying a ticket, staff will often ask 'Aller simple ou aller-retour ?' — make sure you know which one you need before answering."
        ),

        culture(
            "Traveling in France",
            "France has an extensive high-speed train network (TGV), which often makes train travel between major cities faster and more convenient than flying, especially for medium distances."
        ),

        quiz(
            "Which word means 'suitcase'?",
            ["Billet", "Valise", "Passeport", "Chambre"],
            1,
            "'Valise' means 'suitcase' in French."
        ),

        quiz(
            "Which sentence correctly uses 'aller' for a future plan?",
            ["Je vais voyager en France.", "Je voyage vais en France.", "Je suis vais voyager.", "Je va voyager en France."],
            0,
            "The correct structure is 'aller' (conjugated) + infinitive: 'Je vais voyager.'"
        ),

        quiz(
            "What do you ask for a ticket with no return?",
            ["Un aller-retour", "Un aller simple", "Une chambre", "Un passeport"],
            1,
            "'Un aller simple' is a one-way ticket."
        )

    ],

    summary: {

        tip:
            "Practice booking a fictional trip out loud: choose a destination, a ticket type and a hotel room.",

        review: [

            "aéroport, train, avion, valise, passeport",

            "réserver un billet / une chambre",

            "aller simple vs aller-retour",

            "aller + infinitif = futur proche"

        ]

    }

};
