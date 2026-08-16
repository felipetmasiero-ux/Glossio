import { societyC1Blocks } from "../../../grammar/shared/french/societyC1";
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

export const societyLesson = {

    id: "french-c1-society",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "society",

    order: 4,

    title: "Société, Valeurs et Débat Public",

    subtitle:
        "Discutez des structures sociales avec sophistication en utilisant 'quand bien même' et le conditionnel.",

    description:
        "Développez du vocabulaire sur la société et les institutions, et apprenez 'quand bien même' + conditionnel pour une concession hypothétique plus forte que 'bien que'.",

    cover: "/covers/society-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "society",
        "grammar",
        "débat-public"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss social structures, institutions and public discourse",

        "Use 'quand bien même' + conditional for strong hypothetical concession",

        "Compare perspectives on social change with nuance",

        "Recognize discourse structures common in formal public debate"

    ],

    vocabulary: vocabulary([
        "clivé",
        "un mouvement citoyen",
        "ancré",
        "une arme à double tranchant",
        "la reddition de comptes",
        "structurel",
        "laissé pour compte",
        "au détriment de",
        "une pente glissante",
        "un tollé",
        "réclamer",
        "un tournant décisif",
        "sous-représenté",
        "au lendemain de",
        "mobiliser",
        "éroder",
        "un intérêt personnel",
        "l'ordre établi",
        "le plaidoyer",
        "endiguer"
    ]),

    blocks: [

        heading("Nuancer un Argument sur la Société"),

        paragraph(
            "Pour discuter d'institutions et de changement social, 'quand bien même' + conditionnel exprime une concession hypothétique plus forte que 'bien que' — insistant sur le fait qu'un scénario différent ne changerait rien au résultat."
        ),

        examples([
            {
                text: "Quand bien même le gouvernement réviserait sa politique, les inégalités structurelles persisteraient.",
                translation: "Mesmo que o governo revisasse sua política, as desigualdades estruturais persistiriam."
            },
            {
                text: "Ce mouvement citoyen a fini par mobiliser l'opinion publique, au lendemain d'un véritable tollé.",
                translation: "Esse movimento popular acabou mobilizando a opinião pública, na esteira de uma indignação real."
              },
            {
                text: "Quoi qu'il en soit, cette réforme représente un tournant décisif pour les groupes sous-représentés.",
                translation: "De qualquer forma, essa reforma representa um marco decisivo para os grupos sub-representados."
            },
            {
                text: "Cette politique est une arme à double tranchant : elle protège certains, au détriment d'autres.",
                translation: "Essa política é uma faca de dois gumes: protege alguns, às custas de outros."
            },
            {
                text: "L'ordre établi ne changera pas sans une véritable reddition de comptes de la part des institutions.",
                translation: "A ordem estabelecida não vai mudar sem uma real prestação de contas por parte das instituições."
            },
            {
                text: "Cela étant dit, certains groupes autrefois laissés pour compte voient enfin des avancées concrètes.",
                translation: "Dito isso, alguns grupos antes marginalizados finalmente veem avanços concretos."
            }
        ]),

        dialogue([
            { speaker: "Chloé", text: "Qu'est-ce que tu penses de la réforme des institutions publiques ?" },
            { speaker: "Antoine", text: "Quand bien même elle serait bien appliquée, je doute qu'elle résolve les problèmes structurels de fond." },
            { speaker: "Chloé", text: "Pourtant, ce mouvement citoyen a vraiment réussi à mobiliser l'opinion publique." },
            { speaker: "Antoine", text: "C'est vrai, et ça a provoqué un tollé qui a forcé les institutions à réagir." },
            { speaker: "Chloé", text: "Tu ne penses pas que c'est un tournant décisif, alors ?" },
              { speaker: "Antoine", text: "Dans une certaine mesure, oui. Mais l'ordre établi est tellement ancré que je reste prudent." },
            { speaker: "Chloé", text: "Cela étant dit, les groupes sous-représentés voient enfin certaines avancées." },
            { speaker: "Antoine", text: "Vrai. Quoi qu'il en soit, il faudra une vraie reddition de comptes pour que ça dure." }
        ]),

        grammar(societyC1Blocks[0].title, societyC1Blocks[0].text),

        list([

            "'quand bien même' + conditionnel — concession hypothétique forte",

            "'quoi qu'il en soit' / 'cela étant dit' — nuancer une affirmation",

            "clivé, ancré, structurel, éroder, mobiliser",

            "la reddition de comptes, l'ordre établi, laissé pour compte"

        ]),

        tip(
            "Une Concession Renforcée",
            "'Quand bien même' est plus fort que 'même si' : il insiste sur le fait qu'un changement de circonstances, même important, ne changerait rien au résultat. Réserve-le aux moments où tu veux vraiment insister sur ce point."
        ),

        culture(
            "Le Débat Public en France",
            "La tradition française du débat public, héritée en partie du système éducatif et de la vie politique, valorise beaucoup la nuance et la contre-argumentation structurée — des expressions comme 'quoi qu'il en soit' et 'cela étant dit' y sont omniprésentes."
        ),

        quiz(
            "Choisis la phrase correcte avec 'quand bien même'.",
            [
                "Quand bien même le gouvernement change, rien ne bougera.",
                "Quand bien même le gouvernement changerait, rien ne bougerait.",
                "Quand bien même le gouvernement a changé, rien ne bougerait.",
                "Quand bien même le gouvernement changera, rien ne bougerait."
            ],
            1,
            "'Quand bien même' est suivi du conditionnel dans les deux parties de la phrase."
        ),

        quiz(
            "Que signifie 'laissé pour compte' ?",
            ["très respecté par la société", "marginalisé, oublié par la société", "extrêmement riche", "récemment promu"],
            1,
            "'Laissé pour compte' décrit une personne ou un groupe marginalisé, oublié par la société."
        ),

        quiz(
            "Que signifie 'la reddition de comptes' ?",
            ["l'obligation de rendre des comptes sur ses actions", "un type d'impôt", "une élection", "un budget national"],
            0,
            "'La reddition de comptes' désigne l'obligation, pour une institution ou une personne, de rendre des comptes sur ses actions."
        )

    ],

    summary: {

        tip:
            "Pratique en construisant un argument sur une question sociale avec 'quand bien même' + conditionnel.",

        review: [

            "'quand bien même' + conditionnel pour une concession hypothétique forte",

            "clivé, ancré, structurel, éroder, mobiliser",

            "la reddition de comptes, l'ordre établi, laissé pour compte"

        ]

    }

};
