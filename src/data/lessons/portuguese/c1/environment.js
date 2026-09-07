import { environmentBlocks } from "../../../grammar/shared/portuguese/c1/environment";
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

export const environmentC1Lesson = {

    id: "portuguese-c1-environment",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "environment",

    order: 6,

    title: "Meio Ambiente, Clima e Desafios Globais",

    subtitle:
        "Argumente sobre desafios ambientais globais condensando suas ideias com orações reduzidas de gerúndio e particípio.",

    description:
        "Discuta sustentabilidade e desafios globais, aprendendo a substituir orações causais completas por orações reduzidas mais fluentes.",

    cover: "/covers/environment-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "environment",
        "grammar",
        "sustentabilidade"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir problemas ambientais complexos e desafios globais",

        "Avaliar soluções e comparar perspectivas com nuance",

        "Usar orações reduzidas de gerúndio e particípio para condensar a causa",

        "Construir argumentos formais sobre sustentabilidade e recursos"

    ],

    vocabulary: vocabulary([
        "insustentável",
        "cada vez mais escasso",
        "num ponto crítico",
        "conter as emissões",
        "uma medida paliativa",
        "consequências de longo alcance",
        "compensar (emissões)",
        "avanço indevido",
        "uma gota no oceano",
        "eliminar gradualmente",
        "à mercê de",
        "resiliência ambiental",
        "se desenrolar",
        "um alerta",
        "de forma irreversível",
        "uma solução que traz novos problemas",
        "que se agrava",
        "solução paliativa e insuficiente",
        "superar em ritmo",
        "os sinais são claros"
    ]),

    blocks: [

        heading("Condensar um Argumento com Orações Reduzidas"),

        paragraph(
            "Para argumentar sobre questões ambientais sem repetir sempre 'porque' ou 'se', o português usa orações reduzidas de gerúndio e particípio, que condensam a causa numa frase mais fluida."
        ),

        examples([
            { text: "Diante de recursos cada vez mais escassos, vários países revisam sua política energética." },
            { text: "Reduzindo as emissões agora, evitaremos chegar a um cenário ainda pior." },
            { text: "Deixado sem solução, esse problema só vai se agravar com o passar dos anos." },
            { text: "Confrontados com a escassez, os governos agiram tarde demais." },
            { text: "Compensando apenas uma fração das emissões, a indústria ainda está longe das metas." },
            { text: "Superando em ritmo toda previsão anterior, a crise se desenrolou mais rápido do que qualquer um esperava." },
            { text: "Reconhecendo que os sinais eram claros, a empresa finalmente abandonou suas soluções paliativas." }
        ]),

        dialogue([
            { speaker: "Camila", text: "Você viu o novo relatório sobre a escassez de água?" },
            { speaker: "Pedro", text: "Vi. Diante de números assim, difícil chamar a política atual de algo além de uma medida paliativa." },
            { speaker: "Camila", text: "Verdade. E boa parte das propostas parece uma solução paliativa e insuficiente, à mercê do próximo orçamento." },
            { speaker: "Pedro", text: "Agravando o problema, a demanda está superando em ritmo o que os modelos previam." },
            { speaker: "Camila", text: "É um alerta e tanto. Deixado sem solução, vamos chegar a um ponto crítico irreversível." },
              { speaker: "Pedro", text: "Alguns programas de resiliência ambiental ajudam, mas são uma gota no oceano perto do que é necessário." },
            { speaker: "Camila", text: "Lendo o relatório, você acha que os sinais são claros sobre a política atual?" },
            { speaker: "Pedro", text: "Bastante. Reconhecendo isso, alguns governos locais já começam a eliminar gradualmente as piores práticas." }
        ]),

        grammar(environmentBlocks[0].title, environmentBlocks[0].text),

        list([

            "gerúndio (verbo + -ando/-endo/-indo) — causa ou simultaneidade",

            "particípio passado sozinho — causa ou condição condensada",

            "insustentável, cada vez mais escasso, num ponto crítico, de forma irreversível",

            "uma medida paliativa, uma gota no oceano, um alerta"

        ]),

        tip(
            "Confira o Sujeito",
            "Antes de usar uma oração reduzida, confirme se o sujeito implícito é o mesmo da oração principal. 'Tendo terminado o relatório, a reunião começou' está errado — a reunião não terminou o relatório."
        ),

        culture(
            "O Brasil nos Relatórios Ambientais Globais",
            "O Brasil aparece com frequência em relatórios internacionais sobre meio ambiente (IPCC, ONU) devido à Amazônia — textos que usam muito orações reduzidas para condensar informação técnica de forma legível, um registro útil para quem quer ler notícias e relatórios ambientais em português."
        ),

        quiz(
            "Escolha a oração reduzida correta.",
            [
                "Confrontado com a escassez, os governos agiram tarde.",
                "Confrontados com a escassez, os governos agiram tarde.",
                "Confrontando a escassez, os governos agiram tarde.",
                "Confronte a escassez, os governos agiram tarde."
            ],
            1,
            "'Confrontados' precisa concordar com o sujeito implícito plural 'os governos'."
        ),

        quiz(
            "O que significa 'uma medida paliativa'?",
            ["uma solução permanente", "uma solução temporária, que não resolve o problema de raiz", "uma política que piora tudo", "uma lei muito rígida"],
            1,
            "'Uma medida paliativa' é uma solução temporária que não resolve o problema de raiz, apenas alivia os sintomas."
        ),

        quiz(
            "Escolha a frase com o sujeito da oração reduzida corretamente alinhado.",
            [
                "Tendo lido o relatório, as conclusões ficaram claras para mim.",
                "Tendo lido o relatório, achei as conclusões claras.",
                "Tendo lido o relatório, as conclusões se leram sozinhas.",
                "Tendo lido o relatório, ficou claro."
            ],
            1,
            "'Eu li o relatório' — eu sou o sujeito que leu e que tira a conclusão, então os sujeitos correspondem."
        )

    ],

    summary: {

        tip:
            "Pratique reescrevendo três orações causais completas sobre meio ambiente como orações reduzidas de gerúndio ou particípio.",

        review: [

            "orações reduzidas de gerúndio e particípio para condensar a causa",

            "insustentável, cada vez mais escasso, num ponto crítico, de forma irreversível",

            "uma medida paliativa, uma gota no oceano, um alerta"

        ]

    }

};
