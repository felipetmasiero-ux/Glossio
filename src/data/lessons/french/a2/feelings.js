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

export const feelingsLesson = {

    id: "french-a2-feelings",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "feelings",

    order: 8,

    title: "Feelings & Emotions",

    subtitle:
        "Describe how you feel and what causes that feeling, using participle and '-ant' adjectives.",

    description:
        "Learn to describe emotions and the difference between past-participle adjectives (how you feel) and '-ant' adjectives (what causes the feeling).",

    cover: "/covers/feelings.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "feelings",
        "emotions",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Describe emotions with adjectives",

        "Understand the difference between participle and '-ant' adjectives",

        "Say what makes you feel a certain way",

        "Ask how someone feels and why"

    ],

    vocabulary: vocabulary([
        "ennuyé",
        "ennuyeux",
        "énervé",
        "énervant",
        "surpris",
        "surprenant",
        "intéressé",
        "intéressant",
        "déçu",
        "décevant"
    ]),

    blocks: [

        heading("Comment te Sens-tu ?"),

        paragraph(
            "En français, les adjectifs formés sur le participe passé décrivent ce que ressent une personne, tandis que les adjectifs en '-ant' décrivent ce qui cause ce sentiment. 'Je suis ennuyé' veut dire que je ressens l'ennui ; 'Ce cours est ennuyeux' veut dire que le cours cause ce sentiment."
        ),

        examples([
            {
                text: "Je suis ennuyé. Ce cours est ennuyeux.",
                translation: "Estou entediado. Esta aula é entediante."
            },

            {
                text: "Elle est surprise par le voyage. C'est un voyage surprenant.",
                translation: "Ela está surpresa com a viagem. É uma viagem surpreendente."
            },

            {
                text: "Les instructions étaient énervantes, alors je me suis énervé.",
                translation: "As instruções estavam irritantes, então eu fiquei irritado."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "Pourquoi tu as l'air déçu ?" },
            { speaker: "Marco", text: "Le film était vraiment décevant. Je m'attendais à quelque chose de surprenant." },
            { speaker: "Ana", text: "Dommage. Moi, je me suis ennuyée à la maison !" },
            { speaker: "Marco", text: "Ah ! Faisons quelque chose de moins ennuyeux ce week-end." }
        ]),

        grammar(
            "Adjectifs en Participe vs en '-ant'",
            "Les adjectifs en participe passé décrivent un sentiment : ennuyé, énervé, surpris, intéressé, déçu. Les adjectifs en '-ant' décrivent la cause du sentiment : ennuyeux, énervant, surprenant, intéressant, décevant. 'Je suis ennuyé' (sentiment) vs 'Le livre est ennuyeux' (cause)."
        ),

        list([

            "ennuyé (sentiment) — ennuyeux (cause)",

            "énervé (sentiment) — énervant (cause)",

            "surpris (sentiment) — surprenant (cause)",

            "intéressé (sentiment) — intéressant (cause)",

            "déçu (sentiment) — décevant (cause)"

        ]),

        tip(
            "Les Gens Ressentent, les Choses Causent",
            "Règle simple : les personnes ressentent l'adjectif en participe ('Je suis intéressé'), tandis que les choses, situations ou personnes qui causent le sentiment prennent la forme en '-ant' ('Le livre est intéressant')."
        ),

        culture(
            "Parler de ses Émotions",
            "Dans une conversation en français courant, on exagère souvent les émotions pour insister, en disant par exemple 'Je suis tellement ennuyé' ou 'C'était tellement décevant' pour être plus expressif."
        ),

        quiz(
            "Quelle phrase décrit ce que ressent une personne ?",
            ["Le film est ennuyeux.", "Je suis ennuyé.", "Le cours est énervant.", "C'est un voyage surprenant."],
            1,
            "'Je suis ennuyé' utilise l'adjectif en participe pour décrire un sentiment."
        ),

        quiz(
            "Quel adjectif décrit ce qui cause de la surprise ?",
            ["surpris", "surprenant", "surprend", "surprise"],
            1,
            "'Surprenant' décrit la cause du sentiment : 'C'est un voyage surprenant.'"
        ),

        quiz(
            "Quelle phrase est grammaticalement correcte ?",
            ["Je suis intéressant par le film.", "Je suis intéressé par le film.", "Le film est intéressé.", "Je ressens intéressant."],
            1,
            "Pour décrire son propre sentiment, on utilise la forme en participe : 'Je suis intéressé par le film.'"
        )

    ],

    summary: {

        tip:
            "Pratique à décrire quelque chose qui t'est arrivé récemment en utilisant un adjectif en participe et un en '-ant', comme 'Le test était énervant, alors je me suis énervé.'",

        review: [

            "ennuyé/ennuyeux, énervé/énervant",

            "surpris/surprenant",

            "intéressé/intéressant",

            "déçu/décevant"

        ]

    }

};
