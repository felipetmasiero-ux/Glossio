import { workCareersBlocks } from "../../../grammar/shared/portuguese/b2/workCareers";
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

export const workCareersLesson = {

    id: "portuguese-b2-work-careers",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "work-careers",

    order: 3,

    title: "Trabalho, Carreira e Ambiente Profissional",

    subtitle:
        "Discuta liderança, mercado de trabalho e situações profissionais usando o futuro do pretérito composto.",

    description:
        "Desenvolva vocabulário sobre carreira e ambiente profissional, e aprenda a usar o futuro do pretérito composto para hipóteses no passado e registro profissional.",

    cover: "/covers/work-careers-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

    tags: [
        "work-careers",
        "grammar",
        "profissional"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir situações profissionais com mais precisão",

        "Fazer hipóteses sobre decisões de carreira do passado",

        "Usar o futuro do pretérito composto em registro profissional",

        "Ampliar vocabulário sobre liderança e mercado de trabalho"

    ],

    vocabulary: vocabulary([
        "liderança",
        "espírito de equipe",
        "prazo apertado",
        "sobrecarregado",
        "assumir uma responsabilidade",
        "desligamento",
        "ambiente competitivo",
        "delegar tarefas",
        "feedback construtivo",
        "hierarquia",
        "empreender",
        "networking",
        "recursos humanos",
        "plano de carreira sólido",
        "negociar um salário",
        "burnout",
        "cultura organizacional",
        "competência",
        "sair na frente",
        "equilíbrio entre vida pessoal e trabalho"
    ]),

    blocks: [

        heading("Decisões no Mundo Profissional"),

        paragraph(
            "No ambiente de trabalho, muitas vezes olhamos para trás e imaginamos como as coisas teriam sido diferentes. O futuro do pretérito composto (teria + particípio) é perfeito para isso — e também suaviza opiniões num contexto profissional."
        ),

        examples([
            { text: "Eu teria aceitado a proposta, mas o salário era baixo demais." },
            { text: "Teria sido melhor delegar tarefas em vez de assumir tudo sozinho." },
            { text: "Com mais espírito de equipe, teríamos entregado o projeto antes do prazo apertado." },
            { text: "Ele estava tão sobrecarregado que acabou tendo um burnout." },
            { text: "A cultura organizacional dessa empresa valoriza muito o feedback construtivo." },
            { text: "Eu teria negociado meu salário com mais confiança se tivesse pesquisado o mercado antes." },
            { text: "Sem um plano de carreira sólido, é fácil se perder num ambiente tão competitivo." }
        ]),

        dialogue([
            { speaker: "Carolina", text: "Como foi seu desligamento da empresa anterior?" },
            { speaker: "Roberto", text: "Foi difícil. Eu estava sobrecarregado havia meses, e a empresa não tinha muito espírito de equipe." },
            { speaker: "Carolina", text: "Nossa. E você acha que poderia ter evitado?" },
            { speaker: "Roberto", text: "Teria sido melhor se eu tivesse assumido menos responsabilidades sozinho e delegado mais tarefas." },
            { speaker: "Carolina", text: "Faz sentido. E como está o novo emprego?" },
            { speaker: "Roberto", text: "Muito melhor. A cultura organizacional daqui valoriza o feedback construtivo, e a hierarquia é mais horizontal." },
            { speaker: "Carolina", text: "Que ótimo! Você chegou a negociar o salário?" },
            { speaker: "Roberto", text: "Cheguei. Teria negociado ainda mais se tivesse feito mais networking antes da entrevista." },
            { speaker: "Carolina", text: "Bom saber. Eu também quero sair na frente na minha carreira esse ano." }
        ]),

        grammar(workCareersBlocks[0].title, workCareersBlocks[0].text),

        list([

            "futuro do pretérito composto (teria + particípio) — hipóteses no passado",

            "'teria sido melhor...' — suaviza opiniões em registro profissional",

            "liderança, espírito de equipe, cultura organizacional",

            "delegar tarefas, negociar um salário, equilíbrio entre vida pessoal e trabalho"

        ]),

        tip(
            "Simples ou Composto?",
            "'Eu faria diferente' (futuro do pretérito simples) ainda é possível fazer. 'Eu teria feito diferente' (composto) já passou e não pode mais mudar. Escolha a forma certa dependendo se a situação ainda é possível ou já ficou no passado."
        ),

        culture(
            "Hierarquia no Trabalho Brasileiro",
            "Empresas brasileiras tradicionais costumam ter uma hierarquia bem definida, mas startups e empresas de tecnologia têm adotado cada vez mais uma cultura organizacional horizontal, com mais autonomia e feedback direto entre equipes."
        ),

        quiz(
            "Complete: \"Eu ___ aceitado a proposta, mas o salário era baixo.\" (aceitar)",
            ["aceitaria", "teria", "tinha aceitado", "teria aceitado"],
            3,
            "O futuro do pretérito composto ('teria aceitado') descreve uma hipótese sobre uma decisão que já passou."
        ),

        quiz(
            "Qual frase é mais adequada para suavizar uma crítica profissional?",
            ["Você errou tudo.", "Teria sido melhor avisar a equipe antes.", "Isso está errado.", "Você não fez direito."],
            1,
            "'Teria sido melhor...' suaviza a crítica sem soar agressivo, um recurso comum em feedback profissional."
        ),

        quiz(
            "O que significa 'delegar tarefas'?",
            ["fazer tudo sozinho", "distribuir responsabilidades entre a equipe", "ignorar responsabilidades", "recusar uma tarefa"],
            1,
            "'Delegar tarefas' significa distribuir responsabilidades entre membros da equipe, em vez de assumir tudo sozinho."
        )

    ],

    summary: {

        tip:
            "Pratique dando feedback profissional suave usando 'teria sido melhor...' em vez de críticas diretas.",

        review: [

            "futuro do pretérito composto (teria + particípio) para hipóteses no passado",

            "liderança, cultura organizacional, feedback construtivo",

            "delegar tarefas, negociar um salário, equilíbrio entre vida pessoal e trabalho"

        ]

    }

};
