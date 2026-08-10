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

export const introductionsLesson = {

    id: "english-a1-introductions",

    language: "english",

    level: "A1",

    category: "Basics",

    topic: "introductions",

    order: 2,

    title: "Apresentações",

    subtitle:
        "Apresente-se e conheça novas pessoas em inglês.",

    description:
        "Aprenda a dizer seu nome, perguntar o nome de alguém e dizer de onde você é.",

    cover: "/covers/introductions.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 25,

    tags: [
        "introductions",
        "conversation",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Introduce yourself",

        "Ask someone's name",

        "Say where you are from",

        "Introduce someone else",

        "Answer politely"

    ],

    vocabulary: vocabulary([
        "My name is",
        "What's your name?",
        "I'm from Brazil.",
        "Where are you from?",
        "Nice to meet you.",
        "Likewise.",
        "This is...",
        "Let me introduce myself."
    ]),

    blocks: [

        heading("Introducing Yourself"),

        paragraph(
            "When meeting someone for the first time, introduce yourself clearly and politely. In English, a simple name and a friendly greeting are usually enough to start a conversation."
        ),

        examples([
            {
                text: "Hi! My name is John. Nice to meet you!",
                translation: "Oi! Meu nome é John. Prazer em conhecer você!"
            },

            {
                text: "Let me introduce myself. I'm Sofia.",
                translation: "Deixe-me me apresentar. Eu sou a Sofia."
            },

            {
                text: "I'm from Brazil.",
                translation: "Eu sou do Brasil."
            }
        ]),

        dialogue([
            { speaker: "Marco", text: "Hi! I don't think we've met. I'm Marco." },
            { speaker: "Sofia", text: "Nice to meet you, Marco. I'm Sofia." },
            { speaker: "Marco", text: "Nice to meet you too. Where are you from?" },
            { speaker: "Sofia", text: "I'm from Brazil. What about you?" },
            { speaker: "Marco", text: "I'm from Italy." }
        ]),

        grammar(
            "I am / I'm",
            "Use 'I am' (or the short form 'I'm') to talk about yourself: 'I am Sofia' or 'I'm Sofia'. Use 'you are' ('you're') to talk about the other person: 'You are from Italy' or 'You're from Italy'."
        ),

        tip(
            "Tip",
            "Always smile and make eye contact when introducing yourself — it makes you sound more confident and friendly."
        ),

        culture(
            "Making Introductions",
            "In most English-speaking countries, a handshake is common in formal situations, while a simple wave or 'hi' is enough between friends or classmates."
        ),

        heading("Asking About Others"),

        paragraph(
            "Once you've introduced yourself, it's natural to ask about the other person: their name, where they are from, or who they are with."
        ),

        examples([
            {
                text: "What's your name?",
                translation: "Qual é o seu nome?"
            },

            {
                text: "Where are you from?",
                translation: "De onde você é?"
            },

            {
                text: "This is my friend, Marco.",
                translation: "Este é meu amigo, Marco."
            }
        ]),

        list([
            "My name is...",
            "I'm from...",
            "What's your name?",
            "Where are you from?",
            "Nice to meet you.",
            "This is..."
        ]),

        quiz(
            "How do you introduce yourself politely?",
            ["What's your name?", "My name is...", "Where are you from?", "Bye!"],
            1,
            "'My name is...' is the standard way to introduce yourself."
        ),

        quiz(
            "Someone says 'Nice to meet you.' What is a good reply?",
            ["Goodbye.", "What's your name?", "Likewise.", "Please."],
            2,
            "'Likewise.' is a short, polite way to say 'Nice to meet you too.'"
        ),

        quiz(
            "Which question asks where someone is from?",
            ["What's your name?", "Nice to meet you.", "This is...", "Where are you from?"],
            3,
            "'Where are you from?' asks about someone's country or city of origin."
        )

    ],

    summary: {

        tip:
            "Practice introducing yourself aloud several times — a clear name and a friendly 'Nice to meet you' go a long way.",

        review: [

            "My name is...",

            "What's your name?",

            "Where are you from?",

            "I'm from...",

            "Nice to meet you. — Likewise."

        ]

    }

};
