import { personalDevelopmentBlocks } from "../../../grammar/shared/portuguese/c1/personalDevelopment";
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

export const personalDevelopmentLesson = {

    id: "portuguese-c1-personal-development",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "personal-development",

    order: 1,

    title: "Identidade, Mudanças e Escolhas de Vida",

    subtitle:
        "Reflita sobre identidade e mudanças de vida com precisão, usando marcadores de reformulação como 'ou seja' e 'em outras palavras'.",

    description:
        "Aprenda a reformular e precisar suas próprias ideias em tempo real, e desenvolva vocabulário sobre identidade, valores e momentos decisivos.",

    cover: "/covers/personal-development-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "personal-development",
        "grammar",
        "identidade"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Refletir sobre identidade, mudanças e crescimento pessoal com nuance",

        "Explicar escolhas de vida reformulando e precisando as próprias ideias",

        "Usar marcadores de reformulação: ou seja, isto é, em outras palavras",

        "Discutir valores, resiliência e momentos decisivos com precisão"

    ],

    vocabulary: vocabulary([
        "autorrealizar-se",
        "revelar todo o potencial",
        "formador de caráter",
        "lidar com algo difícil",
        "arcar com as consequências",
        "desmoronar-se",
        "reencontrar o foco",
        "numa encruzilhada",
        "fechar um ciclo",
        "falta de autoconfiança",
        "faro para algo",
        "aceitar algo difícil",
        "bem diferente de",
        "de fundo",
        "retomar para si",
        "em retrospecto",
        "fazer sentido de repente",
        "manter distância de",
        "ressalvas quanto a",
        "acabar aceitando"
    ]),

    blocks: [

        heading("Precisar uma Ideia em Tempo Real"),

        paragraph(
            "Para contar uma mudança pessoal com mais precisão, o português tem marcadores que permitem reformular ou corrigir a própria fala enquanto ela acontece — sem precisar recomeçar a frase inteira."
        ),

        examples([
            { text: "Eu queria mais estabilidade, ou seja, um trabalho onde eu não precisasse recomeçar do zero toda hora." },
            { text: "Eu não me sentia realizado — em outras palavras, faltava propósito na minha rotina." },
            { text: "Foi uma decisão difícil — melhor dizendo, foi a decisão mais difícil que já tomei." },
            { text: "Isto é, eu não estava fugindo do problema, só precisava de tempo para arcar com as consequências." },
            { text: "Fiquei numa encruzilhada por meses até finalmente reencontrar o foco." },
            { text: "Em retrospecto, aquela fase formadora de caráter foi bem diferente do que eu esperava." },
            { text: "Tive ressalvas quanto a essa mudança no início, mas acabei aceitando que era necessário." }
        ]),

        dialogue([
            { speaker: "Letícia", text: "Você parece bem mais tranquilo ultimamente." },
            { speaker: "Gabriel", text: "Estou. Passei um bom tempo numa encruzilhada, ou seja, sem saber pra que lado ir." },
            { speaker: "Letícia", text: "O que te ajudou a decidir?" },
            { speaker: "Gabriel", text: "Uma conversa que fez sentido de repente. Melhor dizendo, foi um comentário simples que mudou tudo." },
            { speaker: "Letícia", text: "Sério? O que foi?" },
            { speaker: "Gabriel", text: "Alguém falou que eu tinha faro para esse tipo de trabalho, e isso me ajudou a reencontrar o foco." },
            { speaker: "Letícia", text: "Que legal. Eu também tive ressalvas quanto a uma decisão parecida ano passado." },
            { speaker: "Gabriel", text: "E aí, o que você fez?" },
            { speaker: "Letícia", text: "Acabei aceitando que precisava manter distância de tudo que me fazia desmoronar. Em outras palavras, priorizei minha própria estabilidade." }
        ]),

        grammar(personalDevelopmentBlocks[0].title, personalDevelopmentBlocks[0].text),

        list([

            "'ou seja' / 'isto é' — reformulam a mesma ideia com mais clareza",

            "'em outras palavras' / 'dito de outro modo' — reformulação mais acessível",

            "'melhor dizendo' — corrige a própria frase em tempo real",

            "numa encruzilhada, reencontrar o foco, fechar um ciclo"

        ]),

        tip(
            "Ou Seja vs Por Exemplo",
            "Use 'ou seja' para reformular a MESMA ideia com outras palavras: 'Ele é workaholic, ou seja, vive no trabalho.' Use 'por exemplo' para dar um caso específico: 'Ele tem vários hobbies, por exemplo, escalada.'"
        ),

        culture(
            "Recomeços e Reformulação no Brasil",
            "No Brasil, é comum ouvir pessoas reformularem uma ideia várias vezes numa mesma fala ao contar histórias pessoais — 'ou seja', 'quer dizer' e 'tipo assim' aparecem naturalmente na conversa cotidiana como forma de precisar o que se quer dizer, sem que isso pareça hesitação."
        ),

        quiz(
            "Qual marcador reformula a MESMA ideia com outras palavras?",
            ["por exemplo", "ou seja", "além disso", "por isso"],
            1,
            "'Ou seja' reformula a mesma ideia com outras palavras, diferente de 'por exemplo', que introduz um caso específico."
        ),

        quiz(
            "Complete: \"Eu não me sentia realizado — ___, faltava propósito.\"",
            ["por exemplo", "além disso", "em outras palavras", "portanto"],
            2,
            "'Em outras palavras' reformula a ideia anterior de forma mais acessível."
        ),

        quiz(
            "O que significa estar 'numa encruzilhada'?",
            ["estar muito ocupado", "estar num momento decisivo, sem saber que caminho seguir", "estar de férias", "estar apaixonado"],
            1,
            "'Estar numa encruzilhada' significa estar num momento decisivo da vida, sem saber que caminho seguir."
        )

    ],

    summary: {

        tip:
            "Pratique contando uma mudança pessoal e reformulando pelo menos uma frase com 'ou seja' ou 'em outras palavras'.",

        review: [

            "marcadores de reformulação: ou seja, isto é, em outras palavras, melhor dizendo",

            "autorrealizar-se, reencontrar o foco, fechar um ciclo",

            "numa encruzilhada, de fundo, em retrospecto"

        ]

    }

};
