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

export const healthLesson = {

    id: "french-a2-health",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "health",

    order: 3,

    title: "Saúde",

    subtitle:
        "Descreva sintomas, peça conselhos e fale sobre ir ao médico em francês.",

    description:
        "Aprenda a descrever como você se sente, sintomas e doenças comuns, e como dar e pedir conselhos usando 'devoir'.",

    cover: "/covers/health.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "health",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Describe common symptoms and illnesses",

        "Give and ask for advice using 'devoir'",

        "Make a doctor's appointment",

        "Talk about medicine and the pharmacy"

    ],

    vocabulary: vocabulary([
        "mal de tête",
        "mal de ventre",
        "fièvre",
        "toux",
        "mal de gorge",
        "vertiges",
        "médicament",
        "pharmacie",
        "rendez-vous",
        "symptôme"
    ]),

    blocks: [

        heading("Comment Te Sens-tu ?"),

        paragraph(
            "Savoir décrire ses symptômes est très utile en français, que ce soit à la pharmacie ou chez le médecin. On utilise souvent 'devoir' au conditionnel pour donner ou demander un conseil de santé."
        ),

        examples([
            {
                text: "J'ai mal à la tête et mal à la gorge.",
                translation: "Estou com dor de cabeça e dor de garganta."
            },

            {
                text: "Tu devrais voir un médecin si la fièvre ne passe pas.",
                translation: "Você deveria consultar um médico se a febre não passar."
            },

            {
                text: "Elle a des vertiges, donc elle a pris un rendez-vous.",
                translation: "Ela está sentindo tontura, então marcou uma consulta."
            }
        ]),

        dialogue([
            { speaker: "Patient", text: "J'ai une mauvaise toux et j'ai des vertiges." },
            { speaker: "Médecin", text: "Vous avez de la fièvre aussi ?" },
            { speaker: "Patient", text: "Oui, depuis hier." },
            { speaker: "Médecin", text: "Vous devriez vous reposer et prendre ce médicament deux fois par jour." }
        ]),

        grammar(
            "Devoir au Conditionnel pour Conseiller",
            "Utilise 'devoir' au conditionnel + infinitif pour donner un conseil : 'Tu devrais boire de l'eau.' Pour un conseil négatif : 'Tu ne devrais pas sauter de repas.' Pour demander un conseil : 'Devrais-je voir un médecin ?'"
        ),

        list([

            "mal de tête, mal de ventre, fièvre, toux, mal de gorge",

            "Tu devrais... / Tu ne devrais pas...",

            "Devrais-je...? — Oui, tu devrais. / Non, tu ne devrais pas.",

            "médicament, pharmacie, rendez-vous, symptôme"

        ]),

        tip(
            "Devoir vs Il Faut",
            "'Tu devrais' est un conseil, pas une obligation stricte. 'Il faut se reposer' peut sonner plus comme une règle ou un ordre du médecin. Choisis 'devoir' au conditionnel quand tu fais juste une recommandation."
        ),

        culture(
            "Les Pharmacies en France",
            "En France, les pharmaciens peuvent donner des conseils de santé de base et recommander des médicaments sans ordonnance pour des symptômes légers, donc il n'est pas toujours nécessaire de consulter un médecin en premier."
        ),

        quiz(
            "Quelle phrase donne correctement un conseil ?",
            ["Tu devrais te reposer.", "Tu dois devrais te reposer.", "Tu devrais te reposant.", "Tu es devrais te reposer."],
            0,
            "'Devoir' au conditionnel + infinitif : 'Tu devrais te reposer.'"
        ),

        quiz(
            "Comment demande-t-on un conseil de santé ?",
            ["Devrais-je voir un médecin ?", "Je devrais voir un médecin ?", "Je dois voir un médecin ?", "Suis-je devrais voir un médecin ?"],
            0,
            "Les questions avec 'devoir' inversent le sujet : 'Devrais-je voir un médecin ?'"
        ),

        quiz(
            "Quel mot décrit la sensation que tout tourne autour de toi ?",
            ["fièvre", "toux", "vertiges", "symptôme"],
            2,
            "'Vertiges' décrit la sensation que tout tourne ou l'instabilité."
        )

    ],

    summary: {

        tip:
            "Pratique à décrire un symptôme et à donner un conseil avec 'devoir', comme 'J'ai mal à la tête. Tu devrais te reposer.'",

        review: [

            "mal de tête, mal de ventre, fièvre, toux, mal de gorge, vertiges",

            "Tu devrais... / Tu ne devrais pas...",

            "Devrais-je...?",

            "médicament, pharmacie, rendez-vous, symptôme"

        ]

    }

};
