import { cultureArtsB2Blocks } from "../../../grammar/shared/french/cultureArtsB2";
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

    id: "french-b2-culture-arts",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "culture-arts",

    order: 8,

    title: "Culture, Art et Critique",

    subtitle:
        "Analise obras de arte, literatura e cinema em francês usando 'ce qui', 'ce que' e 'ce dont' para expressar ideias gerais.",

    description:
        "Aprenda vocabulário para analisar e criticar obras culturais, e como usar 'ce qui'/'ce que'/'ce dont' quando não há um substantivo preciso a substituir.",

    cover: "/covers/culture-arts-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "culture",
        "arts",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Analyze and discuss literature, film and art",

        "Give more sophisticated opinions about cultural works",

        "Use 'ce qui', 'ce que' and 'ce dont' for general ideas",

        "Distinguish these from 'qui'/'que'/'dont', used with a precise noun"

    ],

    vocabulary: vocabulary([
        "ce qui",
        "ce que",
        "ce dont",
        "œuvre",
        "portée",
        "registre",
        "courant artistique",
        "esthétique",
        "symbolique",
        "interprétation",
        "remettre au goût du jour",
        "susciter l'intérêt",
        "toucher un large public",
        "tomber dans l'oubli",
        "faire polémique",
        "avant-gardiste",
        "dépasser les attentes",
        "décevoir",
        "laisser une empreinte",
        "marquant"
    ]),

    blocks: [

        heading("Parler d'une Œuvre sans Nom Précis"),

        paragraph(
            "Pour exprimer une idée générale sur une œuvre — pas un nom précis, mais toute une idée — le français utilise 'ce qui', 'ce que' et 'ce dont', souvent suivis de 'c'est'."
        ),

        examples([
            {
                text: "Ce qui me touche le plus dans cette œuvre, c'est sa portée universelle.",
                translation: "O que mais me toca nessa obra é seu alcance universal."
            },
            {
                text: "Je ne comprends pas toujours ce que l'artiste a voulu exprimer.",
                translation: "Nem sempre entendo o que o artista quis expressar."
            },
            {
                text: "Ce dont on parle le plus, c'est de la fin controversée du film.",
                translation: "Aquilo de que mais se fala é do final controverso do filme."
            },
            {
                text: "Ce qui rend cette œuvre si marquante, c'est son registre unique.",
                translation: "O que torna essa obra tão marcante é seu registro único."
            },
            {
                text: "Ce que j'apprécie chez ce réalisateur, c'est son esthétique reconnaissable.",
                translation: "O que eu aprecio nesse diretor é sua estética reconhecível."
            },
            {
                text: "Ce dont ce roman a besoin, c'est d'une meilleure fin.",
                translation: "Aquilo de que esse romance precisa é de um final melhor."
            },
            {
                text: "Ce qui a fait polémique, c'est l'interprétation très libre du roman original.",
                translation: "O que causou polêmica foi a interpretação muito livre do romance original."
            }
        ]),

        dialogue([
            { speaker: "Alix", text: "Tu as terminé le roman dont je t'ai parlé ?" },
            { speaker: "Basile", text: "Oui ! Ce qui m'a le plus marqué, c'est le style de l'auteur, vraiment unique." },
            { speaker: "Alix", text: "Je suis d'accord. Ce que j'ai trouvé fascinant, c'est comment il mélange les registres." },
            { speaker: "Basile", text: "Exactement. Par contre, ce dont je suis moins sûr, c'est la fin. Elle m'a un peu déçu." },
            { speaker: "Alix", text: "Ah bon ? Moi, ce qui m'a plu justement, c'est son ambiguïté." },
            { speaker: "Basile", text: "Peut-être. En tout cas, ce dont on peut être certains, c'est que ce livre ne laisse personne indifférent." },
            { speaker: "Alix", text: "C'est vrai. Ce que je retiens surtout, c'est à quel point il fait réfléchir." },
            { speaker: "Basile", text: "Complètement. Ce genre d'œuvre laisse toujours une empreinte durable." }
        ]),

        grammar(cultureArtsB2Blocks[0].title, cultureArtsB2Blocks[0].text),

        list([

            "ce qui — sujet, idée générale",

            "ce que — complément d'objet direct",

            "ce dont — remplace une expression en 'de'",

            "souvent suivi de 'c'est'"

        ]),

        tip(
            "Avec ou Sans Nom Précis",
            "'Ce qui'/'ce que'/'ce dont' fonctionnent comme 'qui'/'que'/'dont', mais quand il n'y a pas de nom précis à remplacer — seulement une idée générale. Compare : 'le livre que j'ai lu' (nom précis) et 'ce que j'ai lu' (idée générale, sans nom précis)."
        ),

        culture(
            "La Critique Culturelle en France",
            "En France, la critique culturelle — de cinéma, de littérature, d'art — occupe une place importante dans les médias, avec des émissions et magazines spécialisés où l'on débat souvent avec passion de ce qui fait une 'bonne' œuvre."
        ),

        quiz(
            "Choisis la bonne phrase.",
            ["Ce que me plaît, c'est le style.", "Ce qui me plaît, c'est le style.", "Ce dont me plaît, c'est le style.", "Ce que je plaît, c'est le style."],
            1,
            "'Ce qui' est le sujet du verbe 'plaît' : 'ce qui me plaît'."
        ),

        quiz(
            "Complète : \"Je ne comprends pas ___ il veut dire.\"",
            ["ce qui", "ce que", "ce dont", "dont"],
            1,
            "'Ce que' est le complément d'objet direct de 'dire' : 'ce qu'il veut dire'."
        ),

        quiz(
            "Quand utilise-t-on \"ce dont\" ?",
            [
                "Pour remplacer le sujet",
                "Pour remplacer le complément d'objet direct",
                "Pour remplacer une expression en 'de'",
                "Pour remplacer un lieu"
            ],
            2,
            "'Ce dont' remplace une idée générale liée à un verbe construit avec 'de' (parler de, avoir besoin de...)."
        )

    ],

    summary: {

        tip:
            "Pratique à donner ton avis sur une œuvre culturelle en utilisant 'ce qui', 'ce que' et 'ce dont' + 'c'est'.",

        review: [

            "ce qui — sujet",

            "ce que — complément d'objet direct",

            "ce dont — expression en 'de'",

            "œuvre, esthétique, marquant, faire polémique"

        ]

    }

};
