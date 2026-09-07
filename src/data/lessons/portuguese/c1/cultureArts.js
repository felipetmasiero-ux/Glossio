import { cultureArtsBlocks } from "../../../grammar/shared/portuguese/c1/cultureArts";
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

export const cultureArtsLesson = {

    id: "portuguese-c1-culture-arts",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "culture-arts",

    order: 8,

    title: "Cultura, Literatura e Interpretação",

    subtitle:
        "Analise e critique obras culturais usando os pronomes relativos formais 'o qual' e 'a qual'.",

    description:
        "Desenvolva vocabulário analítico e avaliativo, e aprenda a usar 'o qual', 'a qual' e 'os quais' em registro formal, especialmente após preposições.",

    cover: "/covers/culture-arts-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "culture-arts",
        "grammar",
        "crítica"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Analisar e interpretar literatura, cinema e arte com precisão",

        "Justificar uma opinião crítica usando linguagem avaliativa",

        "Usar 'o qual', 'a qual' e 'os quais' após preposições em registro formal",

        "Aplicar pronomes relativos formais com precisão na análise cultural"

    ],

    vocabulary: vocabulary([
        "evocativo",
        "um motivo recorrente",
        "comovente",
        "autocentrado",
        "uma crítica contundente",
        "emocionar profundamente",
        "sutil, sem exageros",
        "um feito extraordinário",
        "pouco original",
        "um tema subjacente",
        "cativante",
        "um público cult",
        "um retrato cheio de nuances",
        "resistir ao teste do tempo",
        "com mão pesada",
        "uma homenagem a",
        "que provoca reflexão",
        "um enredo de desenvolvimento lento",
        "queridinho da crítica",
        "deixar uma marca duradoura"
    ]),

    blocks: [

        heading("Analisar uma Obra com Precisão Formal"),

        paragraph(
            "Na crítica literária e cultural mais formal, o português usa 'o qual', 'a qual' e suas variações depois de preposições, mais precisos do que 'que' para designar um elemento específico."
        ),

        examples([
            { text: "O motivo recorrente ao qual ela se refere atravessa todo o filme." },
            { text: "A diretora com a qual ele trabalhou é conhecida por seus retratos cheios de nuances." },
            { text: "Os temas sobre os quais o romance se debruça continuam atuais até hoje." },
            { text: "É um feito extraordinário sutil, sem exageros, o que torna o filme ainda mais comovente." },
            { text: "Essa crítica contundente chama a obra de autocentrada, uma avaliação que acho um pouco de mão pesada." },
            { text: "A exposição à qual me refiro reuniu um público cult inesperado." },
            { text: "Esse enredo de desenvolvimento lento acabou virando o queridinho da crítica." }
        ]),

        dialogue([
            { speaker: "Bianca", text: "Você terminou o romance que todo mundo tá chamando de feito extraordinário?" },
            { speaker: "Renato", text: "Terminei. É um enredo de desenvolvimento lento, o que testou minha paciência no início." },
            { speaker: "Bianca", text: "Mas?" },
            { speaker: "Renato", text: "Mas é genuinamente evocativo, e o motivo recorrente da casa abandonada realmente me emocionou profundamente." },
            { speaker: "Bianca", text: "Eu li uma crítica contundente chamando ele de autocentrado, porém." },
              { speaker: "Renato", text: "Vi essa também. Acho que é um ponto justo sobre a parte do meio, que arrasta um pouco." },
            { speaker: "Bianca", text: "Você diria que resiste ao teste do tempo comparado com os livros anteriores dela?" },
            { speaker: "Renato", text: "Sinceramente, é uma homenagem ao trabalho de estreia dela, mas bem menos pouco original do que eu esperava." },
            { speaker: "Bianca", text: "Bom saber. Já virou o queridinho da crítica online." },
            { speaker: "Renato", text: "Não é surpresa — deixou uma marca duradoura em mim, e não digo isso de muitos livros." }
        ]),

        grammar(cultureArtsBlocks[0].title, cultureArtsBlocks[0].text),

        list([

            "preposição + o qual/a qual/os quais/as quais, concordando em gênero/número",

            "mais formal e preciso que 'que' para a crítica literária",

            "evocativo, comovente, um feito extraordinário, um retrato cheio de nuances",

            "emocionar profundamente, resistir ao teste do tempo, queridinho da crítica"

        ]),

        tip(
            "Concordância é Essencial",
            "Diferente de 'que', invariável, 'o qual' concorda em gênero e número: 'o livro do qual ela falava', mas 'a atriz da qual ele falava'. Preste atenção ao substantivo que está sendo substituído."
        ),

        culture(
            "A Crítica Cultural no Brasil",
            "Publicações brasileiras de crítica cultural, como a revista Bravo! (já encerrada) ou o caderno Ilustríssima da Folha de S.Paulo, cultivam um vocabulário analítico rico e usam estruturas relativas formais mesmo em textos voltados ao grande público."
        ),

        quiz(
            "Escolha a forma correta: \"a atriz ___ o filme se tornou famoso\".",
            ["ao qual", "pela qual", "ao quais", "pelo qual"],
            1,
            "'Pela qual' concorda no feminino singular com 'a atriz'."
        ),

        quiz(
            "O que significa 'emocionar profundamente' uma plateia?",
            ["entediar alguém", "tocar alguém de forma profunda e sincera", "criticar duramente algo", "ignorar um detalhe importante"],
            1,
            "'Emocionar profundamente' significa tocar alguém de forma profunda, geralmente ao abordar um assunto pessoal."
        ),

        quiz(
            "Escolha a frase com a relativa formal corretamente concordada.",
            [
                "A pessoa com o qual ele trabalhava se demitiu.",
                "A pessoa com a qual ele trabalhava se demitiu.",
                "A pessoa com os quais ele trabalhava se demitiu.",
                "A pessoa com quem a qual ele trabalhava se demitiu."
            ],
            1,
            "'A qual' concorda no feminino singular com 'a pessoa'."
        )

    ],

    summary: {

        tip:
            "Pratique analisando uma obra que você conhece usando pelo menos duas relativas formais ('ao qual', 'pela qual', 'sobre os quais').",

        review: [

            "pronomes relativos formais: o qual, a qual, os quais, as quais",

            "evocativo, comovente, um feito extraordinário, um retrato cheio de nuances",

            "emocionar profundamente, resistir ao teste do tempo, queridinho da crítica"

        ]

    }

};
