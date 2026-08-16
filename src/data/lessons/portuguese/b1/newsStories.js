import { newsStoriesBlocks } from "../../../grammar/shared/portuguese/b1/newsStories";
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

    id: "portuguese-b1-news-stories",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "news-stories",

    order: 11,

    title: "Histórias, Notícias e Acontecimentos",

    subtitle:
        "Conte notícias e histórias usando o discurso indireto.",

    description:
        "Aprenda vocabulário de notícias e acontecimentos inesperados, e como usar o discurso indireto para contar o que alguém disse.",

    cover: "/covers/news-stories-pt.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "news",
        "discurso-indireto",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Falar sobre notícias e acontecimentos inesperados",

        "Relatar o que alguém disse usando o discurso indireto",

        "Mudar corretamente os tempos verbais no discurso indireto",

        "Saber quando usar 'dizer que' e 'dizer a alguém que'"

    ],

    vocabulary: vocabulary([
        "manchete",
        "notícia de última hora",
        "testemunha ocular",
        "testemunhar",
        "relatar",
        "incidente",
        "cobertura jornalística",
        "fonte",
        "boato",
        "supostamente",
        "alegar",
        "anunciar",
        "declaração",
        "porta-voz",
        "inesperado",
        "de repente",
        "subitamente",
        "acontecer",
        "em seguida",
        "finalmente"
    ]),

    blocks: [

        heading("Contando o que Alguém Disse"),

        paragraph(
            "O discurso indireto permite contar o que outra pessoa disse, sem citá-la diretamente. O tempo verbal geralmente muda um passo em direção ao passado."
        ),

        examples([
            { text: "A testemunha disse que tinha visto todo o incidente." },
            { text: "O porta-voz anunciou que a notícia era verdadeira." },
            { text: "Ela me disse que ligaria de volta mais tarde." },
            { text: "Ele disse que estava trabalhando na matéria a noite toda." },
            { text: "Eles alegaram que não sabiam nada sobre isso." },
            { text: "O jornalista disse que o evento tinha acontecido no dia anterior." },
            { text: "Ela disse que viria no dia seguinte." }
        ]),

        dialogue([
            { speaker: "Marina", text: "Você ficou sabendo do acidente no centro?" },
            { speaker: "Felipe", text: "Fiquei, uma testemunha disse que tinha visto toda a cena." },
            { speaker: "Marina", text: "Sério? O que ela disse exatamente?" },
            { speaker: "Felipe", text: "Ela contou ao repórter que aconteceu de repente — completamente inesperado." },
            { speaker: "Marina", text: "Que loucura. O porta-voz falou alguma coisa oficial?" },
            { speaker: "Felipe", text: "Falou sim, ele anunciou que estavam investigando o incidente." },
            { speaker: "Marina", text: "Disseram quando isso tinha acontecido?" },
            { speaker: "Felipe", text: "Disseram que aconteceu bem cedo naquela manhã, antes do horário de pico." },
            { speaker: "Marina", text: "Bom, pelo menos ninguém ficou gravemente ferido, pelo que eu ouvi." }
        ]),

        grammar(newsStoriesBlocks[0].title, newsStoriesBlocks[0].text),

        list([

            "presente → imperfeito",

            "perfeito → mais-que-perfeito",

            "futuro do presente → futuro do pretérito",

            "dizer que / dizer a alguém que"

        ]),

        tip(
            "Dizer Que vs Dizer a Alguém Que",
            "Não diga 'ela disse eu'. Use 'ela me disse' — com 'dizer', o destinatário é um objeto indireto (introduzido por 'a' ou substituído por 'me/te/lhe/nos/lhes')."
        ),

        culture(
            "Contando as Notícias",
            "Contar notícias ou fofocas no discurso indireto — 'ele disse que...', 'ela me disse que...' — é extremamente comum nas conversas do dia a dia no Brasil, não só no jornalismo."
        ),

        quiz(
            "Discurso direto: \"Estou cansado.\" Escolha a versão correta no discurso indireto.",
            ["Ele disse que está cansado.", "Ele disse que estava cansado.", "Ele disse que esteve cansado.", "Ele diz que estava cansado."],
            1,
            "O presente ('estou') vira o imperfeito ('estava') no discurso indireto."
        ),

        quiz(
            "Escolha a frase correta.",
            ["Ela disse eu que viria.", "Ela me disse que viria.", "Ela disse a eu que viria.", "Ela me disse que vem."],
            1,
            "'Dizer' se constrói com um objeto indireto: 'ela me disse'."
        ),

        quiz(
            "Discurso direto: \"Eu virei amanhã.\" Que tempo verbal usamos no discurso indireto?",
            ["futuro do presente", "futuro do pretérito", "presente", "imperfeito"],
            1,
            "O futuro do presente ('virei') vira o futuro do pretérito ('viria') no discurso indireto."
        )

    ],

    summary: {

        tip:
            "Pratique contando uma notícia ou algo que um amigo te disse recentemente, mudando os verbos um passo em direção ao passado.",

        review: [

            "presente → imperfeito",

            "futuro do presente → futuro do pretérito",

            "dizer que vs dizer a alguém que",

            "testemunha ocular, porta-voz, alegar, anunciar"

        ]

    }

};
