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

export const restaurantA2Lesson = {

    id: "french-a2-restaurant",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "restaurant",

    order: 9,

    title: "At the Restaurant",

    subtitle:
        "Make polite requests, order a full meal, and handle a restaurant reservation.",

    description:
        "Go beyond basic ordering and learn to make polite requests with 'pourriez-vous', and order a starter, main course and dessert.",

    cover: "/covers/restaurant-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "restaurant",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Make polite requests with 'pourriez-vous'",

        "Order a starter, a main course and a dessert",

        "Make a reservation and mention allergies",

        "Handle a complaint politely"

    ],

    vocabulary: vocabulary([
        "entrée",
        "plat principal",
        "dessert",
        "accompagnement",
        "végétarien",
        "allergique",
        "recommander",
        "plainte",
        "frais de service",
        "réservation"
    ]),

    blocks: [

        heading("Un Repas Complet"),

        paragraph(
            "Au niveau A1, tu as appris des demandes simples comme 'je voudrais...'. Maintenant, faisons des demandes plus polies avec 'pourriez-vous', qui sonne plus formel et est courant quand on s'adresse à un serveur."
        ),

        examples([
            {
                text: "Pourriez-vous m'apporter la carte, s'il vous plaît ?",
                translation: "Eu poderia ver o cardápio, por favor?"
            },

            {
                text: "Pourriez-vous recommander le poisson comme plat principal ?",
                translation: "Você recomendaria o peixe como prato principal?"
            },

            {
                text: "Je suis allergique aux noix, donc je vais prendre une entrée végétarienne.",
                translation: "Sou alérgico a nozes, então vou querer uma entrada vegetariana."
            }
        ]),

        dialogue([
            { speaker: "Serveur", text: "Bonsoir ! Avez-vous une réservation ?" },
            { speaker: "Client", text: "Oui, j'ai réservé une table pour deux personnes." },
            { speaker: "Serveur", text: "Parfait. Voudriez-vous commencer par une entrée ?" },
            { speaker: "Client", text: "Pourriez-vous nous recommander quelque chose ? Je suis allergique aux fruits de mer." }
        ]),

        grammar(
            "Demandes Polies avec Pourriez-vous",
            "Utilise 'Pourriez-vous...?' pour des demandes polies : 'Pourriez-vous m'apporter l'addition, s'il vous plaît ?' Cette forme sonne plus polie que 'Pouvez-vous...?' et est courante au restaurant ou dans des situations formelles."
        ),

        list([

            "Pourriez-vous...? / Voudriez-vous recommander...?",

            "entrée → plat principal → dessert",

            "Je suis allergique à... / Je suis végétarien(ne).",

            "faire une réservation, frais de service, plainte"

        ]),

        tip(
            "Pourriez-vous vs Pouvez-vous",
            "'Pouvez-vous m'apporter...?' est courant et sympathique, mais 'Pourriez-vous m'apporter...?' est un peu plus poli et formel — un bon choix avec un serveur ou des gens que tu ne connais pas bien."
        ),

        culture(
            "Les Frais de Service",
            "Dans certains pays, le service est automatiquement inclus dans l'addition au lieu d'être un pourboire facultatif, donc il vaut mieux vérifier l'addition avant d'ajouter un pourboire supplémentaire."
        ),

        quiz(
            "Quelle phrase est une demande polie ?",
            ["Donne-moi la carte.", "Pourriez-vous m'apporter la carte, s'il vous plaît ?", "La carte, maintenant.", "Je veux la carte."],
            1,
            "'Pourriez-vous...?' est une façon polie de faire une demande."
        ),

        quiz(
            "Quel plat vient en premier dans un repas ?",
            ["le dessert", "le plat principal", "l'entrée", "les frais de service"],
            2,
            "'L'entrée' est le premier plat d'un repas, avant le plat principal et le dessert."
        ),

        quiz(
            "Comment dis-tu que tu ne peux pas manger quelque chose pour des raisons de santé ?",
            ["Je suis végétarien.", "Je suis allergique à ça.", "Je le recommande.", "J'ai fait une réservation."],
            1,
            "'Je suis allergique à...' explique qu'on ne peut pas manger quelque chose pour des raisons de santé."
        )

    ],

    summary: {

        tip:
            "Pratique à commander un repas complet à voix haute : une entrée, un plat principal, et un dessert, en utilisant 'Pourriez-vous...?'",

        review: [

            "Pourriez-vous...? / Voudriez-vous recommander...?",

            "entrée, plat principal, dessert, accompagnement",

            "végétarien, allergique, recommander",

            "faire une réservation, frais de service, plainte"

        ]

    }

};
