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

export const foodLesson = {

    id: "french-a1-food",

    language: "french",

    level: "A1",

    category: "Daily Life",

    topic: "food",

    order: 6,

    title: "Food",

    subtitle:
        "Talk about meals, drinks and food preferences.",

    description:
        "Learn common food and drink vocabulary and how to talk about what you like, want and eat every day.",

    cover: "/covers/food.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 30,

    tags: [
        "food",
        "vocabulary",
        "daily life"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Name common foods and drinks",

        "Say what you like and don't like",

        "Use 'du', 'de la' and 'des' correctly",

        "Talk about meals of the day"

    ],

    vocabulary: vocabulary([
        "pain",
        "riz",
        "poulet",
        "poisson",
        "légumes",
        "fruits",
        "eau",
        "café",
        "j'ai faim",
        "j'ai soif"
    ]),

    blocks: [

        heading("Everyday Food"),

        paragraph(
            "Food is one of the most useful topics for beginners, since you'll use it every day — ordering, shopping and talking about your preferences. French uses partitive articles ('du', 'de la', 'des') to talk about food in general or unspecified quantities."
        ),

        examples([
            {
                text: "J'aime le riz et le poulet.",
                translation: "Eu gosto de arroz e frango."
            },

            {
                text: "Tu veux du café ?",
                translation: "Você quer um pouco de café?"
            },

            {
                text: "Je ne mange pas de poisson, mais j'adore les légumes.",
                translation: "Eu não como peixe, mas eu adoro vegetais."
            }
        ]),

        dialogue([
            { speaker: "Serveur", text: "Vous avez faim ? Qu'est-ce que vous voulez manger ?" },
            { speaker: "Sofia", text: "Oui, j'ai faim ! Vous avez du poisson ?" },
            { speaker: "Serveur", text: "Oui, nous en avons. Vous voulez du riz avec ?" },
            { speaker: "Sofia", text: "Oui, s'il vous plaît. Et de l'eau aussi." }
        ]),

        grammar(
            "Du, de la, des",
            "Use 'du' with masculine nouns ('du pain'), 'de la' with feminine nouns ('de la viande') and 'des' with plurals ('des légumes') to talk about an unspecified amount of food. In negative sentences, these usually become simply 'de': 'Je ne mange pas de poisson.'"
        ),

        list([

            "petit-déjeuner : pain, café, fruits",

            "déjeuner : riz, poulet, légumes",

            "dîner : poisson, légumes, eau",

            "J'aime... / Je n'aime pas...",

            "Tu veux du/de la/des...?"

        ]),

        tip(
            "Un café, s'il vous plaît",
            "In casual conversation, people often say 'un café' or 'une eau' to mean 'a cup of coffee' or 'a bottle/glass of water', even though 'café' and 'eau' are usually treated as uncountable."
        ),

        culture(
            "Meal Times",
            "Meal times in France tend to be fairly fixed: lunch is usually around 12-1 PM and dinner around 7:30-8 PM. Eating between meals is less common than in some other countries."
        ),

        quiz(
            "Which word is correct? 'Tu as ___ pain ?'",
            ["du", "de la", "des", "de"],
            0,
            "Use 'du' with masculine nouns: 'Tu as du pain ?'"
        ),

        quiz(
            "Which word is correct? 'Je veux ___ eau, s'il te plaît.'",
            ["du", "de la", "des", "de l'"],
            3,
            "Before a vowel sound, 'de la' becomes 'de l'': 'Je veux de l'eau.'"
        ),

        quiz(
            "How do you say you are hungry?",
            ["J'ai faim.", "Je suis faim.", "J'ai la faim.", "Je faim."],
            0,
            "The correct expression is 'J'ai faim.'"
        )

    ],

    summary: {

        tip:
            "Practice describing your favorite meal using 'J'aime...' and 'du/de la/des' with food words.",

        review: [

            "le pain, le riz, le poulet, le poisson, les légumes, les fruits",

            "J'ai faim. / J'ai soif.",

            "du (masc.) / de la (fem.) / des (plur.)",

            "petit-déjeuner, déjeuner, dîner"

        ]

    }

};
