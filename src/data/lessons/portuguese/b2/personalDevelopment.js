import { personalDevelopmentBlocks } from "../../../grammar/shared/portuguese/b2/personalDevelopment";
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

export const personalDevelopmentLesson = {

    id: "portuguese-b2-personal-development",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "personal-development",

    order: 1,

    title: "Escolhas de Vida e Desenvolvimento Pessoal",

    subtitle:
        "Fale sobre decisões importantes, mudanças de vida e arrependimentos usando o imperfeito do subjuntivo e o futuro do pretérito composto.",

    description:
        "Reflita sobre decisões, prioridades e valores, aprendendo a expressar arrependimento e hipóteses sobre o passado com precisão.",

    cover: "/covers/personal-development-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

    tags: [
        "personal-development",
        "grammar",
        "reflexão"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Falar sobre decisões importantes e mudanças de vida com mais profundidade",

        "Expressar arrependimento e hipóteses sobre o passado",

        "Combinar o imperfeito do subjuntivo com o futuro do pretérito composto",

        "Refletir sobre prioridades, valores e propósito de forma articulada"

    ],

    vocabulary: vocabulary([
        "amadurecer",
        "autoconhecimento",
        "prioridade",
        "valores",
        "sair da zona de conforto",
        "arrependimento",
        "reavaliar",
        "recomeçar do zero",
        "encarar um desafio",
        "resiliente",
        "propósito",
        "amadurecimento",
        "virada de chave",
        "renunciar a",
        "reconsiderar",
        "abrir mão de",
        "reinventar-se",
        "postura diante da vida",
        "lição aprendida",
        "seguir em frente"
    ]),

    blocks: [

        heading("Decisões que Marcam uma Vida"),

        paragraph(
            "Toda vida é feita de escolhas: algumas pequenas, outras que mudam tudo. Falar sobre essas decisões em português exige mais do que os tempos do passado simples — muitas vezes queremos imaginar como as coisas teriam sido se tivéssemos escolhido diferente."
        ),

        examples([
            { text: "Se eu tivesse escutado meus pais, teria evitado esse erro." },
            { text: "Foi um processo difícil de autoconhecimento, mas valeu a pena." },
            { text: "Ela decidiu sair da zona de conforto e recomeçar do zero em outra cidade." },
            { text: "Se eu tivesse sabido o quanto isso ia me custar, teria reconsiderado." },
            { text: "Ele teve que abrir mão de um emprego estável para seguir seu propósito." },
            { text: "Essa experiência foi uma verdadeira virada de chave na minha vida." },
            { text: "Teria sido mais fácil desistir, mas ela decidiu encarar o desafio." }
        ]),

        dialogue([
            { speaker: "Juliana", text: "Você já se arrependeu de alguma decisão grande na vida?" },
            { speaker: "Marcelo", text: "Sim, bastante. Se eu tivesse pensado com mais calma, teria escolhido outra faculdade." },
            { speaker: "Juliana", text: "Sério? E o que você faria diferente hoje?" },
            { speaker: "Marcelo", text: "Teria buscado mais autoconhecimento antes de decidir. Na época, eu só queria sair da zona de conforto dos meus pais." },
            { speaker: "Juliana", text: "Entendo. Eu também já pensei em recomeçar do zero em outra área." },
            { speaker: "Marcelo", text: "E por que você não fez isso?" },
            { speaker: "Juliana", text: "Porque, em retrospectiva, percebi que meus valores estavam alinhados com o que eu já fazia. Só precisava reavaliar minhas prioridades." },
            { speaker: "Marcelo", text: "Faz sentido. Às vezes a virada de chave não é mudar tudo, mas mudar a postura diante da vida." },
            { speaker: "Juliana", text: "Exatamente. E essa foi uma lição aprendida que eu levo comigo." }
        ]),

        grammar(personalDevelopmentBlocks[0].title, personalDevelopmentBlocks[0].text),

        list([

            "imperfeito do subjuntivo + futuro do pretérito composto — hipóteses e arrependimentos sobre o passado",

            "'se eu tivesse sabido, teria feito diferente'",

            "amadurecer, autoconhecimento, reavaliar, reinventar-se",

            "abrir mão de, virada de chave, seguir em frente"

        ]),

        tip(
            "Arrependimento vs. Fato",
            "Não confunda o mais-que-perfeito simples ('eu tinha decidido') com a estrutura de arrependimento ('se eu tivesse decidido diferente, teria...'). A primeira só descreve o que aconteceu; a segunda imagina um resultado que nunca existiu."
        ),

        culture(
            "Recomeços no Brasil",
            "É muito comum no Brasil ouvir histórias de pessoas que 'viraram a chave' e mudaram completamente de carreira ou de cidade depois dos 30 ou 40 anos — a ideia de que nunca é tarde para se reinventar é bastante valorizada culturalmente."
        ),

        quiz(
            "Complete: \"Se eu ___ mais tempo, eu teria terminado o projeto.\" (ter)",
            ["tenho", "tiver", "tivesse", "teria"],
            2,
            "Numa hipótese sobre o passado, usamos o imperfeito do subjuntivo ('tivesse') na oração com 'se'."
        ),

        quiz(
            "Qual frase expressa arrependimento sobre uma decisão passada?",
            ["Eu vou reavaliar minhas prioridades.", "Se eu tivesse sabido, teria feito diferente.", "Estou reavaliando minhas prioridades.", "Vou sair da zona de conforto."],
            1,
            "'Se eu tivesse sabido, teria feito diferente' combina imperfeito do subjuntivo e futuro do pretérito composto para expressar arrependimento."
        ),

        quiz(
            "O que significa 'abrir mão de algo'?",
            ["conquistar algo", "desistir de algo por escolha", "esconder algo", "comprar algo"],
            1,
            "'Abrir mão de' significa desistir de algo voluntariamente, geralmente em troca de outra coisa mais importante."
        )

    ],

    summary: {

        tip:
            "Pratique imaginando um resultado diferente para uma decisão do seu passado: 'Se eu tivesse..., eu teria...'",

        review: [

            "imperfeito do subjuntivo + futuro do pretérito composto para arrependimento",

            "amadurecer, autoconhecimento, reavaliar, reinventar-se",

            "abrir mão de, virada de chave, seguir em frente"

        ]

    }

};
