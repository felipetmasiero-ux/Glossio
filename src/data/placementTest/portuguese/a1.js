import { question } from "../question";

// Content reused from the existing Portuguese dictionary and A1 lessons
// (Greetings/Family/Travel dialogues, Ter + Plural, Gostar de + Substantivo,
// Masculino e Feminino nas Profissões). Portuguese only has an A1 module so
// far, so this bank alone covers the full 15-20 question range on its own.
export const portugueseA1PlacementQuestions = [

    question("portuguese-a1-vocab-1", "A1", "vocabulary",
        "O que significa \"olá\"?",
        ["hello", "hi", "bye", "goodbye"], 0),

    question("portuguese-a1-vocab-2", "A1", "vocabulary",
        "O que significa \"brasileiro\"?",
        ["Brazilian", "Brazil", "American", "France"], 0),

    question("portuguese-a1-vocab-3", "A1", "vocabulary",
        "O que significa \"irmã\"?",
        ["sister", "brother", "siblings", "parents"], 0),

    question("portuguese-a1-vocab-4", "A1", "vocabulary",
        "O que significa \"quatro\"?",
        ["four", "three", "five", "ten"], 0),

    question("portuguese-a1-vocab-5", "A1", "vocabulary",
        "O que significa \"prazer\"?",
        ["nice to meet you", "thanks", "welcome", "likewise"], 0),

    question("portuguese-a1-grammar-1", "A1", "grammar",
        "Eu ___ irmãos.",
        ["tenho", "tem", "temos", "tens"], 0),

    question("portuguese-a1-grammar-2", "A1", "grammar",
        "Eu gosto ___ arroz.",
        ["de", "do", "da", "-"], 0),

    question("portuguese-a1-grammar-3", "A1", "grammar",
        "Ela é ___ (professor, no feminino).",
        ["professora", "professor", "professoro", "professara"], 0),

    question("portuguese-a1-comprehension-1", "A1", "comprehension",
        "No diálogo, o que Lucas responde depois de Emma dizer \"Prazer!\"?",
        ["Prazer também!", "Oi! Eu sou o Lucas.", "Olá! Meu nome é Emma.", "Tchau!"], 0),

    question("portuguese-a1-comprehension-2", "A1", "comprehension",
        "No diálogo, Anna diz que tem quantos primos?",
        ["Quatro", "Dois", "Um", "Três"], 0),

    question("portuguese-a1-comprehension-3", "A1", "comprehension",
        "No diálogo, a que horas sai o trem, segundo o funcionário?",
        ["14h", "16h", "12h", "18h"], 0),

    question("portuguese-a1-phrase-1", "A1", "phrase",
        "Como se diz \"Nice to meet you\" em português?",
        ["Prazer", "Igualmente", "Tchau", "Bem-vindo"], 0),

    question("portuguese-a1-phrase-2", "A1", "phrase",
        "Como se diz \"My name is\" em português?",
        ["Meu nome é", "Qual é o seu nome", "De onde você é", "Eu sou de"], 0),

    question("portuguese-a1-word-order-1", "A1", "word-order",
        "Coloque as palavras na ordem correta: nome / Meu / Ana / é",
        ["Meu nome é Ana.", "Nome meu é Ana.", "É meu nome Ana.", "Ana meu nome é."], 0),

    question("portuguese-a1-word-order-2", "A1", "word-order",
        "Coloque as palavras na ordem correta: irmãos? / tem / Você",
        ["Você tem irmãos?", "Tem você irmãos?", "Irmãos você tem?", "Tem irmãos você?"], 0)

];
