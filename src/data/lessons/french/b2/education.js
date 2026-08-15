import { educationB2Blocks } from "../../../grammar/shared/french/educationB2";
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

export const educationLesson = {

    id: "french-b2-education",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "education",

    order: 2,

    title: "Éducation, Apprentissage et Compétences",

    subtitle:
        "Fale sobre educação e desenvolvimento de competências em francês usando o causativo 'faire + infinitivo'.",

    description:
        "Aprenda vocabulário sobre aprendizagem e competências, e como usar 'faire' + infinitivo para expressar que alguém faz algo ser feito por outra pessoa.",

    cover: "/covers/education-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "education",
        "causatif",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss education, learning strategies and qualifications",

        "Use the causative 'faire + infinitive'",

        "Use 'se faire + infinitive' to talk about receiving an action",

        "Distinguish the causative from the passive voice"

    ],

    vocabulary: vocabulary([
        "faire faire quelque chose",
        "se faire aider par",
        "compétence",
        "acquérir",
        "cursus",
        "parcours scolaire",
        "évaluer",
        "évaluation",
        "maîtriser",
        "approfondir",
        "perfectionnement",
        "reconversion professionnelle",
        "valider un diplôme",
        "se perfectionner",
        "faire des progrès",
        "combler une lacune",
        "mise à niveau",
        "apprentissage autonome",
        "transmettre un savoir",
        "se remettre à niveau"
    ]),

    blocks: [

        heading("Déléguer une Action à Quelqu'un d'Autre"),

        paragraph(
            "Le causatif 'faire' + infinitif est essentiel pour parler d'éducation et de compétences, car on délègue souvent une tâche à un expert : faire réviser un texte, faire évaluer ses compétences, faire valider un diplôme."
        ),

        examples([
            {
                text: "J'ai fait réviser mon dossier par un professeur avant de l'envoyer.",
                translation: "Fiz um professor revisar meu processo antes de enviá-lo."
            },
            {
                text: "Elle fait traduire tous ses documents officiels.",
                translation: "Ela manda traduzir todos os seus documentos oficiais."
            },
            {
                text: "Nous avons fait intervenir un spécialiste pour évaluer nos compétences.",
                translation: "Chamamos um especialista para avaliar nossas competências."
            },
            {
                text: "Il faut faire valider ce diplôme avant de postuler.",
                translation: "É preciso mandar validar esse diploma antes de se candidatar."
            },
            {
                text: "Je me suis fait aider par un tuteur pour combler mes lacunes.",
                translation: "Recorri à ajuda de um tutor para preencher minhas lacunas."
            },
            {
                text: "Le professeur fait travailler ses élèves en groupe.",
                translation: "O professor faz seus alunos trabalharem em grupo."
            },
            {
                text: "On a fait venir un expert pour former toute l'équipe.",
                translation: "Chamamos um especialista para treinar toda a equipe."
            }
        ]),

        dialogue([
            { speaker: "Sofia", text: "Tu as l'air stressée avec ton dossier de reconversion." },
            { speaker: "Malick", text: "Un peu. J'ai fait réviser mon CV par un conseiller, mais je dois encore faire valider mon ancien diplôme." },
            { speaker: "Sofia", text: "Ça prend du temps, ces démarches ?" },
            { speaker: "Malick", text: "Oui, assez. Je me suis fait aider par une association spécialisée pour combler certaines lacunes." },
            { speaker: "Sofia", text: "C'est une bonne idée. Moi, je pense faire suivre une formation à toute mon équipe l'année prochaine." },
            { speaker: "Malick", text: "Pourquoi ça ?" },
            { speaker: "Sofia", text: "Parce que je veux faire évoluer leurs compétences ensemble. On a même fait venir un expert pour une session pilote." },
            { speaker: "Malick", text: "Ça a bien marché ?" },
            { speaker: "Sofia", text: "Très bien. Ça a vraiment fait progresser tout le monde." }
        ]),

        grammar(educationB2Blocks[0].title, educationB2Blocks[0].text),

        list([

            "faire + infinitif — le sujet fait faire l'action",

            "se faire + infinitif (par quelqu'un) — subir/bénéficier de l'action",

            "faire évoluer, faire progresser, faire valider",

            "maîtriser, approfondir, combler une lacune"

        ]),

        tip(
            "Causatif ou Passif ?",
            "Ne confonds pas le causatif avec le passif. 'J'ai fait réparer ma voiture' (causatif : j'ai organisé la réparation) est différent de 'Ma voiture a été réparée' (passif : l'accent est sur le résultat, pas forcément sur qui l'a organisé)."
        ),

        culture(
            "Faire Appel à un Expert",
            "En France, il est courant de 'faire appel à' un expert ou un conseiller pour des démarches administratives ou professionnelles complexes — reconnaître qu'on a besoin d'aide extérieure n'est pas vu comme un échec, mais comme une décision pragmatique."
        ),

        quiz(
            "Choisis la bonne phrase causative.",
            [
                "J'ai réparé ma voiture par un mécanicien.",
                "J'ai fait réparer ma voiture par un mécanicien.",
                "J'ai fait réparer ma voiture par mécanicien.",
                "J'ai fait réparé ma voiture par un mécanicien."
            ],
            1,
            "Le causatif est 'faire' + infinitif : 'j'ai fait réparer'."
        ),

        quiz(
            "Que signifie \"je me suis fait aider par un tuteur\" ?",
            ["J'ai aidé le tuteur.", "Le tuteur m'a aidé.", "J'ai refusé l'aide du tuteur.", "Je vais aider le tuteur."],
            1,
            "'Se faire aider par' signifie recevoir de l'aide de quelqu'un."
        ),

        quiz(
            "Quelle est la structure du causatif ?",
            ["faire + participe passé", "faire + infinitif", "être + infinitif", "avoir + infinitif"],
            1,
            "Le causatif se forme avec 'faire' + un verbe à l'infinitif."
        )

    ],

    summary: {

        tip:
            "Pratique à décrire des tâches que tu délègues à quelqu'un d'autre, en utilisant 'faire' + infinitif.",

        review: [

            "faire + infinitif — déléguer une action",

            "se faire + infinitif — recevoir une action",

            "maîtriser, approfondir, combler une lacune",

            "compétence, cursus, mise à niveau"

        ]

    }

};
