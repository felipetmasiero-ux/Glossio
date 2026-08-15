import { travelProblemsB1Blocks } from "../../../grammar/shared/french/travelProblemsB1";
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

export const travelProblemsLesson = {

    id: "french-b1-travel-problems",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "travel-problems",

    order: 5,

    title: "Voyages et Situations Imprévues",

    subtitle:
        "Conte histórias de viagem e imprevistos em francês combinando passé composé, imparfait e pronomes compléments.",

    description:
        "Aprenda vocabulário de viagem e imprevistos, e como enchaîner ações no passado usando os pronomes 'le/la/les', 'y' e 'en' para evitar repetições.",

    cover: "/covers/travel-problems-fr.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "travel",
        "narration",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about travel problems and unexpected situations",

        "Combine the passé composé and the imparfait to tell a full story",

        "Use 'le/la/les' to avoid repeating a noun",

        "Use 'y' and 'en' to replace a place or a quantity"

    ],

    vocabulary: vocabulary([
        "itinéraire",
        "correspondance",
        "vol annulé",
        "vol retardé",
        "bagages perdus",
        "surbooké",
        "se plaindre",
        "en panne",
        "coincé",
        "détour",
        "se perdre",
        "demander son chemin",
        "manquer de",
        "coincé dans les embouteillages",
        "rater sa correspondance",
        "assurance voyage",
        "sac à dos",
        "virée en voiture",
        "imprévu",
        "se débrouiller"
    ]),

    blocks: [

        heading("Raconter une Mésaventure de Voyage"),

        paragraph(
            "Pour raconter une histoire complète, on enchaîne les actions au passé composé sur fond d'imparfait. Et pour ne pas répéter les mêmes mots sans arrêt, on remplace les noms déjà mentionnés par des pronoms : 'le/la/les', 'y' et 'en'."
        ),

        examples([
            {
                text: "Nous attendions à l'aéroport quand ils ont annoncé que le vol était annulé.",
                translation: "Estávamos esperando no aeroporto quando anunciaram que o voo estava cancelado."
            },
            {
                text: "J'ai perdu mon passeport, alors je l'ai cherché partout.",
                translation: "Perdi meu passaporte, então o procurei em todo lugar."
            },
            {
                text: "Le taxi s'est perdu pendant qu'on essayait de trouver notre hôtel.",
                translation: "O táxi se perdeu enquanto tentávamos encontrar nosso hotel."
            },
            {
                text: "Nous sommes allés à Nice l'été dernier, et nous y sommes restés une semaine.",
                translation: "Fomos a Nice no verão passado, e ficamos lá uma semana."
            },
            {
                text: "Il y avait beaucoup de touristes, et nous n'en avions pas l'habitude.",
                translation: "Tinha muitos turistas, e não estávamos acostumados com isso."
            },
            {
                text: "On était bloqués à l'aéroport pendant six heures à cause du retard.",
                translation: "Ficamos presos no aeroporto por seis horas por causa do atraso."
            },
            {
                text: "Finalement, on a retrouvé nos bagages et on les a récupérés au comptoir.",
                translation: "Finalmente encontramos nossas malas e as pegamos no balcão."
            }
        ]),

        dialogue([
            { speaker: "Chloé", text: "Tu ne devineras jamais ce qui s'est passé pendant mon dernier voyage." },
            { speaker: "Yanis", text: "Quoi donc ?" },
            { speaker: "Chloé", text: "On était en train de faire l'enregistrement quand ils nous ont dit que le vol était surbooké !" },
            { speaker: "Yanis", text: "Sans blague ! Qu'est-ce que vous avez fait ?" },
            { speaker: "Chloé", text: "On a dû attendre le vol suivant. Et pendant qu'on attendait, ils ont aussi perdu nos bagages." },
            { speaker: "Yanis", text: "C'est horrible ! Vous les avez récupérés ?" },
            { speaker: "Chloé", text: "Finalement, oui. Mais on est restés bloqués à l'aéroport pendant presque six heures." },
            { speaker: "Yanis", text: "Waouh, ça devait être stressant. Mon pire souvenir de voyage, c'est de m'être perdu en conduisant dans les montagnes." },
            { speaker: "Chloé", text: "Ah oui ? Tu t'en es sorti comment ?" },
            { speaker: "Yanis", text: "On a demandé notre chemin à des gens du coin. Ils nous ont beaucoup aidés." }
        ]),

        grammar(travelProblemsB1Blocks[0].title, travelProblemsB1Blocks[0].text),

        list([

            "passé composé + imparfait — enchaîner une histoire",

            "le / la / les — remplace une personne ou une chose",

            "y — remplace un lieu",

            "en — remplace une quantité ou 'de + nom'"

        ]),

        tip(
            "La Place du Pronom",
            "Place les pronoms compléments juste avant le verbe conjugué (ou l'auxiliaire au passé composé) : 'Je l'ai cherché', pas 'J'ai cherché le.' C'est un piège fréquent, même à ce niveau."
        ),

        culture(
            "Les Histoires de Voyage",
            "Raconter des mésaventures de voyage dramatiques est un sujet de conversation très courant dans les pays francophones, surtout entre personnes qui voyagent souvent — c'est presque un rituel social."
        ),

        quiz(
            "Choisis la bonne phrase.",
            ["J'ai cherché le partout.", "Je l'ai cherché partout.", "Je ai le cherché partout.", "J'ai le cherché partout."],
            1,
            "Le pronom complément se place avant l'auxiliaire : 'Je l'ai cherché.'"
        ),

        quiz(
            "Quel pronom remplace un lieu ?",
            ["le", "en", "y", "que"],
            2,
            "'Y' remplace un lieu déjà mentionné : 'nous y sommes restés' (= restés à Nice)."
        ),

        quiz(
            "Complète : \"Il y avait beaucoup de monde, et nous n'___ avions pas l'habitude.\"",
            ["y", "en", "le", "lui"],
            1,
            "'En' remplace 'de + nom' : 'avoir l'habitude de quelque chose' → 'en avoir l'habitude'."
        )

    ],

    summary: {

        tip:
            "Pratique à raconter une mésaventure de voyage, réelle ou imaginaire, en utilisant des pronoms pour éviter de répéter les mêmes mots.",

        review: [

            "passé composé + imparfait — raconter une histoire",

            "le / la / les — personne ou chose",

            "y — lieu",

            "en — quantité ou 'de + nom'"

        ]

    }

};
