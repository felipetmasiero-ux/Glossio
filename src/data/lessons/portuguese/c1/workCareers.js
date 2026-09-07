import { workCareersBlocks } from "../../../grammar/shared/portuguese/c1/workCareers";
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

    id: "portuguese-c1-work-careers",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "work-careers",

    order: 3,

    title: "Trabalho, Carreira e Comunicação Profissional",

    subtitle:
        "Relate informações profissionais com cautela usando o futuro do pretérito para dados não confirmados.",

    description:
        "Desenvolva vocabulário sobre liderança e comunicação profissional, e aprenda a usar o futuro do pretérito simples para relatar informações não confirmadas.",

    cover: "/covers/work-careers-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "work-careers",
        "grammar",
        "liderança"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Negociar e discordar diplomaticamente em contextos profissionais",

        "Relatar informações profissionais não confirmadas com cautela",

        "Usar o futuro do pretérito simples para informações não confirmadas",

        "Aplicar collocations profissionais e linguagem diplomática naturalmente"

    ],

    vocabulary: vocabulary([
        "estar à frente de",
        "otimizar processos",
        "prestar contas a",
        "no comando",
        "trazer uma contribuição",
        "ressalvas",
        "acertar os últimos detalhes",
        "colocar em movimento",
        "reduzir o quadro de funcionários",
        "com diplomacia",
        "estar alinhado com",
        "tirar proveito de",
        "uma tarefa árdua",
        "microgerenciar",
        "ser mais tolerante com alguém",
        "parte interessada",
        "de boa-fé",
        "questionar uma decisão",
        "uma curva de aprendizado íngreme",
        "crítica construtiva"
    ]),

    blocks: [

        heading("Relatar uma Informação com Cautela"),

        paragraph(
            "No ambiente profissional, o futuro do pretérito simples permite relatar uma informação sem garantir sua exatidão — uma nuance essencial antes que um boato seja confirmado."
        ),

        examples([
            { text: "A empresa reduziria o quadro de funcionários, mas nada foi confirmado oficialmente ainda." },
            { text: "A diretoria tomaria essa decisão sem consultar as partes interessadas, segundo rumores." },
            { text: "Dizem que ela estaria à frente do novo projeto, mas isso ainda não é oficial." },
            { text: "Apesar de ressalvas de boa-fé, a equipe acabou ficando alinhada com o novo plano." },
            { text: "Foi preciso ser mais tolerante com ele durante sua curva de aprendizado íngreme." },
            { text: "Ela acertou os últimos detalhes com diplomacia, sem nunca microgerenciar a equipe." },
            { text: "O projeto traria uma contribuição enorme, segundo as primeiras estimativas internas." }
        ]),

        dialogue([
            { speaker: "Vitória", text: "Você ouviu o boato sobre a reestruturação?" },
            { speaker: "Enzo", text: "Ouvi. Parece que a diretoria reduziria o quadro de funcionários. Nada confirmado, porém." },
            { speaker: "Vitória", text: "E quem estaria à frente do projeto, então?" },
            { speaker: "Enzo", text: "Dizem que seria a Camila, mas é só boato por enquanto." },
            { speaker: "Vitória", text: "Tenho ressalvas sobre essa abordagem, sinceramente." },
              { speaker: "Enzo", text: "Expresse com diplomacia na reunião, é melhor do que questionar a decisão em público." },
            { speaker: "Vitória", text: "Claro. Só quero que a gente esteja alinhado antes de virar oficial." },
            { speaker: "Enzo", text: "Combinado. Vamos tirar proveito da reunião de amanhã pra acertar os últimos detalhes juntos." }
        ]),

        grammar(workCareersBlocks[0].title, workCareersBlocks[0].text),

        list([

            "futuro do pretérito simples — informação não confirmada",

            "diferente do futuro do pretérito composto de hipótese ('eu teria feito')",

            "estar à frente de, tirar proveito de, acertar os últimos detalhes",

            "com diplomacia, parte interessada, de boa-fé"

        ]),

        tip(
            "Cautela Profissional",
            "Usar o presente ou o pretérito perfeito para um boato não confirmado ('A empresa reduziu o quadro') pode comprometer sua credibilidade se a informação for falsa. O futuro do pretérito ('reduziria') te protege ao sinalizar explicitamente a incerteza."
        ),

        culture(
            "O Feedback no Ambiente Corporativo Brasileiro",
            "Em empresas brasileiras, a crítica direta em público costuma ser mal recebida, mesmo quando construtiva — geralmente é mais eficaz expressar ressalvas em particular ou usar formulações mais cautelosas, como o futuro do pretérito, antes de uma reunião oficial."
        ),

        quiz(
            "Qual frase relata uma informação não confirmada?",
            ["A empresa reduziu o quadro de funcionários.", "A empresa reduziria o quadro de funcionários.", "A empresa reduz o quadro de funcionários.", "A empresa vai reduzir o quadro de funcionários."],
            1,
            "O futuro do pretérito ('reduziria') sinaliza que a informação não está confirmada."
        ),

        quiz(
            "O que significa 'estar alinhado com' alguém?",
            ["estar em total desacordo", "estar de acordo / na mesma direção", "trabalhar em escritórios diferentes", "ter opiniões opostas"],
            1,
            "'Estar alinhado com' significa estar de acordo ou na mesma direção que outra pessoa sobre uma ideia."
        ),

        quiz(
            "O que significa 'acertar os últimos detalhes'?",
            ["ignorar pequenos problemas restantes", "resolver os últimos pontos antes de finalizar algo", "cancelar um projeto", "recomeçar um projeto do zero"],
            1,
            "'Acertar os últimos detalhes' significa resolver os pontos restantes antes de finalizar algo."
        )

    ],

    summary: {

        tip:
            "Pratique relatando um boato profissional imaginário com o futuro do pretérito, sem afirmá-lo como fato.",

        review: [

            "futuro do pretérito simples para informação não confirmada",

            "estar à frente de, tirar proveito de, acertar os últimos detalhes",

            "com diplomacia, parte interessada, de boa-fé"

        ]

    }

};
