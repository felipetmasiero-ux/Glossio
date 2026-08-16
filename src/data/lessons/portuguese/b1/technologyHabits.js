import { technologyHabitsBlocks } from "../../../grammar/shared/portuguese/b1/technologyHabits";
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

export const technologyHabitsLesson = {

    id: "portuguese-b1-technology-habits",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "technology-habits",

    order: 7,

    title: "Tecnologia e Comunicação",

    subtitle:
        "Fale sobre hábitos digitais usando os pronomes oblíquos com a colocação natural do português brasileiro.",

    description:
        "Aprenda vocabulário de tecnologia e redes sociais, e como usar os pronomes oblíquos (me, te, o/a) com a colocação natural do português falado no Brasil.",

    cover: "/covers/technology-habits-pt.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "technology",
        "pronomes",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Falar sobre hábitos tecnológicos e comunicação digital",

        "Usar os pronomes oblíquos me, te, o/a, nos, os/as",

        "Colocar o pronome antes do verbo, como é natural no PT-BR",

        "Usar 'o/a' para substituir um objeto direto já mencionado"

    ],

    vocabulary: vocabulary([
        "tempo de tela",
        "viciado em",
        "notificação",
        "fazer várias coisas ao mesmo tempo",
        "aplicativo de produtividade",
        "chamada de vídeo",
        "armazenamento em nuvem",
        "inteligência artificial",
        "segurança digital",
        "privacidade online",
        "desintoxicação digital",
        "manter contato",
        "ficar conectado",
        "influenciador",
        "viralizar",
        "postar",
        "rolar a tela",
        "desconectar-se",
        "portanto",
        "por isso"
    ]),

    blocks: [

        heading("Usando os Pronomes Naturalmente"),

        paragraph(
            "Ao falar sobre tecnologia e comunicação, usamos bastante os pronomes oblíquos para não repetir o mesmo substantivo. No português brasileiro falado, eles quase sempre vêm antes do verbo."
        ),

        examples([
            { text: "Recebo tantas notificações que às vezes nem as leio." },
            { text: "Ele me mandou um vídeo engraçado ontem." },
            { text: "Baixei o aplicativo e o usei todos os dias durante uma semana." },
            { text: "A gente se fala por chamada de vídeo toda semana." },
            { text: "Não te falei sobre essa nova rede social?" },
            { text: "Vi a notícia e a compartilhei na hora." },
            { text: "Ela me ajudou a configurar a privacidade da minha conta." }
        ]),

        dialogue([
            { speaker: "Fernanda", text: "Você viu a notificação que te mandei ontem?" },
            { speaker: "Caio", text: "Vi sim! Recebi e já a li de manhã." },
            { speaker: "Fernanda", text: "Que bom. Eu ando meio viciada no celular ultimamente, para ser sincera." },
            { speaker: "Caio", text: "Eu também. A gente se fala tanto por chamada de vídeo que quase esquece de se ver pessoalmente." },
            { speaker: "Fernanda", text: "É verdade. Acho que vou tentar uma desintoxicação digital esse fim de semana." },
            { speaker: "Caio", text: "Boa ideia. Me avisa como foi, depois?" },
            { speaker: "Fernanda", text: "Aviso sim! E você, já baixou aquele aplicativo de produtividade que eu te falei?" },
            { speaker: "Caio", text: "Baixei, mas ainda não o usei direito. Vou testar essa semana." }
        ]),

        grammar(technologyHabitsBlocks[0].title, technologyHabitsBlocks[0].text),

        list([

            "me, te, o/a, nos, os/as — pronomes oblíquos",

            "próclise (antes do verbo) — padrão do PT-BR falado",

            "o/a substitui um objeto direto já mencionado",

            "portanto, por isso — consequência"

        ]),

        tip(
            "Próclise é o Normal no Brasil",
            "No português brasileiro falado, quase sempre colocamos o pronome antes do verbo, mesmo no começo da frase: 'Te vejo depois' (natural no Brasil), em vez de 'Vejo-te depois' (mais comum em Portugal). Fique tranquilo em usar a próclise — é o padrão do dia a dia no Brasil."
        ),

        culture(
            "A Fração Digital",
            "No Brasil, fala-se cada vez mais sobre o excesso de tempo de tela e sobre o 'direito à desconexão' — o hábito de ficar off-line fora do horário de trabalho tem virado um tema recorrente em conversas sobre saúde mental e tecnologia."
        ),

        quiz(
            "Escolha a frase mais natural no português brasileiro falado.",
            ["Vejo-te amanhã.", "Te vejo amanhã.", "Eu te vejo amanhã eu.", "Vejo eu te amanhã."],
            1,
            "No PT-BR falado, o pronome geralmente vem antes do verbo: 'Te vejo amanhã.'"
        ),

        quiz(
            "Qual pronome substitui \"a notificação\" como objeto direto?",
            ["lhe", "a", "se", "nos"],
            1,
            "'A' substitui um objeto direto feminino já mencionado, como 'a notificação'."
        ),

        quiz(
            "Onde geralmente fica o pronome oblíquo no português brasileiro falado?",
            ["Sempre depois do verbo", "Geralmente antes do verbo", "No final da frase", "Nunca é usado"],
            1,
            "No PT-BR falado, a próclise (pronome antes do verbo) é o padrão mais natural."
        )

    ],

    summary: {

        tip:
            "Pratique descrevendo seus próprios hábitos digitais usando pronomes oblíquos: 'me manda', 'eu o uso', 'a gente se fala'.",

        review: [

            "me, te, o/a, nos, os/as — pronomes oblíquos",

            "próclise — padrão do PT-BR falado",

            "tempo de tela, viciado em, desintoxicação digital",

            "portanto, por isso"

        ]

    }

};
