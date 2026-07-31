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

export const hobbiesLesson = {

    id: "portuguese-a1-hobbies",

    language: "portuguese",

    level: "A1",

    category: "Daily Life",

    topic: "hobbies",

    order: 12,

    title: "Hobbies",

    subtitle:
        "Talk about free time and what you like to do.",

    description:
        "Learn how to talk about hobbies and free-time activities using 'gostar de' in Portuguese.",

    cover: "/covers/hobbies.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 30,

    tags: [
        "hobbies",
        "vocabulary",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Name common hobbies and free-time activities",

        "Use 'gostar de' to say what you like",

        "Use 'jogar' and 'tocar' correctly",

        "Ask someone about their hobbies"

    ],

    vocabulary: vocabulary([
        "leitura",
        "música",
        "esporte",
        "dança",
        "pintura",
        "cinema",
        "jogar",
        "gostar",
        "caminhada",
        "jardinagem"
    ]),

    blocks: [

        heading("Free Time"),

        paragraph(
            "Talking about hobbies is a great way to get to know someone. In Portuguese, use 'gostar de' + noun or infinitive to say what you like: 'Eu gosto de música.' / 'Eu gosto de ler.'"
        ),

        examples([
            {
                text: "Eu gosto de leitura e música.",
                translation: "I like reading and music."
            },

            {
                text: "Ela adora caminhada e jardinagem.",
                translation: "She loves hiking and gardening."
            },

            {
                text: "Ele toca violão e faz pintura.",
                translation: "He plays guitar and does painting."
            }
        ]),

        dialogue([
            { speaker: "Camila", text: "O que você gosta de fazer no seu tempo livre?" },
            { speaker: "Thomas", text: "Eu gosto de esporte, principalmente caminhada. E você?" },
            { speaker: "Camila", text: "Eu gosto de pintura e cinema." },
            { speaker: "Thomas", text: "Você toca algum instrumento?" },
            { speaker: "Camila", text: "Não, mas eu adoro ouvir música." }
        ]),

        grammar(
            "Jogar vs Tocar",
            "Use 'jogar' for games and sports: 'jogar futebol', 'jogar cartas'. Use 'tocar' for musical instruments: 'tocar violão', 'tocar piano'."
        ),

        list([

            "Eu gosto de leitura / música / esporte.",

            "Eu gosto de dança / pintura / cinema.",

            "jogar + esporte ou jogo",

            "tocar + instrumento musical",

            "fazer caminhada / jardinagem"

        ]),

        tip(
            "Gostar, Adorar, Detestar",
            "Use 'gostar de' (to like), 'adorar' (to love) or 'detestar' (to hate) followed by a noun or a verb in the infinitive to talk about your preferences."
        ),

        culture(
            "Popular Hobbies in Brazil",
            "Hobbies like soccer, hiking and going to the movies are very popular in Brazil. Many neighborhoods also have local groups for dance, music or gardening that welcome beginners."
        ),

        quiz(
            "Which sentence is correct for playing an instrument?",
            ["Eu jogo violão.", "Eu toco violão.", "Eu jogo de violão.", "Eu toco de violão."],
            1,
            "Use 'tocar' with instruments: 'Eu toco violão.'"
        ),

        quiz(
            "Which sentence is correct for a sport?",
            ["Eu toco futebol.", "Eu jogo futebol.", "Eu jogo de futebol.", "Eu toco de futebol."],
            1,
            "Use 'jogar' with sports and games: 'Eu jogo futebol.'"
        ),

        quiz(
            "Which word means 'hiking'?",
            ["Jardinagem", "Pintura", "Caminhada", "Dança"],
            2,
            "'Caminhada' means 'hiking' in Portuguese."
        )

    ],

    summary: {

        tip:
            "Practice talking about your own hobbies out loud using 'Eu gosto de...', 'jogar/tocar' and the vocabulary from this lesson.",

        review: [

            "Eu gosto de leitura / música / esporte.",

            "jogar (sport/game) vs tocar (instrument)",

            "gostar de, adorar, detestar + noun or infinitive",

            "caminhada, jardinagem, pintura, dança"

        ]

    }

};
