import { mediaB1Blocks } from "../../../grammar/shared/french/mediaB1";
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

export const mediaLesson = {

    id: "french-b1-media",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "media",

    order: 10,

    title: "Médias, Culture et Divertissement",

    subtitle:
        "Descreva e avalie filmes, livros e séries em francês usando a voz passiva.",

    description:
        "Aprenda vocabulário de cinema, livros e séries, e uma introdução à voz passiva para descrever e avaliar produtos culturais.",

    cover: "/covers/media-fr.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "media",
        "voix-passive",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about films, books, music and shows",

        "Give and understand opinions about cultural works",

        "Use the passive voice to describe cultural products",

        "Know when to include or omit 'par + person'"

    ],

    vocabulary: vocabulary([
        "critique",
        "intrigue",
        "personnage",
        "bande originale",
        "succès au box-office",
        "best-seller",
        "sous-titres",
        "plateforme de streaming",
        "acclamé par la critique",
        "surestimé",
        "sous-estimé",
        "captivant",
        "qui fait réfléchir",
        "adaptation",
        "sortie",
        "distribution",
        "ça vaut le coup de regarder",
        "réalisateur",
        "tourner un film",
        "avis"
    ]),

    blocks: [

        heading("Décrire Films, Livres et Séries"),

        paragraph(
            "La voix passive est partout dans les critiques et les descriptions de films, livres et séries, car on s'intéresse souvent plus à l'œuvre elle-même qu'à qui l'a créée."
        ),

        examples([
            {
                text: "Ce film a été réalisé par une jeune cinéaste talentueuse.",
                translation: "Esse filme foi dirigido por uma jovem cineasta talentosa."
            },
            {
                text: "Ce livre a été traduit dans plus de vingt langues.",
                translation: "Esse livro foi traduzido para mais de vinte idiomas."
            },
            {
                text: "La bande originale a été composée spécialement pour le film.",
                translation: "A trilha sonora foi composta especialmente para o filme."
            },
            {
                text: "Cette série est regardée par des millions de personnes chaque semaine.",
                translation: "Essa série é assistida por milhões de pessoas toda semana."
            },
            {
                text: "La fin a été critiquée par beaucoup de fans.",
                translation: "O final foi criticado por muitos fãs."
            },
            {
                text: "Une suite est en train d'être préparée pour l'année prochaine.",
                translation: "Uma sequência está sendo preparada para o ano que vem."
            },
            {
                text: "Ce roman a été adapté au cinéma il y a quelques années.",
                translation: "Esse romance foi adaptado para o cinema há alguns anos."
            }
        ]),

        dialogue([
            { speaker: "Louna", text: "Tu as vu la nouvelle série dont tout le monde parle ?" },
            { speaker: "Enzo", text: "Oui ! Elle est en fait basée sur un best-seller. Le livre a été écrit il y a des années." },
            { speaker: "Louna", text: "Ah bon, je ne savais pas. C'est bien ?" },
            { speaker: "Enzo", text: "C'est excellent. L'intrigue est vraiment captivante, et la bande originale a été composée par un compositeur célèbre." },
            { speaker: "Louna", text: "J'ai entendu dire que la fin était un peu controversée." },
            { speaker: "Enzo", text: "C'est vrai — elle a été critiquée par certains fans, mais moi, j'ai adoré." },
            { speaker: "Louna", text: "Je vais peut-être la regarder ce week-end, alors. Elle est disponible sur toutes les plateformes ?" },
            { speaker: "Enzo", text: "Je crois qu'elle est diffusée seulement sur une plateforme pour le moment, mais une deuxième saison est déjà en train d'être préparée." }
        ]),

        grammar(mediaB1Blocks[0].title, mediaB1Blocks[0].text),

        list([

            "sujet + être + participe passé — voix passive",

            "+ par + personne (seulement si utile)",

            "très courant pour les critiques et descriptions",

            "captivant, acclamé par la critique, surestimé"

        ]),

        tip(
            "N'ajoute 'Par' Que Si C'est Utile",
            "N'ajoute 'par...' que si c'est vraiment utile : 'Ce film est sorti en 2023' est plus naturel que de préciser systématiquement qui l'a sorti. Utilise 'par' seulement quand l'information est pertinente."
        ),

        culture(
            "Les Critiques et les Avis",
            "Dans la culture médiatique francophone, aussi bien les critiques professionnels que le grand public partagent des avis détaillés en ligne, et des expressions comme 'acclamé par la critique' ou 'surestimé' reviennent très souvent dans ces discussions."
        ),

        quiz(
            "Choisis la bonne phrase passive.",
            [
                "Ce film réalisé par une jeune cinéaste.",
                "Ce film a été réalisé par une jeune cinéaste.",
                "Ce film est réalise par une jeune cinéaste.",
                "Ce film réalise par une jeune cinéaste."
            ],
            1,
            "La voix passive au passé composé se forme avec 'être' (au passé composé) + participe passé."
        ),

        quiz(
            "Choisis la bonne phrase.",
            [
                "Ce livre a été écrire il y a des années.",
                "Ce livre a été écrit il y a des années.",
                "Ce livre écrit il y a des années.",
                "Ce livre est écrit il y a des années a été."
            ],
            1,
            "'Écrit' est le participe passé de 'écrire', utilisé après 'a été'."
        ),

        quiz(
            "Quand ajoute-t-on \"par + personne\" dans une phrase passive ?",
            ["Toujours", "Jamais", "Seulement quand c'est une information utile", "Seulement dans les questions"],
            2,
            "'Par + personne' n'est ajouté que lorsque cette information est utile ou pertinente."
        )

    ],

    summary: {

        tip:
            "Pratique à décrire un film ou un livre que tu aimes en utilisant la voix passive pour parler de sa création.",

        review: [

            "sujet + être + participe passé",

            "par + personne — seulement si utile",

            "captivant, acclamé par la critique, surestimé",

            "intrigue, personnage, bande originale"

        ]

    }

};
