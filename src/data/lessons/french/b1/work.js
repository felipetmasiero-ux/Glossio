import { workB1Blocks } from "../../../grammar/shared/french/workB1";
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

export const workLesson = {

    id: "french-b1-work",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "work",

    order: 4,

    title: "Travail et Vie Professionnelle",

    subtitle:
        "Faça pedidos e dê sugestões em francês no ambiente de trabalho usando o conditionnel de politesse.",

    description:
        "Aprenda vocabulário do ambiente profissional e como usar o condicional para fazer pedidos educados, sugestões e dar conselhos suaves no trabalho.",

    cover: "/covers/work-fr.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "work",
        "conditionnel",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about workplace situations and responsibilities",

        "Use the conditional of 'pouvoir' and 'vouloir' to make polite requests",

        "Use 'devoir' au conditionnel to give gentle advice",

        "Use 'il faudrait' for an impersonal suggestion"

    ],

    vocabulary: vocabulary([
        "collègue",
        "délai",
        "charge de travail",
        "heures supplémentaires",
        "démissionner",
        "être viré",
        "entretien d'embauche",
        "lettre de motivation",
        "CV",
        "lieu de travail",
        "tâche",
        "responsabilité",
        "réunion",
        "négocier",
        "salaire",
        "avantages sociaux",
        "travail d'équipe",
        "prendre l'initiative",
        "gérer une équipe",
        "pourriez-vous"
    ]),

    blocks: [

        heading("Être Poli au Travail"),

        paragraph(
            "Dans un contexte professionnel, le conditionnel de 'pouvoir', 'vouloir' et 'devoir' rend les demandes, les suggestions et même les critiques beaucoup plus polies et diplomatiques."
        ),

        examples([
            {
                text: "Pourriez-vous m'envoyer le rapport avant vendredi, s'il vous plaît ?",
                translation: "Você poderia me enviar o relatório antes de sexta-feira, por favor?"
            },
            {
                text: "Je voudrais vous poser une question sur le nouveau projet.",
                translation: "Eu gostaria de te fazer uma pergunta sobre o novo projeto."
            },
            {
                text: "Vous devriez peut-être en discuter avec votre responsable avant de décider.",
                translation: "Talvez você devesse conversar sobre isso com seu gestor antes de decidir."
            },
            {
                text: "Auriez-vous un moment pour une réunion rapide cet après-midi ?",
                translation: "Você teria um tempinho para uma reunião rápida hoje à tarde?"
            },
            {
                text: "Nous devrions négocier un meilleur délai pour ce projet.",
                translation: "Deveríamos negociar um prazo melhor para esse projeto."
            },
            {
                text: "Pourrais-tu m'aider avec cette tâche, s'il te plaît ?",
                translation: "Você poderia me ajudar com essa tarefa, por favor?"
            },
            {
                text: "Il faudrait revoir la charge de travail de toute l'équipe.",
                translation: "Seria preciso rever a carga de trabalho de toda a equipe."
            }
        ]),

        dialogue([
            { speaker: "Sophie", text: "Antoine, auriez-vous un moment pour parler de votre charge de travail ?" },
            { speaker: "Antoine", text: "Bien sûr. Pourrions-nous en discuter maintenant ?" },
            { speaker: "Sophie", text: "Oui, allons-y. Je voudrais savoir si le délai pour ce projet est réaliste pour vous." },
            { speaker: "Antoine", text: "Honnêtement, je pense que nous devrions le négocier. La charge de travail est assez lourde en ce moment." },
            { speaker: "Sophie", text: "Je comprends. Vous devriez peut-être aussi déléguer certaines tâches à l'équipe." },
            { speaker: "Antoine", text: "Bonne idée. Pourriez-vous m'aider à réorganiser les priorités ?" },
            { speaker: "Sophie", text: "Bien sûr. Je vais aussi en parler à la direction — il faudrait sans doute revoir la charge de toute l'équipe." },
            { speaker: "Antoine", text: "Merci beaucoup, je l'apprécie vraiment." }
        ]),

        grammar(workB1Blocks[0].title, workB1Blocks[0].text),

        list([

            "pourriez-vous / pourrais-tu — demande polie",

            "je voudrais — souhait poli",

            "vous devriez — conseil doux",

            "il faudrait — suggestion impersonnelle"

        ]),

        tip(
            "Ordre Direct ou Demande Polie ?",
            "Au travail, le conditionnel rend une phrase plus polie et moins directe. Compare 'Envoyez-moi le rapport' (ordre direct) et 'Pourriez-vous m'envoyer le rapport ?' (demande polie) — la deuxième version est beaucoup plus appropriée dans un contexte professionnel."
        ),

        culture(
            "La Politesse au Bureau",
            "Dans le monde professionnel francophone, l'usage du conditionnel de politesse est presque automatique — même entre collègues proches, on privilégie souvent 'pourriez-vous' à 'pouvez-vous' pour rester courtois."
        ),

        quiz(
            "Quelle est la phrase la plus polie ?",
            ["Envoie-moi le rapport.", "Pourrais-tu m'envoyer le rapport ?", "Tu m'envoies le rapport ?", "Envoyez le rapport !"],
            1,
            "Le conditionnel ('pourrais-tu') rend la demande plus polie."
        ),

        quiz(
            "Choisis la bonne forme de conseil doux.",
            ["Vous devez lui parler.", "Vous devriez lui parler.", "Vous deviez lui parler.", "Vous devrez lui parler."],
            1,
            "'Devriez' (conditionnel) exprime un conseil doux, moins direct que 'devez'."
        ),

        quiz(
            "Que signifie \"je voudrais\" dans ce contexte ?",
            ["Un ordre direct.", "Un souhait poli.", "Une question fermée.", "Une interdiction."],
            1,
            "'Je voudrais' exprime un souhait de façon polie, plus douce que 'je veux'."
        )

    ],

    summary: {

        tip:
            "Pratique à faire des demandes polies au travail : utilise 'pourriez-vous', 'je voudrais' et 'vous devriez' au lieu de formes trop directes.",

        review: [

            "pourriez-vous / pourrais-tu — demande polie",

            "je voudrais — souhait poli",

            "vous devriez / il faudrait — conseil, suggestion",

            "collègue, délai, charge de travail, négocier"

        ]

    }

};
