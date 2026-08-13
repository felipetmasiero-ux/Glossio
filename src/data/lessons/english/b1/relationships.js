import { relationshipsBlocks } from "../../../grammar/shared/english/b1/relationships";
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

export const relationshipsLesson = {

    id: "english-b1-relationships",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "relationships",

    order: 3,

    title: "Relationships & Personality",

    subtitle:
        "Descreva pessoas e relacionamentos em inglês usando orações relativas definidoras com 'who', 'which', 'that' e 'where'.",

    description:
        "Aprenda vocabulário de personalidade e relacionamentos, e como usar orações relativas definidoras para descrever pessoas, lugares e coisas.",

    cover: "/covers/relationships.webp",

    estimatedTime: 10,

    difficulty: 3,

    xp: 35,

    tags: [
        "relationships",
        "personality",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Describe someone's personality in detail",

        "Talk about friendships and relationships",

        "Use defining relative clauses with 'who', 'which', 'that' and 'where'",

        "Know when the relative pronoun can be omitted"

    ],

    vocabulary: vocabulary([
        "personality",
        "trustworthy",
        "outgoing",
        "easy-going",
        "reliable",
        "stubborn",
        "get along with",
        "close friend",
        "acquaintance",
        "trust",
        "argument",
        "make up",
        "in a relationship",
        "break up",
        "get on someone's nerves",
        "supportive",
        "honest",
        "sense of humor"
    ]),

    blocks: [

        heading("Describing People and Relationships"),

        paragraph(
            "To describe people, places or things more precisely, English uses defining relative clauses: 'who' for people, 'which'/'that' for things, and 'where' for places. They give essential information, so no comma is used."
        ),

        examples([
            {
                text: "She's the friend who always makes me laugh, even on a bad day.",
                translation: "Ela é a amiga que sempre me faz rir, mesmo num dia ruim."
            },
            {
                text: "That's the café where we met for the first time.",
                translation: "Aquele é o café onde nos conhecemos pela primeira vez."
            },
            {
                text: "He's the kind of person that gets along with everyone.",
                translation: "Ele é o tipo de pessoa que se dá bem com todo mundo."
            },
            {
                text: "I don't trust people who never admit their mistakes.",
                translation: "Eu não confio em pessoas que nunca admitem seus erros."
            },
            {
                text: "The colleague I mentioned is actually a really close friend now.",
                translation: "O colega que eu mencionei na verdade é um amigo bem próximo agora."
            },
            {
                text: "We had an argument that lasted the whole weekend.",
                translation: "Tivemos uma discussão que durou o fim de semana inteiro."
            }
        ]),

        dialogue([
            { speaker: "Isabel", text: "Have you met Ben's new girlfriend?" },
            { speaker: "Daniel", text: "Yeah, she seems really outgoing. She's the type of person who talks to everyone at a party." },
            { speaker: "Isabel", text: "That's true! Ben's usually so shy, but she really brings out a different side of him." },
            { speaker: "Daniel", text: "They actually met at that coffee shop where we always study." },
            { speaker: "Isabel", text: "No way! Small world. I hope they get along well — Ben can be a little stubborn sometimes." },
            { speaker: "Daniel", text: "True, but he's also one of the most honest and reliable people I know." },
            { speaker: "Isabel", text: "Definitely. I just hope they don't have too many arguments about little things." },
            { speaker: "Daniel", text: "I'm sure they'll be fine. They seem like a great match." }
        ]),

        grammar(relationshipsBlocks[0].title, relationshipsBlocks[0].text),

        list([

            "who — people",

            "which / that — things",

            "where — places",

            "No comma in defining relative clauses",

            "who/that/which can be omitted as the object"

        ]),

        tip(
            "Defining vs Non-Defining",
            "Don't confuse this with non-defining relative clauses (which use commas and add extra, non-essential information, like 'My sister, who lives in London, called me'). At this level, focus on defining clauses — no commas, essential information."
        ),

        culture(
            "Describing People Honestly",
            "Among close friends in English-speaking cultures, describing someone's personality honestly — even mentioning a flaw like 'stubborn' — is common and usually seen as affectionate, not rude, when said with the right tone."
        ),

        quiz(
            "Choose the correct relative pronoun: \"She's the person ___ helped me move last year.\"",
            ["which", "who", "where", "when"],
            1,
            "'Who' is used for people in a relative clause."
        ),

        quiz(
            "Choose the correct sentence.",
            [
                "That's the restaurant which we had our first date.",
                "That's the restaurant where we had our first date.",
                "That's the restaurant who we had our first date.",
                "That's the restaurant when we had our first date."
            ],
            1,
            "'Where' introduces a relative clause about a place."
        ),

        quiz(
            "Which sentence can naturally omit the relative pronoun?",
            [
                "The book that is on the table is mine.",
                "The friend that I told you about just called.",
                "The city where I was born is beautiful.",
                "The person who called is my colleague."
            ],
            1,
            "When the relative pronoun is the object of the clause, it can be omitted: 'The friend I told you about just called.'"
        )

    ],

    summary: {

        tip:
            "Practice describing people you know using 'who', things using 'that'/'which', and places using 'where' — no commas needed.",

        review: [

            "who / which / that / where in defining relative clauses",

            "Omitting the pronoun when it's the object",

            "trustworthy, outgoing, reliable, stubborn",

            "get along with, break up, make up"

        ]

    }

};
