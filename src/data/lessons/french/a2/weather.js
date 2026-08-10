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

export const weatherLesson = {

    id: "french-a2-weather",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "weather",

    order: 4,

    title: "Clima",

    subtitle:
        "Fale sobre o tempo e faça previsões simples com o futur simple em francês.",

    description:
        "Aprenda vocabulário de clima e como fazer previsões sobre o futuro usando o futur simple.",

    cover: "/covers/weather.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "weather",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Describe current weather conditions",

        "Make predictions using the futur simple",

        "Understand a simple weather forecast",

        "Ask 'Quel temps fera-t-il ?'"

    ],

    vocabulary: vocabulary([
        "ensoleillé",
        "nuageux",
        "pluvieux",
        "venteux",
        "enneigé",
        "brumeux",
        "température",
        "prévisions",
        "orage",
        "glacial"
    ]),

    blocks: [

        heading("Quel Temps Fera-t-il ?"),

        paragraph(
            "Parler du temps est une conversation courante dans de nombreux pays francophones. Pour parler du futur — comme la météo de demain — on utilise souvent le futur simple."
        ),

        examples([
            {
                text: "Il fait ensoleillé aujourd'hui, mais il sera nuageux demain.",
                translation: "Está ensolarado hoje, mas vai ficar nublado amanhã."
            },

            {
                text: "Les prévisions disent qu'il pleuvra ce week-end.",
                translation: "A previsão diz que vai chover neste fim de semana."
            },

            {
                text: "Il fait glacial dehors, alors mets un manteau.",
                translation: "Está congelante lá fora, então use um casaco."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "Quel temps fait-il aujourd'hui ?" },
            { speaker: "Marco", text: "Il fait venteux et nuageux, mais il ne pleuvra pas." },
            { speaker: "Ana", text: "Et demain ?" },
            { speaker: "Marco", text: "Les prévisions annoncent un orage dans l'après-midi." }
        ]),

        grammar(
            "Le Futur Simple pour les Prédictions",
            "Utilise le futur simple pour faire des prédictions : 'Il pleuvra demain.' Pour la négation : 'Il ne pleuvra pas.' Pose une question avec l'inversion ou 'est-ce que' : 'Est-ce qu'il neigera ce week-end ?'"
        ),

        list([

            "ensoleillé, nuageux, pluvieux, venteux, enneigé, brumeux",

            "Il pleuvra. / Il ne pleuvra pas.",

            "Est-ce qu'il...? — Oui, il... / Non, il ne... pas.",

            "température, prévisions, orage, glacial"

        ]),

        tip(
            "Parler de la Température",
            "Tu peux décrire la température avec des adjectifs (glacial, froid, doux, chaud) ou avec des chiffres : 'Il fait dix degrés aujourd'hui.' Dans une conversation courante, les adjectifs sont plus fréquents que les chiffres exacts."
        ),

        culture(
            "Parler de la Météo",
            "En France comme ailleurs, parler de la météo est un excellent moyen de commencer une conversation, même avec des inconnus — c'est un sujet neutre et sûr."
        ),

        quiz(
            "Quelle phrase fait correctement une prédiction ?",
            ["Il pleuvra demain.", "Il pleut demain.", "Il va pleuvra demain.", "Il pleuvera demain."],
            0,
            "Le futur simple est utilisé pour prédire : 'Il pleuvra demain.'"
        ),

        quiz(
            "Quelle est la forme négative du futur simple ici ?",
            ["Il pleuvra pas.", "Il ne pleuvra pas.", "Il non pleuvra.", "Il ne pleut pas."],
            1,
            "La négation encadre le verbe : 'Il ne pleuvra pas.'"
        ),

        quiz(
            "Quel mot décrit un temps avec beaucoup de vent ?",
            ["ensoleillé", "pluvieux", "venteux", "brumeux"],
            2,
            "'Venteux' décrit un temps avec beaucoup de vent."
        )

    ],

    summary: {

        tip:
            "Pratique à faire une prédiction météo pour demain en utilisant le futur simple.",

        review: [

            "ensoleillé, nuageux, pluvieux, venteux, enneigé, brumeux",

            "Il pleuvra. / Il ne pleuvra pas.",

            "Est-ce qu'il...?",

            "température, prévisions, orage, glacial"

        ]

    }

};
