import { question } from "../question";

// Content reused from the existing French dictionary and A1 lessons
// (Greetings' dialogue, Reflexive Verbs, Partitive Articles, Aller +
// Infinitif, and Travel's dialogue).
export const frenchA1PlacementQuestions = [

    question("french-a1-vocab-1", "A1", "vocabulary",
        "Que veut dire « salut » ?",
        ["oi", "adeus / tchau", "obrigado(a)", "por favor (informal)"], 0),

    question("french-a1-vocab-2", "A1", "vocabulary",
        "Que veut dire « merci » ?",
        ["obrigado(a)", "de nada", "bem-vindo(a)", "oi"], 0),

    question("french-a1-vocab-3", "A1", "vocabulary",
        "Que veut dire « enchanté » ?",
        ["prazer (em conhecer você)", "igualmente", "e você? (informal)", "deixe-me me apresentar"], 0),

    question("french-a1-grammar-1", "A1", "grammar",
        "Je ___ réveille à 7 heures.",
        ["me", "te", "se", "nous"], 0),

    question("french-a1-grammar-2", "A1", "grammar",
        "Je voudrais ___ pain.",
        ["du", "de la", "des", "de"], 0),

    question("french-a1-grammar-3", "A1", "grammar",
        "Je ___ voyager en France.",
        ["vais", "va", "vas", "allons"], 0),

    question("french-a1-comprehension-1", "A1", "comprehension",
        "Dans le dialogue, à quelle heure part le train, selon l'employé ?",
        ["14h", "16h", "12h", "18h"], 0),

    question("french-a1-phrase-1", "A1", "phrase",
        "Comment dit-on « Qual é o seu nome? (informal) » en français ?",
        ["Comment tu t'appelles ?", "Tu viens d'où ?", "Et toi ?", "Je me présente"], 0),

    question("french-a1-word-order-1", "A1", "word-order",
        "Mets les mots dans le bon ordre : en / Je / voyager / vais / France",
        ["Je vais voyager en France.", "Je voyager vais en France.", "Vais je voyager en France.", "Je vais en France voyager."], 0)

];
