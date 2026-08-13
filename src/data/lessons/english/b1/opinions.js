import { opinionsBlocks } from "../../../grammar/shared/english/b1/opinions";
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

    id: "english-b1-opinions",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "opinions",

    order: 8,

    title: "Opinions, Arguments & Society",

    subtitle:
        "Expresse opiniões e argumente em inglês de forma organizada usando linking words como 'however', 'because' e 'therefore'.",

    description:
        "Aprenda a dar e defender opiniões sobre temas da sociedade usando linking words para dar razões, contrastar ideias e concluir um argumento.",

    cover: "/covers/opinions.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 40,

    tags: [
        "opinions",
        "linking-words",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Express and justify an opinion in English",

        "Agree and disagree politely",

        "Use linking words to give reasons and show contrast",

        "Structure an argument with a clear conclusion"

    ],

    vocabulary: vocabulary([
        "in my opinion",
        "from my point of view",
        "agree",
        "disagree",
        "point of view",
        "debate",
        "controversial",
        "in favor of",
        "convince",
        "persuade",
        "viewpoint",
        "perspective",
        "valid point",
        "strongly believe",
        "on the contrary",
        "first of all",
        "in conclusion",
        "to sum up"
    ]),

    blocks: [

        heading("Structuring an Opinion"),

        paragraph(
            "A well-organized opinion usually follows a pattern: state the opinion, give a reason, acknowledge a different view, and close with a conclusion. Linking words hold that structure together."
        ),

        examples([
            {
                text: "In my opinion, social media has more disadvantages than advantages.",
                translation: "Na minha opinião, as redes sociais têm mais desvantagens do que vantagens."
            },
            {
                text: "I strongly believe that everyone should limit their screen time, because it affects our mental health.",
                translation: "Acredito firmemente que todos deveriam limitar o tempo de tela, porque isso afeta nossa saúde mental."
            },
            {
                text: "Some people enjoy debating online; however, these discussions often turn into arguments.",
                translation: "Algumas pessoas gostam de debater online; porém, essas discussões frequentemente se tornam brigas."
            },
            {
                text: "It's convenient to stay connected; on the other hand, it can be overwhelming.",
                translation: "É conveniente ficar conectado; por outro lado, pode ser exaustivo."
            },
            {
                text: "As a result, many people feel more anxious after using social media.",
                translation: "Como resultado, muitas pessoas se sentem mais ansiosas depois de usar redes sociais."
            },
            {
                text: "To sum up, I think we need a healthier relationship with technology.",
                translation: "Resumindo, acho que precisamos de uma relação mais saudável com a tecnologia."
            }
        ]),

        dialogue([
            { speaker: "Julia", text: "In my opinion, remote work is much better for productivity." },
            { speaker: "Marcus", text: "I see your point, but I disagree. Working from an office keeps people focused." },
            { speaker: "Julia", text: "I don't think so, because you avoid all the distractions of an office — meetings, noise, colleagues chatting." },
            { speaker: "Marcus", text: "That's a fair point. However, remote work can be isolating for some people." },
            { speaker: "Julia", text: "True, but you could argue that's a personal preference, not a rule." },
            { speaker: "Marcus", text: "Fair enough. On the other hand, teamwork is easier in person." },
            { speaker: "Julia", text: "I understand your perspective. To sum up, I guess it really depends on the type of job." },
            { speaker: "Marcus", text: "Exactly. There's no single right answer." }
        ]),

        grammar(opinionsBlocks[0].title, opinionsBlocks[0].text),

        list([

            "because / since — reason",

            "however / on the other hand — contrast",

            "moreover / in addition — adding a point",

            "therefore / as a result — consequence",

            "in conclusion / to sum up — closing"

        ]),

        tip(
            "Don't Overuse 'But'",
            "In a structured opinion, try starting a new sentence with 'however' instead of always using 'but': 'I like the idea. However, I have some concerns.' It sounds more organized, especially in writing or a formal discussion."
        ),

        culture(
            "Structured Debate in English",
            "In English-speaking academic and professional contexts, presenting an opinion with clear structure — reason, contrast, conclusion — is highly valued, even in casual conversation, not just in formal writing."
        ),

        quiz(
            "Choose the word that shows contrast.",
            ["because", "however", "therefore", "in addition"],
            1,
            "'However' introduces a contrasting idea."
        ),

        quiz(
            "Choose the word that shows a reason.",
            ["moreover", "since", "as a result", "to sum up"],
            1,
            "'Since' (like 'because') introduces a reason."
        ),

        quiz(
            "Which sentence correctly closes an argument?",
            [
                "Because I think so.",
                "However, I agree.",
                "To sum up, I believe technology has more benefits than drawbacks.",
                "In addition, it is expensive."
            ],
            2,
            "'To sum up' is used to close and summarize an argument."
        )

    ],

    summary: {

        tip:
            "Practice giving your own opinion on a topic using the full structure: opinion, reason, contrast, conclusion.",

        review: [

            "because/since — reason",

            "however/on the other hand — contrast",

            "therefore/as a result — consequence",

            "in conclusion/to sum up — closing"

        ]

    }

};
