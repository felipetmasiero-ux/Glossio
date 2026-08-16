import { cultureArtsC1Blocks } from "../../../grammar/shared/french/cultureArtsC1";
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

export const cultureArtsLesson = {

    id: "french-c1-culture-arts",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "culture-arts",

    order: 8,

    title: "Culture, Littérature et Interprétation",

    subtitle:
        "Analysez et critiquez des œuvres culturelles en utilisant les relatives avec préposition et 'lequel'.",

    description:
        "Développez un vocabulaire analytique et évaluatif, et apprenez les propositions relatives formelles avec 'auquel', 'avec laquelle' et 'pour lesquelles'.",

    cover: "/covers/culture-arts-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "culture-arts",
        "grammar",
        "critique"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Analyze and interpret literature, film and art with precision",

        "Justify a critical opinion using evaluative language",

        "Use relative clauses with a fronted preposition and 'lequel'",

        "Apply formal, accurate relative pronouns in cultural analysis"

    ],

    vocabulary: vocabulary([
        "évocateur",
        "un motif récurrent",
        "poignant",
        "nombriliste",
        "une critique acerbe",
        "toucher une corde sensible",
        "tout en retenue",
        "un tour de force",
        "peu original",
        "une thématique sous-jacente",
        "envoûtant",
        "un public de fidèles",
        "un portrait tout en nuances",
        "résister à l'épreuve du temps",
        "appuyé",
        "un hommage à",
        "qui donne à réfléchir",
        "une intrigue qui se dévoile lentement",
        "salué par la critique",
        "marquer durablement"
    ]),

    blocks: [

        heading("Analyser une Œuvre avec Précision"),

        paragraph(
            "Pour analyser une œuvre culturelle avec un français plus formel, on utilise 'lequel', 'laquelle' et leurs formes après une préposition, plus précis que 'ce qui'/'ce que' pour désigner un élément spécifique."
        ),

        examples([
            {
                text: "Le motif récurrent auquel elle fait référence traverse tout le film.",
                translation: "O motivo recorrente ao qual ela se refere atravessa todo o filme."
            },
            {
                text: "La réalisatrice avec laquelle il a travaillé est connue pour ses portraits tout en nuances.",
                translation: "A diretora com quem ele trabalhou é conhecida por seus retratos cheios de nuances."
            },
            {
                text: "Les raisons pour lesquelles ce roman a marqué durablement son époque restent débattues.",
                translation: "Os motivos pelos quais esse romance marcou tão duradouramente sua época ainda são debatidos."
            },
            {
                text: "C'est un tour de force tout en retenue, ce qui rend le film d'autant plus poignant.",
                translation: "É um feito extraordinário e cheio de sutileza, o que torna o filme ainda mais comovente."
            },
            {
                text: "Cette critique acerbe qualifie l'œuvre de nombriliste, une évaluation que je trouve un peu appuyée.",
                translation: "Essa crítica contundente chama a obra de autoindulgente, uma avaliação que acho um pouco exagerada."
            },
            {
                text: "L'exposition à laquelle je fais référence a réuni un public de fidèles inattendu.",
                translation: "A exposição à qual me refiro reuniu um público cult inesperado."
            }
        ]),

        dialogue([
            { speaker: "Margaux", text: "Tu as fini le roman que tout le monde qualifie de tour de force ?" },
            { speaker: "Victor", text: "Oui. C'est envoûtant, mais l'intrigue se dévoile tellement lentement que ça m'a testé au début." },
            { speaker: "Margaux", text: "Et alors ?" },
            { speaker: "Victor", text: "Le motif récurrent auquel l'auteure revient sans cesse a fini par vraiment toucher une corde sensible chez moi." },
            { speaker: "Margaux", text: "J'ai lu une critique acerbe qui le trouve nombriliste, pourtant." },
            { speaker: "Victor", text: "Je l'ai vue aussi. C'est un point juste sur le milieu du livre, qui traîne un peu." },
              { speaker: "Margaux", text: "Tu penses qu'il va résister à l'épreuve du temps ?" },
            { speaker: "Victor", text: "Honnêtement, oui. C'est un hommage assez peu original à ses influences, mais l'exécution reste saluée par la critique." },
            { speaker: "Margaux", text: "Ça donne vraiment à réfléchir. Il a déjà un public de fidèles en ligne." },
            { speaker: "Victor", text: "Pas surprenant — il m'a marqué durablement, et ce n'est pas si fréquent." }
        ]),

        grammar(cultureArtsC1Blocks[0].title, cultureArtsC1Blocks[0].text),

        list([

            "préposition + lequel/laquelle/lesquels/lesquelles, accordés en genre/nombre",

            "à + lequel = auquel ; à + lesquels = auxquels",

            "évocateur, poignant, un tour de force, un portrait tout en nuances",

            "toucher une corde sensible, résister à l'épreuve du temps"

        ]),

        tip(
            "N'oublie Pas la Contraction",
            "'À' se contracte avec 'lequel' : on dit 'auquel', jamais 'à lequel'. Même chose au pluriel : 'auxquels', 'auxquelles', jamais 'à lesquels'."
        ),

        culture(
            "La Critique Littéraire à la Française",
            "La critique littéraire et cinématographique française, dans des publications comme Télérama ou Les Inrockuptibles, cultive un vocabulaire analytique riche et n'hésite pas à utiliser des structures relatives formelles même dans des articles destinés au grand public."
        ),

        quiz(
            "Choisis la forme correcte de 'à + lequel'.",
            ["à lequel", "auquel", "au lequel", "alequel"],
            1,
            "'À' se contracte avec 'lequel' pour former 'auquel'."
        ),

        quiz(
            "Que signifie 'toucher une corde sensible' ?",
            ["ennuyer quelqu'un", "émouvoir quelqu'un profondément", "critiquer sévèrement quelque chose", "ignorer un détail important"],
            1,
            "'Toucher une corde sensible' signifie émouvoir quelqu'un profondément, souvent en touchant un sujet personnel."
        ),

        quiz(
            "Choisis la phrase avec la relative correctement accordée.",
            [
                "La personne avec lequel il travaillait a démissionné.",
                "La personne avec laquelle il travaillait a démissionné.",
                "La personne avec lesquelles il travaillait a démissionné.",
                "La personne avec qui laquelle il travaillait a démissionné."
            ],
            1,
            "'Laquelle' s'accorde au féminin singulier avec 'la personne'."
        )

    ],

    summary: {

        tip:
            "Pratique en analysant une œuvre que tu connais avec au moins deux relatives formelles ('auquel', 'avec laquelle', 'pour lesquelles').",

        review: [

            "relatives avec préposition + lequel/laquelle/lesquels/lesquelles",

            "évocateur, poignant, un tour de force, un portrait tout en nuances",

            "toucher une corde sensible, résister à l'épreuve du temps"

        ]

    }

};
