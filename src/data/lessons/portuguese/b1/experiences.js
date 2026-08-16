import { experiencesBlocks } from "../../../grammar/shared/portuguese/b1/experiences";
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

export const experiencesLesson = {

    id: "portuguese-b1-experiences",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "experiences",

    order: 1,

    title: "Experiências e Momentos Importantes",

    subtitle:
        "Fale sobre experiências e momentos marcantes da sua vida combinando o pretérito perfeito, o imperfeito e o mais-que-perfeito.",

    description:
        "Aprenda a diferença entre o pretérito perfeito e o imperfeito para narrar experiências de vida, e uma introdução ao mais-que-perfeito.",

    cover: "/covers/experiences-pt.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "experiences",
        "grammar",
        "pretérito"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Falar sobre experiências de vida e momentos marcantes",

        "Combinar corretamente o pretérito perfeito e o imperfeito",

        "Reconhecer quando usar o mais-que-perfeito",

        "Refletir sobre decisões e pontos de virada do passado"

    ],

    vocabulary: vocabulary([
        "memorável",
        "inesquecível",
        "infância",
        "ponto de virada",
        "formar-se",
        "formatura",
        "casar-se",
        "mudar-se para o exterior",
        "mochilão",
        "lembrar-se de",
        "arrepender-se",
        "que muda a vida",
        "percurso",
        "avanço",
        "acabar de",
        "alcançar um objetivo",
        "estabelecer-se",
        "tomar uma decisão",
        "virar a página",
        "em retrospectiva"
    ]),

    blocks: [

        heading("Contando uma Experiência"),

        paragraph(
            "Para contar uma experiência de vida, combinamos dois tempos do passado: o imperfeito monta o cenário (o contexto, um hábito, um estado), e o perfeito conta o que aconteceu de fato."
        ),

        examples([
            { text: "Estava chovendo quando decidimos sair mesmo assim." },
            { text: "Eu me formei no ano passado, e já tinha conseguido um emprego antes mesmo da formatura." },
            { text: "Quando eu era criança, eu queria ser piloto." },
            { text: "Nós nos mudamos para o exterior porque estávamos buscando uma nova experiência." },
            { text: "Quando cheguei, a reunião já tinha começado." },
            { text: "Aquela viagem foi um verdadeiro ponto de virada na minha vida." },
            { text: "Em retrospectiva, acho que tomei a decisão certa." }
        ]),

        dialogue([
            { speaker: "Camila", text: "Oi! E aí, como foi sua entrevista?" },
            { speaker: "Rafael", text: "Foi muito bem! Quando cheguei, eles já tinham começado a entrevistar outros candidatos, mas deu tudo certo." },
            { speaker: "Camila", text: "Você estava nervoso?" },
            { speaker: "Rafael", text: "Um pouco, no começo. Mas durante a entrevista, fiquei bem mais confiante." },
            { speaker: "Camila", text: "Que ótimo! Faz quanto tempo que você está procurando essa vaga?" },
            { speaker: "Rafael", text: "Desde que me formei, na verdade. Foi um verdadeiro ponto de virada mudar de carreira." },
            { speaker: "Camila", text: "Em retrospectiva, você está feliz com essa escolha?" },
            { speaker: "Rafael", text: "Com certeza. Não me arrependo de nada." }
        ]),

        grammar(experiencesBlocks[0].title, experiencesBlocks[0].text),

        list([

            "imperfeito — cenário, hábito, estado no passado",

            "perfeito — ação pontual, terminada",

            "mais-que-perfeito — antes de outra ação passada",

            "ponto de virada, percurso, em retrospectiva"

        ]),

        tip(
            "Descrever ou Contar?",
            "Não confunda descrição com ação. 'Estava chovendo' (imperfeito, descreve o tempo) é diferente de 'Choveu' (perfeito, a ação de chover aconteceu e terminou). Pergunte-se: estou descrevendo uma cena, ou contando o que aconteceu?"
        ),

        culture(
            "Contar Histórias no Brasil",
            "No Brasil, é comum contar causos e histórias pessoais misturando naturalmente o imperfeito (para o cenário) e o perfeito (para os acontecimentos) — essa é a base de qualquer boa narrativa oral."
        ),

        quiz(
            "Qual frase descreve o cenário?",
            ["Choveu o dia todo.", "Estava chovendo quando eu saí.", "Começou a chover.", "Está chovendo desde a manhã."],
            1,
            "'Estava chovendo' (imperfeito) descreve o cenário no momento em que outra ação aconteceu."
        ),

        quiz(
            "Complete: \"Quando cheguei, o filme ___ começado.\"",
            ["tinha", "tem", "teve", "está"],
            0,
            "O mais-que-perfeito ('tinha começado') mostra uma ação anterior a outra ação passada."
        ),

        quiz(
            "Qual frase conta uma ação pontual e terminada?",
            ["Eu estava cansado.", "Eu trabalhava muito.", "Terminei o trabalho às 18h.", "Eu estava terminando o trabalho."],
            2,
            "O pretérito perfeito ('terminei') conta uma ação pontual e terminada."
        )

    ],

    summary: {

        tip:
            "Pratique contando uma experiência pessoal: use o imperfeito para o cenário e o perfeito para os acontecimentos precisos.",

        review: [

            "imperfeito — cenário, hábito, estado",

            "perfeito — ação pontual, terminada",

            "mais-que-perfeito — antes de outra ação passada",

            "ponto de virada, percurso, em retrospectiva"

        ]

    }

};
