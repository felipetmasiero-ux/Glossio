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

export const numbersLesson = {

    id: "portuguese-a1-numbers",

    language: "portuguese",

    level: "A1",

    category: "Basics",

    topic: "numbers",

    order: 4,

    title: "Numbers",

    subtitle:
        "Count from zero to one hundred and talk about age.",

    description:
        "Learn the cardinal numbers in Portuguese and how to use them to count, share phone numbers and talk about age.",

    cover: "/covers/numbers.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 25,

    tags: [
        "numbers",
        "vocabulary",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary"
    ],

    objectives: [

        "Count from 0 to 100",

        "Say your age in Portuguese",

        "Share a phone number",

        "Ask 'how many' and 'how old'"

    ],

    vocabulary: vocabulary([
        "zero",
        "um",
        "dois",
        "três",
        "quatro",
        "cinco",
        "dez",
        "vinte",
        "cem",
        "quantos",
        "quantos anos"
    ]),

    blocks: [

        heading("Counting in Portuguese"),

        paragraph(
            "Portuguese numbers follow a simple pattern once you learn the numbers from one to twenty. After twenty, you combine a tens word with a units word, using 'e': vinte e um, trinta e dois, quarenta e cinco."
        ),

        list([

            "1 um · 2 dois · 3 três · 4 quatro · 5 cinco",

            "6 seis · 7 sete · 8 oito · 9 nove · 10 dez",

            "11 onze · 12 doze · 13 treze · 14 quatorze · 15 quinze",

            "20 vinte · 30 trinta · 40 quarenta · 50 cinquenta",

            "100 cem"

        ]),

        examples([
            {
                text: "Eu tenho dois irmãos e uma irmã.",
                translation: "I have two brothers and one sister."
            },

            {
                text: "Há vinte e cinco alunos na minha turma.",
                translation: "There are twenty-five students in my class."
            },

            {
                text: "Meu número de telefone é zero-dois-um, quatro-cinco-seis.",
                translation: "My phone number is 021 456."
            }
        ]),

        grammar(
            "Numbers 21-99",
            "From 21 to 99, combine the tens word and the units word with 'e': vinte e um, trinta e cinco, noventa e nove. 'E' always appears between the tens and the units."
        ),

        dialogue([
            { speaker: "Interviewer", text: "Quantos anos você tem?" },
            { speaker: "Lucas", text: "Eu tenho vinte e dois anos." },
            { speaker: "Interviewer", text: "E quantos irmãos você tem?" },
            { speaker: "Lucas", text: "Eu tenho um irmão e duas irmãs." }
        ]),

        tip(
            "Saying Phone Numbers",
            "In Portuguese, phone numbers are usually said two digits at a time, or one digit at a time in shorter sequences — both are common depending on the region."
        ),

        culture(
            "Lucky and Unlucky Numbers",
            "In Brazil, 13 is often considered an unlucky number, similar to many other cultures, while 7 is widely seen as a lucky number."
        ),

        quiz(
            "How do you write 35 in Portuguese?",
            ["Três-cinco", "Trinta e cinco", "Trintacinco", "Treze-cinco"],
            1,
            "Numbers from 21-99 combine the tens and units with 'e': trinta e cinco."
        ),

        quiz(
            "Which question asks about someone's age?",
            ["Quantos anos você tem?", "Quantos?", "Como vai?", "De onde você é?"],
            0,
            "'Quantos anos você tem?' is used to ask about age."
        ),

        quiz(
            "What comes after 'noventa e nove' (99)?",
            ["Nove centos", "Cem", "Noventa", "Dez cem"],
            1,
            "After noventa e nove (99) comes cem (100)."
        )

    ],

    summary: {

        tip:
            "Practice counting out loud from 1 to 100, and try saying your own phone number digit by digit.",

        review: [

            "1-10: um a dez",

            "20, 30, 40... cem",

            "21-99 use 'e': vinte e um",

            "Quantos anos você tem? — Eu tenho ... anos.",

            "Quantos...? — Eu tenho ..."

        ]

    }

};
