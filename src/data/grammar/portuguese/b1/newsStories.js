import { newsStoriesBlocks } from "../../shared/portuguese/b1/newsStories";

export const newsStoriesTopic = {

    id: "portuguese-b1-news-stories",

    language: "portuguese",

    level: "B1",

    topic: "news-stories",

    lessonId: "portuguese-b1-news-stories",

    title: "Discurso Indireto: Contando o que Alguém Disse",

    summary: "Contar o que alguém disse mudando o tempo do verbo um passo em direção ao passado.",

    explanation: newsStoriesBlocks,

    rules: [
        "presente → imperfeito.",
        "pretérito perfeito → mais-que-perfeito.",
        "futuro do presente → futuro do pretérito.",
        "dizer que (sem destinatário); dizer a alguém que (com destinatário)."
    ],

    examples: [
        "\"Estou ocupado.\" → Ele disse que estava ocupado.",
        "\"Eu terminei.\" → Ela disse que tinha terminado.",
        "\"Eu virei.\" → Ele disse que viria.",
        "Ela me disse que estava atrasada."
    ],

    notes: [
        "As expressões de tempo também mudam: 'hoje' → 'naquele dia', 'amanhã' → 'no dia seguinte', 'ontem' → 'no dia anterior'."
    ],

    commonMistakes: [
        "Construir 'dizer' diretamente com a pessoa: 'ela disse eu' em vez de 'ela me disse'."
    ],

    tips: [
        "Se há um destinatário logo depois do verbo, use 'disse a alguém' ou o pronome (me/te/lhe). Se não, use apenas 'disse que'."
    ]

};
