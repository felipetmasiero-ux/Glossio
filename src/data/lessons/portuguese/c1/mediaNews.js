import { mediaNewsBlocks } from "../../../grammar/shared/portuguese/c1/mediaNews";
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

    id: "portuguese-c1-media-news",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "media-news",

    order: 7,

    title: "Mídia, Informação e Influência",

    subtitle:
        "Resuma e avalie informações da mídia usando construções passivas de atribuição como 'alega-se que'.",

    description:
        "Discuta jornalismo, desinformação e influência da mídia, aprendendo a atribuir informações sem citar uma fonte específica.",

    cover: "/covers/media-news-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "media-news",
        "grammar",
        "jornalismo"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Resumir e parafrasear informações da mídia",

        "Avaliar fontes quanto a tom, viés e credibilidade",

        "Usar construções passivas de atribuição sem citar uma fonte específica",

        "Distinguir fato, opinião e interpretação na cobertura jornalística"

    ],

    vocabulary: vocabulary([
        "uma narrativa manipulada",
        "pelo valor aparente",
        "sensacionalizar",
        "uma câmara de eco",
        "desacreditar",
        "uma campanha de difamação",
        "interesse oculto",
        "selecionar convenientemente",
        "um fundo de verdade",
        "distorcer",
        "sob os holofotes",
        "espalhar um boato",
        "desconfiar de algo",
        "veículo de mídia",
        "influência midiática",
        "objetividade",
        "amplificar",
        "uma intenção oculta",
        "corroborar",
        "ler nas entrelinhas"
    ]),

    blocks: [

        heading("Atribuir uma Informação sem Citar a Fonte"),

        paragraph(
            "Além do discurso indireto com verbos de elocução, o jornalismo usa construções passivas de atribuição para relatar uma informação sem citar uma fonte específica — essencial para resumir notícias com cautela."
        ),

        examples([
            { text: "Alega-se que a empresa sabia do problema havia meses, mas isso não foi confirmado." },
            { text: "É apontado que os números foram selecionados convenientemente para distorcer a opinião pública." },
            { text: "Foi dito que o governo teria conhecimento do caso, segundo fontes não identificadas." },
            { text: "Especula-se que a decisão já estivesse tomada antes mesmo da reunião oficial." },
            { text: "Não aceite pelo valor aparente — claramente existe uma intenção oculta amplificando essa história." },
            { text: "Esse veículo de mídia é acusado de ter interesse oculto, o que vale a pena desconfiar." },
            { text: "Há um fundo de verdade aqui, mas a história claramente foi sensacionalizada em busca de repercussão." }
        ]),

        dialogue([
            { speaker: "Sabrina", text: "Você viu essa notícia sobre o CEO que está circulando?" },
            { speaker: "Lucas", text: "Vi. Alega-se que começou como uma campanha de difamação, na verdade." },
            { speaker: "Sabrina", text: "Sério? Eu aceitei pelo valor aparente no início." },
              { speaker: "Lucas", text: "Entendo — o veículo tem certa influência midiática, mas também é apontado que tem interesse oculto nisso." },
            { speaker: "Sabrina", text: "Então tem alguma coisa de verdade?" },
            { speaker: "Lucas", text: "Provavelmente um fundo de verdade, mas os números foram selecionados convenientemente pra distorcer a história." },
            { speaker: "Sabrina", text: "Como a gente lê nas entrelinhas, nesse caso?" },
            { speaker: "Lucas", text: "A gente corrobora com outras fontes antes de amplificar qualquer coisa. Senão só alimenta a câmara de eco." },
            { speaker: "Sabrina", text: "Certo, vou desconfiar de tudo isso por enquanto." }
        ]),

        grammar(mediaNewsBlocks[0].title, mediaNewsBlocks[0].text),

        list([

            "'alega-se que' / 'é apontado que' / 'especula-se que' — atribuição sem fonte definida",

            "'foi dito que' + futuro do pretérito composto — informação não confirmada",

            "uma narrativa manipulada, sensacionalizar, desacreditar, distorcer",

            "pelo valor aparente, um fundo de verdade, desconfiar de algo"

        ]),

        tip(
            "Escolha o Verbo com Cuidado",
            "'Alega-se que' sugere dúvida sobre a veracidade da informação, enquanto 'é confirmado que' soa mais neutro e certo. A construção que você escolhe já comunica seu próprio julgamento sobre a informação."
        ),

        culture(
            "A Checagem de Fatos no Brasil",
            "Agências brasileiras de checagem de fatos, como a Agência Lupa e o Aos Fatos, ganharam grande relevância nos últimos anos, especialmente durante eleições, para combater a desinformação que se espalha rapidamente nas redes sociais."
        ),

        quiz(
            "Qual construção atribui uma informação sem citar a fonte?",
            ["Ela disse que sabia do problema.", "Alega-se que a empresa sabia do problema.", "A empresa sabia do problema.", "A empresa admitiu o problema."],
            1,
            "'Alega-se que' atribui a informação a uma fonte vaga ou não especificada, sem confirmá-la como fato."
        ),

        quiz(
            "O que significa 'selecionar convenientemente' dados?",
            ["coletar todos os dados de forma justa", "selecionar só os dados que apoiam um ponto de vista, ignorando o resto", "verificar dados duas vezes", "publicar dados anonimamente"],
            1,
            "'Selecionar convenientemente' significa escolher apenas os dados que apoiam um argumento, ignorando o que o contradiz."
        ),

        quiz(
            "O que significa 'desconfiar de algo'?",
            ["acreditar completamente", "ser cético e não aceitar algo totalmente", "adicionar mais evidências a uma afirmação", "rejeitar algo imediatamente"],
            1,
            "'Desconfiar de algo' significa ser cético em relação a uma afirmação, em vez de aceitá-la totalmente."
        )

    ],

    summary: {

        tip:
            "Pratique resumindo uma notícia usando pelo menos duas construções passivas de atribuição ('alega-se que', 'é apontado que').",

        review: [

            "construções passivas de atribuição: alega-se que, é apontado que, especula-se que",

            "uma narrativa manipulada, sensacionalizar, desacreditar, distorcer",

            "pelo valor aparente, um fundo de verdade, desconfiar de algo"

        ]

    }

};
