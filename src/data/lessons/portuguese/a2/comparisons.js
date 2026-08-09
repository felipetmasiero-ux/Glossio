import {
    heading,
    paragraph,
    examples,
    dialogue,
    grammar,
    list,
    tip,
    culture,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const comparisonsLesson = {

    id: "portuguese-a2-comparisons",

    language: "portuguese",

    level: "A2",

    category: "Daily Life",

    topic: "shopping",

    order: 2,

    title: "Comparando Compras",

    subtitle:
        "Compare preços, tamanhos e qualidade entre produtos.",

    description:
        "Aprenda a comparar coisas em português usando 'mais...que', 'menos...que', 'tão...quanto' e os comparativos irregulares 'melhor', 'pior', 'maior' e 'menor'.",

    cover: "/covers/comparisons-a2.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "shopping",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Comparar produtos usando 'mais...que' e 'menos...que'",

        "Usar 'tão...quanto' para dizer que duas coisas são iguais",

        "Usar os comparativos irregulares 'melhor', 'pior', 'maior', 'menor'",

        "Falar sobre preço, tamanho e qualidade"

    ],

    vocabulary: vocabulary([
        "melhor",
        "pior",
        "maior",
        "menor",
        "mais barato que",
        "mais caro que",
        "tão bom quanto",
        "qualidade",
        "tamanho",
        "trocar"
    ]),

    blocks: [

        heading("Qual é Melhor?"),

        paragraph(
            "No A1, você aprendeu palavras como 'caro' e 'barato'. Agora vamos comparar duas coisas diretamente - útil na hora de escolher entre dois produtos em uma loja."
        ),

        examples([
            {
                text: "Esta loja é maior do que aquela, mas os produtos são mais caros."
            },

            {
                text: "O tênis azul é tão bom quanto o vermelho, mas é mais barato."
            },

            {
                text: "A qualidade desta camisa é melhor, mesmo sendo mais barata que a outra."
            }
        ]),

        dialogue([
            { speaker: "Anna", text: "Este casaco é mais caro que aquele, mas a qualidade parece melhor." },
            { speaker: "Marco", text: "Concordo. E o tamanho? Este é maior ou menor que o seu número normal?" },
            { speaker: "Anna", text: "Acho que é menor. Vou experimentar o próximo tamanho." },
            { speaker: "Marco", text: "Boa ideia. Se não servir, dá para trocar depois." }
        ]),

        grammar(
            "Comparativos",
            "Para comparar, use 'mais + adjetivo + que' (superioridade), 'menos + adjetivo + que' (inferioridade) ou 'tão + adjetivo + quanto' (igualdade): 'mais caro que', 'menos caro que', 'tão caro quanto'. Alguns adjetivos têm forma irregular e não usam 'mais': 'bom' → melhor (não 'mais bom'), 'ruim' → pior, 'grande' → maior, 'pequeno' → menor."
        ),

        list([

            "mais + adjetivo + que → mais caro que",

            "menos + adjetivo + que → menos caro que",

            "tão + adjetivo + quanto → tão caro quanto",

            "bom → melhor · ruim → pior · grande → maior · pequeno → menor"

        ]),

        tip(
            "Evite 'Mais Bom'",
            "Um erro comum é dizer 'mais bom' ou 'mais grande'. Esses adjetivos têm formas próprias: use sempre 'melhor' e 'maior'."
        ),

        culture(
            "Negociando o Preço",
            "Em lojas e shoppings no Brasil, o preço costuma ser fixo. Mas em feiras livres e mercados de rua, é comum e aceitável perguntar 'Tem desconto?' antes de fechar a compra."
        ),

        quiz(
            "Como se diz que algo é 'better' em português?",
            ["mais bom", "melhor", "mais boa", "bomer"],
            1,
            "'Bom' tem uma forma irregular no comparativo: 'melhor', não 'mais bom'."
        ),

        quiz(
            "Qual frase usa 'tão...quanto' corretamente?",
            ["Este é tão caro que aquele.", "Este é tão caro quanto aquele.", "Este é tão caro de aquele.", "Este é tão caro como quanto aquele."],
            1,
            "A estrutura de igualdade é 'tão + adjetivo + quanto'."
        ),

        quiz(
            "No diálogo, o que Anna decide fazer sobre o tamanho?",
            ["Comprar do jeito que está", "Experimentar o próximo tamanho", "Pedir para trocar depois de comprar", "Não comprar o casaco"],
            1,
            "Anna disse: 'Vou experimentar o próximo tamanho.'"
        )

    ],

    summary: {

        tip:
            "Compare três objetos que você tem em casa em voz alta, usando 'mais...que', 'tão...quanto' e um comparativo irregular.",

        review: [

            "mais...que · menos...que · tão...quanto",

            "bom → melhor · ruim → pior",

            "grande → maior · pequeno → menor",

            "qualidade, tamanho, trocar"

        ]

    }

};
