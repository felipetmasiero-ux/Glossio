import { scienceTechnologyBlocks } from "../../../grammar/shared/english/b2/scienceTechnology";
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

    id: "english-b2-science-technology",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "science-technology",

    order: 5,

    title: "Science, Technology & Innovation",

    subtitle:
        "Explore possibilidades e cenários hipotéticos em inglês sobre ciência e tecnologia usando o second conditional.",

    description:
        "Aprenda vocabulário sobre inovação e tecnologia, e como usar o second conditional para fazer previsões e discutir cenários hipotéticos.",

    cover: "/covers/science-technology.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "technology",
        "conditionals",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss scientific discoveries and technological innovation",

        "Use the second conditional for hypothetical situations",

        "Use 'were' for all subjects in formal hypothetical speech",

        "Distinguish the second conditional from the first conditional"

    ],

    vocabulary: vocabulary([
        "groundbreaking",
        "cutting-edge",
        "algorithm",
        "automate",
        "automation",
        "disrupt",
        "disruptive",
        "discovery",
        "experiment",
        "trial and error",
        "hypothesis",
        "viable",
        "feasible",
        "drawback",
        "side effect",
        "glitch",
        "malfunction",
        "state-of-the-art",
        "revolutionize"
    ]),

    blocks: [

        heading("Exploring Hypothetical Scenarios"),

        paragraph(
            "Discussions about science and technology are full of hypothetical scenarios — what could happen, what would change. The second conditional is the natural structure for exploring these unreal or unlikely possibilities."
        ),

        examples([
            {
                text: "If scientists found a cure tomorrow, it would change millions of lives.",
                translation: "Se os cientistas encontrassem uma cura amanhã, isso mudaria milhões de vidas."
            },
            {
                text: "If I were a researcher, I'd focus on renewable energy.",
                translation: "Se eu fosse pesquisador, eu focaria em energia renovável."
            },
            {
                text: "We wouldn't rely so much on automation if it didn't save so much time.",
                translation: "Não dependeríamos tanto da automação se ela não economizasse tanto tempo."
            },
            {
                text: "If this technology were more affordable, more people would use it.",
                translation: "Se essa tecnologia fosse mais acessível, mais gente a usaria."
            },
            {
                text: "What would happen if artificial intelligence made most jobs obsolete?",
                translation: "O que aconteceria se a inteligência artificial tornasse a maioria dos empregos obsoletos?"
            },
            {
                text: "If I had more time, I'd experiment with that idea myself.",
                translation: "Se eu tivesse mais tempo, eu mesmo experimentaria essa ideia."
            }
        ]),

        dialogue([
            { speaker: "Sana", text: "Have you seen this new AI tool everyone's talking about?" },
            { speaker: "Felix", text: "Yeah, it's impressive. Honestly, if it became widespread, it would change how we work completely." },
            { speaker: "Sana", text: "Do you think it's a good thing overall?" },
            { speaker: "Felix", text: "I'm not sure. If I were in charge of regulating it, I'd move a lot more cautiously." },
            { speaker: "Sana", text: "That's fair. What would you do differently?" },
            { speaker: "Felix", text: "Well, if companies were more transparent about how these algorithms work, people would trust them more." },
            { speaker: "Sana", text: "True. If I had to guess, I'd say most people don't even understand how it makes decisions." },
            { speaker: "Felix", text: "Exactly. If we didn't ask these questions now, we'd probably regret it later." },
            { speaker: "Sana", text: "Agreed. Innovation is exciting, but it wouldn't hurt to be a little more careful." }
        ]),

        grammar(scienceTechnologyBlocks[0].title, scienceTechnologyBlocks[0].text),

        list([

            "if + past simple, ... would + verb",

            "were instead of was, for all subjects (formal)",

            "unreal or unlikely present/future situations",

            "groundbreaking, cutting-edge, automation, feasible"

        ]),

        tip(
            "Unreal or Unlikely, Not Impossible",
            "The second conditional describes something unreal or unlikely, not necessarily impossible. 'If I won the lottery' (unlikely, but possible) still uses the second conditional, just like a truly impossible situation ('If I were a bird'). Don't confuse it with the first conditional, which is for realistic, likely situations."
        ),

        culture(
            "Tech Optimism and Skepticism",
            "In English-language tech discussions, phrases like 'if this technology were more regulated' or 'what would happen if...' are common ways to hold a balanced, hypothetical discussion about innovation's risks and benefits without sounding alarmist or naive."
        ),

        quiz(
            "Choose the correct second conditional sentence.",
            [
                "If I will have more time, I would experiment.",
                "If I had more time, I would experiment.",
                "If I have more time, I would experiment.",
                "If I would have more time, I experiment."
            ],
            1,
            "The second conditional uses if + past simple, ... would + verb."
        ),

        quiz(
            "Choose the more formal option: \"If I ___ you, I would take that job.\"",
            ["was", "were", "am", "will be"],
            1,
            "'Were' is used for all subjects in formal or careful second conditional speech."
        ),

        quiz(
            "Which situation is a second conditional, not a first conditional?",
            [
                "If it rains tomorrow, we'll stay home.",
                "If I were rich, I'd travel the world.",
                "If she studies, she'll pass.",
                "If we leave now, we'll arrive on time."
            ],
            1,
            "'If I were rich, I'd travel the world' describes an unreal/unlikely situation — the second conditional."
        )

    ],

    summary: {

        tip:
            "Practice imagining a hypothetical scenario about technology's future, using the second conditional throughout.",

        review: [

            "if + past simple, ... would + verb",

            "were for all subjects (formal)",

            "unreal/unlikely situations",

            "groundbreaking, automation, feasible, drawback"

        ]

    }

};
