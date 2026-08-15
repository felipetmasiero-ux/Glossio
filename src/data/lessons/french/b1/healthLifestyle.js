import { healthLifestyleB1Blocks } from "../../../grammar/shared/french/healthLifestyleB1";
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

export const healthLifestyleLesson = {

    id: "french-b1-health-lifestyle",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "health-lifestyle",

    order: 6,

    title: "Santé, Habitudes et Mode de Vie",

    subtitle:
        "Dê conselhos sobre saúde e estilo de vida em francês usando 'il faut que' + subjuntivo.",

    description:
        "Aprenda vocabulário de saúde e estilo de vida, e uma introdução ao subjuntivo com 'il faut que' e 'il vaut mieux que' para dar conselhos.",

    cover: "/covers/health-lifestyle-fr.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "health",
        "subjonctif",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about lifestyle habits and well-being",

        "Use 'il faut que' + subjonctif to express necessity",

        "Use 'il faut' + infinitive for general advice",

        "Use 'il vaut mieux' to give gentle advice"

    ],

    vocabulary: vocabulary([
        "mode de vie",
        "alimentation équilibrée",
        "malbouffe",
        "faire de l'exercice",
        "rester en forme",
        "stress",
        "stressé",
        "épuisement professionnel",
        "manquer de sommeil",
        "réduire sa consommation de",
        "arrêter de fumer",
        "dormir suffisamment",
        "santé mentale",
        "bien-être",
        "en forme",
        "hors de forme",
        "faire une pause",
        "il faut que",
        "prendre soin de soi"
    ]),

    blocks: [

        heading("Donner des Conseils de Santé"),

        paragraph(
            "Pour donner un conseil fort en français, on utilise souvent le subjonctif après 'il faut que'. C'est la première fois que tu rencontres ce mode — concentre-toi sur les structures les plus utiles."
        ),

        examples([
            {
                text: "Il faut que tu dormes suffisamment, sinon tu vas t'épuiser.",
                translation: "É preciso que você durma o suficiente, senão vai se esgotar."
            },
            {
                text: "Il faut manger équilibré pour rester en forme.",
                translation: "É preciso comer de forma equilibrada para se manter em forma."
            },
            {
                text: "Il vaut mieux que vous fassiez une pause de temps en temps.",
                translation: "É melhor que vocês façam uma pausa de vez em quando."
            },
            {
                text: "Mon médecin dit qu'il faut que je réduise ma consommation de café.",
                translation: "Meu médico diz que preciso reduzir meu consumo de café."
            },
            {
                text: "Il faudrait vraiment que tu arrêtes de fumer.",
                translation: "Seria realmente necessário que você parasse de fumar."
            },
            {
                text: "Pour prendre soin de sa santé mentale, il vaut mieux ne pas trop travailler.",
                translation: "Para cuidar da saúde mental, é melhor não trabalhar demais."
            },
            {
                text: "Il faut que nous fassions plus attention à notre bien-être.",
                translation: "É preciso que a gente preste mais atenção ao nosso bem-estar."
            }
        ]),

        dialogue([
            { speaker: "Manon", text: "Tu as l'air fatigué en ce moment." },
            { speaker: "Julien", text: "Oui, je suis assez stressé au travail. Je crois que je manque de sommeil." },
            { speaker: "Manon", text: "Il faut que tu dormes plus, sérieusement. Sinon tu vas finir par t'épuiser." },
            { speaker: "Julien", text: "Je sais, je sais. Mais il faut aussi que je réduise ma charge de travail, et ce n'est pas facile." },
            { speaker: "Manon", text: "Il vaut mieux que tu en parles à ton responsable avant que ça empire." },
            { speaker: "Julien", text: "Tu as raison. Il faut que je prenne soin de moi un peu plus." },
            { speaker: "Manon", text: "Exactement. Et il vaudrait mieux aussi que tu fasses un peu d'exercice — ça aide beaucoup contre le stress." },
            { speaker: "Julien", text: "D'accord, je vais essayer de faire une pause tous les jours, au moins." }
        ]),

        grammar(healthLifestyleB1Blocks[0].title, healthLifestyleB1Blocks[0].text),

        list([

            "il faut que + subjonctif — nécessité (personne précise)",

            "il faut + infinitif — nécessité générale",

            "il vaut mieux que + subjonctif",

            "stressé, bien-être, épuisement professionnel"

        ]),

        tip(
            "Le Subjonctif N'est Pas si Difficile",
            "Le subjonctif fait peur, mais pour beaucoup de verbes réguliers, il ressemble beaucoup au présent de l'indicatif au singulier : 'que je dorme', 'que tu dormes', 'qu'il dorme'. Concentre-toi d'abord sur les verbes les plus courants : être, avoir, faire, aller, pouvoir."
        ),

        culture(
            "Les Conseils de Santé en France",
            "En France, il est courant que même des amis proches donnent des conseils de santé assez directs — 'il faut que tu ailles chez le médecin' est une phrase normale entre amis, pas seulement quelque chose que dirait un professionnel."
        ),

        quiz(
            "Choisis la bonne forme : \"Il faut que tu ___ plus.\"",
            ["dors", "dormes", "dormir", "dormais"],
            1,
            "Après 'il faut que', on utilise le subjonctif : 'que tu dormes'."
        ),

        quiz(
            "Quelle phrase exprime une nécessité générale, sans personne précise ?",
            ["Il faut que tu manges bien.", "Il faut manger équilibré.", "Tu dois manger bien.", "Il fallait manger bien."],
            1,
            "'Il faut' + infinitif exprime une nécessité générale, sans préciser qui."
        ),

        quiz(
            "Quelle est la structure après \"il vaut mieux que\" ?",
            ["il vaut mieux que + indicatif", "il vaut mieux que + infinitif", "il vaut mieux que + subjonctif", "il vaut mieux que + conditionnel"],
            2,
            "'Il vaut mieux que' est suivi du subjonctif, comme 'il faut que'."
        )

    ],

    summary: {

        tip:
            "Pratique à donner des conseils de santé à un ami en utilisant 'il faut que' et 'il vaut mieux que' avec le subjonctif.",

        review: [

            "il faut que + subjonctif — nécessité",

            "il faut + infinitif — nécessité générale",

            "il vaut mieux que + subjonctif",

            "stressé, bien-être, prendre soin de soi"

        ]

    }

};
