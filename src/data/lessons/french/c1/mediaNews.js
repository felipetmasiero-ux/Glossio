import { mediaNewsC1Blocks } from "../../../grammar/shared/french/mediaNewsC1";
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

export const mediaNewsLesson = {

    id: "french-c1-media-news",

    language: "french",

    level: "C1",

    category: "Grammar",

    topic: "media-news",

    order: 7,

    title: "Médias, Information et Influence",

    subtitle:
        "Résumez et évaluez des informations médiatiques avec le discours rapporté avancé et la concordance des temps.",

    description:
        "Discutez de journalisme, de désinformation et d'influence des médias, en apprenant à reculer les temps verbaux au discours indirect et à varier les verbes introducteurs.",

    cover: "/covers/media-news-c1-fr.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "media-news",
        "grammar",
        "journalisme"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Summarize and paraphrase information from the media",

        "Evaluate sources for tone, bias and credibility",

        "Apply tense back-shift in reported speech accurately",

        "Distinguish fact, opinion and interpretation in news coverage"

    ],

    vocabulary: vocabulary([
        "une présentation orientée",
        "pour argent comptant",
        "sensationnaliser",
        "une chambre d'écho",
        "discréditer",
        "une campagne de dénigrement",
        "un intérêt caché",
        "trier sur le volet",
        "un fond de vérité",
        "fausser",
        "sous les projecteurs",
        "colporter (une rumeur)",
        "prendre avec des pincettes",
        "un média",
        "l'influence (médiatique)",
        "l'objectivité",
        "amplifier",
        "un agenda caché",
        "corroborer",
        "lire entre les lignes"
    ]),

    blocks: [

        heading("Rapporter une Information avec Exactitude"),

        paragraph(
            "Le journalisme et le français formel utilisent la concordance des temps au discours indirect et des verbes introducteurs variés pour rapporter une déclaration avec précision, sans en déformer le sens."
        ),

        examples([
            {
                text: "Le porte-parole a affirmé que la situation s'améliorerait rapidement, mais peu de journalistes l'ont pris pour argent comptant.",
                translation: "O porta-voz afirmou que a situação melhoraria rapidamente, mas poucos jornalistas aceitaram isso sem questionar."
            },
            {
                text: "Elle a prétendu qu'elle n'était au courant de rien, ce qui a immédiatement soulevé des doutes.",
                translation: "Ela alegou que não sabia de nada, o que imediatamente levantou dúvidas."
            },
            {
                text: "Ce média est accusé de trier sur le volet les chiffres pour fausser la perception du public.",
                translation: "Esse veículo é acusado de selecionar convenientemente os números para distorcer a percepção do público."
            },
            {
                text: "Il y a un fond de vérité, mais l'histoire a clairement été sensationnalisée pour attirer l'attention.",
                translation: "Há um fundo de verdade, mas a história claramente foi sensacionalizada para chamar atenção."
            },
            {
                text: "Ne le prends pas pour argent comptant : ce média a un intérêt caché dans cette affaire.",
                translation: "Não aceite isso sem questionar: esse veículo tem um interesse oculto nesse caso."
            },
            {
                text: "Avant d'amplifier cette rumeur, mieux vaut la prendre avec des pincettes et attendre qu'elle soit corroborée.",
                translation: "Antes de amplificar esse boato, é melhor desconfiar dele e esperar que seja confirmado."
            }
        ]),

        dialogue([
            { speaker: "Sarah", text: "Tu as vu cette histoire qui circule sur le PDG ?" },
            { speaker: "Alexandre", text: "Oui. Il paraît que ça aurait commencé comme une campagne de dénigrement, en fait." },
            { speaker: "Sarah", text: "Vraiment ? Je l'avais pris pour argent comptant au début." },
              { speaker: "Alexandre", text: "Je comprends — le média a une certaine influence, mais on lui prête aussi un intérêt caché ici." },
            { speaker: "Sarah", text: "Alors, il y a du vrai là-dedans ?" },
            { speaker: "Alexandre", text: "Un fond de vérité sans doute, mais les chiffres semblent triés sur le volet pour fausser l'histoire." },
            { speaker: "Sarah", text: "Comment on fait pour lire entre les lignes, dans ce cas ?" },
            { speaker: "Alexandre", text: "On corrobore avec d'autres sources avant d'amplifier quoi que ce soit. Sinon on alimente juste la chambre d'écho." },
            { speaker: "Sarah", text: "D'accord, je vais prendre tout ça avec des pincettes pour l'instant." }
        ]),

        grammar(mediaNewsC1Blocks[0].title, mediaNewsC1Blocks[0].text),

        list([

            "présent → imparfait / passé composé → plus-que-parfait / futur → conditionnel",

            "verbes introducteurs : affirmer, prétendre, nier, sous-entendre, laisser entendre",

            "une présentation orientée, sensationnaliser, discréditer, fausser",

            "pour argent comptant, un fond de vérité, prendre avec des pincettes"

        ]),

        tip(
            "Le Choix du Verbe Compte",
            "'Affirmer' reste plutôt neutre, mais 'prétendre' suggère un doute sur la véracité du propos rapporté. Le verbe introducteur que tu choisis communique déjà ton propre jugement sur l'information."
        ),

        culture(
            "La Vérification des Faits en France",
             "Des services comme 'Les Décodeurs' du Monde ou 'CheckNews' de Libération se sont imposés en France pour vérifier les informations qui circulent, notamment sur les réseaux sociaux — un vocabulaire spécifique autour de la désinformation ('fake news', 'intox') est devenu courant dans le débat public français."
        ),

        quiz(
            "Discours direct : « Je suis prêt. » Choisis la version correcte au discours indirect (verbe introducteur au passé).",
            [
                "Il a dit qu'il est prêt.",
                "Il a dit qu'il était prêt.",
                "Il a dit qu'il a été prêt.",
                "Il dit qu'il était prêt."
            ],
            1,
            "Le présent ('je suis') devient l'imparfait ('il était') au discours indirect quand le verbe introducteur est au passé."
        ),

        quiz(
            "Quel verbe introducteur suggère un doute sur la véracité d'une déclaration ?",
            ["affirmer", "confirmer", "prétendre", "garantir"],
            2,
            "'Prétendre' suggère un doute sur la véracité de la déclaration rapportée."
        ),

        quiz(
            "Que signifie 'trier sur le volet' des données ?",
            ["collecter toutes les données de façon équitable", "sélectionner seulement les données qui soutiennent un point de vue", "vérifier les données deux fois", "publier des données anonymement"],
            1,
            "'Trier sur le volet' signifie sélectionner uniquement les données qui soutiennent un argument, en ignorant le reste."
        )

    ],

    summary: {

        tip:
            "Pratique en résumant une actualité récente avec au moins deux verbes introducteurs différents et la concordance des temps correcte.",

        review: [

            "concordance des temps au discours indirect",

            "verbes introducteurs : affirmer, prétendre, nier, laisser entendre",

            "une présentation orientée, sensationnaliser, fausser",

            "pour argent comptant, un fond de vérité, prendre avec des pincettes"

        ]

    }

};
