import { workCareersB2Blocks } from "../../../grammar/shared/french/workCareersB2";
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

export const workCareersLesson = {

    id: "french-b2-work-careers",

    language: "french",

    level: "B2",

    category: "Grammar",

    topic: "work-careers",

    order: 3,

    title: "Travail, Carrière et Monde Professionnel",

    subtitle:
        "Fale sobre situações profissionais em francês fazendo deduções e expressando arrependimentos com o verbo 'devoir'.",

    description:
        "Aprenda vocabulário sobre carreira e ambiente de trabalho, e como usar 'devoir' para fazer deduções e expressar arrependimento ou reprovação.",

    cover: "/covers/work-careers-fr.webp",

    estimatedTime: 13,

    difficulty: 4,

    xp: 45,

    tags: [
        "work",
        "devoir",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss careers, leadership and workplace challenges",

        "Use 'devoir' au présent to make a deduction",

        "Use 'devoir' au conditionnel passé to express regret",

        "Distinguish deduction from regret based on the tense of 'devoir'"

    ],

    vocabulary: vocabulary([
        "reproche",
        "faire des reproches à quelqu'un",
        "exigences du poste",
        "compétences requises",
        "évolution professionnelle",
        "reconnaissance au travail",
        "surcharge de travail",
        "démarche professionnelle",
        "entretien annuel",
        "objectifs professionnels",
        "gérer une crise",
        "prendre du recul",
        "faire ses preuves",
        "être débordé",
        "déléguer une tâche",
        "assumer une responsabilité",
        "environnement de travail",
        "hiérarchie",
        "collaborer",
        "remettre en cause"
    ]),

    blocks: [

        heading("Déduire et Regretter"),

        paragraph(
            "'Devoir' est l'un des verbes les plus flexibles du français : selon le temps utilisé, il exprime une déduction logique ou un regret à propos du passé."
        ),

        examples([
            {
                text: "Il doit être en réunion, il ne répond pas au téléphone.",
                translation: "Ele deve estar em reunião, não está atendendo o telefone."
            },
            {
                text: "Tu aurais dû me le dire avant la réunion.",
                translation: "Você deveria ter me dito isso antes da reunião."
            },
            {
                text: "Elle doit être débordée en ce moment, vu sa charge de travail.",
                translation: "Ela deve estar sobrecarregada agora, dada a carga de trabalho dela."
            },
            {
                text: "Nous aurions dû déléguer cette tâche depuis longtemps.",
                translation: "Deveríamos ter delegado essa tarefa há muito tempo."
            },
            {
                text: "Il a dû oublier notre rendez-vous.",
                translation: "Ele deve ter esquecido do nosso compromisso."
            },
            {
                text: "Vous auriez dû assumer cette responsabilité plus tôt.",
                translation: "Vocês deveriam ter assumido essa responsabilidade mais cedo."
            },
            {
                text: "Ça doit être frustrant de gérer une telle surcharge de travail.",
                translation: "Deve ser frustrante gerenciar uma sobrecarga de trabalho dessas."
            }
        ]),

        dialogue([
            { speaker: "Nadia", text: "Tu as des nouvelles de Julien ? Il n'était pas à la réunion annuelle." },
            { speaker: "Thomas", text: "Non, mais il doit être débordé avec son entretien annuel qui approche." },
            { speaker: "Nadia", text: "Peut-être. Honnêtement, on aurait dû le prévenir plus tôt de la date." },
            { speaker: "Thomas", text: "Tu as raison. On aurait dû mieux communiquer sur ça." },
            { speaker: "Nadia", text: "Enfin, il a dû recevoir l'e-mail, non ? On l'a envoyé à toute l'équipe." },
            { speaker: "Thomas", text: "Sûrement. Ça doit être stressant pour lui, avec toute cette surcharge de travail en plus." },
            { speaker: "Nadia", text: "C'est vrai. On aurait vraiment dû mieux répartir les tâches ce trimestre." },
            { speaker: "Thomas", text: "On tirera les leçons de cette expérience. Je vais lui écrire pour m'excuser." }
        ]),

        grammar(workCareersB2Blocks[0].title, workCareersB2Blocks[0].text),

        list([

            "devoir (présent) + infinitif — déduction logique",

            "devoir (passé composé) + infinitif — déduction sur le passé",

            "devoir (conditionnel passé : aurais dû) — regret, reproche",

            "surcharge de travail, être débordé, faire ses preuves"

        ]),

        tip(
            "Le Temps Change Tout le Sens",
            "'Devoir' change complètement de sens selon le temps utilisé. Au présent, c'est une déduction ('il doit être fatigué'). Au conditionnel passé, c'est un regret ou un reproche ('tu aurais dû me prévenir'). Ne confonds jamais ces deux usages."
        ),

        culture(
            "Le Feedback au Travail",
            "Dans les entreprises françaises, il est courant d'utiliser 'on aurait dû...' lors de réunions de bilan pour analyser collectivement ce qui n'a pas fonctionné, sans forcément blâmer une personne en particulier."
        ),

        quiz(
            "Choisis la phrase qui exprime une déduction sur le présent.",
            ["Il aurait dû venir.", "Il doit être malade.", "Il devrait venir.", "Il a dû venir."],
            1,
            "'Il doit être malade' (devoir au présent) exprime une déduction sur le présent."
        ),

        quiz(
            "Choisis la phrase qui exprime un regret.",
            ["Tu dois le faire.", "Tu devrais le faire.", "Tu aurais dû le faire.", "Tu as dû le faire."],
            2,
            "'Tu aurais dû le faire' (devoir au conditionnel passé) exprime un regret à propos du passé."
        ),

        quiz(
            "Que signifie \"il a dû oublier\" ?",
            [
                "Il devait absolument oublier.",
                "C'est probablement ce qui s'est passé : il a oublié.",
                "Il n'a jamais oublié.",
                "Il oubliera bientôt."
            ],
            1,
            "'Devoir' au passé composé + infinitif exprime une déduction sur un événement passé."
        )

    ],

    summary: {

        tip:
            "Pratique à faire des déductions sur une situation professionnelle, puis à exprimer un regret sur quelque chose que tu aurais pu mieux gérer.",

        review: [

            "devoir (présent) — déduction",

            "devoir (passé composé) — déduction sur le passé",

            "devoir (conditionnel passé) — regret",

            "surcharge de travail, faire ses preuves, hiérarchie"

        ]

    }

};
