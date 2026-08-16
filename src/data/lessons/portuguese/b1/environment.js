import { environmentBlocks } from "../../../grammar/shared/portuguese/b1/environment";
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

export const environmentLesson = {

    id: "portuguese-b1-environment",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "environment",

    order: 9,

    title: "Meio Ambiente e Escolhas do Cotidiano",

    subtitle:
        "Fale sobre meio ambiente e escolhas do dia a dia usando orações condicionais com 'se' + futuro do subjuntivo.",

    description:
        "Aprenda vocabulário sobre meio ambiente e sustentabilidade, e como usar orações condicionais reais para falar de causas e consequências futuras.",

    cover: "/covers/environment-pt.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "environment",
        "condicional",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir questões ambientais e escolhas sustentáveis",

        "Usar 'se' + futuro do subjuntivo para uma condição real e futura",

        "Usar o futuro do presente no resultado da condição",

        "Discutir causas e consequências relacionadas ao meio ambiente"

    ],

    vocabulary: vocabulary([
        "mudança climática",
        "aquecimento global",
        "poluição",
        "reciclar",
        "reduzir o desperdício",
        "energia renovável",
        "pegada de carbono",
        "sustentável",
        "ecológico",
        "plástico de uso único",
        "espécie em extinção",
        "desmatamento",
        "gás de efeito estufa",
        "reutilizável",
        "apagar as luzes",
        "economizar energia",
        "transporte público",
        "tomar banhos mais curtos",
        "meio ambiente",
        "recursos naturais"
    ]),

    blocks: [

        heading("Causas e Consequências Reais"),

        paragraph(
            "As orações condicionais com 'se' conectam uma condição futura real ao seu resultado provável. É a estrutura natural para falar das consequências das nossas escolhas do dia a dia."
        ),

        examples([
            { text: "Se reduzirmos o consumo de plástico, vamos proteger os oceanos." },
            { text: "Se mais gente usar transporte público, vai ter menos poluição na cidade." },
            { text: "Se a gente não agir agora, a mudança climática vai piorar." },
            { text: "Se cada um economizar um pouco de energia, isso vai fazer uma diferença real." },
            { text: "Vamos reciclar mais se a prefeitura instalar mais lixeiras de separação." },
            { text: "Se as empresas forem mais responsáveis, o meio ambiente vai se beneficiar." },
            { text: "Se você puder, tome banhos mais curtos — ajuda bastante." }
        ]),

        dialogue([
            { speaker: "Priscila", text: "Você tem pensado em reduzir seu lixo ultimamente?" },
            { speaker: "André", text: "Um pouco. Se eu comprar menos plástico de uso único, já vai ser um bom começo." },
            { speaker: "Priscila", text: "Com certeza! E se a gente usar mais transporte público, também vai reduzir nossa pegada de carbono." },
            { speaker: "André", text: "É verdade, mas nem sempre é prático. Se o transporte for mais frequente no meu bairro, eu vou usar mais." },
            { speaker: "Priscila", text: "Isso é compreensível. Se cada um fizer pequenos esforços, vai fazer uma diferença real a longo prazo." },
            { speaker: "André", text: "Concordo. Se eu começar agora, vou conseguir mudar bastante hábito esse ano." },
            { speaker: "Priscila", text: "Boa ideia! E se a gente reciclar mais, também vai desperdiçar bem menos recursos." },
            { speaker: "André", text: "Você tem razão. Vou tentar fazer escolhas mais sustentáveis a partir de hoje." }
        ]),

        grammar(environmentBlocks[0].title, environmentBlocks[0].text),

        list([

            "se + futuro do subjuntivo, ... futuro do presente",

            "verbo depois de 'se' vai para o futuro do subjuntivo",

            "sustentável, ecológico, energia renovável",

            "pegada de carbono, desperdício, reciclar"

        ]),

        tip(
            "O Verbo Depois de 'Se' Muda de Forma",
            "Depois de 'se' falando de uma condição real no futuro, muitos verbos regulares mudam de forma: não é 'se eu reduzo', mas 'se eu reduzir' (futuro do subjuntivo). Para os verbos regulares, essa forma é igual ao infinitivo — mas fique atento aos irregulares, como 'ser' → 'se você for', 'ter' → 'se você tiver'."
        ),

        culture(
            "Sustentabilidade no Dia a Dia",
            "No Brasil, atitudes como separar o lixo reciclável, usar sacolas reutilizáveis e reduzir o desperdício de comida têm se tornado hábitos cada vez mais comuns, incentivados também por campanhas de prefeituras e supermercados."
        ),

        quiz(
            "Escolha a frase correta.",
            [
                "Se eu reduzo o consumo, vou ajudar o planeta.",
                "Se eu reduzir o consumo, vou ajudar o planeta.",
                "Se eu reduzirei o consumo, vou ajudar o planeta.",
                "Se eu reduziria o consumo, vou ajudar o planeta."
            ],
            1,
            "Depois de 'se' numa condição real e futura, usamos o futuro do subjuntivo: 'se eu reduzir'."
        ),

        quiz(
            "Qual forma verbal geralmente segue \"se\" numa condição real e futura?",
            ["presente do indicativo comum", "futuro do subjuntivo", "futuro do presente", "condicional"],
            1,
            "Depois de 'se' nessa estrutura, usamos o futuro do subjuntivo."
        ),

        quiz(
            "Complete: \"Se mais gente ___ transporte público, vai ter menos poluição.\"",
            ["usa", "usar", "usará", "usaria"],
            1,
            "'Usar' (futuro do subjuntivo) é a forma correta depois de 'se' nessa condição futura."
        )

    ],

    summary: {

        tip:
            "Pratique fazendo frases condicionais sobre suas próprias escolhas do cotidiano — reciclagem, energia, transporte — e suas consequências reais.",

        review: [

            "se + futuro do subjuntivo, ... futuro do presente",

            "sustentável, ecológico, energia renovável",

            "reciclar, reduzir o desperdício, pegada de carbono",

            "meio ambiente, recursos naturais"

        ]

    }

};
