import { goalsBlocks } from "../../../grammar/shared/portuguese/b1/goals";
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

export const goalsLesson = {

    id: "portuguese-b1-goals",

    language: "portuguese",

    level: "B1",

    category: "Daily Life",

    topic: "goals",

    order: 2,

    title: "Planos, Sonhos e Objetivos",

    subtitle:
        "Fale sobre seus planos e ambições usando o futuro do presente, o futuro próximo e 'talvez' com o subjuntivo.",

    description:
        "Aprenda a diferença entre o futuro próximo e o futuro do presente para falar de planos de carreira, estudos e objetivos pessoais, e uma introdução ao subjuntivo com 'talvez'.",

    cover: "/covers/goals-pt.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 35,

    tags: [
        "goals",
        "future",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Falar sobre planos futuros, sonhos e ambições",

        "Escolher corretamente entre o futuro próximo e o futuro do presente",

        "Usar 'talvez' + presente do subjuntivo para possibilidades",

        "Discutir objetivos a curto e a longo prazo"

    ],

    vocabulary: vocabulary([
        "ambição",
        "ambicioso",
        "emprego dos sonhos",
        "almejar",
        "determinado",
        "motivado",
        "estabelecer uma meta",
        "plano de carreira",
        "promoção",
        "formação continuada",
        "ter a intenção de",
        "intenção",
        "resolução",
        "a longo prazo",
        "a curto prazo",
        "fazer um curso",
        "candidatar-se a uma vaga",
        "ser promovido",
        "sonhar em",
        "talvez"
    ]),

    blocks: [

        heading("Falando Sobre o Futuro"),

        paragraph(
            "O português tem duas estruturas principais para falar do futuro: o futuro próximo para um plano já decidido, e o futuro do presente para uma previsão ou algo mais distante."
        ),

        examples([
            { text: "Vou me candidatar a essa vaga — já preparei meu currículo." },
            { text: "Daqui a dez anos, talvez eu tenha minha própria empresa." },
            { text: "Ela vai fazer um curso de marketing no mês que vem." },
            { text: "Ainda não sei o que farei depois da faculdade." },
            { text: "Talvez a gente consiga uma promoção este ano, se tudo der certo." },
            { text: "Vou estabelecer uma nova meta este mês." },
            { text: "Um dia, sonho em me mudar para o exterior." }
        ]),

        dialogue([
            { speaker: "Larissa", text: "E aí, quais são seus planos para o ano que vem?" },
            { speaker: "Diego", text: "Vou me candidatar a algumas vagas em marketing. Estou mesmo com vontade de mudar de carreira." },
            { speaker: "Larissa", text: "Que ambicioso! Você acha que vai ser fácil?" },
            { speaker: "Diego", text: "Não muito, mas estou determinado. E você, tem planos?" },
            { speaker: "Larissa", text: "Vou fazer uma formação continuada esse semestre. A longo prazo, espero ser promovida." },
            { speaker: "Diego", text: "É uma boa meta. Daqui a cinco anos, onde você se vê?" },
            { speaker: "Larissa", text: "Sinceramente, ainda não sei. Mas talvez eu tenha mais responsabilidades até lá." },
            { speaker: "Diego", text: "Tenho certeza que você vai conseguir. Eu, primeiro, vou estabelecer uma meta a curto prazo." }
        ]),

        grammar(goalsBlocks[0].title, goalsBlocks[0].text),

        list([

            "futuro próximo (ir + infinitivo) — plano decidido",

            "futuro do presente (radical + terminações) — previsão, futuro distante",

            "talvez + presente do subjuntivo — possibilidade",

            "ambição, determinado, estabelecer uma meta"

        ]),

        tip(
            "Certo ou Incerto?",
            "O futuro próximo geralmente fala de um futuro mais certo e concreto, enquanto o futuro do presente pode expressar algo mais incerto ou distante. 'Vou me mudar semana que vem' (decidido) é diferente de 'Um dia talvez eu me mude' (mais vago)."
        ),

        culture(
            "Falar Sobre Planos",
            "Em entrevistas de emprego no Brasil, é comum perguntar 'Onde você se vê daqui a cinco anos?' — uma pergunta clássica para a qual vale a pena preparar uma resposta com objetivos claros e realistas."
        ),

        quiz(
            "Qual frase expressa um plano já decidido?",
            ["Vou me mudar um dia.", "Vou me mudar mês que vem.", "Eu me mudaria se pudesse.", "Às vezes eu me mudo."],
            1,
            "O futuro próximo ('vou me mudar mês que vem') expressa um plano já decidido."
        ),

        quiz(
            "Complete: \"Daqui a dez anos, eu ___ talvez minha própria empresa.\"",
            ["tenho", "terei", "tinha", "vou ter"],
            1,
            "O futuro do presente ('terei') expressa uma previsão para um futuro mais distante."
        ),

        quiz(
            "Qual modo verbal segue \"talvez\"?",
            ["indicativo", "subjuntivo", "imperativo", "infinitivo"],
            1,
            "'Talvez' é seguido do presente do subjuntivo, pois expressa uma possibilidade, não um fato certo."
        )

    ],

    summary: {

        tip:
            "Pratique descrevendo seus próprios planos: use o futuro próximo para o que já está decidido, e o futuro do presente ou 'talvez' para o que é mais incerto.",

        review: [

            "futuro próximo — plano decidido",

            "futuro do presente — previsão, futuro distante",

            "talvez + subjuntivo — possibilidade",

            "ambição, emprego dos sonhos, determinado"

        ]

    }

};
