import { debateB2Blocks } from "../../../grammar/shared/french/debateB2";
import {
    heading,
    paragraph,
    examples,
    dialogue,
    grammar,
    tip,
    culture,
    list,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const debateLesson = {

    id: "french-b2-debate",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "debate",

    order: 11,

    title: "Argumentation, Débat et Pensée Critique",

    subtitle:
        "Construa argumentos com nuance em francês usando marcadores de discurso e expressões de incerteza controlada.",

    description:
        "Aprenda vocabulário para argumentar e debater, e como usar marcadores de discurso e expressões de nuance para qualificar suas afirmações.",

    cover: "/covers/debate-fr.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

    tags: [
        "debate",
        "nuance",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Build and structure a nuanced argument",

        "Use 'il semblerait que' and 'il se peut que' + subjonctif for cautious claims",

        "Use degree expressions like 'dans une certaine mesure'",

        "Introduce a reservation with 'cela dit' and 'néanmoins'"

    ],

    vocabulary: vocabulary([
        "il semblerait que",
        "il se peut que",
        "dans une certaine mesure",
        "force est de constater que",
        "cela dit",
        "néanmoins",
        "présupposé",
        "nuancer",
        "relativiser",
        "sans conteste",
        "dans l'ensemble",
        "à première vue",
        "tout compte fait",
        "objection",
        "réfuter",
        "étayer un argument",
        "peser le pour et le contre",
        "concéder",
        "point de désaccord",
        "formuler une critique constructive"
    ]),

    blocks: [

        heading("Nuancer une Affirmation"),

        paragraph(
            "Un débat de qualité demande de la nuance : savoir présenter une idée comme probable plutôt que certaine, et savoir introduire une réserve sans se contredire complètement."
        ),

        examples([
            {
                text: "Il semblerait que cette mesure ait eu un effet positif, mais les données manquent encore.",
                translation: "Parece que essa medida teve um efeito positivo, mas ainda faltam dados."
            },
            {
                text: "Il se peut que cette solution ne fonctionne pas pour tout le monde.",
                translation: "Pode ser que essa solução não funcione para todo mundo."
            },
            {
                text: "Dans une certaine mesure, je comprends les deux positions.",
                translation: "Até certo ponto, eu entendo as duas posições."
            },
            {
                text: "Force est de constater que le sujet divise profondément l'opinion.",
                translation: "É preciso reconhecer que o assunto divide profundamente a opinião."
            },
            {
                text: "Cela dit, il ne faut pas non plus ignorer les contre-arguments.",
                translation: "Dito isso, também não se deve ignorar os contra-argumentos."
            },
            {
                text: "L'idée est intéressante ; néanmoins, elle mérite d'être approfondie.",
                translation: "A ideia é interessante; no entanto, merece ser aprofundada."
            },
            {
                text: "Il semblerait que le débat public manque parfois de nuance.",
                translation: "Parece que o debate público às vezes carece de nuance."
            }
        ]),

        dialogue([
            { speaker: "Hana", text: "On a débattu de ce sujet pendant des heures hier soir." },
            { speaker: "Simon", text: "Ah oui ? Et vous êtes arrivés à une conclusion ?" },
            { speaker: "Hana", text: "Pas vraiment, mais force est de constater que les deux camps ont des arguments valables." },
            { speaker: "Simon", text: "Dans une certaine mesure, je suis d'accord avec ça. Quelle était la principale objection ?" },
            { speaker: "Hana", text: "Certains pensaient qu'il semblerait que la mesure ait des effets secondaires imprévus." },
            { speaker: "Simon", text: "Intéressant. Il se peut qu'ils aient raison, mais on manque encore de recul là-dessus." },
            { speaker: "Hana", text: "Exactement. Cela dit, on ne peut pas non plus attendre indéfiniment avant d'agir." },
            { speaker: "Simon", text: "C'est vrai. Néanmoins, je pense qu'il faut peser le pour et le contre avant de se prononcer définitivement." },
            { speaker: "Hana", text: "Tout à fait. C'est tout l'enjeu d'un vrai débat : nuancer sans jamais trancher trop vite." }
        ]),

        grammar(debateB2Blocks[0].title, debateB2Blocks[0].text),

        list([

            "il semblerait que / il se peut que + subjonctif",

            "dans une certaine mesure — nuance de degré",

            "cela dit / néanmoins — réserve",

            "peser le pour et le contre, nuancer"

        ]),

        tip(
            "Nuancer, Pas Hésiter",
            "Ces marqueurs permettent de nuancer sans paraître indécis. Utiliser 'il semblerait que' plutôt qu'une affirmation directe montre que tu es conscient des limites de ton propre point de vue — une compétence essentielle à ce niveau."
        ),

        culture(
            "La Nuance dans le Débat Français",
            "Dans la tradition du débat à la française, savoir nuancer son propos — reconnaître la validité d'arguments opposés tout en défendant sa position — est considéré comme un signe d'intelligence et de maturité intellectuelle, pas de faiblesse."
        ),

        quiz(
            "Choisis la bonne phrase.",
            ["Il semblerait que c'est vrai.", "Il semblerait que ce soit vrai.", "Il semblerait que c'était vrai.", "Il semblerait que ce sera vrai."],
            1,
            "'Il semblerait que' est suivi du subjonctif : 'que ce soit vrai'."
        ),

        quiz(
            "Quelle expression introduit une réserve après une affirmation ?",
            ["étant donné que", "cela dit", "si bien que", "dans la mesure où"],
            1,
            "'Cela dit' introduit une réserve après avoir affirmé quelque chose."
        ),

        quiz(
            "Que signifie \"dans une certaine mesure\" ?",
            ["Complètement", "Pas du tout", "Jusqu'à un certain point", "Immédiatement"],
            2,
            "'Dans une certaine mesure' exprime une nuance de degré : jusqu'à un certain point, pas complètement."
        )

    ],

    summary: {

        tip:
            "Pratique à présenter un argument nuancé sur un sujet qui te tient à cœur, en utilisant au moins un marqueur de discours et une expression de nuance.",

        review: [

            "il semblerait que / il se peut que + subjonctif",

            "dans une certaine mesure — nuance",

            "cela dit / néanmoins — réserve",

            "peser le pour et le contre, nuancer"

        ]

    }

};
