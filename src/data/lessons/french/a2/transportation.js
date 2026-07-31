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

    id: "french-a2-transportation",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "transportation",

    order: 5,

    title: "Transportation",

    subtitle:
        "Talk about how you get around, and ask for directions and information about transport.",

    description:
        "Learn transportation vocabulary and how to talk about how you travel using 'en' and 'à pied'.",

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

        "Use 'en' with transport and 'à pied' for walking",

        "Ask 'Comment je vais à...?'",

        "Understand delays and traffic"

    ],

    vocabulary: vocabulary([
        "arrêt de bus",
        "métro",
        "quai",
        "circulation",
        "embouteillage",
        "tarif",
        "embarquer",
        "retard",
        "passager",
        "conducteur"
    ]),

    blocks: [

        heading("Se Déplacer"),

        paragraph(
            "Que tu sois passager ou conducteur, tu auras besoin de ce vocabulaire presque tous les jours. Pour dire comment tu te déplaces, le français utilise 'en' avec la plupart des véhicules, mais 'à pied' pour marcher."
        ),

        examples([
            {
                text: "D'habitude, je vais au travail en métro, mais aujourd'hui j'y vais à pied.",
                translation: "Eu normalmente vou trabalhar de metrô, mas hoje estou indo a pé."
            },

            {
                text: "Il y a beaucoup de circulation, donc le bus a du retard.",
                translation: "Tem muito trânsito, então o ônibus está atrasado."
            },

            {
                text: "Excusez-moi, comment je vais au quai du train ?",
                translation: "Com licença, como eu chego à plataforma do trem?"
            }
        ]),

        dialogue([
            { speaker: "Touriste", text: "Excusez-moi, comment je vais à l'arrêt de bus ?" },
            { speaker: "Habitant", text: "Allez tout droit, c'est à côté de la station de métro." },
            { speaker: "Touriste", text: "Merci ! Il y a du retard aujourd'hui ?" },
            { speaker: "Habitant", text: "Je ne pense pas, mais il y a beaucoup de circulation dehors." }
        ]),

        grammar(
            "En + Transport / À Pied",
            "Utilise 'en' avec la plupart des moyens de transport : en bus, en voiture, en métro, en train, en avion. Pour marcher, utilise 'à pied' : 'Je vais à l'école à pied.' Demande 'Comment je vais à...?' pour des directions."
        ),

        list([

            "en bus / en voiture / en métro / en train — à pied",

            "Comment je vais à...?",

            "arrêt de bus, métro, quai, embouteillage",

            "embarquer / rater le train / prendre un train"

        ]),

        tip(
            "En Vélo, mais À Pied",
            "Une erreur courante : dire 'à voiture' au lieu de 'en voiture'. Retiens que la marche est toujours 'à pied' : 'Elle va au travail à pied tous les jours.'"
        ),

        culture(
            "Habitudes de Transport en Commun",
            "Dans beaucoup de grandes villes, les transports en commun sont le moyen le plus rapide de se déplacer, surtout aux heures de pointe, quand les embouteillages ralentissent beaucoup la voiture."
        ),

        quiz(
            "Quelle préposition est utilisée pour marcher ?",
            ["en pied", "à pied", "avec pied", "dans pied"],
            1,
            "Marcher s'exprime avec 'à pied', pas 'en pied'."
        ),

        quiz(
            "Quelle phrase demande son chemin ?",
            ["Comment je vais à la gare ?", "Combien coûte la gare ?", "À quelle fréquence est la gare ?", "Depuis quand est la gare ?"],
            0,
            "'Comment je vais à...?' sert à demander son chemin vers un endroit."
        ),

        quiz(
            "Qu'est-ce qui cause souvent le retard des bus en ville ?",
            ["le tarif", "la circulation", "le quai", "le passager"],
            1,
            "'La circulation' (ou un embouteillage) est une cause fréquente de retard."
        )

    ],

    summary: {

        tip:
            "Pratique à décrire comment tu vas au travail ou à l'école, en utilisant 'en' ou 'à pied'.",

        review: [

            "en bus/voiture/métro/train — à pied",

            "Comment je vais à...?",

            "arrêt de bus, métro, quai, embouteillage",

            "embarquer, retard, passager, conducteur"

        ]

    }

};
