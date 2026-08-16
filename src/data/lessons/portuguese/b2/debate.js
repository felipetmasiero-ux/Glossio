import { debateBlocks } from "../../../grammar/shared/portuguese/b2/debate";
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

export const debateLesson = {

    id: "portuguese-b2-debate",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "debate",

    order: 11,

    title: "Argumentação, Debate e Pensamento Crítico",

    subtitle:
        "Construa e qualifique argumentos usando marcadores discursivos e modalizadores de certeza e incerteza.",

    description:
        "A lição mais avançada do módulo: aprenda a organizar argumentos, concordar e discordar com nuance, e expressar diferentes graus de certeza.",

    cover: "/covers/debate-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "debate",
        "grammar",
        "argumentação"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Construir argumentos com evidências e organização clara",

        "Qualificar afirmações com diferentes graus de certeza",

        "Concordar e discordar de forma respeitosa e articulada",

        "Apresentar perspectivas diferentes num debate"

    ],

    vocabulary: vocabulary([
        "argumento sólido",
        "linha de raciocínio",
        "evidência",
        "refutar",
        "contra-argumento",
        "generalização",
        "questionável",
        "convincente",
        "posicionar-se",
        "ambiguidade",
        "raciocínio lógico",
        "discordar respeitosamente",
        "reconhecer os limites de um argumento",
        "matizar uma opinião",
        "premissa",
        "viés de confirmação",
        "ponderado",
        "consistência argumentativa",
        "polêmico",
        "chegar a uma conclusão"
    ]),

    blocks: [

        heading("Construindo um Argumento Sólido"),

        paragraph(
            "Um bom debate não é sobre gritar mais alto — é sobre organizar ideias com marcadores discursivos claros e qualificar o quanto você tem certeza do que diz. Esta é a lição mais avançada do módulo, e reúne tudo o que você aprendeu até aqui."
        ),

        examples([
            { text: "Por um lado, a tecnologia facilita a vida; por outro lado, ela pode isolar as pessoas." },
            { text: "Ainda assim, não há dúvida de que ela veio para ficar." },
            { text: "É bem possível que essa política mude nos próximos anos." },
            { text: "Até onde eu sei, ainda não existe uma solução definitiva para esse problema." },
            { text: "Esse argumento parece convincente, mas se baseia numa generalização questionável." },
            { text: "Prefiro matizar minha opinião: concordo em parte, mas reconheço os limites desse argumento." },
            { text: "Na verdade, a premissa desse raciocínio já é polêmica por si só." }
        ]),

        dialogue([
            { speaker: "Daniela", text: "O que você acha do impacto das redes sociais no debate público?" },
            { speaker: "Bruno", text: "Por um lado, elas democratizaram o acesso à informação; por outro lado, alimentam bolhas de opinião." },
            { speaker: "Daniela", text: "Concordo em parte. Ainda assim, não há dúvida de que mudaram completamente como discutimos política." },
            { speaker: "Bruno", text: "Verdade. Mas cuidado com o viés de confirmação — é fácil só seguir quem já pensa como a gente." },
            { speaker: "Daniela", text: "É bem possível que isso piore ainda mais com o tempo, na verdade." },
            { speaker: "Bruno", text: "Talvez. Até onde eu sei, algumas plataformas já tentam mudar isso, mas o resultado é questionável." },
            { speaker: "Daniela", text: "Prefiro matizar minha opinião: concordo que ajuda, mas reconheço os limites dessa solução." },
              { speaker: "Bruno", text: "Argumento ponderado. Acho que chegamos a uma conclusão parecida, mesmo discordando em alguns pontos." },
            { speaker: "Daniela", text: "Exatamente — e é por isso que gosto de discordar respeitosamente: a gente aprende mais assim." }
        ]),

        grammar(debateBlocks[0].title, debateBlocks[0].text),

        list([

            "'por um lado... por outro lado' — apresenta dois pontos de vista",

            "'ainda assim' — contrasta com o que foi dito antes",

            "'é bem possível que' + subjuntivo — incerteza moderada",

            "'não há dúvida de que' + indicativo — certeza"

        ]),

        tip(
            "Modalize Sempre que Puder",
            "Antes de afirmar algo com certeza absoluta, pergunte-se: um modalizador como 'é possível que' ou 'até onde eu sei' deixaria seu argumento mais honesto e menos generalista?"
        ),

        culture(
            "Debate Público no Brasil",
            "Programas de entrevista e debate são tradição na televisão brasileira, mas o debate público migrou fortemente para as redes sociais nas últimas décadas — o que trouxe mais vozes ao debate, mas também tornou o discurso frequentemente mais polarizado e menos ponderado."
        ),

        quiz(
            "Qual marcador apresenta dois pontos de vista diferentes?",
            ["ainda assim", "por um lado... por outro lado", "na verdade", "até onde eu sei"],
            1,
            "'Por um lado... por outro lado' é usado para apresentar dois pontos de vista diferentes sobre o mesmo assunto."
        ),

        quiz(
            "Complete: \"É bem possível que essa política ___ nos próximos anos.\" (mudar)",
            ["muda", "mude", "mudou", "mudará"],
            1,
            "'É bem possível que' pede o subjuntivo, indicando incerteza moderada: 'mude'."
        ),

        quiz(
            "Qual expressão indica maior grau de certeza?",
            ["é bem possível que", "talvez", "não há dúvida de que", "pode ser que"],
            2,
            "'Não há dúvida de que' + indicativo expressa o maior grau de certeza entre as opções."
        )

    ],

    summary: {

        tip:
            "Pratique defendendo uma posição usando 'por um lado... por outro lado... ainda assim...' com pelo menos um modalizador.",

        review: [

            "marcadores discursivos: por um lado/por outro lado, ainda assim, na verdade",

            "modalização: é bem possível que, não há dúvida de que, até onde eu sei",

            "argumento sólido, contra-argumento, matizar uma opinião, viés de confirmação"

        ]

    }

};
