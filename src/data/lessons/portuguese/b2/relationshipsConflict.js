import { relationshipsConflictBlocks } from "../../../grammar/shared/portuguese/b2/relationshipsConflict";
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

export const relationshipsConflictLesson = {

    id: "portuguese-b2-relationships-conflict",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "relationships-conflict",

    order: 9,

    title: "Relações, Comunicação e Conflitos",

    subtitle:
        "Negocie, sugira soluções e reconheça erros usando 'que tal', 'e se' e 'devia ter'.",

    description:
        "Desenvolva vocabulário sobre comunicação e conflitos, aprendendo estruturas de negociação e sugestão para lidar com desentendimentos de forma madura.",

    cover: "/covers/relationships-conflict-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

    tags: [
        "relationships-conflict",
        "grammar",
        "negociação"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Explicar conflitos e mal-entendidos com clareza",

        "Negociar e propor soluções durante um desentendimento",

        "Expressar arrependimento e reconhecer erros com maturidade",

        "Usar linguagem de sugestão em vez de linguagem acusatória"

    ],

    vocabulary: vocabulary([
        "mal-entendido",
        "desentendimento",
        "ceder",
        "inteligência emocional",
        "ouvir com empatia",
        "guardar rancor",
        "assumir a culpa",
        "chegar a um consenso",
        "mágoa",
        "romper relações",
        "ponderar",
        "tom defensivo",
        "resolver um impasse",
        "colocar-se no lugar do outro",
        "mediação",
        "manter a calma",
        "explicitar uma necessidade",
        "ressentimento",
        "vínculo",
        "reatar"
    ]),

    blocks: [

        heading("Negociando um Desentendimento"),

        paragraph(
            "Resolver um conflito exige mais do que ter razão — exige saber sugerir soluções sem soar acusatório. O português tem estruturas específicas para isso: 'que tal', 'e se', 'no lugar de' e 'devia ter'."
        ),

        examples([
            { text: "Que tal conversarmos com calma amanhã, sem tom defensivo?" },
            { text: "E se a gente dividisse as tarefas de outro jeito?" },
            { text: "No lugar de discutir, podíamos simplesmente ouvir um ao outro com empatia." },
            { text: "Eu devia ter te avisado antes, foi falta minha." },
            { text: "Foi um mal-entendido bobo, mas guardamos rancor por semanas." },
            { text: "Depois de muito ponderar, decidimos buscar mediação para resolver o impasse." },
            { text: "Levou tempo, mas conseguimos chegar a um consenso e reatar a amizade." }
        ]),

        dialogue([
            { speaker: "Michele", text: "Ainda estou magoada com o que aconteceu na reunião." },
            { speaker: "Alexandre", text: "Eu sei, e devia ter te defendido na hora. Foi falta minha." },
            { speaker: "Michele", text: "Foi um baita desentendimento por causa de um mal-entendido tão simples." },
            { speaker: "Alexandre", text: "Que tal conversarmos com calma sobre isso agora, sem tom defensivo de nenhum dos dois?" },
            { speaker: "Michele", text: "Tudo bem. Mas preciso que você tente se colocar no meu lugar dessa vez." },
            { speaker: "Alexandre", text: "Justo. E se a gente combinasse um sinal para quando um de nós estiver guardando rancor sem falar?" },
            { speaker: "Michele", text: "Gostei da ideia. No lugar de deixar a mágoa crescer, é melhor explicitar a necessidade na hora." },
            { speaker: "Alexandre", text: "Concordo. Quero manter esse vínculo, não quero que a gente rompa relações por algo assim." },
            { speaker: "Michele", text: "Eu também não. Acho que já chegamos a um consenso." }
        ]),

        grammar(relationshipsConflictBlocks[0].title, relationshipsConflictBlocks[0].text),

        list([

            "'que tal' + infinitivo/substantivo — sugestão leve",

            "'e se' + imperfeito do subjuntivo — proposta de alternativa",

            "'no lugar de' + infinitivo — comparação de opções",

            "'devia ter' / 'podia ter' + particípio — reconhecimento de erro"

        ]),

        tip(
            "Comece Leve",
            "Antes de qualquer crítica direta num conflito, comece com uma sugestão leve ('que tal', 'e se') — isso mantém a conversa colaborativa em vez de defensiva."
        ),

        culture(
            "Jeitinho e Conversa Franca",
            "No Brasil, é comum tentar resolver conflitos pessoais através de uma conversa direta e informal antes de recorrer a soluções mais formais como mediação — a ideia de 'conversar e resolver' é muito valorizada em relações pessoais e familiares."
        ),

        quiz(
            "Qual frase sugere uma alternativa de forma colaborativa?",
            ["Você sempre faz errado.", "E se a gente dividisse as tarefas de outro jeito?", "Isso é culpa sua.", "Eu não vou mudar nada."],
            1,
            "'E se a gente...' propõe uma alternativa de forma colaborativa, sem acusar ninguém."
        ),

        quiz(
            "Complete: \"Eu ___ te avisado antes, foi falta minha.\" (dever)",
            ["devo ter", "devia ter", "deveria", "devia"],
            1,
            "'Devia ter' + particípio reconhece um erro passado de forma madura."
        ),

        quiz(
            "O que significa 'guardar rancor'?",
            ["esquecer rapidamente um problema", "manter sentimentos negativos por muito tempo", "pedir desculpas", "resolver um conflito"],
            1,
            "'Guardar rancor' significa manter sentimentos negativos (raiva, mágoa) por um tempo prolongado, sem resolver a questão."
        )

    ],

    summary: {

        tip:
            "Pratique propondo uma solução para um conflito comum usando 'que tal' ou 'e se', em vez de linguagem acusatória.",

        review: [

            "'que tal' e 'e se' para sugerir soluções colaborativas",

            "'devia ter' / 'podia ter' para reconhecer erros",

            "mal-entendido, mágoa, guardar rancor, chegar a um consenso"

        ]

    }

};
