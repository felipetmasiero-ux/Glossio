import { opinionsB1Blocks } from "../../../grammar/shared/french/opinionsB1";
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

export const opinionsLesson = {

    id: "french-b1-opinions",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "opinions",

    order: 8,

    title: "Société et Opinions",

    subtitle:
        "Expresse opiniões em francês usando o indicativo ou o subjuntivo depois de verbos de opinião, e conectores de contraste.",

    description:
        "Aprenda a expressar e justificar opiniões sobre temas da sociedade, escolhendo entre indicativo e subjuntivo depois de verbos como 'penser que' e 'croire que'.",

    cover: "/covers/opinions-fr.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "opinions",
        "subjonctif",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Express and justify an opinion in French",

        "Agree and disagree politely",

        "Choose between the indicative and the subjunctive after opinion verbs",

        "Use contrast connectors like 'par contre' and 'alors que'"

    ],

    vocabulary: vocabulary([
        "à mon avis",
        "de mon point de vue",
        "être d'accord",
        "ne pas être d'accord",
        "point de vue",
        "débat",
        "controversé",
        "être pour",
        "être contre",
        "convaincre",
        "persuader",
        "perspective",
        "argument valable",
        "croire fermement",
        "au contraire",
        "d'abord",
        "en conclusion",
        "en résumé",
        "inégalité",
        "marginalisé"
    ]),

    blocks: [

        heading("Exprimer une Opinion avec Précision"),

        paragraph(
            "Quand on exprime une opinion en français, le mode du verbe qui suit change selon qu'on est sûr ou non de son idée : l'indicatif pour un fait affirmé, le subjonctif quand l'idée devient incertaine ou niée."
        ),

        examples([
            {
                text: "Je pense que les inégalités sont un vrai problème dans notre société.",
                translation: "Acho que as desigualdades são um problema real na nossa sociedade."
            },
            {
                text: "Je ne pense pas que ce soit une solution suffisante.",
                translation: "Não acho que essa seja uma solução suficiente."
            },
            {
                text: "À mon avis, il faut plus de politiques sociales efficaces.",
                translation: "Na minha opinião, são necessárias políticas sociais mais eficazes."
            },
            {
                text: "Certains sont pour cette réforme ; par contre, d'autres sont clairement contre.",
                translation: "Alguns são a favor dessa reforma; por outro lado, outros são claramente contra."
            },
            {
                text: "Je crois que ce débat est important, même si tout le monde n'est pas d'accord.",
                translation: "Acredito que esse debate é importante, mesmo que nem todo mundo concorde."
            },
            {
                text: "Beaucoup de gens s'informent en ligne, alors que d'autres préfèrent encore les journaux.",
                translation: "Muitas pessoas se informam online, enquanto outras ainda preferem os jornais."
            },
            {
                text: "Je ne crois pas que ce problème puisse être résolu facilement.",
                translation: "Não acredito que esse problema possa ser resolvido facilmente."
            }
        ]),

        dialogue([
            { speaker: "Amine", text: "À mon avis, il faudrait investir plus dans l'éducation pour réduire les inégalités." },
            { speaker: "Sarah", text: "Je suis d'accord, mais je ne pense pas que ce soit suffisant à lui seul." },
            { speaker: "Amine", text: "Tu as sans doute raison. De ton point de vue, qu'est-ce qui aiderait le plus ?" },
            { speaker: "Sarah", text: "Je crois qu'il faut aussi améliorer l'accès aux services de santé. Certains quartiers sont bien équipés ; par contre, d'autres sont vraiment marginalisés." },
            { speaker: "Amine", text: "C'est vrai. Alors que certaines personnes ont plein d'opportunités, d'autres n'en ont presque aucune." },
            { speaker: "Sarah", text: "Exactement. C'est un sujet complexe, mais je ne crois pas qu'on puisse l'ignorer." },
            { speaker: "Amine", text: "Je suis complètement d'accord avec toi là-dessus." },
            { speaker: "Sarah", text: "En tout cas, c'est bien d'en débattre, même si on n'est pas toujours d'accord sur tout." }
        ]),

        grammar(opinionsB1Blocks[0].title, opinionsB1Blocks[0].text),

        list([

            "je pense que + indicatif — opinion affirmative",

            "je ne pense pas que + subjonctif — opinion négative",

            "par contre / cependant — contraste",

            "alors que — contraste direct entre deux faits"

        ]),

        tip(
            "Affirmatif = Indicatif, Négatif = Subjonctif",
            "Ce changement de mode est un piège classique. Retiens simplement : à la forme affirmative, l'idée est présentée comme un fait (indicatif) ; à la forme négative, elle devient incertaine (subjonctif)."
        ),

        culture(
            "Le Débat à la Française",
            "Le débat d'idées fait partie intégrante de la culture française — dès l'école, les élèves apprennent à structurer une argumentation avec une thèse, une antithèse et une synthèse, une méthode qu'on retrouve encore dans les discussions informelles."
        ),

        quiz(
            "Choisis la bonne phrase.",
            ["Je pense que c'est vrai.", "Je pense que ce soit vrai.", "Je pense qu'il soit vrai.", "Je pense que sois vrai."],
            0,
            "Après 'je pense que' (affirmatif), on utilise l'indicatif : 'c'est vrai'."
        ),

        quiz(
            "Choisis la bonne phrase à la forme négative.",
            [
                "Je ne pense pas que c'est une bonne idée.",
                "Je ne pense pas que ce soit une bonne idée.",
                "Je ne pense pas qu'il est une bonne idée.",
                "Je ne pense pas c'est une bonne idée."
            ],
            1,
            "Après 'je ne pense pas que' (négatif), on utilise le subjonctif : 'ce soit'."
        ),

        quiz(
            "Quel mot introduit un contraste direct entre deux faits ?",
            ["donc", "parce que", "alors que", "grâce à"],
            2,
            "'Alors que' introduit un contraste direct entre deux faits."
        )

    ],

    summary: {

        tip:
            "Pratique à donner ton opinion sur un sujet de société, en utilisant 'je pense que' (indicatif) et 'je ne pense pas que' (subjonctif).",

        review: [

            "je pense que + indicatif",

            "je ne pense pas que + subjonctif",

            "par contre / alors que — contraste",

            "inégalité, marginalisé, débat, point de vue"

        ]

    }

};
