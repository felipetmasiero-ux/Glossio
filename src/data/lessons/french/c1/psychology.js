import { psychologyC1Blocks } from "../../../grammar/shared/french/psychologyC1";
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

export const psychologyLesson = {

    id: "french-c1-psychology",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "psychology",

    order: 9,

    title: "Psychologie, Relations et Comportement Humain",

    subtitle:
        "Discutez de comportement et de relations avec précision émotionnelle en apprenant à suggérer et reprocher avec tact.",

    description:
        "Développez du vocabulaire sur les émotions et le comportement, et apprenez des structures pour suggérer sans imposer et reprocher sans blesser.",

    cover: "/covers/psychology-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "psychology",
        "grammar",
        "relations"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss behaviour, emotions and relationships with nuance",

        "Suggest a course of action without imposing it",

        "Offer gentle, tactful criticism of someone's past behaviour",

        "Analyze interpersonal situations using psychological vocabulary"

    ],

    vocabulary: vocabulary([
        "l'autosabotage",
        "donner l'impression de",
        "la projection (psychologique)",
        "se confier à",
        "un mécanisme de défense",
        "la rancœur",
        "cerner quelqu'un",
        "à cran",
        "laisser de l'espace à quelqu'un",
        "une insécurité sous-jacente",
        "prendre du recul par rapport à",
        "valider les émotions de quelqu'un",
        "ruminer",
        "une prophétie autoréalisatrice",
        "garder rancune",
        "un sentiment de conclusion",
        "équilibré",
        "faire la paix avec une situation",
        "une dynamique toxique",
        "à l'écoute des émotions"
    ]),

    blocks: [

        heading("Suggérer et Reprocher avec Tact"),

        paragraph(
            "Discuter de relations et de comportement avec précision demande plus que 'tu devrais'. Le français a des structures spécifiques pour suggérer sans imposer et pour reprocher une action passée sans blesser."
        ),

        examples([
            {
                text: "À ta place, je ne me confierais pas à elle avant d'avoir pris du recul par rapport à la situation.",
                translation: "No seu lugar, eu não me abriria com ela antes de me distanciar um pouco da situação."
            },
            {
                text: "Tu ferais mieux de valider ses émotions avant de proposer une solution.",
                translation: "Você faria melhor em validar os sentimentos dela antes de propor uma solução."
            },
            {
                text: "Ça n'aurait pas été plus simple de me le dire directement, au lieu de ruminer tout seul ?",
                translation: "Não teria sido mais simples me dizer diretamente, em vez de ficar remoendo sozinho?"
            },
            {
                text: "Tu aurais pu au moins me laisser un peu d'espace avant de m'en parler.",
                translation: "Você podia pelo menos ter me dado um espaço antes de falar sobre isso comigo."
            },
            {
                text: "Il donne l'impression d'être équilibré, mais il y a clairement une insécurité sous-jacente.",
                translation: "Ele passa a impressão de ser equilibrado, mas claramente há uma insegurança de fundo."
            },
            {
                text: "Cette dynamique toxique ressemble à une prophétie autoréalisatrice à ce stade.",
                translation: "Essa dinâmica tóxica já parece uma profecia autorrealizável nesse ponto."
            }
        ]),

        dialogue([
            { speaker: "Clara", text: "Tu sembles à cran aujourd'hui. Tout va bien avec ta sœur ?" },
            { speaker: "Simon", text: "Pas vraiment. Ça n'aurait pas été plus simple de me le dire directement, franchement, mais bon." },
            { speaker: "Clara", text: "Qu'est-ce qui s'est passé ?" },
            { speaker: "Simon", text: "Elle s'est confiée à moi, et j'ai donné l'impression de la juger sans le vouloir." },
            { speaker: "Clara", text: "Tu aurais pu au moins lui laisser de l'espace pour finir d'expliquer." },
            { speaker: "Simon", text: "Je sais. Je crois que ça a réveillé une vieille rancœur — presque une prophétie autoréalisatrice." },
            { speaker: "Clara", text: "Tu as essayé de faire la paix avec la situation ?" },
              { speaker: "Simon", text: "J'essaie. À ta place, je m'excuserais simplement au lieu de ruminer tout ça." },
            { speaker: "Clara", text: "Ça semble à l'écoute des émotions, en tout cas. Bon instinct." },
            { speaker: "Simon", text: "On verra. J'espère juste qu'elle ne va pas garder rancune trop longtemps." }
        ]),

        grammar(psychologyC1Blocks[0].title, psychologyC1Blocks[0].text),

        list([

            "'à ta place, je ferais...' — suggestion sans imposer",

            "'tu ferais mieux de' + infinitif — suggestion ferme",

            "conditionnel passé en question rhétorique — reproche atténué",

            "'tu aurais pu au moins...' — reproche plus doux que 'tu aurais dû'"

        ]),

        tip(
            "Aurais Pu vs Aurais Dû",
            "'Tu aurais pu me prévenir' reproche plus doucement que 'tu aurais dû me prévenir', qui peut sembler plus accusateur. Choisis selon le ton que tu veux donner à la remarque."
        ),

        culture(
            "Le Vocabulaire de la Psychologie dans la Conversation",
            "Des mots comme 'bienveillance', 'valider les émotions' et 'dynamique toxique' sont passés du langage clinique au français courant ces dernières années, notamment chez les jeunes générations — reconnaître ce vocabulaire aide à suivre une grande partie des conversations actuelles sur les relations."
        ),

        quiz(
            "Choisis la structure correcte pour un reproche atténué.",
            [
                "Tu dois me prévenir.",
                "Tu aurais pu au moins me prévenir.",
                "Préviens-moi !",
                "Tu ne préviens jamais."
            ],
            1,
            "'Tu aurais pu au moins me prévenir' est un reproche atténué, plus doux qu'un ordre direct."
        ),

        quiz(
            "Que signifie 'garder rancune' ?",
            ["pardonner rapidement", "continuer à ressentir du ressentiment envers quelqu'un", "s'excuser sincèrement", "éviter tout conflit"],
            1,
            "'Garder rancune' signifie continuer à ressentir du ressentiment envers quelqu'un pendant une période prolongée."
        ),

        quiz(
            "Quelle structure suggère sans imposer ?",
            ["Fais ça maintenant.", "Tu dois faire ça.", "À ta place, je ferais ça.", "Il faut absolument faire ça."],
            2,
            "'À ta place, je ferais ça' suggère une alternative sans imposer un ordre."
        )

    ],

    summary: {

        tip:
            "Pratique en donnant un retour bienveillant sur une situation réelle en utilisant 'tu aurais pu' plutôt que 'tu aurais dû'.",

        review: [

            "'à ta place' et 'tu ferais mieux de' pour suggérer sans imposer",

            "conditionnel passé pour un reproche atténué",

            "l'autosabotage, la rancœur, un mécanisme de défense, faire la paix avec"

        ]

    }

};
