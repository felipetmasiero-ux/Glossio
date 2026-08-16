import { cultureArtsBlocks } from "../../../grammar/shared/portuguese/b2/cultureArts";
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

    id: "portuguese-b2-culture-arts",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "culture-arts",

    order: 8,

    title: "Cultura, Arte e Crítica",

    subtitle:
        "Analise filmes, livros e obras de arte usando estruturas de ênfase como 'foi... que' e 'o que... é'.",

    description:
        "Desenvolva vocabulário para criticar e avaliar obras culturais, e aprenda estruturas de ênfase para destacar suas opiniões de forma mais sofisticada.",

    cover: "/covers/culture-arts-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

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

        "Analisar e avaliar obras de arte, filmes e livros",

        "Justificar avaliações de forma mais sofisticada",

        "Usar estruturas de ênfase para destacar informações",

        "Expressar preferências culturais com mais nuance"

    ],

    vocabulary: vocabulary([
        "identidade cultural",
        "obra-prima",
        "roteirista",
        "protagonista",
        "cenografia",
        "crítica contundente",
        "elogiar",
        "superestimado",
        "pouco valorizado",
        "trama",
        "atuação convincente",
        "sensibilidade artística",
        "vanguarda",
        "adaptação cinematográfica",
        "resenha",
        "provocar reflexão",
        "patrimônio cultural",
        "expressão artística",
        "estética",
        "impacto duradouro"
    ]),

    blocks: [

        heading("Avaliando uma Obra com Precisão"),

        paragraph(
            "Para dar uma opinião mais sofisticada sobre um filme, livro ou exposição, além de adjetivos, usamos estruturas de ênfase que destacam exatamente o que queremos comentar: 'foi... que', 'o que... é/foi', e 'é que'."
        ),

        examples([
            { text: "Foi aquele filme que mudou minha forma de ver o cinema." },
            { text: "O que mais me impressionou nessa exposição foi a sensibilidade artística dos artistas." },
            { text: "Eu não gostei da adaptação cinematográfica — é que o livro tinha uma trama muito mais rica." },
            { text: "O que esse livro tem de especial é a cenografia mental que ele constrói." },
            { text: "Achei o filme superestimado; a atuação não foi tão convincente assim." },
            { text: "Foi o roteirista que deu profundidade a um enredo simples." },
            { text: "Essa obra-prima teve um impacto duradouro na cultura brasileira." }
        ]),

        dialogue([
            { speaker: "Cristina", text: "O que você achou do último filme daquele diretor?" },
            { speaker: "Fabio", text: "Achei superestimado, sinceramente. Foi a cenografia que salvou o filme, não a atuação." },
            { speaker: "Cristina", text: "Sério? Eu achei o protagonista bem convincente." },
            { speaker: "Fabio", text: "Talvez, mas o que mais me incomodou foi a trama — parecia previsível demais." },
              { speaker: "Cristina", text: "Entendo. Eu prefiro obras que provocam reflexão, mesmo que a estética não seja perfeita." },
            { speaker: "Fabio", text: "Concordo com isso. Aliás, li uma resenha contundente sobre esse filme ontem." },
            { speaker: "Cristina", text: "É que o roteirista original é conhecido por trabalhos de vanguarda, então talvez esse tenha ficado abaixo do esperado." },
            { speaker: "Fabio", text: "Pode ser. Ainda assim, acho que ele vai ter algum impacto duradouro no patrimônio cultural do cinema nacional." }
        ]),

        grammar(cultureArtsBlocks[0].title, cultureArtsBlocks[0].text),

        list([

            "'foi... que' — destaca o elemento responsável por algo",

            "'o que... é/foi' — destaca a causa ou o efeito de algo",

            "'é que' — explica ou justifica uma afirmação",

            "obra-prima, protagonista, trama, sensibilidade artística, estética"

        ]),

        tip(
            "Cuidado com o 'Que'",
            "Nas estruturas de ênfase, o 'que' é essencial e não pode ser omitido: 'foi aquele filme que mudou...', nunca 'foi aquele filme mudou...'."
        ),

        culture(
            "Cinema e Literatura Brasileiros",
            "O Brasil tem uma forte tradição de adaptações cinematográficas de obras literárias, como 'Cidade de Deus' e 'Central do Brasil' — filmes que se tornaram parte do patrimônio cultural do país e tiveram reconhecimento internacional."
        ),

        quiz(
            "Complete a estrutura de ênfase: \"___ aquele livro ___ mudou minha visão de mundo.\"",
            ["Foi / que", "É / que", "Foi / o que", "Era / que"],
            0,
            "'Foi + elemento destacado + que' é a estrutura correta para dar ênfase: 'Foi aquele livro que...'."
        ),

        quiz(
            "Qual frase usa 'é que' para justificar uma afirmação?",
            ["O que mais gostei foi a trama.", "Eu não fui ao show — é que eu estava sem dinheiro.", "Foi o roteirista que escreveu isso.", "A trama é interessante."],
            1,
            "'É que' explica ou justifica uma afirmação anterior, muito comum na fala."
        ),

        quiz(
            "O que significa uma obra 'superestimada'?",
            ["pouco conhecida", "valorizada além do que merece", "muito antiga", "difícil de entender"],
            1,
            "'Superestimada' significa que a obra recebe mais elogios ou reconhecimento do que, na opinião de quem fala, ela realmente merece."
        )

    ],

    summary: {

        tip:
            "Pratique avaliando um filme ou livro que você conhece usando 'foi... que' e 'o que... é/foi'.",

        review: [

            "estruturas de ênfase: foi...que, o que...é/foi, é que",

            "obra-prima, protagonista, trama, sensibilidade artística",

            "elogiar, superestimado, pouco valorizado, provocar reflexão"

        ]

    }

};
