import { workBlocks } from "../../../grammar/shared/portuguese/b1/work";
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

export const workLesson = {

    id: "portuguese-b1-work",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "work",

    order: 4,

    title: "Trabalho e Vida Profissional",

    subtitle:
        "Faça pedidos e sugestões no ambiente de trabalho usando o condicional (futuro do pretérito).",

    description:
        "Aprenda vocabulário do ambiente profissional e como usar o condicional para fazer pedidos educados, sugestões e conselhos suaves no trabalho.",

    cover: "/covers/work-pt.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "work",
        "condicional",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Falar sobre situações profissionais e responsabilidades",

        "Usar o condicional de 'poder' e 'querer' para pedidos educados",

        "Usar 'dever' no condicional para dar conselhos suaves",

        "Usar 'seria melhor' para uma sugestão impessoal"

    ],

    vocabulary: vocabulary([
        "colega de trabalho",
        "prazo",
        "carga de trabalho",
        "hora extra",
        "pedir demissão",
        "ser demitido",
        "entrevista de emprego",
        "carta de apresentação",
        "currículo",
        "local de trabalho",
        "tarefa",
        "responsabilidade",
        "reunião",
        "negociar",
        "salário",
        "benefícios",
        "trabalho em equipe",
        "tomar a iniciativa",
        "gerenciar uma equipe",
        "você poderia"
    ]),

    blocks: [

        heading("Sendo Educado no Trabalho"),

        paragraph(
            "No ambiente profissional, o condicional de 'poder', 'querer' e 'dever' deixa pedidos, sugestões e até críticas muito mais educados e diplomáticos."
        ),

        examples([
            { text: "Você poderia me enviar o relatório até sexta-feira, por favor?" },
            { text: "Eu gostaria de te fazer uma pergunta sobre o novo projeto." },
            { text: "Você deveria conversar com seu gestor antes de decidir." },
            { text: "Você teria um tempinho para uma reunião rápida hoje à tarde?" },
            { text: "Nós deveríamos negociar um prazo melhor para esse projeto." },
            { text: "Você poderia me ajudar com essa tarefa, por favor?" },
            { text: "Seria melhor revisar a carga de trabalho de toda a equipe." }
        ]),

        dialogue([
            { speaker: "Patrícia", text: "Vinícius, você teria um tempinho para falar sobre sua carga de trabalho?" },
            { speaker: "Vinícius", text: "Claro. Podemos conversar agora mesmo?" },
            { speaker: "Patrícia", text: "Sim, vamos lá. Eu gostaria de saber se o prazo desse projeto é realista para você." },
            { speaker: "Vinícius", text: "Sinceramente, acho que deveríamos negociá-lo. A carga de trabalho está bem pesada no momento." },
            { speaker: "Patrícia", text: "Entendo. Você também deveria pensar em delegar algumas tarefas para a equipe." },
            { speaker: "Vinícius", text: "Boa ideia. Você poderia me ajudar a reorganizar as prioridades?" },
            { speaker: "Patrícia", text: "Claro que sim. Vou falar com a diretoria também — seria bom revisar a carga de toda a equipe." },
            { speaker: "Vinícius", text: "Muito obrigado, eu realmente agradeço." }
        ]),

        grammar(workBlocks[0].title, workBlocks[0].text),

        list([

            "você poderia — pedido educado",

            "eu gostaria — desejo educado",

            "você deveria — conselho suave",

            "seria melhor — sugestão impessoal"

        ]),

        tip(
            "Ordem Direta ou Pedido Educado?",
            "No trabalho, o condicional deixa a frase mais educada e menos direta. Compare 'Me manda o relatório' (ordem direta) com 'Você poderia me enviar o relatório?' (pedido educado) — a segunda versão é muito mais adequada num contexto profissional."
        ),

        culture(
            "A Educação no Ambiente de Trabalho",
            "No ambiente profissional brasileiro, o uso do condicional para pedidos é quase automático — mesmo entre colegas próximos, é comum preferir 'você poderia' a 'você pode' para manter a cordialidade."
        ),

        quiz(
            "Qual é a frase mais educada?",
            ["Me manda o relatório.", "Você poderia me mandar o relatório?", "Você me manda o relatório?", "Manda o relatório!"],
            1,
            "O condicional ('você poderia') deixa o pedido mais educado."
        ),

        quiz(
            "Escolha a forma de conselho suave.",
            ["Você deve falar com ele.", "Você deveria falar com ele.", "Você devia ter falado com ele agora.", "Você deverá falar com ele."],
            1,
            "'Deveria' (condicional) expressa um conselho mais suave que 'deve'."
        ),

        quiz(
            "O que significa \"eu gostaria\" nesse contexto?",
            ["Uma ordem direta.", "Um desejo educado.", "Uma pergunta fechada.", "Uma proibição."],
            1,
            "'Eu gostaria' expressa um desejo de forma educada, mais suave que 'eu quero'."
        )

    ],

    summary: {

        tip:
            "Pratique fazendo pedidos educados no trabalho: use 'você poderia', 'eu gostaria' e 'você deveria' em vez de formas muito diretas.",

        review: [

            "você poderia / eu gostaria — pedido educado",

            "você deveria / seria melhor — conselho, sugestão",

            "colega de trabalho, prazo, carga de trabalho, negociar",

            "trabalho em equipe, gerenciar uma equipe"

        ]

    }

};
