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

export const familyLesson = {

    id: "french-a1-family",

    language: "french",

    level: "A1",

    category: "Basics",

    topic: "family",

    order: 5,

    title: "Família",

    subtitle:
        "Fale sobre os membros da sua família em francês.",

    description:
        "Aprenda as palavras para os membros da família e como falar sobre pais, irmãos e parentes.",

    cover: "/covers/family.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 25,

    tags: [
        "family",
        "vocabulary",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Name close family members",

        "Talk about your parents and siblings",

        "Use 'avoir' to describe relationships",

        "Ask about someone else's family"

    ],

    vocabulary: vocabulary([
        "mère",
        "père",
        "parents",
        "frère",
        "sœur",
        "fratrie",
        "fils",
        "fille",
        "grand-mère",
        "grand-père"
    ]),

    blocks: [

        heading("Meet the Family"),

        paragraph(
            "Talking about family is one of the most common topics in everyday conversation. In French, most family words change form between masculine and feminine — for example, 'frère' (brother) and 'sœur' (sister) are completely different words, not just endings."
        ),

        examples([
            {
                text: "Voici ma mère, et voici mon père.",
                translation: "Esta é minha mãe, e este é meu pai."
            },

            {
                text: "J'ai un frère et deux sœurs.",
                translation: "Eu tenho um irmão e duas irmãs."
            },

            {
                text: "Ma grand-mère habite avec mes parents.",
                translation: "Minha avó mora com meus pais."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Tu as des frères et sœurs ?" },
            { speaker: "Marco", text: "Oui, j'ai un frère et une sœur. Et toi ?" },
            { speaker: "Anna", text: "Je suis fille unique, mais j'ai quatre cousins." },
            { speaker: "Marco", text: "Ça a l'air sympa ! Vous êtes proches ?" },
            { speaker: "Anna", text: "Oui, très proches. On se voit tous les week-ends." }
        ]),

        grammar(
            "Avoir + des",
            "Use 'avoir' followed by 'des' before a plural noun to say you have several people or things: 'J'ai des frères.', 'J'ai des cousins.' Use 'un/une' for exactly one: 'J'ai un frère et une sœur.'"
        ),

        list([

            "la mère, le père → les parents",

            "le frère, la sœur → la fratrie",

            "le fils, la fille → les enfants",

            "la grand-mère, le grand-père → les grands-parents"

        ]),

        tip(
            "Only Child",
            "If you don't have any brothers or sisters, you can say: 'Je suis fils unique' (for a man) or 'Je suis fille unique' (for a woman)."
        ),

        culture(
            "Family Life",
            "Family structures vary a lot between cultures. In France, young adults often move out to live independently around university age, but staying close to the family home and visiting often on weekends is still very common."
        ),

        quiz(
            "Which word means 'daughter'?",
            ["Le fils", "La fille", "La sœur", "La mère"],
            1,
            "'La fille' means both 'girl' and 'daughter', depending on context."
        ),

        quiz(
            "How do you say 'I have a brother and a sister'?",
            ["J'ai un frère et une sœur.", "J'ai des frère et sœur.", "J'ai le frère et la sœur.", "J'ai frère et sœur."],
            0,
            "Use 'un/une' before singular nouns: 'J'ai un frère et une sœur.'"
        ),

        quiz(
            "What do you call someone with no brothers or sisters?",
            ["Un enfant seul", "Un fils unique / une fille unique", "Un enfant triste", "Un cousin unique"],
            1,
            "'Fils unique' or 'fille unique' is the correct expression for an only child."
        )

    ],

    summary: {

        tip:
            "Try describing your own family out loud using the vocabulary from this lesson.",

        review: [

            "la mère, le père → les parents",

            "le frère, la sœur → la fratrie",

            "le fils, la fille → les enfants",

            "avoir + un/une (singular) or des (plural)",

            "Tu as des frères et sœurs ?"

        ]

    }

};
