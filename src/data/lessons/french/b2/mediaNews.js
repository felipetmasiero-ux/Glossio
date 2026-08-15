import { mediaNewsB2Blocks } from "../../../grammar/shared/french/mediaNewsB2";
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

export const mediaNewsLesson = {

    id: "french-b2-media-news",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "media-news",

    order: 7,

    title: "Médias, Actualités et Information",

    subtitle:
        "Relate informações em francês com precisão usando verbos declarativos como 'nier que', 'prétendre que' e 'reconnaître que'.",

    description:
        "Aprenda vocabulário sobre jornalismo e desinformação, e como usar verbos declarativos nuançados — alguns pedem subjuntivo, outros indicativo.",

    cover: "/covers/media-news-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "media",
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

        "Discuss journalism, misinformation and public opinion",

        "Use nuanced declarative verbs beyond 'dire'",

        "Know which verbs take the subjunctive ('nier que') and which take the indicative",

        "Distinguish information, opinion and interpretation"

    ],

    vocabulary: vocabulary([
        "prétendre que",
        "nier que",
        "reconnaître que",
        "sous-entendre",
        "laisser entendre que",
        "démentir",
        "relayer une information",
        "vérifier une source",
        "propager",
        "manipulation de l'information",
        "angle",
        "objectivité",
        "subjectivité",
        "reformuler",
        "selon",
        "d'après",
        "remettre en perspective",
        "décrypter l'information",
        "esprit critique",
        "garder ses distances avec"
    ]),

    blocks: [

        heading("Rapporter une Information avec Nuance"),

        paragraph(
            "Les verbes déclaratifs en français ne se comportent pas tous de la même façon : certains, comme 'nier', sont suivis du subjonctif parce qu'ils présentent une idée comme fausse ou incertaine ; d'autres, comme 'reconnaître' et 'prétendre', sont suivis de l'indicatif."
        ),

        examples([
            {
                text: "Il nie qu'il ait menti à la presse.",
                translation: "Ele nega que tenha mentido para a imprensa."
            },
            {
                text: "Elle reconnaît qu'elle a fait une erreur de communication.",
                translation: "Ela reconhece que cometeu um erro de comunicação."
            },
            {
                text: "Le journal prétend que cette information vient d'une source fiable.",
                translation: "O jornal alega que essa informação vem de uma fonte confiável."
            },
            {
                text: "Les autorités démentent que l'incident soit lié à cette entreprise.",
                translation: "As autoridades desmentem que o incidente esteja ligado a essa empresa."
            },
            {
                text: "L'article laisse entendre que la situation est plus grave qu'annoncé.",
                translation: "O artigo dá a entender que a situação é mais grave do que anunciado."
            },
            {
                text: "Il ne nie pas avoir reçu l'information, mais il prétend ne pas l'avoir lue.",
                translation: "Ele não nega ter recebido a informação, mas alega não tê-la lido."
            },
            {
                text: "Le porte-parole reconnaît que la communication aurait pu être meilleure.",
                translation: "O porta-voz reconhece que a comunicação poderia ter sido melhor."
            }
        ]),

        dialogue([
            { speaker: "Amina", text: "Tu as suivi le scandale autour de cette entreprise ?" },
            { speaker: "Julien", text: "Oui, c'est confus. Ils nient qu'ils aient caché l'information au début." },
            { speaker: "Amina", text: "Vraiment ? Pourtant, plusieurs articles laissent entendre le contraire." },
            { speaker: "Julien", text: "Exactement. Mais ils prétendent que tout a été communiqué à temps." },
            { speaker: "Amina", text: "Et le porte-parole, il a dit quoi finalement ?" },
            { speaker: "Julien", text: "Il reconnaît que la communication aurait pu être plus claire, sans plus." },
            { speaker: "Amina", text: "C'est typique. On dément d'abord, puis on finit par reconnaître une partie des faits." },
            { speaker: "Julien", text: "Exactement. C'est pour ça qu'il faut toujours vérifier plusieurs sources avant de se faire une opinion." },
            { speaker: "Amina", text: "Complètement d'accord. On ne peut pas tout prendre au premier degré." }
        ]),

        grammar(mediaNewsB2Blocks[0].title, mediaNewsB2Blocks[0].text),

        list([

            "nier que + subjonctif — présente comme faux",

            "prétendre que / reconnaître que + indicatif — présente comme fait",

            "laisser entendre que — insinuer",

            "vérifier une source, esprit critique"

        ]),

        tip(
            "Nier vs Dire",
            "'Nier' est l'un des rares verbes déclaratifs suivis du subjonctif, car nier revient à rejeter une idée comme fausse. Compare : 'il dit qu'il a menti' (indicatif, fait présenté comme vrai) et 'il nie qu'il ait menti' (subjonctif, présenté comme faux)."
        ),

        culture(
            "Le Démenti dans les Médias",
            "Dans le journalisme francophone, le 'droit de réponse' et le 'démenti' officiel sont des pratiques courantes et encadrées par la loi — une personne ou une entreprise citée peut exiger la publication d'une réponse en cas de désaccord avec un article."
        ),

        quiz(
            "Choisis la bonne phrase.",
            ["Il nie qu'il a menti.", "Il nie qu'il ait menti.", "Il nie qu'il a mentait.", "Il nie qu'il mentirait."],
            1,
            "'Nier que' est suivi du subjonctif : 'il nie qu'il ait menti'."
        ),

        quiz(
            "Quel verbe est suivi de l'indicatif ?",
            ["nier que", "reconnaître que", "douter que", "regretter que"],
            1,
            "'Reconnaître que' présente l'idée comme un fait et est suivi de l'indicatif."
        ),

        quiz(
            "Que signifie \"laisser entendre que\" ?",
            ["Affirmer clairement", "Insinuer / suggérer indirectement", "Nier complètement", "Confirmer officiellement"],
            1,
            "'Laisser entendre que' signifie suggérer quelque chose indirectement, sans l'affirmer clairement."
        )

    ],

    summary: {

        tip:
            "Pratique à rapporter une information avec différents verbes déclaratifs — remarque comment chacun change ta position par rapport à l'information.",

        review: [

            "nier que + subjonctif",

            "prétendre que / reconnaître que + indicatif",

            "laisser entendre que, démentir",

            "vérifier une source, esprit critique"

        ]

    }

};
