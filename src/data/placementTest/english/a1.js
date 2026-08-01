import { question } from "../question";

// Content reused from the existing English dictionary and A1 lessons
// (Greetings' dialogue, Present Simple's grammar, Introductions' phrases) -
// only the quiz framing (prompt/options) is new.
export const englishA1PlacementQuestions = [

    question("english-a1-vocab-1", "A1", "vocabulary",
        "What does \"hello\" mean?",
        ["olá", "tchau", "obrigado", "por favor"], 0),

    question("english-a1-vocab-2", "A1", "vocabulary",
        "What does \"goodbye\" mean?",
        ["adeus", "olá", "bem-vindo", "por favor"], 0),

    question("english-a1-vocab-3", "A1", "vocabulary",
        "What does \"Brazilian\" mean?",
        ["Brasileiro(a)", "Brasil", "Americano(a)", "França"], 0),

    question("english-a1-grammar-1", "A1", "grammar",
        "She ___ at a hospital.",
        ["work", "works", "working", "worked"], 1),

    question("english-a1-grammar-2", "A1", "grammar",
        "___ you like coffee?",
        ["Do", "Does", "Is", "Are"], 0),

    question("english-a1-grammar-3", "A1", "grammar",
        "She is ___ engineer.",
        ["a", "an", "the", "some"], 1),

    question("english-a1-comprehension-1", "A1", "comprehension",
        "In the dialogue \"Hello! My name is Emma.\" / \"Hi! I'm Lucas.\" / \"Nice to meet you!\", what does Lucas say next?",
        ["Nice to meet you too!", "Hello! My name is Emma.", "Bye! See you tomorrow.", "I have to go now."], 0),

    question("english-a1-phrase-1", "A1", "phrase",
        "How do you say \"Prazer em conhecer você\" in English?",
        ["Nice to meet you.", "Let me introduce myself.", "This is...", "Where are you from?"], 0),

    question("english-a1-word-order-1", "A1", "word-order",
        "Put the words in the correct order: your / What's / name / ?",
        ["What's your name?", "Your name what's?", "Name your what's?", "What's name your?"], 0)

];
