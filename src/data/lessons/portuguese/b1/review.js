import {
    heading,
    paragraph,
    examples,
    dialogue,
    tip,
    culture,
    list,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const b1ReviewLesson = {

    id: "portuguese-b1-review",

    language: "portuguese",

    level: "B1",

    category: "Review",

    topic: "review",

    order: 12,

    title: "Revisão B1 e Comunicação Real",

    subtitle:
        "Revise toda a gramática do módulo B1 em situações reais de comunicação, combinando mais-que-perfeito, subjuntivo, condicional e voz passiva.",

    description:
        "Uma revisão final combinando mais-que-perfeito, futuro, pronomes relativos, condicional, imperativo, pronomes oblíquos, subjuntivo, condicionais com 'se', voz passiva e discurso indireto.",

    cover: "/covers/b1-review-pt.webp",

    estimatedTime: 15,

    difficulty: 3,

    xp: 45,

    tags: [
        "review",
        "grammar",
        "vocabulary"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Revisar todos os pontos gramaticais do módulo B1",

        "Reconhecer e combinar múltiplas estruturas numa conversa real",

        "Testar-se com questões variadas de todas as lições",

        "Sentir-se pronto para se comunicar com confiança no nível B1"

    ],

    vocabulary: vocabulary([
        "ponto de virada",
        "percurso",
        "ambicioso",
        "promoção",
        "confiável",
        "dar-se bem com",
        "colega de trabalho",
        "negociar",
        "perder-se",
        "imprevisto",
        "estressado",
        "bem-estar",
        "viciado em",
        "desconectar-se",
        "na minha opinião",
        "pelo contrário",
        "sustentável",
        "reciclar",
        "envolvente",
        "adaptação",
        "manchete",
        "de repente"
    ]),

    blocks: [

        heading("Você Chegou ao Nível B1!"),

        paragraph(
            "Parabéns por terminar o módulo B1! Você aprendeu a falar sobre experiências, planos, relacionamentos, trabalho, viagens, saúde, tecnologia, opiniões, meio ambiente, mídia e notícias. Esta lição reúne todas as estruturas juntas."
        ),

        examples([
            { text: "Eu tinha decidido mudar de carreira antes mesmo de terminar a faculdade." },
            { text: "Vou me candidatar a essa vaga — talvez eu consiga uma resposta rápida." },
            { text: "É o colega cuja opinião eu mais respeito no trabalho." },
            { text: "Você poderia me dar sua opinião sobre meu projeto?" },
            { text: "Primeiro nos preparamos, depois, de repente, tudo mudou." },
            { text: "Durma bem essa noite — amanhã é um dia importante." },
            { text: "Meu colega me ajudou bastante com essa apresentação." },
            { text: "Eu não acho que essa seja a melhor solução, mas respeito seu ponto de vista." },
            { text: "Se eu conseguir essa promoção, finalmente vou sentir que valeu a pena." },
            { text: "Essa decisão foi bem recebida por toda a equipe." },
            { text: "Meu colega me disse que estava orgulhoso de mim." }
        ]),

        dialogue([
            { speaker: "Camila", text: "E aí, como está indo no novo trabalho?" },
            { speaker: "Rafael", text: "Muito bem! Eu tinha decidido mudar de área antes mesmo de terminar a faculdade, e valeu a pena." },
            { speaker: "Camila", text: "Que ótimo. Você tem aquele colega cuja opinião você sempre valoriza tanto, não tem? Como estão as coisas com ele?" },
            { speaker: "Rafael", text: "A gente se dá muito bem. Aliás, ele me disse que estava orgulhoso do meu trabalho." },
            { speaker: "Camila", text: "Isso é muito bom de ouvir. Você continua tão estressado quanto antes?" },
            { speaker: "Rafael", text: "Um pouco menos. Durma bem, coma direito — tenho seguido meus próprios conselhos, sabe?" },
            { speaker: "Camila", text: "Boa ideia. E tem planos para o futuro?" },
            { speaker: "Rafael", text: "Vou me candidatar a uma promoção ano que vem. Se der certo, eu vou ficar muito feliz." },
            { speaker: "Camila", text: "Eu acho que você tem grandes chances. Na minha opinião, você evoluiu muito." },
            { speaker: "Rafael", text: "Obrigado, isso me toca. Em retrospectiva, estou muito feliz por ter tomado essa decisão." }
        ]),

        list([

            "Mais-que-perfeito e o contraste perfeito/imperfeito",

            "Futuro do presente vs futuro próximo, e talvez + subjuntivo",

            "Pronomes relativos: que, quem, onde, cujo",

            "O condicional para pedidos educados",

            "Conectores de sequência narrativa",

            "O imperativo afirmativo e negativo",

            "Pronomes oblíquos e colocação pronominal no PT-BR",

            "Opinião: indicativo ou subjuntivo?",

            "Orações condicionais: se + futuro do subjuntivo, futuro",

            "A voz passiva com ser + particípio",

            "Discurso indireto"

        ]),

        quiz(
            "Qual frase usa o mais-que-perfeito corretamente?",
            ["Quando cheguei, ele já saiu.", "Quando cheguei, ele já tinha saído.", "Quando cheguei, ele já sai.", "Quando cheguei, ele já sairá."],
            1,
            "O mais-que-perfeito ('tinha saído') mostra uma ação anterior a outra ação passada."
        ),

        quiz(
            "Qual modo verbal segue \"talvez\"?",
            ["indicativo", "subjuntivo", "imperativo", "condicional"],
            1,
            "'Talvez' é seguido do presente do subjuntivo."
        ),

        quiz(
            "Escolha o pronome relativo certo: \"É a pessoa ___ me ajudou.\"",
            ["quem", "que", "onde", "cujo"],
            1,
            "'Que' é usado como sujeito da oração relativa."
        ),

        quiz(
            "Qual é a frase mais educada?",
            ["Manda o relatório.", "Você poderia mandar o relatório?", "Você manda o relatório?", "Mande o relatório!"],
            1,
            "O condicional ('você poderia') deixa o pedido mais educado."
        ),

        quiz(
            "Qual conector indica algo inesperado?",
            ["primeiro", "depois", "de repente", "no final"],
            2,
            "'De repente' indica um acontecimento inesperado."
        ),

        quiz(
            "Escolha a forma correta do imperativo negativo: \"Não ___ tarde.\" (dormir)",
            ["dorme", "durma", "dormiu", "dormia"],
            1,
            "O imperativo negativo usa o presente do subjuntivo: 'não durma'."
        ),

        quiz(
            "Escolha a frase mais natural no PT-BR falado.",
            ["Vejo-te amanhã.", "Te vejo amanhã.", "Amanhã vejo te.", "Eu vejo-te amanhã eu."],
            1,
            "No PT-BR falado, o pronome geralmente vem antes do verbo: 'Te vejo amanhã.'"
        ),

        quiz(
            "Escolha a frase correta na negativa.",
            ["Eu não acho que isso é bom.", "Eu não acho que isso seja bom.", "Eu não acho isso é bom.", "Eu não acho que isso é sido bom."],
            1,
            "Depois de 'eu não acho que', usamos o subjuntivo: 'seja'."
        ),

        quiz(
            "Complete: \"Se eu ___ tempo, vou te ajudar.\" (ter)",
            ["tenho", "tiver", "terei", "teria"],
            1,
            "Depois de 'se' numa condição real e futura, usamos o futuro do subjuntivo: 'tiver'."
        ),

        quiz(
            "Escolha a frase passiva correta.",
            ["Esse livro escrito por ela.", "Esse livro foi escrito por ela.", "Esse livro escreve por ela.", "Esse livro é escreve por ela."],
            1,
            "A voz passiva precisa de 'ser' + particípio: 'foi escrito'."
        ),

        quiz(
            "Discurso direto: \"Estou pronto.\" Escolha a versão no discurso indireto.",
            ["Ele disse que está pronto.", "Ele disse que estava pronto.", "Ele disse que esteve pronto.", "Ele diz que estava pronto."],
            1,
            "O presente ('estou') vira o imperfeito ('estava') no discurso indireto."
        ),

        tip(
            "Continue Praticando",
            "A melhor forma de consolidar a gramática do B1 é usá-la em conversas reais. Tente discutir um assunto que te interessa e veja quantas dessas estruturas você consegue combinar naturalmente."
        ),

        culture(
            "Chegando ao Nível B1",
            "O CEFR descreve o nível B1 como o do usuário independente: você consegue entender o essencial de uma conversa sobre temas familiares, contar experiências, expressar opiniões e justificar suas escolhas. É um marco importante na sua jornada de aprendizado."
        )

    ],

    summary: {

        tip:
            "Muito bem! Revise os pontos de gramática que achou mais difíceis, e continue praticando com conversas reais.",

        review: [

            "Você terminou 11 lições do módulo B1.",

            "Você consegue falar sobre experiências, planos e opiniões com mais precisão.",

            "Você combinou mais-que-perfeito, subjuntivo, condicional, voz passiva e discurso indireto.",

            "Você está pronto para continuar evoluindo rumo ao B2!"

        ]

    }

};
