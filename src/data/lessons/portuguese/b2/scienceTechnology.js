import { scienceTechnologyBlocks } from "../../../grammar/shared/portuguese/b2/scienceTechnology";
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

export const scienceTechnologyLesson = {

    id: "portuguese-b2-science-technology",

    language: "portuguese",

    level: "B2",

    category: "Grammar",

    topic: "science-technology",

    order: 5,

    title: "Ciência, Tecnologia e Inovação",

    subtitle:
        "Explore cenários hipotéticos sobre ciência e tecnologia usando o período hipotético irreal.",

    description:
        "Discuta descobertas científicas, inteligência artificial e questões éticas, aprendendo a estrutura 'se + imperfeito do subjuntivo, futuro do pretérito' para hipóteses imaginárias.",

    cover: "/covers/science-technology-pt.webp",

    estimatedTime: 14,

    difficulty: 4,

    xp: 45,

    tags: [
        "science-technology",
        "grammar",
        "hipóteses"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discutir possibilidades e previsões sobre ciência e tecnologia",

        "Explorar cenários hipotéticos e imaginários",

        "Usar o período hipotético irreal (se + imperfeito do subjuntivo, futuro do pretérito)",

        "Debater questões éticas relacionadas à inovação"

    ],

    vocabulary: vocabulary([
        "descoberta científica",
        "avançar rapidamente",
        "aprendizado de máquina",
        "algoritmo",
        "automatizar",
        "impacto ético",
        "inovador",
        "obsoleto",
        "revolucionar",
        "avanço tecnológico",
        "substituir o ser humano",
        "transformação digital",
        "pesquisa de ponta",
        "vazamento de dados",
        "regulamentação",
        "algo imprevisível",
        "capacidade de processamento",
        "ceticismo",
        "prós e contras",
        "dilema ético"
    ]),

    blocks: [

        heading("Imaginando o Futuro da Tecnologia"),

        paragraph(
            "Discutir ciência e tecnologia envolve muita especulação: e se essa tecnologia existisse hoje? E se ela substituísse todos os empregos? Para explorar esses cenários improváveis, usamos o período hipotético irreal."
        ),

        examples([
            { text: "Se a inteligência artificial substituísse todos os empregos, o que faríamos?" },
            { text: "Se eu tivesse mais tempo, eu pesquisaria esse assunto a fundo." },
            { text: "Se essa descoberta científica fosse confirmada, revolucionaria a medicina." },
            { text: "Se os algoritmos não tivessem viés, as decisões automatizadas seriam mais justas." },
            { text: "Se um vazamento de dados desse tipo acontecesse aqui, seria um escândalo." },
            { text: "Com mais regulamentação, o avanço tecnológico causaria menos impacto ético negativo." },
            { text: "Se essa tecnologia se tornasse obsoleta amanhã, quantos empregos desapareceriam?" }
        ]),

        dialogue([
            { speaker: "Aline", text: "Você acha que o aprendizado de máquina vai substituir muitos empregos?" },
            { speaker: "Rodrigo", text: "Com certeza vai automatizar bastante coisa. Se isso acontecesse rápido demais, causaria um grande impacto social." },
            { speaker: "Aline", text: "Verdade. Se eu tivesse que escolher, eu investiria em regulamentação antes de investir só em inovação." },
            { speaker: "Rodrigo", text: "Concordo. Há um dilema ético real: se a tecnologia avançasse sem nenhum limite, quem ficaria responsável pelos erros?" },
            { speaker: "Aline", text: "Exatamente. E o ceticismo das pessoas não é sem motivo, depois de tantos vazamentos de dados." },
              { speaker: "Rodrigo", text: "Verdade. Mas também há prós e contras: se não houvesse inovação nenhuma, muitas descobertas científicas nunca aconteceriam." },
            { speaker: "Aline", text: "É por isso que acho essa pesquisa de ponta tão fascinante — ela é imprevisível." },
            { speaker: "Rodrigo", text: "Se essa capacidade de processamento continuasse crescendo assim, o que ainda seria considerado impossível?" }
        ]),

        grammar(scienceTechnologyBlocks[0].title, scienceTechnologyBlocks[0].text),

        list([

            "se + imperfeito do subjuntivo, futuro do pretérito — hipótese irreal no presente",

            "'se a IA substituísse todos os empregos, o que faríamos?'",

            "aprendizado de máquina, algoritmo, automatizar, revolucionar",

            "impacto ético, dilema ético, regulamentação, vazamento de dados"

        ]),

        tip(
            "Real ou Imaginário?",
            "'Se a tecnologia avançar, vamos nos adaptar' descreve algo provável e real. 'Se a tecnologia avançasse instantaneamente, o mundo mudaria da noite para o dia' descreve um cenário puramente imaginário. Escolha a estrutura certa dependendo da probabilidade."
        ),

        culture(
            "O Brasil na Corrida Tecnológica",
            "O Brasil tem um ecossistema de startups cada vez mais forte, especialmente em São Paulo, e discute ativamente regulamentação de inteligência artificial e proteção de dados através da LGPD (Lei Geral de Proteção de Dados), inspirada na legislação europeia."
        ),

        quiz(
            "Complete: \"Se a IA ___ todos os empregos, o que faríamos?\" (substituir)",
            ["substitui", "substituir", "substituísse", "substituiria"],
            2,
            "No período hipotético irreal, usamos o imperfeito do subjuntivo ('substituísse') na oração com 'se'."
        ),

        quiz(
            "Qual frase descreve um cenário real e provável?",
            ["Se a tecnologia avançasse instantaneamente, tudo mudaria.", "Se a tecnologia avançar, vamos nos adaptar.", "Se a tecnologia tivesse avançado, teríamos nos adaptado.", "Se a tecnologia avançasse, mudaria tudo."],
            1,
            "'Se a tecnologia avançar, vamos nos adaptar' usa o futuro do subjuntivo, indicando uma condição real e provável."
        ),

        quiz(
            "O que significa algo 'obsoleto'?",
            ["muito moderno", "ultrapassado, fora de uso", "muito caro", "muito popular"],
            1,
            "'Obsoleto' descreve algo ultrapassado, que já saiu de uso por causa de algo mais novo."
        )

    ],

    summary: {

        tip:
            "Pratique imaginando um cenário tecnológico improvável usando 'se + imperfeito do subjuntivo, futuro do pretérito'.",

        review: [

            "período hipotético irreal: se + imperfeito do subjuntivo, futuro do pretérito",

            "aprendizado de máquina, automatizar, revolucionar, obsoleto",

            "impacto ético, dilema ético, regulamentação"

        ]

    }

};
