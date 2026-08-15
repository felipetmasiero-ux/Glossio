import { goalsB1Blocks } from "../../../grammar/shared/french/goalsB1";
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

export const goalsLesson = {

    id: "french-b1-goals",

    language: "french",

    level: "B1",

    category: "Daily Life",

    topic: "goals",

    order: 2,

    title: "Projets, Rêves et Ambitions",

    subtitle:
        "Fale sobre seus planos e ambições em francês usando o futur simple e o futur proche.",

    description:
        "Aprenda a diferença entre o futur proche e o futur simple para falar sobre planos de carreira, estudos e objetivos pessoais.",

    cover: "/covers/goals-fr.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 35,

    tags: [
        "goals",
        "future",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about future plans, dreams and ambitions",

        "Choose correctly between the futur proche and the futur simple",

        "Describe career and education goals",

        "Discuss short-term and long-term ambitions"

    ],

    vocabulary: vocabulary([
        "ambition",
        "ambitieux",
        "emploi de rêve",
        "viser",
        "déterminé",
        "motivé",
        "se fixer un objectif",
        "évolution de carrière",
        "promotion",
        "formation continue",
        "avoir l'intention de",
        "intention",
        "résolution",
        "à long terme",
        "à court terme",
        "suivre une formation",
        "postuler à un emploi",
        "être promu",
        "rêver de",
        "envisager de"
    ]),

    blocks: [

        heading("Parler de l'Avenir"),

        paragraph(
            "Le français utilise deux structures principales pour parler de l'avenir : le futur proche pour un projet déjà décidé, et le futur simple pour une prédiction ou quelque chose de plus lointain."
        ),

        examples([
            {
                text: "Je vais postuler à ce poste — j'ai déjà préparé mon CV.",
                translation: "Vou me candidatar a essa vaga — já preparei meu currículo."
            },
            {
                text: "Dans dix ans, j'aurai peut-être ma propre entreprise.",
                translation: "Daqui a dez anos, talvez eu tenha minha própria empresa."
            },
            {
                text: "Elle va suivre une formation en marketing le mois prochain.",
                translation: "Ela vai fazer um curso de marketing no mês que vem."
            },
            {
                text: "Je ne sais pas encore ce que je ferai après mes études.",
                translation: "Ainda não sei o que farei depois dos meus estudos."
            },
            {
                text: "Si tout se passe bien, nous serons promus cette année.",
                translation: "Se tudo der certo, seremos promovidos este ano."
            },
            {
                text: "Je vais me fixer un nouvel objectif ce mois-ci.",
                translation: "Vou estabelecer uma nova meta este mês."
            },
            {
                text: "Un jour, je rêve de déménager à l'étranger.",
                translation: "Um dia, sonho em me mudar para o exterior."
            }
        ]),

        dialogue([
            { speaker: "Léa", text: "Alors, quels sont tes projets pour l'année prochaine ?" },
            { speaker: "Nathan", text: "Je vais postuler à quelques emplois dans le marketing. J'ai vraiment envie de changer de carrière." },
            { speaker: "Léa", text: "C'est ambitieux ! Tu penses que ce sera facile ?" },
            { speaker: "Nathan", text: "Pas vraiment, mais je suis déterminé. Et toi, tu as des projets ?" },
            { speaker: "Léa", text: "Je vais suivre une formation continue ce semestre. À long terme, j'espère être promue." },
            { speaker: "Nathan", text: "C'est un bon objectif. Dans cinq ans, où est-ce que tu te vois ?" },
            { speaker: "Léa", text: "Honnêtement, je ne sais pas encore. Mais je rêve d'avoir plus de responsabilités." },
            { speaker: "Nathan", text: "Je suis sûr que tu y arriveras. Moi, je vais d'abord me fixer un objectif à court terme." }
        ]),

        grammar(goalsB1Blocks[0].title, goalsB1Blocks[0].text),

        list([

            "futur proche (aller + infinitif) — projet décidé",

            "futur simple (radical + terminaisons) — prédiction, avenir lointain",

            "ambition, viser, se fixer un objectif",

            "à long terme / à court terme"

        ]),

        tip(
            "Certain ou Incertain ?",
            "Le futur proche parle souvent d'un futur plus certain et concret, alors que le futur simple peut exprimer quelque chose de plus incertain ou lointain. 'Je vais déménager la semaine prochaine' (décidé) est différent de 'Un jour, je déménagerai peut-être' (plus vague)."
        ),

        culture(
            "Parler de ses Projets",
            "Dans les entretiens d'embauche en France, on demande souvent 'Où vous voyez-vous dans cinq ans ?' — une question classique pour laquelle il vaut mieux préparer une réponse avec des objectifs clairs et réalistes."
        ),

        quiz(
            "Quelle phrase exprime un projet déjà décidé ?",
            ["Je déménagerai un jour.", "Je vais déménager le mois prochain.", "Je déménagerais si je pouvais.", "Je déménage parfois."],
            1,
            "Le futur proche ('je vais déménager') exprime un projet déjà décidé."
        ),

        quiz(
            "Complète : \"Dans dix ans, j'___ peut-être ma propre entreprise.\"",
            ["ai", "aurai", "avais", "vais avoir"],
            1,
            "Le futur simple ('j'aurai') exprime une prédiction pour un avenir plus lointain."
        ),

        quiz(
            "Quelle structure utilise-t-on pour le futur proche ?",
            ["avoir + participe passé", "aller (présent) + infinitif", "radical + terminaisons", "être + participe passé"],
            1,
            "Le futur proche se forme avec 'aller' au présent + un infinitif."
        )

    ],

    summary: {

        tip:
            "Pratique à décrire tes propres projets : utilise le futur proche pour ce qui est déjà décidé, et le futur simple pour ce qui est plus lointain ou incertain.",

        review: [

            "futur proche — projet décidé",

            "futur simple — prédiction, avenir lointain",

            "ambition, déterminé, se fixer un objectif",

            "à long terme, à court terme"

        ]

    }

};
