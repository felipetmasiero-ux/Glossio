import { opinionsBlocks } from "../../../grammar/shared/portuguese/b1/opinions";
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

export const opinionsLesson = {

    id: "portuguese-b1-opinions",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "opinions",

    order: 8,

    title: "Sociedade e Opiniões",

    subtitle:
        "Expresse opiniões usando o indicativo ou o subjuntivo depois de verbos de opinião, e conectores de contraste.",

    description:
        "Aprenda a expressar e justificar opiniões sobre temas da sociedade, escolhendo entre indicativo e subjuntivo depois de verbos como 'achar que' e 'acreditar que'.",

    cover: "/covers/opinions-pt.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "opinions",
        "subjuntivo",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Expressar e justificar uma opinião",

        "Concordar e discordar educadamente",

        "Escolher entre indicativo e subjuntivo depois de verbos de opinião",

        "Usar conectores de contraste como 'por outro lado' e 'no entanto'"

    ],

    vocabulary: vocabulary([
        "na minha opinião",
        "do meu ponto de vista",
        "concordar",
        "discordar",
        "ponto de vista",
        "debate",
        "controverso",
        "ser a favor",
        "ser contra",
        "convencer",
        "persuadir",
        "perspectiva",
        "argumento válido",
        "acreditar firmemente",
        "pelo contrário",
        "antes de mais nada",
        "em conclusão",
        "resumindo",
        "desigualdade",
        "marginalizado"
    ]),

    blocks: [

        heading("Expressando uma Opinião com Precisão"),

        paragraph(
            "Ao expressar uma opinião, o modo do verbo que vem depois muda conforme estamos certos ou não da nossa ideia: o indicativo para um fato afirmado, o subjuntivo quando a ideia se torna incerta ou negada."
        ),

        examples([
            { text: "Eu acho que a desigualdade é um problema real na nossa sociedade." },
            { text: "Eu não acho que essa seja uma solução suficiente." },
            { text: "Na minha opinião, precisamos de mais políticas sociais eficazes." },
            { text: "Alguns são a favor dessa reforma; por outro lado, outros são claramente contra." },
            { text: "Eu acredito que esse debate é importante, mesmo que nem todo mundo concorde." },
            { text: "Muita gente se informa online, porém outros ainda preferem os jornais." },
            { text: "Eu não acredito que esse problema possa ser resolvido facilmente." }
        ]),

        dialogue([
            { speaker: "Vanessa", text: "Na minha opinião, precisaríamos investir mais em educação para reduzir a desigualdade." },
            { speaker: "Otávio", text: "Concordo, mas eu não acho que isso seja suficiente sozinho." },
            { speaker: "Vanessa", text: "Você tem razão. Do seu ponto de vista, o que ajudaria mais?" },
            { speaker: "Otávio", text: "Eu acredito que também precisamos melhorar o acesso à saúde. Alguns bairros são bem equipados; por outro lado, outros são bem marginalizados." },
            { speaker: "Vanessa", text: "É verdade. Enquanto algumas pessoas têm muitas oportunidades, outras não têm quase nenhuma." },
            { speaker: "Otávio", text: "Exatamente. É um assunto complexo, mas eu não acredito que a gente possa ignorá-lo." },
            { speaker: "Vanessa", text: "Concordo totalmente com você nisso." },
            { speaker: "Otávio", text: "De qualquer forma, é bom debater, mesmo quando a gente não concorda em tudo." }
        ]),

        grammar(opinionsBlocks[0].title, opinionsBlocks[0].text),

        list([

            "eu acho que + indicativo — opinião afirmativa",

            "eu não acho que + subjuntivo — opinião negativa",

            "por outro lado / no entanto — contraste",

            "desigualdade, marginalizado, debate"

        ]),

        tip(
            "Afirmativa = Indicativo, Negativa = Subjuntivo",
            "Essa troca de modo é um erro comum. Lembre-se apenas: na afirmativa, a ideia é apresentada como um fato (indicativo); na negativa, ela se torna incerta (subjuntivo)."
        ),

        culture(
            "O Debate no Brasil",
            "Discutir temas sociais faz parte da cultura brasileira em rodas de conversa, no trabalho e até em família — embora o assunto às vezes seja delicado, é comum valorizar quem consegue argumentar com respeito, mesmo discordando."
        ),

        quiz(
            "Escolha a frase correta.",
            ["Eu acho que é verdade.", "Eu acho que seja verdade.", "Eu acho que fosse verdade.", "Eu acho que seria verdade."],
            0,
            "Depois de 'eu acho que' (afirmativo), usamos o indicativo: 'é verdade'."
        ),

        quiz(
            "Escolha a frase correta na negativa.",
            [
                "Eu não acho que isso é uma boa ideia.",
                "Eu não acho que isso seja uma boa ideia.",
                "Eu não acho que isso é sido uma boa ideia.",
                "Eu não acho isso é uma boa ideia."
            ],
            1,
            "Depois de 'eu não acho que' (negativo), usamos o subjuntivo: 'seja'."
        ),

        quiz(
            "Qual palavra indica contraste direto entre dois fatos?",
            ["portanto", "porque", "por outro lado", "graças a"],
            2,
            "'Por outro lado' indica um contraste direto entre dois fatos."
        )

    ],

    summary: {

        tip:
            "Pratique dando sua opinião sobre um tema da sociedade usando 'eu acho que' (indicativo) e 'eu não acho que' (subjuntivo).",

        review: [

            "eu acho que + indicativo",

            "eu não acho que + subjuntivo",

            "por outro lado / no entanto — contraste",

            "desigualdade, marginalizado, debate, ponto de vista"

        ]

    }

};
