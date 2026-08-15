import { environmentB2Blocks } from "../../../grammar/shared/french/environmentB2";
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

export const environmentB2Lesson = {

    id: "french-b2-environment",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "environment",

    order: 6,

    title: "Environnement, Climat et Avenir",

    subtitle:
        "Discuta questões ambientais em francês com conectores de causa e consequência de registro mais formal.",

    description:
        "Aprenda vocabulário mais avançado sobre meio ambiente, e conectores de causa/consequência de registro formal como 'étant donné que' e 'si bien que'.",

    cover: "/covers/environment-b2-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "environment",
        "connecteurs",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss environmental causes, consequences and solutions",

        "Use 'étant donné que' and 'dans la mesure où' to introduce a cause",

        "Use 'de sorte que' and 'si bien que' to introduce a consequence",

        "Use a more formal register when discussing environmental policy"

    ],

    vocabulary: vocabulary([
        "de sorte que",
        "si bien que",
        "étant donné que",
        "dans la mesure où",
        "surexploitation",
        "épuisement des ressources",
        "transition écologique",
        "empreinte écologique",
        "urgence climatique",
        "dérèglement climatique",
        "biodiversité",
        "préservation",
        "sobriété énergétique",
        "impact environnemental",
        "agir en conséquence",
        "conscience écologique",
        "mode de consommation",
        "responsabilité collective",
        "limiter les dégâts",
        "inverser la tendance"
    ]),

    blocks: [

        heading("Argumenter avec des Connecteurs Plus Précis"),

        paragraph(
            "Pour discuter de politique environnementale de façon plus soutenue, on remplace 'parce que'/'donc' par des connecteurs plus précis : 'étant donné que'/'dans la mesure où' pour la cause, 'de sorte que'/'si bien que' pour la conséquence."
        ),

        examples([
            {
                text: "Étant donné que les ressources naturelles s'épuisent, il faut agir rapidement.",
                translation: "Dado que os recursos naturais estão se esgotando, é preciso agir rapidamente."
            },
            {
                text: "La situation s'est tellement dégradée, si bien que des mesures d'urgence ont été prises.",
                translation: "A situação se degradou tanto, que medidas de emergência foram tomadas."
            },
            {
                text: "Dans la mesure où la transition écologique concerne tout le monde, chacun doit y contribuer.",
                translation: "Na medida em que a transição ecológica diz respeito a todos, cada um deve contribuir."
            },
            {
                text: "Le gouvernement a renforcé la réglementation, de sorte que les entreprises polluent moins.",
                translation: "O governo reforçou a regulamentação, de forma que as empresas poluem menos."
            },
            {
                text: "Étant donné l'urgence climatique, plusieurs pays ont revu leurs objectifs.",
                translation: "Dada a emergência climática, vários países revisaram seus objetivos."
            },
            {
                text: "Les températures ont tellement augmenté, si bien que certaines espèces ont disparu.",
                translation: "As temperaturas aumentaram tanto, que algumas espécies desapareceram."
            },
            {
                text: "Dans la mesure où on peut agir individuellement, chaque geste compte.",
                translation: "Na medida em que podemos agir individualmente, cada gesto conta."
            }
        ]),

        dialogue([
            { speaker: "Elsa", text: "Tu as suivi les nouvelles mesures environnementales du gouvernement ?" },
            { speaker: "Noé", text: "Oui, étant donné l'urgence climatique, ils ont dû agir plus fermement." },
            { speaker: "Elsa", text: "C'est vrai. La situation s'était tellement dégradée, si bien qu'ils n'avaient plus vraiment le choix." },
            { speaker: "Noé", text: "Dans la mesure où chaque pays est concerné, j'espère que d'autres suivront cet exemple." },
            { speaker: "Elsa", text: "Je l'espère aussi. Étant donné que les ressources naturelles ne sont pas infinies, on ne peut plus attendre." },
            { speaker: "Noé", text: "Exactement. Il faudrait qu'on change nos modes de consommation, de sorte qu'on réduise vraiment notre impact." },
            { speaker: "Elsa", text: "C'est un vrai défi collectif. Mais dans la mesure où chacun fait sa part, ça peut vraiment faire une différence." },
            { speaker: "Noé", text: "Je suis d'accord. On a une responsabilité collective là-dedans." }
        ]),

        grammar(environmentB2Blocks[0].title, environmentB2Blocks[0].text),

        list([

            "étant donné que / dans la mesure où — cause",

            "de sorte que / si bien que — conséquence",

            "urgence climatique, transition écologique",

            "responsabilité collective, agir en conséquence"

        ]),

        tip(
            "Si Bien Que vs De Sorte Que",
            "'Si bien que' introduit toujours une conséquence qui découle logiquement de ce qui précède, souvent avec une idée d'intensité. 'De sorte que' peut aussi exprimer un but voulu selon le contexte — à l'indicatif pour une conséquence réelle, au subjonctif pour un but recherché."
        ),

        culture(
            "L'Engagement Écologique en France",
            "En France, la notion de 'transition écologique' est devenue centrale dans le débat public, avec des initiatives locales comme les 'budgets participatifs verts', où les citoyens votent directement pour des projets environnementaux dans leur ville."
        ),

        quiz(
            "Choisis le connecteur de cause en registre soutenu.",
            ["donc", "si bien que", "étant donné que", "de sorte que"],
            2,
            "'Étant donné que' introduit une cause, en registre plus soutenu que 'parce que'."
        ),

        quiz(
            "Choisis le connecteur de conséquence.",
            ["étant donné que", "dans la mesure où", "si bien que", "puisque"],
            2,
            "'Si bien que' introduit une conséquence."
        ),

        quiz(
            "Complète : \"___ les ressources s'épuisent, il faut agir.\"",
            ["De sorte que", "Si bien que", "Étant donné que", "Bien que"],
            2,
            "'Étant donné que' introduit une cause déjà connue : 'Étant donné que les ressources s'épuisent...'"
        )

    ],

    summary: {

        tip:
            "Pratique à expliquer une cause et sa conséquence environnementale, en utilisant des connecteurs de registre plus soutenu.",

        review: [

            "étant donné que / dans la mesure où — cause",

            "de sorte que / si bien que — conséquence",

            "urgence climatique, transition écologique",

            "responsabilité collective, biodiversité"

        ]

    }

};
