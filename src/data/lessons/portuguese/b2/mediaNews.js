import { mediaNewsBlocks } from "../../../grammar/shared/portuguese/b2/mediaNews";
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

    id: "portuguese-b2-media-news",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "media-news",

    order: 7,

    title: "Mídia, Notícias e Informação",

    subtitle:
        "Relate e resuma notícias com precisão usando o discurso indireto avançado e verbos de elocução variados.",

    description:
        "Discuta jornalismo, desinformação e redes sociais, aprendendo a sequência de tempos no discurso indireto e verbos como 'alegar', 'negar' e 'afirmar'.",

    cover: "/covers/media-news-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

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

        "Relatar e resumir informações de notícias",

        "Reformular o que alguém disse com precisão",

        "Usar a sequência de tempos verbais no discurso indireto",

        "Distinguir fato, opinião e interpretação com verbos de elocução variados"

    ],

    vocabulary: vocabulary([
        "fonte confiável",
        "desinformação",
        "manchete sensacionalista",
        "viés",
        "opinião pública",
        "checagem de fatos",
        "veículo de comunicação",
        "espalhar-se rapidamente",
        "credibilidade",
        "manipular a informação",
        "algoritmo de recomendação",
        "bolha de informação",
        "reportagem investigativa",
        "influenciador digital",
        "conteúdo patrocinado",
        "espalhar boatos",
        "senso crítico",
        "pauta jornalística",
        "distorcer os fatos",
        "repercussão"
    ]),

    blocks: [

        heading("Contando o que Foi Dito"),

        paragraph(
            "No jornalismo, relatar exatamente o que alguém disse é essencial. Quando a fala original está no passado, os tempos verbais mudam no discurso indireto — e escolher o verbo certo ('afirmou', 'alegou', 'negou') muda como a informação é interpretada."
        ),

        examples([
            { text: "O prefeito alegou que não sabia do problema." },
            { text: "A empresa negou que tivesse cometido erros na checagem de fatos." },
            { text: "O especialista afirmou que a situação melhoraria em breve." },
            { text: "A repórter sugeriu que o governo revisasse a política de comunicação." },
            { text: "A fonte confirmou que a reportagem investigativa continuaria." },
            { text: "Ele admitiu que tinha distorcido os fatos na entrevista original." },
            { text: "O veículo de comunicação garantiu que a notícia vinha de uma fonte confiável." }
        ]),

        dialogue([
            { speaker: "Tatiana", text: "Você viu a repercussão daquela notícia sobre desinformação?" },
            { speaker: "Guilherme", text: "Vi. A empresa negou que tivesse manipulado o algoritmo de recomendação." },
            { speaker: "Tatiana", text: "Mas a reportagem investigativa afirmou que havia provas do contrário, não foi?" },
              { speaker: "Guilherme", text: "Exatamente. O jornalista alegou que tinha uma fonte confiável dentro da empresa." },
            { speaker: "Tatiana", text: "E a empresa comentou algo depois?" },
            { speaker: "Guilherme", text: "Sim, um porta-voz garantiu que revisaria a checagem de fatos internamente." },
            { speaker: "Tatiana", text: "Espero que isso não seja só para acalmar a opinião pública." },
            { speaker: "Guilherme", text: "Concordo. É por isso que o senso crítico é tão importante hoje em dia — pra não cair em manchete sensacionalista." }
        ]),

        grammar(mediaNewsBlocks[0].title, mediaNewsBlocks[0].text),

        list([

            "presente → imperfeito / perfeito → mais-que-perfeito / futuro → futuro do pretérito",

            "verbos de elocução: afirmar, alegar, negar, sugerir, admitir, garantir",

            "fonte confiável, desinformação, checagem de fatos, credibilidade",

            "bolha de informação, senso crítico, distorcer os fatos"

        ]),

        tip(
            "Escolha o Verbo com Cuidado",
            "'Afirmou' soa neutro, mas 'alegou' sugere que a informação ainda não foi confirmada — o verbo de elocução que você escolhe comunica sua própria avaliação sobre a veracidade do que foi dito."
        ),

        culture(
            "Checagem de Fatos no Brasil",
            "Agências brasileiras de checagem de fatos, como a Agência Lupa e o Aos Fatos, ganharam grande relevância nos últimos anos, especialmente durante eleições, para combater a desinformação que se espalha rapidamente nas redes sociais."
        ),

        quiz(
            "Discurso direto: \"Estou pronto.\" Qual é a versão correta no discurso indireto (verbo introdutório no passado)?",
            ["Ele disse que está pronto.", "Ele disse que estava pronto.", "Ele disse que esteve pronto.", "Ele diz que estava pronto."],
            1,
            "O presente ('estou') vira o imperfeito ('estava') no discurso indireto quando o verbo introdutório está no passado."
        ),

        quiz(
            "Qual verbo de elocução sugere dúvida sobre a veracidade da informação?",
            ["afirmou", "confirmou", "alegou", "garantiu"],
            2,
            "'Alegou' sugere que a informação ainda não foi comprovada, diferente de 'afirmou' ou 'confirmou'."
        ),

        quiz(
            "O que é uma 'bolha de informação'?",
            ["um tipo de notícia falsa", "quando algoritmos só mostram conteúdo parecido com o que já vemos", "um erro de digitação numa manchete", "uma notícia que viraliza"],
            1,
            "Uma 'bolha de informação' acontece quando algoritmos de recomendação só mostram conteúdo semelhante ao que já consumimos, limitando nossa visão de mundo."
        )

    ],

    summary: {

        tip:
            "Pratique transformando uma notícia recente do discurso direto para o discurso indireto, mudando os tempos verbais corretamente.",

        review: [

            "sequência de tempos no discurso indireto (verbo introdutório no passado)",

            "verbos de elocução: afirmar, alegar, negar, sugerir",

            "fonte confiável, desinformação, checagem de fatos, senso crítico"

        ]

    }

};
