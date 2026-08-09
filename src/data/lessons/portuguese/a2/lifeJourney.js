import {
    heading,
    paragraph,
    examples,
    dialogue,
    grammar,
    list,
    tip,
    culture,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const lifeJourneyLesson = {

    id: "portuguese-a2-life-journey",

    language: "portuguese",

    level: "A2",

    category: "Grammar",

    topic: "life-experiences",

    order: 12,

    title: "Minha Trajetória",

    subtitle:
        "Fale sobre experiências acumuladas e revise o que você aprendeu no A2.",

    description:
        "Lição de consolidação do Portuguese A2: aprenda o pretérito perfeito composto para ações contínuas até agora, em contraste com o pretérito perfeito simples, e revise os principais tópicos do módulo.",

    cover: "/covers/life-journey-a2.webp",

    estimatedTime: 11,

    difficulty: 2,

    xp: 45,

    tags: [
        "grammar",
        "vocabulary",
        "review"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Usar o pretérito perfeito composto para ações contínuas até agora",

        "Diferenciar o perfeito composto do perfeito simples",

        "Falar sobre conquistas e desafios da sua trajetória",

        "Revisar as principais estruturas do Portuguese A2"

    ],

    vocabulary: vocabulary([
        "tenho estudado",
        "ultimamente",
        "trajetória",
        "conquista",
        "desafio",
        "alcançar",
        "já",
        "nunca",
        "ao longo da vida",
        "continuar"
    ]),

    blocks: [

        heading("Minha Trajetória Até Aqui"),

        paragraph(
            "Ao longo deste módulo, você aprendeu a narrar o passado (pretérito perfeito), descrever hábitos antigos (pretérito imperfeito) e fazer previsões (futuro). Agora vamos fechar com um tempo verbal para ações que começaram no passado e continuam até agora: o pretérito perfeito composto."
        ),

        examples([
            {
                text: "Tenho estudado português todos os dias ultimamente."
            },

            {
                text: "Ao longo da vida, já enfrentei muitos desafios, mas nunca desisti."
            },

            {
                text: "Ela tem alcançado ótimos resultados desde que começou a praticar mais."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Como está sua trajetória com o português ultimamente?" },
            { speaker: "Marco", text: "Tenho estudado bastante! Já alcancei um nível que antes parecia impossível." },
            { speaker: "Anna", text: "Que conquista! Qual foi o maior desafio até agora?" },
            { speaker: "Marco", text: "O pretérito imperfeito, sem dúvida. Mas continuo praticando todos os dias." }
        ]),

        grammar(
            "Pretérito Perfeito Composto",
            "Use 'ter' no presente + particípio para falar de uma ação que começou no passado e continua (ou se repete) até agora: 'Tenho estudado' (e continuo estudando), diferente de 'Estudei' (uma ação já terminada). Compare: 'Ontem eu estudei três horas' (evento pontual, perfeito simples) vs. 'Tenho estudado bastante ultimamente' (ação contínua/repetida, perfeito composto)."
        ),

        list([

            "tenho + particípio → tenho estudado, tenho trabalhado",

            "perfeito simples: ação pontual, terminada (Ontem estudei.)",

            "perfeito composto: ação contínua ou repetida (Tenho estudado.)",

            "já, nunca, ultimamente, ao longo da vida"

        ]),

        tip(
            "Não Confunda com o Inglês",
            "O pretérito perfeito composto em português não funciona como o 'present perfect' do inglês para experiências pontuais ('I have been to Brazil'). Em português, use o pretérito perfeito simples para isso: 'Já fui ao Brasil', não 'Tenho ido ao Brasil'."
        ),

        culture(
            "Falando Sobre Conquistas",
            "É comum, em conversas informais no Brasil, compartilhar conquistas pessoais com humildade, muitas vezes minimizando o esforço próprio ('Consegui, mas foi sorte') mesmo quando o resultado veio de bastante trabalho."
        ),

        quiz(
            "Qual frase usa o pretérito perfeito composto corretamente?",
            ["Ontem tenho estudado muito.", "Tenho estudado muito ultimamente.", "Amanhã tenho estudado muito.", "Tenho estudo muito."],
            1,
            "O perfeito composto ('tenho estudado') combina com expressões de continuidade, como 'ultimamente'."
        ),

        quiz(
            "Qual é a diferença entre 'Estudei' e 'Tenho estudado'?",
            ["Não há diferença", "'Estudei' é uma ação terminada; 'Tenho estudado' é contínua ou repetida", "'Tenho estudado' é sobre o futuro", "'Estudei' é sobre hábitos antigos"],
            1,
            "'Estudei' descreve um evento pontual e terminado; 'Tenho estudado' descreve algo contínuo até agora."
        ),

        quiz(
            "No diálogo, qual foi o maior desafio de Marco até agora?",
            ["O futuro do presente", "O pretérito imperfeito", "Os comparativos", "O vocabulário de restaurante"],
            1,
            "Marco disse: 'O pretérito imperfeito, sem dúvida.'"
        )

    ],

    summary: {

        tip:
            "Revise mentalmente as 11 lições deste módulo e conte, em voz alta, uma conquista sua usando o pretérito perfeito composto ('Tenho...').",

        review: [

            "tenho + particípio (ação contínua/repetida até agora)",

            "perfeito simples (evento único) vs. perfeito composto (contínuo)",

            "Revisão do módulo: passado, comparativos, conselhos, futuro, direções, hábitos antigos, vontade, sentimentos, restaurante, hotel, planos",

            "já, nunca, ultimamente, ao longo da vida"

        ]

    }

};
