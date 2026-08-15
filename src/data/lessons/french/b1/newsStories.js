import { newsStoriesB1Blocks } from "../../../grammar/shared/french/newsStoriesB1";
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

export const newsStoriesLesson = {

    id: "french-b1-news-stories",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "news-stories",

    order: 11,

    title: "Histoires, Actualités et Événements",

    subtitle:
        "Reconte notícias e histórias em francês usando o discurso indireto (discours rapporté).",

    description:
        "Aprenda vocabulário de notícias e acontecimentos inesperados, e como usar o discours rapporté para contar o que alguém disse.",

    cover: "/covers/news-stories-fr.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "news",
        "discours-rapporté",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about news and unexpected events",

        "Report what someone said using the discours rapporté",

        "Change verb tenses correctly in reported speech",

        "Know when to use 'dire que' vs 'dire à quelqu'un que'"

    ],

    vocabulary: vocabulary([
        "gros titre",
        "dernières nouvelles",
        "témoin oculaire",
        "témoigner",
        "rapporter",
        "incident",
        "couverture médiatique",
        "source",
        "rumeur",
        "prétendument",
        "affirmer",
        "annoncer",
        "déclaration",
        "porte-parole",
        "inattendu",
        "tout à coup",
        "soudain",
        "avoir lieu",
        "par la suite",
        "finalement"
    ]),

    blocks: [

        heading("Rapporter ce que Quelqu'un a Dit"),

        paragraph(
            "Le discours rapporté permet de raconter ce qu'une autre personne a dit, sans la citer directement. Le temps du verbe change généralement d'un cran vers le passé."
        ),

        examples([
            {
                text: "Le témoin a dit qu'il avait vu tout l'incident.",
                translation: "A testemunha disse que tinha visto todo o incidente."
            },
            {
                text: "Le porte-parole a annoncé que la nouvelle était vraie.",
                translation: "O porta-voz anunciou que a notícia era verdadeira."
            },
            {
                text: "Elle m'a dit qu'elle me rappellerait plus tard.",
                translation: "Ela me disse que ligaria de volta mais tarde."
            },
            {
                text: "Il a dit qu'il travaillait sur l'article toute la nuit.",
                translation: "Ele disse que estava trabalhando na matéria a noite toda."
            },
            {
                text: "Ils ont affirmé qu'ils ne savaient rien à ce sujet.",
                translation: "Eles alegaram que não sabiam nada sobre isso."
            },
            {
                text: "Le journaliste a dit que l'événement avait eu lieu la veille.",
                translation: "O jornalista disse que o evento tinha acontecido no dia anterior."
            },
            {
                text: "Elle a dit qu'elle viendrait le lendemain.",
                translation: "Ela disse que viria no dia seguinte."
            }
        ]),

        dialogue([
            { speaker: "Nora", text: "Tu as entendu parler de l'accident au centre-ville ?" },
            { speaker: "Sami", text: "Oui, un témoin a dit qu'il avait vu toute la scène." },
            { speaker: "Nora", text: "Vraiment ? Qu'est-ce qu'il a dit exactement ?" },
            { speaker: "Sami", text: "Il a raconté au journaliste que c'était arrivé tout à coup — complètement inattendu." },
            { speaker: "Nora", text: "C'est fou. Est-ce que le porte-parole a dit quelque chose d'officiel ?" },
            { speaker: "Sami", text: "Oui, il a annoncé qu'ils enquêtaient sur l'incident." },
            { speaker: "Nora", text: "Est-ce qu'ils ont dit quand ça avait eu lieu ?" },
            { speaker: "Sami", text: "Ils ont dit que ça s'était passé tôt ce matin-là, avant l'heure de pointe." },
            { speaker: "Nora", text: "Bon, au moins personne n'a été gravement blessé, d'après ce que j'ai entendu." }
        ]),

        grammar(newsStoriesB1Blocks[0].title, newsStoriesB1Blocks[0].text),

        list([

            "présent → imparfait",

            "passé composé → plus-que-parfait",

            "futur simple → conditionnel présent",

            "dire que / dire à quelqu'un que"

        ]),

        tip(
            "Dire Que vs Dire À Quelqu'un Que",
            "Ne dis pas 'elle a dit moi'. Utilise 'elle m'a dit' — avec 'dire', le destinataire est un complément d'objet indirect (introduit par 'à' ou remplacé par 'me/te/lui/nous/vous/leur')."
        ),

        culture(
            "Raconter les Nouvelles",
            "Raconter des nouvelles ou des ragots au discours rapporté — 'il a dit que...', 'elle m'a dit que...' — est extrêmement courant dans les conversations quotidiennes en français, pas seulement dans le journalisme."
        ),

        quiz(
            "Discours direct : \"Je suis fatigué.\" Choisis la bonne version rapportée.",
            ["Il a dit qu'il est fatigué.", "Il a dit qu'il était fatigué.", "Il a dit qu'il a été fatigué.", "Il dit qu'il était fatigué."],
            1,
            "Le présent ('je suis') devient l'imparfait ('il était') au discours rapporté."
        ),

        quiz(
            "Choisis la bonne phrase.",
            ["Elle a dit moi qu'elle viendrait.", "Elle m'a dit qu'elle viendrait.", "Elle a dit à moi qu'elle viendrait.", "Elle m'a dit qu'elle vient."],
            1,
            "'Dire' se construit avec un complément d'objet indirect : 'elle m'a dit'."
        ),

        quiz(
            "Discours direct : \"Je viendrai demain.\" Quel temps utilise-t-on au discours rapporté ?",
            ["le futur simple", "le conditionnel présent", "le présent", "l'imparfait"],
            1,
            "Le futur simple ('je viendrai') devient le conditionnel présent ('il viendrait') au discours rapporté."
        )

    ],

    summary: {

        tip:
            "Pratique à rapporter une nouvelle ou quelque chose qu'un ami t'a dit récemment, en changeant les verbes d'un cran vers le passé.",

        review: [

            "présent → imparfait",

            "futur simple → conditionnel présent",

            "dire que / dire à quelqu'un que",

            "témoin oculaire, porte-parole, affirmer, annoncer"

        ]

    }

};
