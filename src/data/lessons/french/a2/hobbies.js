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

export const hobbiesLesson = {

    id: "french-a2-hobbies",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "hobbies",

    order: 7,

    title: "Hobbies",

    subtitle:
        "Fale sobre suas atividades de tempo livre usando o infinitivo depois de 'aimer', 'adorer' e 'détester' em francês.",

    description:
        "Aprenda vocabulário de hobbies e como usar o infinitivo depois de verbos como 'aimer' e expressões como 's'intéresser à'.",

    cover: "/covers/hobbies.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "hobbies",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Talk about hobbies and free time activities",

        "Use the infinitive after 'aimer/adorer/détester'",

        "Use 's'intéresser à' + noun",

        "Ask about someone's hobbies"

    ],

    vocabulary: vocabulary([
        "passe-temps",
        "peindre",
        "dessiner",
        "collectionner",
        "photographie",
        "casse-tête",
        "échecs",
        "tricoter",
        "pêche",
        "temps libre"
    ]),

    blocks: [

        heading("Qu'est-ce que tu Fais Pendant ton Temps Libre ?"),

        paragraph(
            "Après les verbes 'aimer', 'adorer', 'détester' et 'préférer', le français utilise l'infinitif, pas un gérondif comme en anglais. C'est une différence importante à retenir."
        ),

        examples([
            {
                text: "J'aime peindre pendant mon temps libre.",
                translation: "Eu gosto de pintar no meu tempo livre."
            },

            {
                text: "Elle adore collectionner de vieilles pièces de monnaie.",
                translation: "Ela adora colecionar moedas antigas."
            },

            {
                text: "Je m'intéresse à la photographie et à la pêche.",
                translation: "Eu me interesso por fotografia e pesca."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "C'est quoi, ton passe-temps ?" },
            { speaker: "Marco", text: "J'adore dessiner. Et toi ?" },
            { speaker: "Ana", text: "Je m'intéresse au jardinage, et j'aime jouer aux échecs aussi." },
            { speaker: "Marco", text: "C'est sympa. Je déteste faire des casse-tête, par contre !" }
        ]),

        grammar(
            "Aimer/Adorer/Détester + Infinitif",
            "En français, utilise l'infinitif après 'aimer', 'adorer', 'détester' et 'préférer' : 'J'aime dessiner.' / 'Elle déteste faire des casse-tête.' Utilise aussi l'infinitif après 's'intéresser à' : 'Je m'intéresse à peindre.'"
        ),

        list([

            "aimer / adorer / détester / préférer + infinitif",

            "s'intéresser à + nom",

            "passe-temps, temps libre, peindre, dessiner, collectionner",

            "C'est quoi, ton passe-temps ? — J'aime..."

        ]),

        tip(
            "Pas de Gérondif",
            "Ne dis pas 'J'aime dessinant.' Après 'aimer', utilise toujours l'infinitif : 'J'aime dessiner.' C'est différent de l'anglais, qui utilise la forme en -ing."
        ),

        culture(
            "Les Loisirs et la Communauté",
            "Dans de nombreux pays francophones, les clubs de loisirs sont très populaires — clubs d'échecs, groupes de randonnée et ateliers de photographie sont des façons courantes de se faire des amis qui partagent les mêmes intérêts."
        ),

        quiz(
            "Quelle phrase est grammaticalement correcte ?",
            ["J'aime dessinant.", "J'aime dessiner.", "J'aime dessiné.", "J'aime à dessiner."],
            1,
            "Après 'aimer', on utilise l'infinitif : 'J'aime dessiner.'"
        ),

        quiz(
            "Quelle forme suit 's'intéresser à' ?",
            ["le participe passé", "le gérondif", "l'infinitif ou un nom", "l'imparfait"],
            2,
            "'S'intéresser à' est suivi d'un nom ou de l'infinitif : 'Je m'intéresse à la pêche.'"
        ),

        quiz(
            "Quel loisir consiste à prendre des photos ?",
            ["le jardinage", "la photographie", "les échecs", "le tricot"],
            1,
            "'La photographie' est le loisir qui consiste à prendre des photos."
        )

    ],

    summary: {

        tip:
            "Pratique à décrire tes propres passe-temps en utilisant 'j'aime...', 'j'adore...' et 'je m'intéresse à...'",

        review: [

            "aimer / adorer / détester + infinitif",

            "s'intéresser à + nom",

            "passe-temps, temps libre, peindre, dessiner",

            "photographie, collectionner, échecs, casse-tête"

        ]

    }

};
