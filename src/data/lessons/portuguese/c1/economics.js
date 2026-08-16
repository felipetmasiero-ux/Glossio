import { economicsBlocks } from "../../../grammar/shared/portuguese/c1/economics";
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

export const economicsLesson = {

    id: "portuguese-c1-economics",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "economics",

    order: 10,

    title: "Economia, Negócios e Tomada de Decisão",

    subtitle:
        "Descreva tendências econômicas e avalie riscos usando estruturas nominais complexas.",

    description:
        "Discuta mercados, riscos e comportamento do consumidor, aprendendo a construir expressões como 'um aumento expressivo de' para descrever dados com formalidade.",

    cover: "/covers/economics-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "economics",
        "grammar",
        "negócios"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir tendências econômicas e decisões de negócios com precisão",

        "Avaliar riscos e interpretar dados usando linguagem formal",

        "Construir estruturas nominais complexas para tendências e aproximação",

        "Explicar decisões financeiras e seus trade-offs com clareza"

    ],

    vocabulary: vocabulary([
        "uma desaceleração econômica",
        "diversificar",
        "um risco calculado",
        "instável (mercado)",
        "tirar proveito da demanda",
        "margem de erro",
        "ficar abaixo do esperado",
        "uma rede de segurança financeira",
        "estar no vermelho",
        "uma opção viável",
        "economizar de forma prejudicial",
        "com preço elevado",
        "um incentivo",
        "um custo oculto",
        "aquecido (mercado)",
        "concentrar no início do período",
        "uma regra prática",
        "ponderar os prós e contras",
        "uma decisão sensata",
        "atingir o equilíbrio financeiro"
    ]),

    blocks: [

        heading("Descrever Tendências com Precisão"),

        paragraph(
            "O português econômico e profissional privilegia estruturas nominais complexas para resumir dados de forma formal e precisa, em vez de frases verbais simples."
        ),

        examples([
            { text: "Houve uma desaceleração econômica marcante, o que colocou várias pequenas empresas no vermelho." },
            { text: "Uma tendência crescente a diversificar tem ajudado investidores a enfrentar esse mercado instável." },
            { text: "Cerca de um terço dos entrevistados disse que o produto ficou abaixo do esperado, apesar de um lançamento aquecido." },
            { text: "Economizar de forma prejudicial no controle de qualidade raramente é uma decisão sensata, mesmo parecendo um risco calculado no início." },
            { text: "Com uma margem de erro tão ampla, é difícil dizer se vamos atingir o equilíbrio financeiro nesse trimestre." },
            { text: "Um aumento modesto, mas constante, nos incentivos ajudou a empresa a tirar proveito da demanda." },
            { text: "Ela ponderou os prós e contras antes de aceitar um custo oculto tão alto." }
        ]),

        dialogue([
            { speaker: "Débora", text: "Como está indo a nova linha de produtos?" },
            { speaker: "Vinícius", text: "Houve um aumento expressivo nas vendas iniciais, mas, sinceramente, ficou abaixo de algumas projeções internas." },
            { speaker: "Débora", text: "É questão de custo oculto, ou outra coisa?" },
            { speaker: "Vinícius", text: "Um pouco dos dois. Economizamos de forma prejudicial no marketing do lançamento, o que em retrospecto não foi uma decisão sensata." },
              { speaker: "Débora", text: "Vocês ponderaram os prós e contras antes?" },
            { speaker: "Vinícius", text: "Ponderamos, mas a margem de erro da nossa previsão foi maior do que imaginávamos." },
            { speaker: "Débora", text: "Concentrar os gastos no início do próximo trimestre é uma opção viável pra recuperar isso?" },
            { speaker: "Vinícius", text: "É o risco calculado que estamos avaliando. Se a demanda continuar aquecida, podemos atingir o equilíbrio até o fim do ano." },
            { speaker: "Débora", text: "Como regra prática, prefiro diversificar em vez de apostar tudo num único produto." },
            { speaker: "Vinícius", text: "Justo. Ainda não estamos no vermelho, mas vale tirar proveito dessa janela enquanto ela existe." }
        ]),

        grammar(economicsBlocks[0].title, economicsBlocks[0].text),

        list([

            "determinante + adjetivo + substantivo + de/a — estrutura nominal para tendências",

            "aproximação: cerca de um terço de, a grande maioria de, uma queda modesta, mas constante",

            "uma desaceleração econômica, diversificar, instável, aquecido",

            "uma rede de segurança financeira, estar no vermelho, um custo oculto, uma decisão sensata"

        ]),

        tip(
            "Verbo ou Estrutura Nominal?",
            "Na fala cotidiana, 'Os preços subiram muito' é perfeitamente natural. Num relatório ou apresentação, 'Houve um aumento expressivo dos preços' soa muito mais profissional — adapte a estrutura ao registro."
        ),

        culture(
            "A Inflação no Dia a Dia Brasileiro",
            "A inflação teve um papel histórico marcante na economia brasileira, especialmente nas décadas de 1980 e 1990 — por isso, até hoje, o brasileiro médio costuma acompanhar de perto índices como o IPCA e a taxa Selic, que afetam diretamente o custo de vida e as decisões financeiras das famílias."
        ),

        quiz(
            "Escolha a versão nominal mais natural de \"Os preços subiram muito.\"",
            [
                "Os preços subiram.",
                "Houve um aumento expressivo dos preços.",
                "Os preços estão subindo muito agora.",
                "Muita coisa aconteceu com os preços."
            ],
            1,
            "'Houve um aumento expressivo dos preços' é a estrutura nominal complexa usada no português formal/econômico."
        ),

        quiz(
            "O que significa 'estar no vermelho'?",
            ["ter um grande lucro", "estar em situação de prejuízo financeiro", "ter finanças muito estáveis", "lançar um novo produto"],
            1,
            "'Estar no vermelho' significa estar em situação de prejuízo financeiro."
        ),

        quiz(
            "O que significa 'um risco calculado'?",
            ["um risco tomado sem nenhuma reflexão", "um risco tomado após avaliar cuidadosamente as consequências possíveis", "uma decisão ilegal", "um risco com sucesso garantido"],
            1,
            "'Um risco calculado' é um risco assumido deliberadamente, após avaliar custos e benefícios prováveis."
        )

    ],

    summary: {

        tip:
            "Pratique descrevendo uma tendência econômica real ou imaginária usando pelo menos duas estruturas nominais complexas.",

        review: [

            "estruturas nominais complexas para descrever tendências e aproximação",

            "uma desaceleração econômica, diversificar, instável, aquecido",

            "uma rede de segurança financeira, estar no vermelho, um custo oculto, uma decisão sensata"

        ]

    }

};
