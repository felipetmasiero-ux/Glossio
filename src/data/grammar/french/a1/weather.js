import { weatherBlocks } from "../../shared/french/weather";

export const weatherTopic = {

    id: "french-a1-weather",

    language: "french",

    level: "A1",

    topic: "weather",

    lessonId: "french-a1-weather",

    title: "Il fait vs Il y a",

    summary: "Choisir la bonne expression pour parler de la météo.",

    explanation: weatherBlocks,

    rules: [
    "il fait + adjectif (il fait beau, il fait froid).",
    "il y a + nom (il y a du soleil, il y a du vent).",
    "Pluie et neige : verbes directs (il pleut, il neige)."
],

    examples: [
    "Il fait beau aujourd'hui.",
    "Il y a du vent.",
    "Il pleut ce matin.",
    "Il neige dans les montagnes."
],

    notes: [
    "'Il' est toujours le sujet impersonnel dans ces expressions météorologiques."
],

    commonMistakes: [
    "Utiliser 'il fait' avec un nom : 'il fait du soleil' au lieu de 'il y a du soleil'."
],

    tips: [
    "Adjectif → 'il fait'. Nom → 'il y a'. Ce test rapide résout presque tous les cas."
]

};
