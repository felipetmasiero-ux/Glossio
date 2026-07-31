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

export const shoppingLesson = {

    id: "french-a2-shopping",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "shopping",

    order: 2,

    title: "Shopping",

    subtitle:
        "Shop for clothes, compare prices, and handle a store checkout in French.",

    description:
        "Learn shopping vocabulary and how to compare prices and sizes using comparative adjectives.",

    cover: "/covers/shopping.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "shopping",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Use shopping vocabulary in a store",

        "Compare prices and sizes with comparative adjectives",

        "Ask to try on clothes and ask about sizes",

        "Understand receipts, discounts and refunds"

    ],

    vocabulary: vocabulary([
        "caissier",
        "reçu",
        "réduction",
        "cabine d'essayage",
        "taille",
        "remboursement",
        "échanger",
        "client",
        "vitrine",
        "soldes"
    ]),

    blocks: [

        heading("Allons Faire du Shopping"),

        paragraph(
            "Le shopping est un excellent sujet pour pratiquer les comparaisons en français. Quand tu compares deux choses, tu utilises souvent 'plus... que', 'moins... que' ou 'aussi... que'."
        ),

        examples([
            {
                text: "Cette veste est moins chère que celle-là.",
                translation: "Esta jaqueta é mais barata que aquela."
            },

            {
                text: "Je peux essayer une taille plus grande ?",
                translation: "Posso experimentar um tamanho maior?"
            },

            {
                text: "Les chaussures rouges sont plus chères que les noires.",
                translation: "Os sapatos vermelhos são mais caros que os pretos."
            }
        ]),

        dialogue([
            { speaker: "Client", text: "Excusez-moi, cette réduction est encore valable ?" },
            { speaker: "Caissier", text: "Oui, tout à fait. Vous voulez l'essayer d'abord ?" },
            { speaker: "Client", text: "Oui, s'il vous plaît. Où est la cabine d'essayage ?" },
            { speaker: "Caissier", text: "C'est juste là. Voici votre reçu, au cas où vous auriez besoin d'un remboursement." }
        ]),

        grammar(
            "Les Comparatifs",
            "Utilise 'plus... que' pour dire 'plus que' : 'plus cher que'. Utilise 'moins... que' pour 'moins que' : 'moins cher que'. Utilise 'aussi... que' pour une égalité : 'aussi cher que'. L'adjectif s'accorde toujours avec le nom."
        ),

        list([

            "cher → plus cher que / moins cher que",

            "Je peux essayer...? / Où est la cabine d'essayage ?",

            "caissier, reçu, réduction, remboursement",

            "Ce modèle est plus grand/petit/meilleur que celui-là."

        ]),

        tip(
            "L'Accord de l'Adjectif",
            "N'oublie pas d'accorder l'adjectif comparatif avec le nom : 'cette veste est plus chère' (féminin) mais 'ce pull est plus cher' (masculin)."
        ),

        culture(
            "Marchander ou Prix Fixes",
            "Dans la plupart des magasins en France, les prix sont fixes et marchander n'est pas habituel, contrairement aux marchés aux puces, où négocier le prix est tout à fait normal."
        ),

        quiz(
            "Quelle phrase compare correctement deux articles ?",
            ["Ce modèle est plus cher que celui-là.", "Ce modèle est plus cher de celui-là.", "Ce modèle est le plus cher que celui-là.", "Ce modèle cher plus que celui-là."],
            0,
            "On utilise 'plus... que' pour comparer : 'plus cher que celui-là.'"
        ),

        quiz(
            "Comment dit-on que deux articles ont le même prix ?",
            ["plus cher que", "moins cher que", "aussi cher que", "le plus cher"],
            2,
            "'Aussi cher que' exprime une égalité entre deux choses."
        ),

        quiz(
            "Que demandes-tu pour tester un vêtement avant de l'acheter ?",
            ["Je peux essayer ce pull ?", "Je peux rembourser ce pull ?", "Je peux échanger ce pull ?", "Je peux réduire ce pull ?"],
            0,
            "'Je peux essayer...?' sert à demander si on peut tester un vêtement."
        )

    ],

    summary: {

        tip:
            "Pratique à comparer deux objets que tu possèdes en utilisant des comparatifs, comme 'Mon téléphone est plus récent que celui de ma sœur.'",

        review: [

            "caissier, reçu, réduction, remboursement",

            "plus cher que / moins cher que / aussi cher que",

            "Je peux essayer...? / Où est la cabine d'essayage ?",

            "Ce modèle est plus grand/moins cher/meilleur que celui-là."

        ]

    }

};
