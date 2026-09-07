import { debateBlocks } from "../../../grammar/shared/portuguese/c1/debate";
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

    id: "portuguese-c1-debate",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "debate",

    order: 11,

    title: "Argumentação, Debate e Comunicação Nuançada",

    subtitle:
        "Construa argumentos sofisticados e responda a contra-argumentos com atenuação e nuance.",

    description:
        "A lição mais avançada do módulo: aprenda a qualificar afirmações, reconhecer pontos válidos do outro lado e discordar diplomaticamente com precisão.",

    cover: "/covers/debate-c1-pt.webp",

    estimatedTime: 16,

    difficulty: 5,

    xp: 55,

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

        "Construir argumentos complexos e responder a contra-argumentos",

        "Qualificar afirmações e expressar concordância parcial",

        "Discordar diplomaticamente e reformular uma posição",

        "Usar nuance e atenuação naturalmente numa discussão extensa"

    ],

    vocabulary: vocabulary([
        "um argumento convincente",
        "uma generalização precipitada",
        "considerando tudo",
        "uma observação pertinente",
        "fazer o papel de advogado do diabo",
        "desmontar um argumento",
        "uma suposição implícita",
        "ceder um ponto",
        "um ponto sem relevância prática",
        "uma análise cheia de nuances",
        "em conflito total",
        "chegar ao ápice",
        "uma pista falsa",
        "manter sua posição",
        "um contraponto válido",
        "conciliar duas visões",
        "um salto lógico falho",
        "uma simplificação excessiva",
        "concordar em discordar",
        "um raciocínio bem construído"
    ]),

    blocks: [

        heading("Argumentar com Sofisticação"),

        paragraph(
            "Uma argumentação sofisticada não é sobre ter razão a qualquer custo — é sobre sinalizar com precisão seu grau de certeza e reconhecer pontos válidos do outro lado antes de expor seu próprio raciocínio."
        ),

        examples([
            { text: "Pode-se argumentar que essa política simplesmente não teve tempo suficiente para funcionar; ainda assim, os primeiros sinais não são animadores." },
            { text: "Essa é uma observação pertinente, e eu cedo esse ponto, mas isso não desmonta a suposição implícita aqui." },
            { text: "Até certo ponto, concordo, mas esse argumento é, sem dúvida, uma simplificação excessiva." },
            { text: "É importante destacar que se trata de um contraponto válido, na medida em que os dados cobrem um período limitado." },
            { text: "De fato, é um raciocínio bem construído, mas acho que é uma pista falsa nesse debate específico." },
            { text: "Estamos em conflito total sobre esse assunto, então vamos ao menos tentar conciliar nossas visões onde elas se sobrepõem." },
            { text: "Por mais que essa proposta pareça eficaz, ainda faltam dados concretos." }
        ]),

        dialogue([
            { speaker: "Patrícia", text: "Acho que o trabalho remoto claramente foi positivo pra produtividade." },
            { speaker: "Diego", text: "Pode-se argumentar isso, mas não é uma generalização precipitada sem mais dados?" },
            { speaker: "Patrícia", text: "Justo — mas há uma análise cheia de nuances por trás disso, principalmente em áreas de conhecimento." },
              { speaker: "Diego", text: "É uma observação pertinente. Cedo esse ponto. Mas, na medida em que só olhamos pesquisas autodeclaradas, prefiro ser cauteloso." },
            { speaker: "Patrícia", text: "De fato, é um contraponto válido. Talvez eu tenha feito um salto lógico falho aí." },
            { speaker: "Diego", text: "Até certo ponto, concordo com seu argumento geral — ele é realmente convincente." },
            { speaker: "Patrícia", text: "Mas?" },
            { speaker: "Diego", text: "Mas acho que a ideia sobre criatividade é uma simplificação excessiva. Isso é mais um ponto sem relevância prática sem um estudo controlado." },
            { speaker: "Patrícia", text: "Certo, é um contra-argumento bem construído. Considerando tudo, talvez a gente só devesse concordar em discordar nesse ponto específico." },
            { speaker: "Diego", text: "Combinado. Ainda assim, acho que conseguimos conciliar o resto das nossas visões." }
        ]),

        grammar(debateBlocks[0].title, debateBlocks[0].text),

        list([

            "'pode-se argumentar que' / 'é importante destacar que' — afirmação nuançada",

            "'até certo ponto, concordo, mas...' — concordância parcial",

            "'por outro lado' / 'ainda assim' — perspectiva diferente",

            "'por mais que' + subjuntivo / 'não obstante' — contraponto forte"

        ]),

        tip(
            "Ceda Antes de Contrapor",
            "Reconhecer um ponto válido ('é uma observação pertinente', 'de fato...') antes de discordar torna seu contra-argumento mais eficaz — mostra que você realmente ouviu, não que só esperou sua vez de falar."
        ),

        culture(
            "A Cultura do Debate no Brasil",
            "O debate argumentativo ganhou força em escolas e universidades brasileiras nas últimas décadas, através de programas de debate e olimpíadas de redação — o que ajuda a explicar por que esse vocabulário de nuance e atenuação aparece cada vez mais em textos jornalísticos e acadêmicos em português."
        ),

        quiz(
            "Escolha a expressão que sinaliza concordância parcial antes de uma objeção.",
            ["Concordo totalmente.", "Até certo ponto, concordo, mas...", "Discordo completamente.", "Isso é obviamente errado."],
            1,
            "'Até certo ponto, concordo, mas...' sinaliza concordância parcial antes de introduzir uma objeção."
        ),

        quiz(
            "O que faz 'não obstante' num argumento?",
            ["rejeita completamente o argumento", "introduz um contraponto formal, sem exigir subjuntivo", "reforça fortemente a certeza", "muda completamente de assunto"],
            1,
            "'Não obstante' introduz um contraponto de forma formal, geralmente no início da frase seguinte."
        ),

        quiz(
            "O que significa 'uma pista falsa' num debate?",
            ["o ponto mais forte do argumento", "uma distração que desvia do verdadeiro assunto", "uma estatística usada como prova", "uma forma formal de encerrar um debate"],
            1,
            "'Uma pista falsa' é uma distração enganosa que afasta do verdadeiro assunto em debate."
        )

    ],

    summary: {

        tip:
            "Pratique debatendo um assunto que te interessa, usando pelo menos uma nuance, uma concordância parcial e uma discordância diplomática.",

        review: [

            "nuance: pode-se argumentar que, há evidências sugerindo que",

            "concordância parcial: até certo ponto, em certa medida",

            "por outro lado, ainda assim, não obstante",

            "um argumento convincente, uma observação pertinente, uma simplificação excessiva, concordar em discordar"

        ]

    }

};
