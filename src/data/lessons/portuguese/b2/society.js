import { societyBlocks } from "../../../grammar/shared/portuguese/b2/society";
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

export const societyLesson = {

    id: "portuguese-b2-society",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "society",

    order: 4,

    title: "Sociedade, Valores e Questões Sociais",

    subtitle:
        "Apresente argumentos e compare perspectivas sobre questões sociais usando conectores de concessão e oposição.",

    description:
        "Discuta desigualdade, comunidade e responsabilidade social, aprendendo a usar 'embora', 'apesar de' e outros conectores argumentativos.",

    cover: "/covers/society-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

    tags: [
        "society",
        "grammar",
        "argumentação"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Apresentar argumentos sobre questões sociais",

        "Comparar perspectivas diferentes com nuance",

        "Usar conectores de concessão e oposição",

        "Discutir desigualdade, inclusão e responsabilidade social"

    ],

    vocabulary: vocabulary([
        "disparidade social",
        "comunidade",
        "inclusão",
        "diversidade",
        "responsabilidade social",
        "preconceito",
        "acesso à moradia",
        "instituição pública",
        "mobilidade social",
        "vulnerável",
        "engajamento cívico",
        "políticas públicas",
        "ação afirmativa",
        "coesão social",
        "excluído socialmente",
        "desafio estrutural",
        "avanço social",
        "voluntariado",
        "distribuição de renda",
        "pertencimento"
    ]),

    blocks: [

        heading("Discutindo Questões Sociais com Nuance"),

        paragraph(
            "Falar sobre sociedade exige apresentar mais de um lado de uma questão. Para isso, o português tem conectores específicos de concessão (que admitem um ponto antes de contradizê-lo) e de oposição (que comparam duas ideias diferentes)."
        ),

        examples([
            { text: "Embora a cidade tenha crescido muito, a disparidade social continua alta." },
            { text: "Apesar do avanço social das últimas décadas, ainda existe muito preconceito." },
            { text: "Uns defendem mais políticas públicas, ao passo que outros preferem soluções privadas." },
            { text: "Por outro lado, algumas comunidades já veem melhorias reais no acesso à moradia." },
            { text: "Mesmo com ações afirmativas, a mobilidade social ainda é limitada para muita gente." },
            { text: "Embora o voluntariado ajude, ele não substitui políticas públicas consistentes." },
            { text: "A coesão social depende de inclusão real, não apenas de discursos." }
        ]),

        dialogue([
            { speaker: "Beatriz", text: "O que você acha das políticas de inclusão nas universidades?" },
            { speaker: "Henrique", text: "Acho importantes. Embora existam críticas, elas ajudam a reduzir a disparidade social no acesso à educação." },
            { speaker: "Beatriz", text: "Concordo. Apesar de alguns considerarem injustas, elas corrigem desigualdades históricas." },
            { speaker: "Henrique", text: "Exato. Por outro lado, é preciso também investir em instituições públicas de qualidade desde cedo." },
            { speaker: "Beatriz", text: "Verdade. Você faz algum tipo de voluntariado?" },
            { speaker: "Henrique", text: "Faço, num projeto de moradia para famílias vulneráveis. Ao passo que ajuda algumas pessoas, sei que sozinho não resolve o desafio estrutural." },
            { speaker: "Beatriz", text: "Ainda assim, é um bom começo. Engajamento cívico conta muito para a coesão social." },
            { speaker: "Henrique", text: "Concordo. Embora um projeto não mude tudo, cada pessoa engajada faz diferença." }
        ]),

        grammar(societyBlocks[0].title, societyBlocks[0].text),

        list([

            "'embora' / 'ainda que' + subjuntivo — concessão",

            "'apesar de' + substantivo/infinitivo — concessão sem subjuntivo",

            "'ao passo que' / 'por outro lado' — comparação de ideias",

            "disparidade social, inclusão, mobilidade social, engajamento cívico"

        ]),

        tip(
            "Não Politize Demais",
            "Ao discutir questões sociais em português, prefira dados e conectores argumentativos ('embora', 'apesar de', 'por outro lado') a opiniões extremas — isso deixa seu discurso mais equilibrado e persuasivo."
        ),

        culture(
            "Ações Afirmativas no Brasil",
            "Desde 2012, uma lei federal reserva parte das vagas em universidades públicas brasileiras para estudantes de escolas públicas, negros, pardos e indígenas — uma das políticas de ação afirmativa mais discutidas no país nas últimas décadas."
        ),

        quiz(
            "Qual opção completa: \"___ a cidade tenha crescido, a desigualdade continua.\"",
            ["Apesar de", "Embora", "Por outro lado", "Ao passo que"],
            1,
            "'Embora' + subjuntivo ('tenha crescido') introduz uma concessão."
        ),

        quiz(
            "Escolha a frase correta.",
            ["Apesar de que a cidade cresceu, a desigualdade continua.", "Apesar do crescimento da cidade, a desigualdade continua.", "Apesar a cidade cresceu, a desigualdade continua.", "Apesar cresceu a cidade, a desigualdade continua."],
            1,
            "'Apesar de' é seguido de substantivo ou infinitivo, não de verbo conjugado: 'apesar do crescimento'."
        ),

        quiz(
            "O que significa 'mobilidade social'?",
            ["mudar de cidade com frequência", "a capacidade de mudar de classe social ao longo da vida", "usar transporte público", "viajar para o exterior"],
            1,
            "'Mobilidade social' se refere à capacidade de uma pessoa mudar de classe social ao longo da vida, geralmente através de educação e trabalho."
        )

    ],

    summary: {

        tip:
            "Pratique apresentando dois lados de uma questão social usando 'embora... por outro lado...'.",

        review: [

            "'embora' + subjuntivo vs. 'apesar de' + substantivo/infinitivo",

            "conectores de oposição: 'ao passo que', 'por outro lado'",

            "disparidade social, inclusão, mobilidade social, engajamento cívico"

        ]

    }

};
