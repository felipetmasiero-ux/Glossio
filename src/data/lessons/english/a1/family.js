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

export const familyLesson = {

    id: "english-a1-family",

    language: "english",

    level: "A1",

    category: "Basics",

    order: 6,

    title: "Family",

    subtitle:
        "Talk about your family members.",

    description:
        "Learn the words for family members and how to talk about your parents, siblings and relatives.",

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

        "Use possessive 's to show relationships",

        "Ask about someone else's family"

    ],

    vocabulary: vocabulary([
        "mother",
        "father",
        "parents",
        "brother",
        "sister",
        "sibling",
        "son",
        "daughter",
        "grandmother",
        "grandfather"
    ]),

    blocks: [

        heading("Meet the Family"),

        paragraph(
            "Talking about family is one of the most common topics in everyday conversation. In English, family words don't change with gender the way they might in other languages — for example, 'sibling' works for both brothers and sisters."
        ),

        examples([
            {
                text: "This is my mother, and this is my father.",
                translation: "Esta é minha mãe, e este é meu pai."
            },

            {
                text: "I have one brother and two sisters.",
                translation: "Eu tenho um irmão e duas irmãs."
            },

            {
                text: "My grandmother lives with my parents.",
                translation: "Minha avó mora com meus pais."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Do you have any siblings?" },
            { speaker: "Marco", text: "Yes, I have a brother and a sister. What about you?" },
            { speaker: "Anna", text: "I'm an only child, but I have four cousins." },
            { speaker: "Marco", text: "That sounds fun! Are you close to them?" },
            { speaker: "Anna", text: "Yes, very close. We see each other every weekend." }
        ]),

        grammar(
            "Possessive 's",
            "Add 's to a name or noun to show that something belongs to someone: 'my sister's name', 'Marco's mother'. If the word already ends in 's', you can just add an apostrophe: 'my parents' house'."
        ),

        list([

            "mother, father → parents",

            "brother, sister → siblings",

            "son, daughter → children",

            "grandmother, grandfather → grandparents"

        ]),

        tip(
            "Only Child",
            "If you don't have any brothers or sisters, you can say: 'I'm an only child.'"
        ),

        culture(
            "Family Life",
            "Family structures vary a lot between cultures. In some English-speaking countries, young adults often move out to live independently, while in others multi-generational households are common — so it's fine to ask politely about someone's family situation."
        ),

        quiz(
            "Which word means 'brother or sister'?",
            ["Parent", "Sibling", "Cousin", "Relative"],
            1,
            "'Sibling' is the gender-neutral word for brother or sister."
        ),

        quiz(
            "How do you show that a house belongs to your parents?",
            ["My parents house", "My parent's house", "My parents' house", "My parents is house"],
            2,
            "Since 'parents' already ends in 's', just add an apostrophe: 'my parents' house'."
        ),

        quiz(
            "What do you call someone with no brothers or sisters?",
            ["A single child", "A lonely child", "A one child", "An only child"],
            3,
            "'An only child' is the correct expression."
        )

    ],

    summary: {

        tip:
            "Try describing your own family out loud using the vocabulary from this lesson.",

        review: [

            "mother, father → parents",

            "brother, sister → siblings",

            "son, daughter → children",

            "Possessive 's: my sister's name",

            "Do you have any siblings?"

        ]

    }

};
