import { relationshipsConflictB2Blocks } from "../../../grammar/shared/french/relationshipsConflictB2";
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

export const relationshipsConflictLesson = {

    id: "french-b2-relationships-conflict",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "relationships-conflict",

    order: 9,

    title: "Relations, Communication et Conflits",

    subtitle:
        "Expresse arrependimentos e sentimentos em francês usando o subjuntivo depois de verbos de sentimento.",

    description:
        "Aprenda vocabulário sobre comunicação interpessoal e resolução de conflitos, e como usar o subjuntivo depois de verbos de sentimento e a expressão 'j'aurais aimé'.",

    cover: "/covers/relationships-conflict-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "relationships",
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

        "Discuss communication, misunderstandings and conflict",

        "Use the subjunctive after verbs of feeling (regretter, être content/déçu que)",

        "Use 'j'aurais aimé' + infinitive for a regret about yourself",

        "Use 'j'aurais aimé que' + subjunctive for a regret about someone else"

    ],

    vocabulary: vocabulary([
        "j'aurais aimé que",
        "je regrette que",
        "être content que",
        "être déçu que",
        "malentendu",
        "quiproquo",
        "tension",
        "apaiser",
        "désamorcer un conflit",
        "faire la paix",
        "céder du terrain",
        "trouver un terrain d'entente",
        "prendre sur soi",
        "exprimer ses émotions",
        "rancune",
        "réparer les torts",
        "blessant",
        "blesser quelqu'un",
        "sincèrement désolé",
        "faire table rase"
    ]),

    blocks: [

        heading("Exprimer un Regret ou un Sentiment"),

        paragraph(
            "Pour parler de conflits et de relations, on exprime souvent des sentiments — regret, déception, satisfaction — qui demandent presque toujours le subjonctif dans la proposition qui suit."
        ),

        examples([
            {
                text: "Je regrette qu'on n'ait pas pu se voir avant ton départ.",
                translation: "Lamento que a gente não tenha conseguido se ver antes da sua partida."
            },
            {
                text: "J'aurais aimé être plus honnête avec toi dès le début.",
                translation: "Eu gostaria de ter sido mais honesto com você desde o início."
            },
            {
                text: "Elle est déçue que son ami n'ait pas répondu à son message.",
                translation: "Ela está decepcionada que o amigo não tenha respondido a mensagem dela."
            },
            {
                text: "Je suis content que nous ayons pu trouver un terrain d'entente.",
                translation: "Estou contente que a gente tenha conseguido encontrar um consenso."
            },
            {
                text: "J'aurais aimé que tu me le dises plus tôt.",
                translation: "Eu gostaria que você tivesse me dito isso mais cedo."
            },
            {
                text: "Il regrette que la dispute ait duré aussi longtemps.",
                translation: "Ele lamenta que a briga tenha durado tanto tempo."
            },
            {
                text: "Nous sommes surpris que ce malentendu n'ait pas été résolu plus vite.",
                translation: "Estamos surpresos que esse mal-entendido não tenha sido resolvido mais rápido."
            }
        ]),

        dialogue([
            { speaker: "Adèle", text: "Tu as pu régler les choses avec ta sœur après votre dispute ?" },
            { speaker: "Léo", text: "Pas encore, malheureusement. Je regrette qu'on se soit dit des choses aussi dures." },
            { speaker: "Adèle", text: "Ça arrive. Qu'est-ce qui s'est passé exactement ?" },
            { speaker: "Léo", text: "Un simple malentendu, au départ. J'aurais aimé réagir différemment sur le moment." },
            { speaker: "Adèle", text: "Tu devrais peut-être lui en parler directement. Elle est sûrement déçue que vous ne vous soyez pas reparlé depuis." },
            { speaker: "Léo", text: "Tu as raison. J'aurais aimé qu'on trouve un terrain d'entente plus tôt, mais on est tous les deux un peu rancuniers." },
            { speaker: "Adèle", text: "Ça se comprend. Mais je suis contente que tu envisages de faire le premier pas." },
            { speaker: "Léo", text: "Oui, je vais l'appeler ce soir. Je préfère faire table rase plutôt que de garder cette tension." }
        ]),

        grammar(relationshipsConflictB2Blocks[0].title, relationshipsConflictB2Blocks[0].text),

        list([

            "regretter / être content/déçu/surpris que + subjonctif",

            "j'aurais aimé + infinitif — regret sur soi-même",

            "j'aurais aimé que + subjonctif — regret sur quelqu'un d'autre",

            "malentendu, tension, apaiser, faire la paix"

        ]),

        tip(
            "L'Émotion Demande le Subjonctif",
            "Après les verbes de sentiment (regretter, être content/déçu/surpris que), le subjonctif est presque automatique, même si le fait est objectivement vrai — parce que l'accent est mis sur l'émotion, pas sur la réalité du fait. Compare avec 'je pense que' + indicatif, qui présente un fait, pas une émotion."
        ),

        culture(
            "Exprimer ses Regrets",
            "Dans les relations personnelles en France, il est courant d'utiliser des formules comme 'j'aurais aimé...' ou 'je regrette que...' pour exprimer des regrets sans forcément s'excuser directement — une façon plus douce de reconnaître qu'on aurait pu mieux agir."
        ),

        quiz(
            "Choisis la bonne phrase.",
            [
                "Je regrette qu'on ne s'est pas vus.",
                "Je regrette qu'on ne se soit pas vus.",
                "Je regrette qu'on ne se voit pas.",
                "Je regrette qu'on ne se verra pas."
            ],
            1,
            "'Regretter que' est suivi du subjonctif : 'qu'on ne se soit pas vus'."
        ),

        quiz(
            "Choisis la bonne structure pour un regret sur soi-même.",
            ["J'aurais aimé que je vienne.", "J'aurais aimé venir.", "J'aurais aimé que je viens.", "J'aurais aimé que je viendrais."],
            1,
            "Pour un regret sur soi-même, on utilise 'j'aurais aimé' + infinitif, pas 'que'."
        ),

        quiz(
            "Pourquoi utilise-t-on le subjonctif après \"être content que\" ?",
            ["Parce que le fait est faux", "Parce que l'accent est mis sur l'émotion, pas sur le fait", "Parce que c'est une question", "Parce que c'est au futur"],
            1,
            "Les verbes de sentiment prennent le subjonctif car ils mettent l'accent sur l'émotion, pas sur la certitude du fait."
        )

    ],

    summary: {

        tip:
            "Pratique à exprimer un regret personnel avec 'j'aurais aimé' + infinitif, et un regret sur quelqu'un d'autre avec 'j'aurais aimé que' + subjonctif.",

        review: [

            "verbes de sentiment + subjonctif",

            "j'aurais aimé + infinitif — sur soi-même",

            "j'aurais aimé que + subjonctif — sur quelqu'un d'autre",

            "malentendu, tension, faire la paix"

        ]

    }

};
