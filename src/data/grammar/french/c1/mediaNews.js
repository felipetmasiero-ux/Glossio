import { mediaNewsC1Blocks } from "../../shared/french/mediaNewsC1";

export const mediaNewsTopic = {

    id: "french-c1-media-news",

    language: "french",

    level: "C1",

    topic: "media-news",

    lessonId: "french-c1-media-news",

    title: "Le Discours Rapporté Avancé et la Concordance des Temps",

    summary: "Appliquer la concordance des temps dans le discours indirect avec un verbe introducteur au passé, et varier les verbes introducteurs.",

    explanation: mediaNewsC1Blocks,

    rules: [
        "présent → imparfait dans le discours indirect : 'je suis prêt' → il a dit qu'il était prêt.",
        "passé composé → plus-que-parfait : 'j'ai vu' → il a dit qu'il avait vu.",
        "futur simple → conditionnel présent : 'je viendrai' → il a dit qu'il viendrait.",
        "verbes introducteurs variés : affirmer, prétendre, nier, sous-entendre, laisser entendre."
    ],

    examples: [
        "Il a affirmé que la situation s'améliorerait rapidement.",
        "Elle a prétendu qu'elle n'était au courant de rien.",
        "Le porte-parole a nié que l'entreprise ait commis une erreur.",
        "Le journaliste a laissé entendre que les chiffres avaient été manipulés."
    ],

    notes: [
        "Le choix du verbe introducteur change l'interprétation : 'prétendre' suggère un doute, 'affirmer' reste plutôt neutre."
    ],

    commonMistakes: [
        "Garder le temps original dans le discours indirect : 'il a dit qu'il est prêt' au lieu de 'qu'il était prêt', quand le verbe introducteur est au passé."
    ],

    tips: [
        "Relis d'abord la déclaration au discours direct, puis réécris-la en reculant chaque temps verbal d'un cran."
    ]

};
