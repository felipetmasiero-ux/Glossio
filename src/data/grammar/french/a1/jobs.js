import { jobsBlocks } from "../../shared/french/jobs";

export const jobsTopic = {

    id: "french-a1-jobs",

    language: "french",

    level: "A1",

    topic: "jobs",

    lessonId: "french-a1-jobs",

    title: "Professions au Masculin et au Féminin",

    summary: "Accorder le nom du métier au genre de la personne.",

    explanation: jobsBlocks,

    rules: [
    "Ajouter un -e au masculin pour former le féminin : enseignant → enseignante.",
    "Certaines terminaisons changent : -ier → -ière (infirmier → infirmière).",
    "Quelques professions restent invariables : un/une médecin."
],

    examples: [
    "Elle est enseignante.",
    "Il est infirmier.",
    "Elle est étudiante.",
    "Il est médecin. / Elle est médecin."
],

    notes: [
    "L'article (un/une) porte souvent la seule marque du genre pour les professions invariables."
],

    commonMistakes: [
    "Utiliser la forme masculine pour une femme : 'elle est infirmier' au lieu de 'elle est infirmière'."
],

    tips: [
    "Apprends chaque profession avec les deux formes dès le début, comme une paire."
]

};
