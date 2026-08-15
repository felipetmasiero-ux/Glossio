import { newsStoriesB1Blocks } from "../../shared/french/newsStoriesB1";

export const newsStoriesTopic = {

    id: "french-b1-news-stories",

    language: "french",

    level: "B1",

    topic: "news-stories",

    lessonId: "french-b1-news-stories",

    title: "Le Discours Rapporté",

    summary: "Rapporter ce que quelqu'un a dit en changeant le temps du verbe d'un cran vers le passé.",

    explanation: newsStoriesB1Blocks,

    rules: [
        "présent → imparfait.",
        "passé composé → plus-que-parfait.",
        "futur simple → conditionnel présent.",
        "dire que (sans destinataire) ; dire à quelqu'un que (avec destinataire)."
    ],

    examples: [
        "\"Je suis occupé.\" → Il a dit qu'il était occupé.",
        "\"J'ai fini.\" → Elle a dit qu'elle avait fini.",
        "\"Je viendrai.\" → Il a dit qu'il viendrait.",
        "Elle m'a dit qu'elle était en retard."
    ],

    notes: [
        "Les expressions de temps changent aussi : 'aujourd'hui' → 'ce jour-là', 'demain' → 'le lendemain', 'hier' → 'la veille'."
    ],

    commonMistakes: [
        "Construire 'dire' directement avec la personne : 'elle a dit moi' au lieu de 'elle m'a dit'."
    ],

    tips: [
        "Repère d'abord le temps du verbe au discours direct, puis recule-le d'un cran : présent → imparfait, passé composé → plus-que-parfait, futur → conditionnel."
    ]

};
