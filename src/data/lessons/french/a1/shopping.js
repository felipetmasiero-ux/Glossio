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

export const shoppingLesson = {

    id: "french-a1-shopping",

    language: "french",

    level: "A1",

    category: "Daily Life",

    topic: "shopping",

    order: 11,

    title: "Compras",

    subtitle:
        "Pergunte sobre preços e faça compras com confiança em francês.",

    description:
        "Aprenda a pedir coisas, perguntar preços e pagar em uma loja usando expressões comuns de compras em francês.",

    cover: "/covers/shopping.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 30,

    tags: [
        "shopping",
        "vocabulary",
        "daily life"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Ask how much something costs",

        "Say if something is expensive or cheap",

        "Ask to try something on",

        "Pay in cash or by card"

    ],

    vocabulary: vocabulary([
        "ça coûte combien ?",
        "cher",
        "bon marché",
        "prix",
        "payer",
        "en espèces",
        "par carte",
        "magasin",
        "caisse",
        "essayer"
    ]),

    blocks: [

        heading("At the Store"),

        paragraph(
            "Shopping in French requires a few key questions and expressions: asking for something politely, checking the price, and choosing how to pay. 'Je voudrais...' is the most polite way to ask for something in a shop."
        ),

        examples([
            {
                text: "Je voudrais essayer cette veste, s'il vous plaît.",
                translation: "Eu gostaria de experimentar essa jaqueta, por favor."
            },

            {
                text: "Ça coûte combien ? — Le prix est de vingt euros.",
                translation: "Quanto custa? — O preço é vinte euros."
            },

            {
                text: "C'est trop cher ! Vous avez quelque chose de plus bon marché ?",
                translation: "Está muito caro! Vocês têm algo mais barato?"
            }
        ]),

        dialogue([
            { speaker: "Client", text: "Excusez-moi, où est la caisse ?" },
            { speaker: "Vendeur", text: "C'est juste là, à côté de la porte." },
            { speaker: "Client", text: "Merci. Ça coûte combien, ce pull ?" },
            { speaker: "Vendeur", text: "Trente euros. Vous payez en espèces ou par carte ?" },
            { speaker: "Client", text: "Par carte, s'il vous plaît." }
        ]),

        grammar(
            "Trop + adjective",
            "Use 'trop' before an adjective to say something is 'too much': 'C'est trop cher.' (It's too expensive.) To ask for a cheaper option, say 'Vous avez quelque chose de plus bon marché ?'"
        ),

        list([

            "Ça coûte combien ?",

            "C'est cher / C'est bon marché.",

            "Je voudrais essayer...",

            "En espèces ou par carte ?",

            "Où est la caisse ?"

        ]),

        tip(
            "Polite Requests",
            "Starting a request with 'Je voudrais...' instead of 'Je veux...' sounds much more polite in French, similar to using 'I would like' instead of 'I want' in English."
        ),

        culture(
            "Shopping Hours",
            "In France, many small shops close for lunch between 12 PM and 2 PM, and most stores are closed on Sundays, so it's useful to check opening hours before heading out."
        ),

        quiz(
            "How do you ask the price of something?",
            ["Ça coûte combien ?", "Où est la caisse ?", "Je voudrais essayer", "C'est cher"],
            0,
            "'Ça coûte combien ?' is the standard way to ask about a price."
        ),

        quiz(
            "Which word means 'expensive'?",
            ["Bon marché", "Cher", "Payer", "Essayer"],
            1,
            "'Cher' means 'expensive' in French."
        ),

        quiz(
            "Which sentence politely asks to try something on?",
            ["Je veux ça.", "Je voudrais essayer ça, s'il vous plaît.", "Ça coûte combien ?", "C'est trop cher."],
            1,
            "'Je voudrais essayer...' is the polite way to ask to try something on."
        )

    ],

    summary: {

        tip:
            "Practice a short shopping conversation out loud: ask the price, say if it's expensive, and choose how to pay.",

        review: [

            "Ça coûte combien ? — Le prix est de...",

            "cher vs bon marché",

            "Je voudrais essayer...",

            "en espèces vs par carte"

        ]

    }

};
