import { relationshipsB1Blocks } from "../../shared/french/relationshipsB1";

export const relationshipsTopic = {

    id: "french-b1-relationships",

    language: "french",

    level: "B1",

    topic: "relationships",

    lessonId: "french-b1-relationships",

    title: "Les Pronoms Relatifs : Qui, Que, Où, Dont",

    summary: "Qui remplace le sujet, que remplace le complément d'objet direct, où remplace un lieu/moment, dont remplace un complément en 'de'.",

    explanation: relationshipsB1Blocks,

    rules: [
        "qui + verbe (qui est le sujet du verbe).",
        "que + sujet + verbe (que est le complément d'objet direct).",
        "où pour un lieu ou un moment.",
        "dont pour les verbes/expressions construits avec 'de'."
    ],

    examples: [
        "C'est l'ami qui m'a aidé.",
        "C'est le livre que je lis.",
        "C'est la ville où je suis né.",
        "C'est le sujet dont on a parlé."
    ],

    notes: [
        "'Que' s'élide en 'qu'' devant une voyelle ou un h muet ; 'qui' ne s'élide jamais."
    ],

    commonMistakes: [
        "Confondre 'qui' et 'que' : utiliser 'que' quand le mot remplacé est en fait le sujet du verbe qui suit."
    ],

    tips: [
        "Demande-toi : le mot remplacé est-il le sujet (qui), le complément direct (que), un lieu/moment (où), ou lié à un verbe en 'de' (dont) ?"
    ]

};
