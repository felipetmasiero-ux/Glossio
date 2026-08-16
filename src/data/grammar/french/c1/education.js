import { educationC1Blocks } from "../../shared/french/educationC1";

export const educationTopic = {

    id: "french-c1-education",

    language: "french",

    level: "C1",

    topic: "education",

    lessonId: "french-c1-education",

    title: "La Nominalisation et le Style Académique",

    summary: "Transformer des verbes et adjectifs en noms abstraits pour un ton académique plus formel et objectif.",

    explanation: educationC1Blocks,

    rules: [
        "nominalisation : verbe/adjectif → nom abstrait ('évaluer' → 'l'évaluation de').",
        "typique des textes universitaires et des rapports formels.",
        "à ne pas surutiliser — alterner avec des phrases directes."
    ],

    examples: [
        "Une évaluation différente des étudiants est sans doute nécessaire.",
        "La mise en œuvre de cette réforme reste difficile.",
        "Il y a une prise de conscience croissante des limites de l'apprentissage par cœur.",
        "Dans une certaine mesure, l'évaluation standardisée mesure la mauvaise chose."
    ],

    notes: [
        "Le français académique nominalise énormément, mais le français oral courant préfère largement le verbe direct."
    ],

    commonMistakes: [
        "Nominaliser chaque phrase, ce qui produit un texte académique artificiel plutôt qu'une communication claire."
    ],

    tips: [
        "Si une phrase ressemble à un résumé de recherche alors que tu es simplement en train de discuter, tu as probablement trop nominalisé — reviens au verbe."
    ]

};
