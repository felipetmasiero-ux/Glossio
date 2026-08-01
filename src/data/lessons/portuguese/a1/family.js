import { familyBlocks } from "../../../grammar/shared/portuguese/family";
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

    id: "portuguese-a1-family",

    language: "portuguese",

    level: "A1",

    category: "Basics",

    topic: "family",

    order: 5,

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

        "Use 'ter' to describe relationships",

        "Ask about someone else's family"

    ],

    vocabulary: vocabulary([
        "mãe",
        "pai",
        "pais",
        "irmão",
        "irmã",
        "irmãos",
        "filho",
        "filha",
        "avó",
        "avô"
    ]),

    blocks: [

        heading("Meet the Family"),

        paragraph(
            "Talking about family is one of the most common topics in everyday conversation. In Portuguese, most family words change between masculine and feminine — for example, 'irmão' (brother) and 'irmã' (sister) look similar but are different words."
        ),

        examples([
            {
                text: "Esta é a minha mãe, e este é o meu pai.",
                translation: "This is my mother, and this is my father."
            },

            {
                text: "Eu tenho um irmão e duas irmãs.",
                translation: "I have one brother and two sisters."
            },

            {
                text: "Minha avó mora com os meus pais.",
                translation: "My grandmother lives with my parents."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Você tem irmãos?" },
            { speaker: "Marco", text: "Sim, eu tenho um irmão e uma irmã. E você?" },
            { speaker: "Anna", text: "Eu sou filha única, mas tenho quatro primos." },
            { speaker: "Marco", text: "Que legal! Vocês são próximos?" },
            { speaker: "Anna", text: "Sim, muito próximos. Nos vemos todo fim de semana." }
        ]),

        grammar(familyBlocks[0].title, familyBlocks[0].text),

        list([

            "mãe, pai → pais",

            "irmão, irmã → irmãos",

            "filho, filha → filhos",

            "avó, avô → avós"

        ]),

        tip(
            "Only Child",
            "If you don't have any brothers or sisters, you can say: 'Eu sou filho único' (for a man) or 'Eu sou filha única' (for a woman)."
        ),

        culture(
            "Family Life",
            "Family structures vary a lot between cultures. In Brazil, young adults often move out to live independently around university age, but staying close to the family and visiting often on weekends is still very common."
        ),

        quiz(
            "Which word means 'daughter'?",
            ["Filho", "Filha", "Irmã", "Mãe"],
            1,
            "'Filha' means 'daughter' in Portuguese."
        ),

        quiz(
            "How do you say 'I have a brother and a sister'?",
            ["Eu tenho um irmão e uma irmã.", "Eu tenho irmãos e irmã.", "Eu tenho o irmão e a irmã.", "Eu tenho irmão e irmã um."],
            0,
            "Use 'um/uma' before singular nouns: 'Eu tenho um irmão e uma irmã.'"
        ),

        quiz(
            "What do you call someone with no brothers or sisters?",
            ["Uma criança sozinha", "Filho único / filha única", "Uma criança triste", "Um primo único"],
            1,
            "'Filho único' or 'filha única' is the correct expression for an only child."
        )

    ],

    summary: {

        tip:
            "Try describing your own family out loud using the vocabulary from this lesson.",

        review: [

            "mãe, pai → pais",

            "irmão, irmã → irmãos",

            "filho, filha → filhos",

            "ter + um/uma (singular) or plural",

            "Você tem irmãos?"

        ]

    }

};
