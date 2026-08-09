import { question } from "../question";

// Content reused from the Portuguese A2 dictionary and lessons (Fim de
// Semana Passado, Comparando Compras, Antigamente, Reservando um Hotel) -
// mirrors the structure of english/a2.js and portuguese/a1.js.
//
// Kept intentionally small (5 questions, not 15): PlacementTestRepository
// flattens every level's bank into one placement test per language
// (getQuestions), and the suite enforces a 15-20 question total per
// language (see PlacementTestRepository.test.js). Portuguese A1 alone
// already has 15 (it was originally sized to cover that range solo, back
// when A1 was the only level) - so A2 only has room for a handful more
// without exceeding the shared 20-question ceiling.
export const portugueseA2PlacementQuestions = [

    question("portuguese-a2-vocab-1", "A2", "vocabulary",
        "O que significa \"ontem\"?",
        ["yesterday", "tomorrow", "today", "last week"], 0),

    question("portuguese-a2-vocab-2", "A2", "vocabulary",
        "O que significa \"melhor\"?",
        ["better", "worse", "bigger", "smaller"], 0),

    question("portuguese-a2-grammar-1", "A2", "grammar",
        "Ontem eu ___ para a praia com meus amigos.",
        ["fui", "vou", "ia", "irei"], 0),

    question("portuguese-a2-comprehension-1", "A2", "comprehension",
        "No diálogo de \"Antigamente\", o que mudou no bairro de Marco?",
        ["Agora tem mais carros e menos crianças brincando na rua", "Agora é mais tranquilo", "Nada mudou", "Agora tem menos carros"], 0),

    question("portuguese-a2-word-order-1", "A2", "word-order",
        "Coloque as palavras na ordem correta: barulho / vou / Se / reclamar / tiver",
        ["Se tiver barulho, vou reclamar.", "Vou tiver barulho se reclamar.", "Barulho se vou tiver reclamar.", "Reclamar vou se barulho tiver."], 0)

];
