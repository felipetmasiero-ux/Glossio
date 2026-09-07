import { psychologyBlocks } from "../../../grammar/shared/portuguese/c1/psychology";
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

export const psychologyLesson = {

    id: "portuguese-c1-psychology",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "psychology",

    order: 9,

    title: "Psicologia, Relações e Comportamento Humano",

    subtitle:
        "Discuta comportamento e relacionamentos com precisão emocional aprendendo a sugerir e repreender com tato.",

    description:
        "Desenvolva vocabulário sobre emoções e comportamento, e aprenda estruturas para sugerir sem impor e repreender sem magoar.",

    cover: "/covers/psychology-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "psychology",
        "grammar",
        "relações"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir comportamento, emoções e relacionamentos com nuance",

        "Sugerir uma atitude sem impor",

        "Repreender gentilmente o comportamento passado de alguém",

        "Analisar situações interpessoais usando vocabulário psicológico"

    ],

    vocabulary: vocabulary([
        "autossabotagem",
        "passar a impressão de",
        "projeção psicológica",
        "confidenciar a alguém",
        "mecanismo de defesa",
        "amargura guardada",
        "entender as intenções de alguém",
        "à flor da pele",
        "dar espaço a alguém",
        "uma insegurança de fundo",
        "distanciar-se emocionalmente",
        "validar os sentimentos de alguém",
        "remoer um pensamento",
        "profecia autorrealizável",
        "nutrir rancor",
        "senso de conclusão",
        "emocionalmente equilibrado",
        "aceitar uma situação difícil",
        "uma dinâmica tóxica",
        "sintonizado com as emoções"
    ]),

    blocks: [

        heading("Sugerir e Repreender com Tato"),

        paragraph(
            "Discutir relacionamentos e comportamento com precisão exige mais do que 'você deveria'. O português tem estruturas específicas para sugerir sem impor e repreender uma atitude passada sem magoar."
        ),

        examples([
            { text: "No seu lugar, eu não confidenciaria isso a ela antes de me distanciar emocionalmente da situação." },
            { text: "Seria melhor que você não remoesse isso o fim de semana inteiro; só vai alimentar a amargura guardada." },
            { text: "Não teria sido mais fácil me avisar antes, em vez dessa autossabotagem toda?" },
            { text: "Você podia ter ao menos validado os sentimentos dela antes de já sair dando conselhos." },
            { text: "Ele passa a impressão de ser emocionalmente equilibrado, mas há claramente uma insegurança de fundo ali." },
            { text: "Você podia ter pensado em dar espaço a ela em vez de entender mal as intenções dela." },
            { text: "Essa dinâmica tóxica já parece uma profecia autorrealizável nesse ponto." }
        ]),

        dialogue([
            { speaker: "Yasmin", text: "Você tá à flor da pele hoje. Tudo bem com sua irmã?" },
            { speaker: "Bruno", text: "Não muito. Seria melhor que você não tivesse tocado no assunto, sinceramente, mas tudo bem — virou uma dinâmica tóxica ultimamente." },
            { speaker: "Yasmin", text: "O que aconteceu?" },
            { speaker: "Bruno", text: "Ela confidenciou uma coisa a mim, e acho que passei a impressão de estar julgando sem querer." },
            { speaker: "Yasmin", text: "Você podia ter pelo menos dado espaço pra ela terminar de explicar." },
            { speaker: "Bruno", text: "Eu sei. Acho que isso despertou uma amargura antiga — quase uma profecia autorrealizável." },
              { speaker: "Yasmin", text: "Você tentou aceitar a situação de algum jeito?" },
            { speaker: "Bruno", text: "Tô tentando. No seu lugar, eu simplesmente pediria desculpa em vez de ficar remoendo tudo isso." },
            { speaker: "Yasmin", text: "Isso parece bem sintonizado com as emoções, pelo menos. Bom instinto." },
            { speaker: "Bruno", text: "Vamos ver. Só espero que ela não nutra rancor por muito tempo." }
        ]),

        grammar(psychologyBlocks[0].title, psychologyBlocks[0].text),

        list([

            "'no seu lugar, eu...' — sugestão sem impor",

            "'seria melhor que' + subjuntivo — sugestão delicada",

            "futuro do pretérito composto em pergunta retórica — reprovação atenuada",

            "'você podia ter...' — reprovação mais suave que 'você deveria ter...'"

        ]),

        tip(
            "Podia Ter vs Deveria Ter",
            "'Você podia ter me avisado' repreende de forma mais suave do que 'você deveria ter me avisado', que pode soar mais acusatório. Escolha conforme o tom que você quer dar à observação."
        ),

        culture(
            "O Vocabulário da Psicologia na Conversa",
            "Palavras como 'validar', 'gatilho' e 'dinâmica tóxica' passaram da linguagem clínica para o português cotidiano nos últimos anos, especialmente entre gerações mais jovens — reconhecer esse vocabulário ajuda a acompanhar boa parte das conversas atuais sobre relacionamentos."
        ),

        quiz(
            "Escolha a estrutura correta para uma reprovação atenuada.",
            ["Você tem que me avisar.", "Você podia ter ao menos me avisado.", "Me avisa da próxima vez!", "Você nunca avisa nada."],
            1,
            "'Você podia ter ao menos me avisado' é uma reprovação atenuada, mais suave que uma ordem direta."
        ),

        quiz(
            "O que significa 'nutrir rancor'?",
            ["perdoar rapidamente", "continuar sentindo ressentimento por alguém", "pedir desculpa sinceramente", "evitar todo conflito"],
            1,
            "'Nutrir rancor' significa continuar sentindo ressentimento por alguém durante um período prolongado."
        ),

        quiz(
            "Qual estrutura sugere sem impor?",
            ["Faça isso agora.", "Você tem que fazer isso.", "No seu lugar, eu faria isso.", "É obrigatório fazer isso."],
            2,
            "'No seu lugar, eu faria isso' sugere uma alternativa sem impor uma ordem."
        )

    ],

    summary: {

        tip:
            "Pratique dando um feedback gentil sobre uma situação real usando 'você podia ter' em vez de 'você deveria ter'.",

        review: [

            "'no seu lugar' e 'seria melhor que' para sugerir sem impor",

            "futuro do pretérito composto para uma reprovação atenuada",

            "autossabotagem, amargura guardada, mecanismo de defesa, aceitar uma situação difícil"

        ]

    }

};
