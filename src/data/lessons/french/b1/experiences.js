import { experiencesB1Blocks } from "../../../grammar/shared/french/experiencesB1";
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

export const experiencesLesson = {

    id: "french-b1-experiences",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "experiences",

    order: 1,

    title: "Expériences et Moments Importants",

    subtitle:
        "Fale sobre experiências e momentos marcantes da sua vida em francês combinando o passé composé e o imparfait.",

    description:
        "Aprenda a diferença entre o passé composé e o imparfait para narrar experiências de vida, e uma introdução ao plus-que-parfait.",

    cover: "/covers/experiences-fr.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "experiences",
        "grammar",
        "passé-composé"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about life experiences and memorable events",

        "Combine the passé composé and the imparfait correctly",

        "Recognize when to use the plus-que-parfait",

        "Reflect on past decisions and turning points"

    ],

    vocabulary: vocabulary([
        "mémorable",
        "inoubliable",
        "enfance",
        "tournant décisif",
        "obtenir un diplôme",
        "remise des diplômes",
        "se marier",
        "déménager à l'étranger",
        "voyage sac à dos",
        "se souvenir de",
        "regretter",
        "qui change la vie",
        "parcours",
        "avancée",
        "venir de",
        "atteindre un objectif",
        "s'installer",
        "prendre une décision",
        "tourner la page",
        "avec le recul"
    ]),

    blocks: [

        heading("Raconter une Expérience"),

        paragraph(
            "Pour raconter une expérience de vie en français, on combine souvent deux temps du passé : l'imparfait plante le décor (le contexte, une habitude, un état), et le passé composé raconte ce qui s'est passé précisément."
        ),

        examples([
            {
                text: "Il faisait beau ce jour-là, alors nous avons décidé de partir en randonnée.",
                translation: "Fazia um dia bonito, então decidimos sair para uma trilha."
            },
            {
                text: "J'ai obtenu mon diplôme l'année dernière, et j'ai déjà trouvé un emploi.",
                translation: "Me formei ano passado, e já consegui um emprego."
            },
            {
                text: "Quand j'étais enfant, je voulais devenir pilote.",
                translation: "Quando eu era criança, queria ser piloto."
            },
            {
                text: "Nous avons déménagé à l'étranger parce que nous cherchions une nouvelle aventure.",
                translation: "Nós nos mudamos para o exterior porque estávamos buscando uma nova aventura."
            },
            {
                text: "Quand je suis arrivé, la réunion avait déjà commencé.",
                translation: "Quando cheguei, a reunião já tinha começado."
            },
            {
                text: "Ce voyage a été un vrai tournant décisif dans ma vie.",
                translation: "Aquela viagem foi um verdadeiro ponto de virada na minha vida."
            },
            {
                text: "Avec le recul, je pense que j'ai pris la bonne décision.",
                translation: "Em retrospectiva, acho que tomei a decisão certa."
            }
        ]),

        dialogue([
            { speaker: "Camille", text: "Salut ! Alors, comment s'est passé ton entretien ?" },
            { speaker: "Hugo", text: "Très bien, je pense ! Quand je suis arrivé, ils avaient déjà commencé à interviewer d'autres candidats, mais ça s'est bien passé." },
            { speaker: "Camille", text: "Tu étais stressé ?" },
            { speaker: "Hugo", text: "Un peu, au début. Mais pendant l'entretien, j'étais plutôt confiant." },
            { speaker: "Camille", text: "C'est génial. Ça fait combien de temps que tu cherches ce poste ?" },
            { speaker: "Hugo", text: "Depuis que j'ai obtenu mon diplôme, en fait. C'était vraiment un tournant décisif pour moi de changer de carrière." },
            { speaker: "Camille", text: "Avec le recul, tu es content de ce choix ?" },
            { speaker: "Hugo", text: "Absolument. Je ne regrette rien." }
        ]),

        grammar(experiencesB1Blocks[0].title, experiencesB1Blocks[0].text),

        list([

            "l'imparfait — contexte, habitude, état dans le passé",

            "le passé composé — action précise, terminée",

            "le plus-que-parfait — avant une autre action passée",

            "tournant décisif, parcours, avec le recul"

        ]),

        tip(
            "Décrire ou Raconter ?",
            "Ne confonds pas description et action. 'Il pleuvait' (imparfait, décrit le temps qu'il faisait) est différent de 'Il a plu' (passé composé, l'action de pleuvoir a eu lieu et s'est terminée). Pose-toi la question : est-ce que je décris une scène, ou est-ce que je raconte ce qui s'est passé ?"
        ),

        culture(
            "Raconter sa Vie",
            "Dans les cultures francophones, il est courant de raconter des anecdotes personnelles en mélangeant naturellement l'imparfait (pour le contexte) et le passé composé (pour les événements) — c'est la base de tout bon récit à l'oral."
        ),

        quiz(
            "Quelle phrase décrit le contexte ?",
            ["Il a plu toute la journée.", "Il pleuvait quand je suis sorti.", "Il a commencé à pleuvoir.", "Il pleut depuis ce matin."],
            1,
            "'Il pleuvait' (imparfait) décrit le contexte au moment où une autre action a eu lieu."
        ),

        quiz(
            "Complète : \"Quand je suis arrivé, le film ___ déjà commencé.\"",
            ["a", "avait", "était", "ai"],
            1,
            "Le plus-que-parfait ('avait commencé') montre une action antérieure à une autre action passée."
        ),

        quiz(
            "Quelle phrase raconte une action précise et terminée ?",
            ["J'étais fatigué.", "Je travaillais beaucoup.", "J'ai fini mon travail à 18h.", "Je finissais mon travail."],
            2,
            "Le passé composé ('j'ai fini') raconte une action précise et terminée."
        )

    ],

    summary: {

        tip:
            "Pratique à raconter une expérience personnelle : utilise l'imparfait pour le contexte et le passé composé pour les événements précis.",

        review: [

            "l'imparfait — contexte, habitude, état",

            "le passé composé — action précise, terminée",

            "le plus-que-parfait — avant une autre action passée",

            "tournant décisif, parcours, avec le recul"

        ]

    }

};
