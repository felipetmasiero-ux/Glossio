import { environmentBlocks } from "../../../grammar/shared/portuguese/b2/environment";
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

export const environmentB2Lesson = {

    id: "portuguese-b2-environment",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "environment",

    order: 6,

    title: "Meio Ambiente, Clima e Futuro",

    subtitle:
        "Explique causas e consequências das mudanças climáticas usando conectores como 'já que', 'visto que' e 'de modo que'.",

    description:
        "Discuta sustentabilidade, mudanças climáticas e escolhas individuais, aprendendo conectores de causa e consequência para argumentar com precisão.",

    cover: "/covers/environment-b2-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

    tags: [
        "environment",
        "grammar",
        "sustentabilidade"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Explicar causas e consequências de problemas ambientais",

        "Propor soluções para questões climáticas",

        "Usar conectores de causa e consequência com precisão",

        "Defender ou questionar ideias sobre sustentabilidade"

    ],

    vocabulary: vocabulary([
        "crise climática",
        "rastro ecológico",
        "fonte limpa de energia",
        "consumo consciente",
        "escassez de recursos",
        "evento climático extremo",
        "poluição atmosférica",
        "biodiversidade",
        "devastação florestal",
        "sustentabilidade",
        "impacto ambiental",
        "política ambiental",
        "medida urgente",
        "geração futura",
        "compensar as emissões",
        "consumo desenfreado",
        "irreversível",
        "conscientização",
        "transição energética",
        "escolha individual"
    ]),

    blocks: [

        heading("Causas e Consequências da Crise Climática"),

        paragraph(
            "Discutir meio ambiente exige explicar bem as relações de causa e efeito. Além de 'porque', o português tem conectores mais precisos para isso: 'já que', 'visto que' para causas, e 'por isso', 'de modo que' para consequências."
        ),

        examples([
            { text: "Já que o consumo desenfreado aumentou, a devastação florestal também cresceu." },
            { text: "As temperaturas estão subindo, de modo que eventos climáticos extremos ficam mais frequentes." },
            { text: "Visto que poucas pessoas praticam consumo consciente, o governo criou novas campanhas." },
            { text: "A poluição atmosférica continua, portanto a qualidade do ar piorou nas grandes cidades." },
            { text: "A escassez de recursos é real, de forma que a transição energética se tornou urgente." },
            { text: "Já que o dano é praticamente irreversível, medidas urgentes são necessárias agora." },
            { text: "Precisamos pensar nas gerações futuras, por isso cada escolha individual importa." }
        ]),

        dialogue([
            { speaker: "Simone", text: "Você acha que ainda dá tempo de evitar os piores efeitos da crise climática?" },
            { speaker: "Eduardo", text: "Difícil dizer. Visto que as emissões continuam altas, alguns efeitos já são praticamente irreversíveis." },
            { speaker: "Simone", text: "É verdade. Já que a devastação florestal não para, a biodiversidade sofre cada vez mais." },
            { speaker: "Eduardo", text: "Por isso acho que a transição energética para fontes limpas precisa ser uma medida urgente, não uma opção." },
            { speaker: "Simone", text: "Concordo. E o que você acha da escolha individual? Ela realmente importa?" },
            { speaker: "Eduardo", text: "Importa, mas sozinha não é suficiente. Já que o consumo desenfreado é estrutural, é preciso também de política ambiental forte." },
            { speaker: "Simone", text: "Verdade. De modo que cada pessoa faça sua parte, mas o governo e as empresas também precisam agir." },
            { speaker: "Eduardo", text: "Exatamente. A conscientização ajuda, mas não substitui ação concreta." }
        ]),

        grammar(environmentBlocks[0].title, environmentBlocks[0].text),

        list([

            "'já que' / 'visto que' / 'uma vez que' — causa conhecida",

            "'por isso' / 'portanto' — consequência",

            "'de modo que' / 'de forma que' — liga causa e efeito na mesma frase",

            "crise climática, sustentabilidade, transição energética, irreversível"

        ]),

        tip(
            "Onde Colocar o Conector",
            "'Já que' e 'visto que' costumam vir no início da frase, apresentando um fato já aceito. 'De modo que' e 'de forma que' ficam no meio, ligando a causa ao efeito dentro da mesma oração."
        ),

        culture(
            "O Brasil e a Amazônia",
            "O Brasil abriga a maior parte da floresta amazônica, um dos temas ambientais mais discutidos internacionalmente — a devastação florestal na Amazônia tem impacto direto na biodiversidade global e no clima do planeta, tornando o país central em qualquer debate sobre sustentabilidade."
        ),

        quiz(
            "Qual conector apresenta uma causa já conhecida no início da frase?",
            ["por isso", "de modo que", "já que", "portanto"],
            2,
            "'Já que' apresenta uma causa já conhecida, geralmente no início da frase."
        ),

        quiz(
            "Complete: \"As temperaturas estão subindo, ___ os invernos ficam mais curtos.\"",
            ["visto que", "já que", "de modo que", "apesar de"],
            2,
            "'De modo que' liga a causa (temperaturas subindo) à sua consequência (invernos mais curtos) na mesma frase."
        ),

        quiz(
            "O que significa 'rastro ecológico'?",
            ["um caminho na floresta", "o impacto ambiental causado pelo consumo de uma pessoa", "um tipo de energia limpa", "uma espécie de animal"],
            1,
            "'Rastro ecológico' (ou pegada ecológica) mede o impacto ambiental causado pelo consumo e estilo de vida de uma pessoa."
        )

    ],

    summary: {

        tip:
            "Pratique explicando um problema ambiental usando 'já que... por isso...' ou 'visto que... de modo que...'.",

        review: [

            "conectores de causa: já que, visto que, uma vez que",

            "conectores de consequência: por isso, portanto, de modo que",

            "crise climática, sustentabilidade, transição energética, irreversível"

        ]

    }

};
