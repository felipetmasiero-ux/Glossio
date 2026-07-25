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

export const numbersLesson = {

    id: "english-a1-numbers",

    language: "english",

    level: "A1",

    category: "Basics",

    order: 4,

    title: "Numbers",

    subtitle:
        "Count from zero to one hundred and talk about age.",

    description:
        "Learn the cardinal numbers in English and how to use them to count, share phone numbers and talk about age.",

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

        "Say your age in English",

        "Share a phone number",

        "Ask 'how many' and 'how old'"

    ],

    vocabulary: vocabulary([

        { word: "zero", translation: "zero" },

        { word: "one", translation: "um" },

        { word: "two", translation: "dois" },

        { word: "three", translation: "três" },

        { word: "four", translation: "quatro" },

        { word: "five", translation: "cinco" },

        { word: "ten", translation: "dez" },

        { word: "twenty", translation: "vinte" },

        { word: "hundred", translation: "cem" },

        {
            word: "how many",
            translation: "quantos(as)",
            example: "How many brothers do you have?"
        },

        {
            word: "how old",
            translation: "quantos anos",
            example: "How old are you?"
        }

    ]),

    blocks: [

        heading("Counting in English"),

        paragraph(
            "English numbers follow a simple pattern once you learn the numbers from one to twenty. After twenty, you just combine a tens word with a units word, using a hyphen: twenty-one, thirty-two, forty-five."
        ),

        list([

            "1 one · 2 two · 3 three · 4 four · 5 five",

            "6 six · 7 seven · 8 eight · 9 nine · 10 ten",

            "11 eleven · 12 twelve · 13 thirteen · 14 fourteen · 15 fifteen",

            "20 twenty · 30 thirty · 40 forty · 50 fifty",

            "100 one hundred"

        ]),

        examples([
            {
                text: "I have two brothers and one sister.",
                translation: "Eu tenho dois irmãos e uma irmã."
            },

            {
                text: "There are twenty-five students in my class.",
                translation: "Há vinte e cinco alunos na minha turma."
            },

            {
                text: "My phone number is oh-two-one, four-five-six, seven-eight-nine-zero.",
                translation: "Meu número de telefone é 021 456 7890."
            }
        ]),

        grammar(
            "Numbers 21-99",
            "From 21 to 99, combine the tens word and the units word with a hyphen: twenty-one, thirty-five, ninety-nine. Only the units word changes; the tens word ('twenty', 'thirty'...) stays the same."
        ),

        dialogue([
            { speaker: "Interviewer", text: "How old are you?" },
            { speaker: "Lucas", text: "I'm twenty-two years old." },
            { speaker: "Interviewer", text: "And how many siblings do you have?" },
            { speaker: "Lucas", text: "I have one brother and two sisters." }
        ]),

        tip(
            "Saying Phone Numbers",
            "In English, phone numbers are usually said one digit at a time, and '0' is often read as 'oh': 'oh-two-one'."
        ),

        culture(
            "Lucky and Unlucky Numbers",
            "In many English-speaking countries, 13 is considered an unlucky number — some buildings even skip the 13th floor! Meanwhile, 7 is often seen as a lucky number."
        ),

        quiz(
            "How do you write 35 in words?",
            ["Three-five", "Thirtyfive", "Third-five", "Thirty-five"],
            3,
            "Numbers from 21-99 combine the tens and units with a hyphen: thirty-five."
        ),

        quiz(
            "Which question asks about someone's age?",
            ["How old are you?", "How many?", "How much?", "How are you?"],
            0,
            "'How old are you?' is used to ask about age."
        ),

        quiz(
            "What comes after 'ninety-nine'?",
            ["Nine hundred", "One hundred", "Ninety-ten", "Ten hundred"],
            1,
            "After ninety-nine (99) comes one hundred (100)."
        )

    ],

    summary: {

        tip:
            "Practice counting out loud from 1 to 100, and try saying your own phone number digit by digit.",

        review: [

            "1-10: one to ten",

            "20, 30, 40... hundred",

            "21-99 use a hyphen: twenty-one",

            "How old are you? — I'm ... years old.",

            "How many...? — I have ..."

        ]

    }

};
