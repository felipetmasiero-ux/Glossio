import { mediaBlocks } from "../../../grammar/shared/portuguese/b1/media";
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

export const mediaLesson = {

    id: "portuguese-b1-media",

    language: "portuguese",

    level: "B1",

    category: "Grammar",

    topic: "media",

    order: 10,

    title: "Mídia, Cultura e Entretenimento",

    subtitle:
        "Descreva e avalie filmes, livros e séries usando a voz passiva.",

    description:
        "Aprenda vocabulário de cinema, livros e séries, e como usar a voz passiva para descrever e avaliar produtos culturais.",

    cover: "/covers/media-pt.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "media",
        "voz-passiva",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Falar sobre filmes, livros, música e séries",

        "Dar e entender opiniões sobre obras culturais",

        "Usar a voz passiva para descrever produtos culturais",

        "Saber quando incluir ou omitir 'por + pessoa'"

    ],

    vocabulary: vocabulary([
        "crítica",
        "enredo",
        "personagem",
        "trilha sonora",
        "sucesso de bilheteria",
        "best-seller",
        "legendas",
        "plataforma de streaming",
        "aclamado pela crítica",
        "supervalorizado",
        "subestimado",
        "envolvente",
        "que faz pensar",
        "adaptação",
        "lançamento",
        "elenco",
        "vale a pena assistir",
        "diretor",
        "filmar",
        "avaliação"
    ]),

    blocks: [

        heading("Descrevendo Filmes, Livros e Séries"),

        paragraph(
            "A voz passiva está em toda parte nas críticas e descrições de filmes, livros e séries, porque geralmente nos importamos mais com a obra em si do que com quem a criou."
        ),

        examples([
            { text: "Esse filme foi dirigido por uma jovem cineasta talentosa." },
            { text: "Esse livro foi traduzido para mais de vinte idiomas." },
            { text: "A trilha sonora foi composta especialmente para o filme." },
            { text: "Essa série é assistida por milhões de pessoas toda semana." },
            { text: "O final foi criticado por muitos fãs." },
            { text: "Uma continuação está sendo preparada para o ano que vem." },
            { text: "Esse romance foi adaptado para o cinema há alguns anos." }
        ]),

        dialogue([
            { speaker: "Luana", text: "Você viu aquela série nova que todo mundo está comentando?" },
            { speaker: "Bernardo", text: "Vi sim! Ela é baseada num best-seller, sabia? O livro foi escrito há vários anos." },
            { speaker: "Luana", text: "Sério, eu não sabia disso. É boa?" },
            { speaker: "Bernardo", text: "É excelente. O enredo é bem envolvente, e a trilha sonora foi composta por um compositor famoso." },
            { speaker: "Luana", text: "Ouvi dizer que o final é meio controverso." },
            { speaker: "Bernardo", text: "É verdade — foi criticado por alguns fãs, mas eu adorei." },
            { speaker: "Luana", text: "Talvez eu assista esse fim de semana, então. Está disponível em todas as plataformas?" },
            { speaker: "Bernardo", text: "Acho que só está sendo exibida numa plataforma por enquanto, mas uma segunda temporada já está sendo preparada." }
        ]),

        grammar(mediaBlocks[0].title, mediaBlocks[0].text),

        list([

            "sujeito + ser + particípio — voz passiva",

            "+ por + pessoa (só quando útil)",

            "muito comum em críticas e descrições",

            "envolvente, aclamado pela crítica, supervalorizado"

        ]),

        tip(
            "Só Acrescente 'Por' Quando Útil",
            "Só acrescente 'por...' quando for realmente útil: 'Esse filme foi lançado em 2023' é mais natural do que sempre especificar quem lançou. Use 'por' apenas quando essa informação for relevante."
        ),

        culture(
            "Críticas e Avaliações",
            "Na cultura de mídia brasileira, tanto os críticos profissionais quanto o público em geral compartilham avaliações detalhadas online, e expressões como 'aclamado pela crítica' ou 'supervalorizado' aparecem com frequência nessas discussões."
        ),

        quiz(
            "Escolha a frase passiva correta.",
            [
                "Esse filme dirigido por uma jovem cineasta.",
                "Esse filme foi dirigido por uma jovem cineasta.",
                "Esse filme é dirige por uma jovem cineasta.",
                "Esse filme dirige por uma jovem cineasta."
            ],
            1,
            "A voz passiva precisa de 'ser' + particípio: 'foi dirigido'."
        ),

        quiz(
            "Escolha a frase correta.",
            ["Esse livro foi escreve há anos.", "Esse livro foi escrito há anos.", "Esse livro escrito há anos.", "Esse livro é escrito foi há anos."],
            1,
            "'Escrito' é o particípio de 'escrever', usado depois de 'foi'."
        ),

        quiz(
            "Quando acrescentamos \"por + pessoa\" numa frase passiva?",
            ["Sempre", "Nunca", "Só quando é uma informação útil", "Só em perguntas"],
            2,
            "'Por + pessoa' só é acrescentado quando essa informação é útil ou relevante."
        )

    ],

    summary: {

        tip:
            "Pratique descrevendo um filme ou livro que você gosta usando a voz passiva para falar de como ele foi feito.",

        review: [

            "sujeito + ser + particípio",

            "por + pessoa — só quando útil",

            "envolvente, aclamado pela crítica, supervalorizado",

            "enredo, elenco, trilha sonora, adaptação"

        ]

    }

};
