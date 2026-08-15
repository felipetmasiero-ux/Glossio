import { mediaB1Blocks } from "../../shared/french/mediaB1";

export const mediaTopic = {

    id: "french-b1-media",

    language: "french",

    level: "B1",

    topic: "media",

    lessonId: "french-b1-media",

    title: "La Voix Passive",

    summary: "Sujet + être + participe passé, avec 'par + personne' ajouté seulement quand c'est utile.",

    explanation: mediaB1Blocks,

    rules: [
        "sujet + être + participe passé.",
        "le temps de 'être' correspond au temps de la phrase (est, a été, sera...).",
        "'par + personne' est optionnel, ajouté seulement si utile."
    ],

    examples: [
        "Ce film a été tourné en France.",
        "Le livre est très recommandé.",
        "La série sera diffusée l'année prochaine.",
        "Cette chanson a été écrite par un artiste célèbre."
    ],

    notes: [
        "Le participe passé s'accorde en genre et en nombre avec le sujet dans la voix passive."
    ],

    commonMistakes: [
        "Oublier 'être' : 'ce film réalisé par...' au lieu de 'ce film a été réalisé par...'."
    ],

    tips: [
        "Demande-toi si qui a fait l'action est vraiment important ici. Si non, laisse tomber 'par + personne'."
    ]

};
