import { educationBlocks } from "../../../grammar/shared/portuguese/b2/education";
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

export const educationLesson = {

    id: "portuguese-b2-education",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "education",

    order: 2,

    title: "Educação, Aprendizagem e Conhecimento",

    subtitle:
        "Discuta métodos de aprendizagem e sistemas educacionais usando a voz passiva com 'se' e construções impessoais.",

    description:
        "Explore vocabulário sobre educação e aprendizagem ao longo da vida, e aprenda a voz passiva com 'se' e as construções impessoais.",

    cover: "/covers/education-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

    tags: [
        "education",
        "grammar",
        "aprendizagem"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir métodos de aprendizagem e sistemas educacionais",

        "Comparar diferentes abordagens de ensino",

        "Usar a voz passiva com 'se' para falar de processos gerais",

        "Usar construções impessoais para expressar necessidade e opinião"

    ],

    vocabulary: vocabulary([
        "grade curricular",
        "aprendizagem ao longo da vida",
        "habilidade prática",
        "sistema de ensino",
        "aprofundar-se em",
        "pensamento crítico",
        "reprovar",
        "bolsa de estudos",
        "conhecimento teórico",
        "estágio",
        "orientador",
        "processo avaliativo",
        "défice de aprendizagem",
        "método de ensino",
        "reciclagem profissional",
        "engajado",
        "requisito",
        "capacitação",
        "erudito",
        "assimilar um conteúdo"
    ]),

    blocks: [

        heading("Como Aprendemos de Verdade"),

        paragraph(
            "Todo sistema de ensino tem seus prós e contras. Para discutir educação em português de forma mais natural, usamos muito a voz passiva com 'se', que evita dizer quem exatamente faz a ação: 'ensina-se', 'discute-se', 'exige-se'."
        ),

        examples([
            { text: "Ensina-se muita teoria e pouca prática nessa faculdade." },
            { text: "É importante que os alunos desenvolvam pensamento crítico, não só conhecimento teórico." },
            { text: "Discutem-se novos métodos de ensino todos os anos, mas poucos são aplicados de verdade." },
            { text: "Ele conseguiu uma bolsa de estudos depois de se aprofundar em pesquisa." },
            { text: "É preciso que a escola invista mais em habilidades práticas." },
            { text: "Exige-se cada vez mais capacitação para entrar no mercado de trabalho." },
            { text: "Ela é uma aluna muito engajada, sempre disposta a assimilar novo conteúdo." }
        ]),

        dialogue([
            { speaker: "Débora", text: "O que você acha do sistema de ensino no Brasil?" },
            { speaker: "Leonardo", text: "Acho que se ensina muita teoria e pouca prática. Falta mais habilidade prática mesmo." },
            { speaker: "Débora", text: "Concordo. É importante que os alunos aprendam a pensar de forma crítica, não só decorar conteúdo." },
            { speaker: "Leonardo", text: "Exatamente. E o défice de aprendizagem começa cedo, quando o método de ensino não engaja ninguém." },
            { speaker: "Débora", text: "Você fez estágio na faculdade?" },
            { speaker: "Leonardo", text: "Fiz, e aprendi mais em três meses de estágio do que em um ano de aulas teóricas." },
            { speaker: "Débora", text: "Faz sentido. Meu orientador sempre dizia que é preciso que a gente aprofunde na prática, não só na teoria." },
            { speaker: "Leonardo", text: "Concordo plenamente. E hoje em dia se exige tanta capacitação que a aprendizagem ao longo da vida virou obrigatória." }
        ]),

        grammar(educationBlocks[0].title, educationBlocks[0].text),

        list([

            "voz passiva com 'se' — ensina-se, discutem-se, exige-se",

            "'é' + adjetivo + 'que' + subjuntivo — construções impessoais",

            "grade curricular, sistema de ensino, aprendizagem ao longo da vida",

            "estágio, orientador, capacitação, requisito"

        ]),

        tip(
            "Concordância com 'Se'",
            "Na voz passiva com 'se', o verbo concorda com o sujeito: 'ensina-se uma matéria' (singular), mas 'ensinam-se várias matérias' (plural). É um erro comum deixar sempre no singular."
        ),

        culture(
            "Vestibular e ENEM",
            "No Brasil, o principal caminho para entrar numa universidade pública é o vestibular ou o ENEM (Exame Nacional do Ensino Médio) — uma prova nacional cujo resultado é usado por milhares de instituições, tanto públicas quanto privadas, para selecionar seus alunos."
        ),

        quiz(
            "Escolha a frase na voz passiva com 'se'.",
            ["Os professores ensinam teoria.", "Ensina-se muita teoria.", "A teoria foi ensinada.", "Alguém ensina teoria."],
            1,
            "'Ensina-se muita teoria' usa a partícula apassivadora 'se', sem indicar quem faz a ação."
        ),

        quiz(
            "Complete: \"É importante que os alunos ___ mais.\" (praticar)",
            ["praticam", "pratiquem", "praticaram", "praticariam"],
            1,
            "Depois de 'é importante que', usamos o presente do subjuntivo: 'pratiquem'."
        ),

        quiz(
            "O que significa 'aprofundar-se em' um assunto?",
            ["ignorar um assunto", "estudar um assunto superficialmente", "estudar um assunto em profundidade", "esquecer um assunto"],
            2,
            "'Aprofundar-se em' significa estudar algo em profundidade, indo além do básico."
        )

    ],

    summary: {

        tip:
            "Pratique descrevendo seu próprio sistema de ensino usando a voz passiva com 'se': o que se ensina bem, o que se ensina mal.",

        review: [

            "voz passiva com 'se' para processos e rotinas gerais",

            "construções impessoais: 'é preciso que', 'é importante que'",

            "grade curricular, aprendizagem ao longo da vida, capacitação"

        ]

    }

};
