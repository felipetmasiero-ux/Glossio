import { educationBlocks } from "../../../grammar/shared/portuguese/c1/education";
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

    id: "portuguese-c1-education",

    language: "portuguese",

    level: "C1",

    category: "Grammar",

    topic: "education",

    order: 2,

    title: "Educação, Conhecimento e Pensamento Crítico",

    subtitle:
        "Apresente e qualifique argumentos acadêmicos usando nominalização e um registro mais formal.",

    description:
        "Explore vocabulário acadêmico e aprenda a transformar verbos em substantivos abstratos para um discurso universitário mais preciso.",

    cover: "/covers/education-c1-pt.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "education",
        "grammar",
        "acadêmico"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Apresentar e avaliar argumentos acadêmicos sobre educação",

        "Qualificar afirmações usando um registro mais formal",

        "Usar a nominalização para soar mais objetivo e preciso",

        "Discutir rigor intelectual e pensamento crítico com nuance"

    ],

    vocabulary: vocabulary([
        "servir de base para",
        "rigor intelectual",
        "discurso acadêmico",
        "um exemplo revelador",
        "contraintuitivo",
        "propício a",
        "credenciais",
        "internalizar",
        "em desacordo com",
        "bem fundamentado",
        "mal fundamentado",
        "aprofundar-se num assunto",
        "teoria do conhecimento",
        "condicionado a",
        "examinar minuciosamente",
        "de longo alcance",
        "decoreba",
        "dar credibilidade a",
        "uma lacuna de conhecimento",
        "colocar em xeque"
    ]),

    blocks: [

        heading("Argumentar com Precisão Acadêmica"),

        paragraph(
            "O português acadêmico e analítico se apoia bastante na nominalização — transformar verbos e adjetivos em substantivos abstratos — para produzir um discurso mais formal e objetivo."
        ),

        examples([
            { text: "O rigor intelectual desse estudo é o que o diferencia de um exemplo mais mal fundamentado." },
            { text: "Esse argumento está condicionado a uma suposição que precisaria ser mais aprofundada." },
            { text: "É contraintuitivo, mas a decoreba às vezes pode servir de base para uma compreensão mais profunda depois." },
            { text: "As credenciais dela dão credibilidade ao argumento, mas isso não o isenta de um exame minucioso." },
            { text: "Essa abordagem parece em desacordo com tudo o que sabemos sobre como internalizamos conhecimento." },
            { text: "Como regra geral, toda afirmação que não convida ao questionamento deveria ela mesma ser colocada em xeque." },
            { text: "É propício a um bom debate qualquer argumento que aceite ser examinado minuciosamente." }
        ]),

        dialogue([
            { speaker: "Isabela", text: "O que você achou da palestra sobre teoria do conhecimento?" },
            { speaker: "Murilo", text: "Interessante, mas alguns argumentos me pareceram mal fundamentados se você se aprofunda neles." },
            { speaker: "Isabela", text: "Tipo o quê? Me dá um exemplo revelador." },
            { speaker: "Murilo", text: "A ideia de que a decoreba nunca é propícia à compreensão real. É contraintuitivo — ela pode servir de base pra um aprendizado mais profundo depois." },
            { speaker: "Isabela", text: "Justo. Mesmo que as credenciais dela deem certa credibilidade ao argumento." },
              { speaker: "Murilo", text: "Claro, mas credenciais não deveriam impedir a gente de examinar o discurso minuciosamente." },
            { speaker: "Isabela", text: "Como regra geral, eu evito internalizar uma afirmação sem questionar o raciocínio primeiro." },
            { speaker: "Murilo", text: "Exatamente. Até conclusões de longo alcance podem estar condicionadas a algo bem mal fundamentado." },
            { speaker: "Isabela", text: "É isso que deixa esse discurso tão em desacordo com o ensino tradicional, eu acho." }
        ]),

        grammar(educationBlocks[0].title, educationBlocks[0].text),

        list([

            "nominalização — verbo/adjetivo → substantivo abstrato para formalidade",

            "servir de base para, rigor intelectual, examinar minuciosamente, colocar em xeque",

            "condicionado a, em desacordo com, propício a",

            "uma lacuna de conhecimento, um exemplo revelador"

        ]),

        tip(
            "Não Nominalize Tudo",
            "A nominalização é poderosa na escrita acadêmica, mas empilhar substantivos abstratos demais numa mesma frase deixa o texto pesado. Se uma frase parece densa demais, volte para o verbo direto."
        ),

        culture(
            "A Argumentação na Universidade Brasileira",
            "No ensino superior brasileiro, especialmente em cursos de humanas, a escrita acadêmica valoriza muito a nominalização e a citação de fontes — algo que contrasta com a linguagem direta e informal do dia a dia, e que costuma ser um desafio até para falantes nativos no início da graduação."
        ),

        quiz(
            "Escolha a versão nominalizada mais natural de \"Deveríamos avaliar os alunos de outro jeito.\"",
            [
                "Avaliamos os alunos de outro jeito.",
                "Uma avaliação diferente dos alunos é, sem dúvida, necessária.",
                "Avaliar os alunos de outro jeito é ruim.",
                "Os alunos são avaliados de outro jeito."
            ],
            1,
            "Nominalizar 'avaliar' em 'avaliação' produz uma frase mais formal e acadêmica."
        ),

        quiz(
            "O que significa um argumento 'mal fundamentado'?",
            ["um argumento muito sólido", "um argumento frágil, sem boa base", "um argumento muito popular", "um argumento neutro"],
            1,
            "'Mal fundamentado' descreve um argumento frágil, que não tem uma boa base de sustentação."
        ),

        quiz(
            "O que significa 'examinar algo minuciosamente'?",
            ["ignorar completamente", "examinar com muito cuidado e atenção aos detalhes", "aceitar sem questionar", "resumir rapidamente"],
            1,
            "'Examinar minuciosamente' significa examinar algo com muito cuidado e atenção aos detalhes."
        )

    ],

    summary: {

        tip:
            "Pratique transformando três frases verbais sobre educação em frases nominalizadas, mais acadêmicas.",

        review: [

            "nominalização para um registro acadêmico",

            "servir de base para, rigor intelectual, examinar minuciosamente, colocar em xeque",

            "condicionado a, em desacordo com, propício a"

        ]

    }

};
