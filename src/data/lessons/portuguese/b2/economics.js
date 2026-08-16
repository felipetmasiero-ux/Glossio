import { economicsBlocks } from "../../../grammar/shared/portuguese/b2/economics";
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

    id: "portuguese-b2-economics",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "economics",

    order: 10,

    title: "Economia, Consumo e Comportamento",

    subtitle:
        "Descreva tendências econômicas usando comparações avançadas como 'quanto mais... mais' e 'à medida que'.",

    description:
        "Discuta consumo, comportamento do consumidor e tendências econômicas, aprendendo estruturas comparativas de proporcionalidade.",

    cover: "/covers/economics-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

    tags: [
        "economics",
        "grammar",
        "consumo"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir comportamento do consumidor e tendências econômicas",

        "Explicar como duas tendências mudam juntas",

        "Comparar situações econômicas usando estruturas avançadas",

        "Apresentar argumentos sobre consumo e comportamento financeiro"

    ],

    vocabulary: vocabulary([
        "poder de compra",
        "inflação",
        "endividar-se",
        "consumo por impulso",
        "tendência de mercado",
        "orçamento familiar",
        "juros altos",
        "poupar",
        "investimento de risco",
        "custo de vida",
        "estratégia de marketing",
        "fidelidade à marca",
        "concorrência",
        "oferta e demanda",
        "recessão",
        "consumidor exigente",
        "planejamento financeiro",
        "gasto supérfluo",
        "valorização",
        "desvalorização"
    ]),

    blocks: [

        heading("Como o Comportamento e a Economia se Relacionam"),

        paragraph(
            "Para descrever tendências econômicas, o português usa estruturas que mostram como duas coisas mudam proporcionalmente: 'quanto mais... mais', 'à medida que' e 'conforme'."
        ),

        examples([
            { text: "Quanto mais a gente compra por impulso, mais a gente se endivida." },
            { text: "À medida que os preços sobem, o consumo tende a cair." },
            { text: "Conforme a renda aumenta, os hábitos de consumo mudam." },
            { text: "Quanto menos a empresa investe em planejamento financeiro, menor é seu crescimento." },
            { text: "À medida que os juros sobem, fica mais difícil poupar dinheiro." },
            { text: "Conforme a concorrência aumenta, as estratégias de marketing precisam mudar." },
            { text: "Quanto maior a inflação, menor é o poder de compra das famílias." }
        ]),

        dialogue([
            { speaker: "Paula", text: "Você notou como o custo de vida subiu esse ano?" },
            { speaker: "Ricardo", text: "Notei. À medida que a inflação aumenta, nosso orçamento familiar fica cada vez mais apertado." },
            { speaker: "Paula", text: "Verdade. Quanto mais os juros sobem, mais difícil fica poupar ou pensar em investimento." },
            { speaker: "Ricardo", text: "Por isso decidi cortar todo gasto supérfluo e evitar consumo por impulso." },
            { speaker: "Paula", text: "Boa ideia. Conforme o poder de compra cai, cada decisão financeira pesa mais." },
            { speaker: "Ricardo", text: "Exato. E as empresas sentem isso também: quanto maior a concorrência, mais elas precisam investir em fidelidade à marca." },
            { speaker: "Paula", text: "Verdade. Você acha que estamos entrando numa recessão?" },
            { speaker: "Ricardo", text: "Talvez. À medida que os indicadores pioram, muitos economistas já falam nisso abertamente." }
        ]),

        grammar(economicsBlocks[0].title, economicsBlocks[0].text),

        list([

            "'quanto mais/menos... mais/menos' — compara mudanças proporcionais",

            "'à medida que' / 'na medida em que' — mudança gradual e proporcional",

            "'conforme' — proporcionalidade em registro neutro",

            "poder de compra, inflação, orçamento familiar, planejamento financeiro"

        ]),

        tip(
            "Não Esqueça o Segundo 'Mais'",
            "Na estrutura 'quanto mais... mais', os dois lados precisam do comparativo: 'quanto mais compra, mais se endivida', nunca 'quanto mais compra, se endivida'."
        ),

        culture(
            "Inflação e o Dia a Dia Brasileiro",
            "A inflação já teve um papel histórico marcante na economia brasileira, especialmente nas décadas de 1980 e 1990 — por isso, até hoje, o brasileiro médio costuma acompanhar de perto índices como o IPCA e a taxa de juros (Selic), que afetam diretamente o custo de vida e o planejamento financeiro das famílias."
        ),

        quiz(
            "Complete: \"___ os preços sobem, o consumo tende a cair.\"",
            ["Quanto", "À medida que", "Apesar de", "Embora"],
            1,
            "'À medida que' indica uma mudança gradual e proporcional: conforme os preços sobem, o consumo cai."
        ),

        quiz(
            "Escolha a frase correta com 'quanto mais... mais'.",
            ["Quanto mais compra por impulso, se endivida.", "Quanto mais compra por impulso, mais se endivida.", "Quanto compra por impulso, mais se endivida.", "Mais compra por impulso, quanto se endivida."],
            1,
            "A estrutura correta repete o comparativo dos dois lados: 'quanto mais... mais...'."
        ),

        quiz(
            "O que significa 'endividar-se'?",
            ["economizar dinheiro", "contrair dívidas", "investir com segurança", "aumentar a renda"],
            1,
            "'Endividar-se' significa contrair dívidas, geralmente gastando mais do que se pode pagar no momento."
        )

    ],

    summary: {

        tip:
            "Pratique descrevendo uma tendência econômica atual usando 'à medida que' ou 'quanto mais... mais'.",

        review: [

            "'quanto mais/menos... mais/menos' e 'à medida que' para proporcionalidade",

            "poder de compra, inflação, orçamento familiar, planejamento financeiro",

            "consumo por impulso, gasto supérfluo, endividar-se"

        ]

    }

};
