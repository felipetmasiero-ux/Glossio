import { economicsB2Blocks } from "../../../grammar/shared/french/economicsB2";
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

export const economicsLesson = {

    id: "french-b2-economics",

    language: "french",

    level: "B2",

    category: "Daily Life",

    topic: "economics",

    order: 10,

    title: "Économie, Consommation et Société",

    subtitle:
        "Fale sobre hábitos de consumo e finanças em francês usando a mise en relief ('c'est... qui/que...') para dar ênfase.",

    description:
        "Aprenda vocabulário de finanças pessoais e comportamento do consumidor, e como usar a mise en relief para enfatizar o elemento mais importante de uma frase.",

    cover: "/covers/economics-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "economics",
        "mise-en-relief",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss personal finance and consumer behavior",

        "Use 'c'est... qui' to emphasize the subject",

        "Use 'c'est... que' to emphasize another element of the sentence",

        "Recognize the negative form 'ce n'est pas... qui/que'"

    ],

    vocabulary: vocabulary([
        "c'est...qui",
        "c'est...que",
        "pouvoir d'achat",
        "comportement d'achat",
        "achat impulsif",
        "consommation responsable",
        "endettement",
        "épargne",
        "investissement",
        "budget serré",
        "faire des économies",
        "vivre à crédit",
        "dépenses superflues",
        "rapport qualité-prix",
        "fidélité à une marque",
        "tendance de consommation",
        "inflation",
        "pouvoir de négociation",
        "rentable",
        "faire des folies"
    ]),

    blocks: [

        heading("Insister sur ce qui Compte Vraiment"),

        paragraph(
            "Pour parler de finances et de consommation, on veut souvent insister sur un point précis. La mise en relief — 'c'est... qui' ou 'c'est... que' — permet exactement ça."
        ),

        examples([
            {
                text: "C'est le prix qui me dérange le plus dans cet achat.",
                translation: "É o preço que mais me incomoda nessa compra."
            },
            {
                text: "C'est justement pour ça que j'ai changé d'avis.",
                translation: "É justamente por isso que mudei de ideia."
            },
            {
                text: "C'est la publicité qui pousse souvent à l'achat impulsif.",
                translation: "É a publicidade que muitas vezes leva à compra por impulso."
            },
            {
                text: "C'est cette dépense-là que je regrette le plus.",
                translation: "É esse gasto que eu mais me arrependo."
            },
            {
                text: "C'est l'inflation qui explique cette hausse des prix.",
                translation: "É a inflação que explica esse aumento de preços."
            },
            {
                text: "C'est en épargnant régulièrement qu'on atteint ses objectifs financiers.",
                translation: "É economizando regularmente que se alcança os objetivos financeiros."
            },
            {
                text: "Ce n'est pas le prix qui compte, c'est la qualité.",
                translation: "Não é o preço que importa, é a qualidade."
            }
        ]),

        dialogue([
            { speaker: "Farid", text: "Tu as vu la nouvelle pub pour ce téléphone ?" },
            { speaker: "Julie", text: "Oui, c'est vraiment bien fait. C'est exactement ce genre de pub qui pousse à l'achat impulsif." },
            { speaker: "Farid", text: "Complètement. C'est le marketing qui crée le besoin, pas forcément la nécessité." },
            { speaker: "Julie", text: "C'est vrai. Moi, c'est mon budget serré qui m'empêche de craquer, heureusement." },
            { speaker: "Farid", text: "C'est une bonne discipline. C'est en évitant ces achats impulsifs qu'on fait de vraies économies." },
            { speaker: "Julie", text: "Exactement. Et ce n'est pas la marque qui compte pour moi, c'est le rapport qualité-prix." },
            { speaker: "Farid", text: "Je suis d'accord. C'est justement pour ça que je compare toujours plusieurs options avant d'acheter." },
            { speaker: "Julie", text: "C'est une bonne habitude à garder." }
        ]),

        grammar(economicsB2Blocks[0].title, economicsB2Blocks[0].text),

        list([

            "c'est... qui — met en valeur le sujet",

            "c'est... que — met en valeur un autre élément",

            "ce n'est pas... qui/que — négation",

            "achat impulsif, pouvoir d'achat, budget serré"

        ]),

        tip(
            "Répondre à 'Qui/Quoi Exactement ?'",
            "La mise en relief permet de répondre implicitement à la question 'qui/quoi exactement ?'. 'C'est le prix qui me dérange' répond à 'Qu'est-ce qui te dérange ?' — c'est une structure très naturelle à l'oral pour insister sur un point précis."
        ),

        culture(
            "La Culture de la Consommation Responsable",
            "En France, la notion de 'consommation responsable' a pris de l'ampleur ces dernières années, avec une attention croissante portée au rapport qualité-prix et à l'impact environnemental des achats, plutôt qu'à la simple fidélité à une marque."
        ),

        quiz(
            "Choisis la bonne phrase de mise en relief (sujet).",
            ["C'est le prix que me dérange.", "C'est le prix qui me dérange.", "C'est le prix dont me dérange.", "C'est le prix où me dérange."],
            1,
            "'C'est... qui' met en valeur le sujet : 'c'est le prix qui me dérange'."
        ),

        quiz(
            "Choisis la bonne phrase.",
            [
                "C'est pour ça qui j'ai changé d'avis.",
                "C'est pour ça que j'ai changé d'avis.",
                "C'est pour ça dont j'ai changé d'avis.",
                "C'est pour ça où j'ai changé d'avis."
            ],
            1,
            "'C'est... que' met en valeur un complément circonstanciel : 'c'est pour ça que'."
        ),

        quiz(
            "À quelle question répond la mise en relief ?",
            ["Quand ?", "Qui/quoi exactement ?", "Comment ?", "Pourquoi pas ?"],
            1,
            "La mise en relief répond implicitement à 'qui/quoi exactement ?', en insistant sur un élément précis."
        )

    ],

    summary: {

        tip:
            "Pratique à insister sur tes propres priorités de consommation en utilisant 'c'est... qui' et 'c'est... que'.",

        review: [

            "c'est... qui — sujet",

            "c'est... que — autre élément",

            "achat impulsif, budget serré, pouvoir d'achat",

            "consommation responsable, rapport qualité-prix"

        ]

    }

};
