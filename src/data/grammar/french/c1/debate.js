import { debateC1Blocks } from "../../shared/french/debateC1";

export const debateTopic = {

    id: "french-c1-debate",

    language: "french",

    level: "C1",

    topic: "debate",

    lessonId: "french-c1-debate",

    title: "Les Marqueurs de Nuance et l'Atténuation Avancée dans l'Argumentation",

    summary: "Signaler précisément son degré de certitude et reconnaître les points valables de l'autre côté avec 'on pourrait soutenir que', 'cela dit' et 'encore faut-il que'.",

    explanation: debateC1Blocks,

    rules: [
        "'on pourrait soutenir que' / 'il convient de souligner que' — affirmation nuancée ou mise en avant formelle.",
        "'dans une certaine mesure, je suis d'accord, mais...' — accord partiel avant objection.",
        "'cela dit' / 'toutefois' — reconnaître un point valable avant de continuer.",
        "'encore faut-il que' + subjonctif — condition nécessaire souvent négligée."
    ],

    examples: [
        "On pourrait soutenir que la politique n'a simplement pas eu assez de temps pour fonctionner.",
        "Dans une certaine mesure, je suis d'accord, mais cela ne couvre pas tous les cas.",
        "Cela dit, les premiers signes ne sont pas encourageants.",
        "Cette solution est efficace, encore faut-il qu'elle soit appliquée correctement."
    ],

    notes: [
        "Combiner accord partiel et concession ('cela dit... toutefois...') rend un argument réfléchi plutôt qu'unilatéral."
    ],

    commonMistakes: [
        "Affirmer une opinion de façon trop catégorique avec 'évidemment' ou 'clairement' quand les preuves sont en réalité mitigées."
    ],

    tips: [
        "Avant d'affirmer quelque chose catégoriquement, demande-toi si un marqueur de nuance rendrait ton argument plus honnête et convaincant."
    ]

};
