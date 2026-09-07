import { societyBlocks } from "../../../grammar/shared/portuguese/c1/society";
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

export const societyLesson = {

    id: "portuguese-c1-society",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "society",

    order: 4,

    title: "Sociedade, Valores e Debate Público",

    subtitle:
        "Discuta estruturas sociais com sofisticação usando 'por mais que', 'ainda que' e 'não obstante'.",

    description:
        "Desenvolva vocabulário sobre sociedade e instituições, e aprenda estruturas de concessão mais avançadas do que 'embora' para argumentar com mais variedade.",

    cover: "/covers/society-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "society",
        "grammar",
        "debate-público"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir estruturas sociais e instituições com precisão",

        "Usar 'por mais que', 'ainda que' e 'não obstante' na concessão",

        "Comparar perspectivas sobre mudança social com nuance",

        "Reconhecer estruturas discursivas comuns no debate público formal"

    ],

    vocabulary: vocabulary([
        "polarizado",
        "movimento de base",
        "enraizado",
        "uma faca de dois gumes",
        "prestação de contas",
        "estrutural",
        "à margem da sociedade",
        "às custas de",
        "uma ladeira escorregadia",
        "uma onda de indignação",
        "reivindicar",
        "um marco decisivo",
        "sub-representado",
        "na esteira de",
        "mobilizar",
        "corroer",
        "interesse pessoal",
        "a ordem estabelecida",
        "defesa de uma causa",
        "conter"
    ]),

    blocks: [

        heading("Nuançar um Argumento sobre Sociedade"),

        paragraph(
            "Para discutir instituições e mudança social, 'por mais que' e 'ainda que' oferecem mais variedade do que 'embora', e 'não obstante' dá um tom formal a uma concessão."
        ),

        examples([
            { text: "Por mais que a cidade tenha investido em transporte público, o problema estrutural continua." },
            { text: "Esse movimento de base acabou mobilizando a opinião pública, na esteira de uma verdadeira onda de indignação." },
            { text: "Ainda que essa reforma exista no papel, sua aplicação continua rara na prática." },
            { text: "Essa política é uma faca de dois gumes: protege alguns grupos, às custas de outros." },
            { text: "A ordem estabelecida não muda sem uma prestação de contas real por parte das instituições." },
            { text: "Não obstante, alguns grupos antes à margem da sociedade veem finalmente avanços concretos." },
            { text: "Reivindicar mais representação é essencial para grupos historicamente sub-representados." }
        ]),

        dialogue([
            { speaker: "Amanda", text: "O que você acha da reforma das instituições públicas?" },
            { speaker: "Otávio", text: "Por mais que ela seja bem aplicada, duvido que resolva os problemas estruturais de fundo." },
            { speaker: "Amanda", text: "Ainda assim, esse movimento de base conseguiu mesmo mobilizar a opinião pública." },
            { speaker: "Otávio", text: "É verdade, e isso gerou uma onda de indignação que forçou as instituições a reagir." },
            { speaker: "Amanda", text: "Você não acha que isso é um marco decisivo, então?" },
              { speaker: "Otávio", text: "Até certo ponto, sim. Mas a ordem estabelecida está tão enraizada que prefiro ser cauteloso." },
            { speaker: "Amanda", text: "Não obstante, alguns grupos sub-representados já veem avanços." },
            { speaker: "Otávio", text: "Verdade. De qualquer forma, vai ser preciso uma prestação de contas real pra isso durar." }
        ]),

        grammar(societyBlocks[0].title, societyBlocks[0].text),

        list([

            "'por mais que' + subjuntivo — concessão que enfatiza o esforço/grau",

            "'ainda que' + subjuntivo — sinônimo mais formal de 'embora'",

            "'não obstante' — conector formal, sem exigir subjuntivo",

            "polarizado, enraizado, estrutural, corroer, mobilizar"

        ]),

        tip(
            "Uma Concessão Mais Forte",
            "'Por mais que' enfatiza o grau ou o esforço de algo antes de contradizê-lo — mais forte que 'embora'. Reserve-o para os momentos em que você realmente quer destacar esse contraste."
        ),

        culture(
            "Ações Afirmativas e Representação no Brasil",
            "O debate sobre representação de grupos sub-representados nas universidades e no mercado de trabalho brasileiro se intensificou nas últimas décadas, especialmente após a Lei de Cotas de 2012 — um marco decisivo frequentemente citado em discussões sobre política educacional."
        ),

        quiz(
            "Complete: \"___ a cidade tenha investido muito, o problema persiste.\"",
            ["Apesar", "Por mais que", "Não obstante", "Por outro lado"],
            1,
            "'Por mais que' + subjuntivo ('tenha investido') enfatiza o esforço antes de contradizê-lo."
        ),

        quiz(
            "Qual frase usa 'não obstante' corretamente?",
            [
                "Não obstante que a lei existe, a aplicação é rara.",
                "A lei existe. Não obstante, a aplicação é rara.",
                "A lei não obstante existe.",
                "Não obstante a lei exista, a aplicação é rara."
            ],
            1,
            "'Não obstante' costuma abrir a frase seguinte, sem exigir 'que' nem subjuntivo."
        ),

        quiz(
            "O que significa 'prestação de contas'?",
            ["um tipo de imposto", "a obrigação de justificar as próprias ações", "uma eleição", "um orçamento nacional"],
            1,
            "'Prestação de contas' é a obrigação de uma instituição ou pessoa justificar suas ações."
        )

    ],

    summary: {

        tip:
            "Pratique construindo um argumento sobre uma questão social usando 'por mais que' + subjuntivo.",

        review: [

            "'por mais que' e 'ainda que' + subjuntivo para concessão avançada",

            "'não obstante' para concessão formal",

            "polarizado, enraizado, estrutural, corroer, mobilizar"

        ]

    }

};
