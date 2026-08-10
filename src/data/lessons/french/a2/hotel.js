import { hotelBlocks } from "../../../grammar/shared/french/hotel";
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

    id: "french-a2-hotel",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "hotel",

    order: 10,

    title: "No Hotel",

    subtitle:
        "Faça o check-in, pergunte sobre serviços do hotel e fale sobre condições com o condicional em francês.",

    description:
        "Aprenda vocabulário de hotel e como fazer previsões e condições simples usando 'si + présent, futur simple'.",

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

        "Use 'si + présent, futur simple'",

        "Ask about hotel services and amenities",

        "Talk about room types"

    ],

    vocabulary: vocabulary([
        "réception",
        "réceptionniste",
        "carte-clé",
        "service en chambre",
        "appel de réveil",
        "chambre simple",
        "chambre double",
        "hall",
        "bagages",
        "équipements"
    ]),

    blocks: [

        heading("À l'Arrivée à l'Hôtel"),

        paragraph(
            "À l'hôtel, il faut faire son check-in, demander les équipements disponibles, et parfois décrire des conditions — comme ce qui se passera si quelque chose ne va pas. On utilise 'si + présent, futur simple' pour des situations réelles et possibles dans le futur."
        ),

        examples([
            {
                text: "Si la chambre n'est pas prête, nous attendrons dans le hall.",
                translation: "Se o quarto não estiver pronto, vamos esperar no saguão."
            },

            {
                text: "Si vous avez besoin de quelque chose, appelez la réception.",
                translation: "Se precisar de algo, ligue para a recepção."
            },

            {
                text: "Je laisserai mes bagages avec le réceptionniste si j'arrive tôt.",
                translation: "Vou deixar minha bagagem com o recepcionista se eu chegar cedo."
            }
        ]),

        dialogue([
            { speaker: "Réceptionniste", text: "Bienvenue ! Avez-vous une réservation ?" },
            { speaker: "Client", text: "Oui, j'ai réservé une chambre double pour trois nuits." },
            { speaker: "Réceptionniste", text: "Voici votre carte-clé. Si vous avez besoin d'un service en chambre, composez le 0." },
            { speaker: "Client", text: "Merci ! Je pourrais aussi demander un appel de réveil demain ?" }
        ]),

        grammar(hotelBlocks[0].title, hotelBlocks[0].text),

        list([

            "Si + présent, ... futur simple",

            "faire le check-in / faire le check-out",

            "réception, carte-clé, service en chambre, appel de réveil",

            "chambre simple, chambre double, hall, bagages, équipements"

        ]),

        tip(
            "Virgule ou Pas de Virgule",
            "Quand la proposition avec 'si' vient en premier, utilise une virgule : 'Si vous avez besoin d'aide, appelez la réception.' Quand elle vient en second, pas de virgule : 'Appelez la réception si vous avez besoin d'aide.'"
        ),

        culture(
            "Les Pourboires pour le Personnel d'Hôtel",
            "Dans de nombreux pays, il est courant de laisser un petit pourboire au personnel qui porte les bagages ou nettoie la chambre, même si ce n'est pas toujours obligatoire."
        ),

        quiz(
            "Quelle phrase utilise correctement le premier type de condition ?",
            ["S'il pleut, nous resterons.", "S'il pleuvra, nous resterons.", "Si il pleut, nous restons futur.", "S'il pleut, nous restons futur."],
            0,
            "Si + présent, futur simple : 'S'il pleut, nous resterons.'"
        ),

        quiz(
            "Qu'utilises-tu pour ouvrir la porte de ta chambre d'hôtel ?",
            ["une carte-clé", "un reçu", "un billet", "un mot de passe"],
            0,
            "Une 'carte-clé' est utilisée pour ouvrir les portes des chambres d'hôtel."
        ),

        quiz(
            "Quel mot désigne l'espace d'accueil d'un hôtel ?",
            ["réception", "hall", "équipements", "bagages"],
            1,
            "Le 'hall' est l'espace d'entrée/d'accueil d'un hôtel."
        )

    ],

    summary: {

        tip:
            "Pratique à faire une phrase avec 'si + présent, futur simple' à propos de ton prochain voyage, comme 'Si l'hôtel a le wifi, je travaillerai depuis ma chambre.'",

        review: [

            "Si + présent, futur simple",

            "faire le check-in / faire le check-out",

            "réception, carte-clé, service en chambre",

            "chambre simple, chambre double, hall, bagages"

        ]

    }

};
