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

    id: "french-a1-numbers",

    language: "french",

    level: "A1",

    category: "Basics",

    topic: "numbers",

    order: 4,

    title: "Numbers",

    subtitle:
        "Count from zero to one hundred and talk about age.",

    description:
        "Learn the cardinal numbers in French and how to use them to count, share phone numbers and talk about age.",

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

        "Say your age in French",

        "Share a phone number",

        "Ask 'how many' and 'how old'"

    ],

    vocabulary: vocabulary([
        "zéro",
        "un",
        "deux",
        "trois",
        "quatre",
        "cinq",
        "dix",
        "vingt",
        "cent",
        "combien",
        "quel âge as-tu ?"
    ]),

    blocks: [

        heading("Counting in French"),

        paragraph(
            "French numbers follow a simple pattern once you learn the numbers from one to twenty. After twenty, you combine a tens word with a units word, usually with a hyphen: vingt-et-un, trente-deux, quarante-cinq."
        ),

        list([

            "1 un · 2 deux · 3 trois · 4 quatre · 5 cinq",

            "6 six · 7 sept · 8 huit · 9 neuf · 10 dix",

            "11 onze · 12 douze · 13 treize · 14 quatorze · 15 quinze",

            "20 vingt · 30 trente · 40 quarante · 50 cinquante",

            "100 cent"

        ]),

        examples([
            {
                text: "J'ai deux frères et une sœur.",
                translation: "Eu tenho dois irmãos e uma irmã."
            },

            {
                text: "Il y a vingt-cinq élèves dans ma classe.",
                translation: "Há vinte e cinco alunos na minha turma."
            },

            {
                text: "Mon numéro de téléphone est zéro-deux-un, quatre-cinq-six.",
                translation: "Meu número de telefone é 021 456."
            }
        ]),

        grammar(
            "Numbers 21-99",
            "From 21 to 99, combine the tens word and the units word, usually with a hyphen: vingt-et-un, trente-cinq, quatre-vingt-dix-neuf. Note that 'et' appears only before 'un': vingt-et-un, trente-et-un."
        ),

        dialogue([
            { speaker: "Interviewer", text: "Quel âge as-tu ?" },
            { speaker: "Lucas", text: "J'ai vingt-deux ans." },
            { speaker: "Interviewer", text: "Et combien de frères et sœurs as-tu ?" },
            { speaker: "Lucas", text: "J'ai un frère et deux sœurs." }
        ]),

        tip(
            "Saying Phone Numbers",
            "In French, phone numbers are usually said two digits at a time: 'zéro-deux, quarante-cinq' instead of one digit at a time."
        ),

        culture(
            "Lucky and Unlucky Numbers",
            "In France, 13 is often considered an unlucky number, but it also appears on many lottery tickets as a lucky choice. Meanwhile, 7 is widely seen as a lucky number, just like in many other cultures."
        ),

        quiz(
            "How do you write 35 in French?",
            ["Trois-cinq", "Trente-cinq", "Trentecinq", "Treize-cinq"],
            1,
            "Numbers from 21-99 combine the tens and units, usually with a hyphen: trente-cinq."
        ),

        quiz(
            "Which question asks about someone's age?",
            ["Quel âge as-tu ?", "Combien ?", "Comment ça va ?", "Tu viens d'où ?"],
            0,
            "'Quel âge as-tu ?' is used to ask about age."
        ),

        quiz(
            "What comes after 'quatre-vingt-dix-neuf' (99)?",
            ["Neuf cents", "Cent", "Quatre-vingt-dix", "Dix cent"],
            1,
            "After quatre-vingt-dix-neuf (99) comes cent (100)."
        )

    ],

    summary: {

        tip:
            "Practice counting out loud from 1 to 100, and try saying your own phone number two digits at a time.",

        review: [

            "1-10: un à dix",

            "20, 30, 40... cent",

            "21-99 use 'et' only before 'un': vingt-et-un",

            "Quel âge as-tu ? — J'ai ... ans.",

            "Combien...? — J'ai ..."

        ]

    }

};
