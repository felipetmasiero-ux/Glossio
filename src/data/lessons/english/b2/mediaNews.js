import { mediaNewsBlocks } from "../../../grammar/shared/english/b2/mediaNews";
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

export const mediaNewsLesson = {

    id: "english-b2-media-news",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "media-news",

    order: 7,

    title: "Media, News & Information",

    subtitle:
        "Relate notícias e informações em inglês com precisão usando reporting verbs como claim, admit, deny, point out e warn.",

    description:
        "Aprenda vocabulário sobre jornalismo e desinformação, e como usar reporting verbs específicos para mostrar a atitude de quem fala.",

    cover: "/covers/media-news.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "media",
        "reporting-verbs",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss journalism, misinformation and public opinion",

        "Use precise reporting verbs beyond 'say' and 'tell'",

        "Show attitude (doubt, reluctance, denial) through verb choice",

        "Distinguish facts from opinions and unverified claims"

    ],

    vocabulary: vocabulary([
        "journalism",
        "misinformation",
        "disinformation",
        "bias",
        "biased",
        "credible",
        "credibility",
        "fact-check",
        "outlet",
        "headline-grabbing",
        "sensationalist",
        "spread like wildfire",
        "take something at face value",
        "read between the lines",
        "public opinion",
        "propaganda",
        "deny",
        "warn",
        "point out",
        "admit"
    ]),

    blocks: [

        heading("Reporting Information Precisely"),

        paragraph(
            "When we report what someone said, the verb we choose reveals our attitude toward the claim — whether we believe it, doubt it, or think the speaker was reluctant to admit it."
        ),

        examples([
            {
                text: "The company denied that the data had been leaked.",
                translation: "A empresa negou que os dados tinham sido vazados."
            },
            {
                text: "Experts warn that misinformation spreads faster than corrections.",
                translation: "Especialistas alertam que a desinformação se espalha mais rápido que as correções."
            },
            {
                text: "The journalist pointed out that the source hadn't been verified.",
                translation: "O jornalista apontou que a fonte não tinha sido verificada."
            },
            {
                text: "The politician admitted that the statement had been misleading.",
                translation: "O político admitiu que a declaração tinha sido enganosa."
            },
            {
                text: "Officials claim that the situation is under control.",
                translation: "As autoridades alegam que a situação está sob controle."
            },
            {
                text: "The outlet was accused of spreading sensationalist headlines.",
                translation: "O veículo foi acusado de espalhar manchetes sensacionalistas."
            }
        ]),

        dialogue([
            { speaker: "Ella", text: "Did you see that article going around about the health study?" },
            { speaker: "Sam", text: "Yeah, but I read that scientists actually denied the claims in the headline." },
            { speaker: "Ella", text: "Really? It definitely spread like wildfire on social media." },
            { speaker: "Sam", text: "That's the problem with headline-grabbing journalism — people take it at face value without reading further." },
            { speaker: "Ella", text: "True. The outlet later admitted the headline was misleading, but the correction barely got any attention." },
            { speaker: "Sam", text: "Experts keep warning that misinformation spreads faster than corrections, and honestly, this proves it." },
            { speaker: "Ella", text: "It really does. I try to fact-check things now before I share anything." },
            { speaker: "Sam", text: "Same here. It's worth pointing out that not every source is equally credible." },
            { speaker: "Ella", text: "Definitely. Reading between the lines has become a necessary skill these days." }
        ]),

        grammar(mediaNewsBlocks[0].title, mediaNewsBlocks[0].text),

        list([

            "claim — uncertain or disputed",

            "admit — reluctant to reveal",

            "deny — reject an accusation",

            "point out / warn — draw attention to a fact or risk"

        ]),

        tip(
            "The Verb Reveals the Attitude",
            "Choosing the right reporting verb changes the meaning. 'She said the plan failed' is neutral. 'She admitted the plan failed' suggests reluctance. 'She claimed the plan failed' suggests doubt about whether it's true. Pick the verb that matches the speaker's real attitude."
        ),

        culture(
            "Media Literacy",
            "Media literacy — the ability to evaluate sources, recognize bias and fact-check claims — has become an increasingly common topic in English-language education and public discussion, especially around elections and public health issues."
        ),

        quiz(
            "Which reporting verb suggests the speaker was reluctant to reveal something?",
            ["claim", "admit", "warn", "point out"],
            1,
            "'Admit' suggests the speaker was reluctant to reveal the information."
        ),

        quiz(
            "Which reporting verb suggests doubt about whether something is true?",
            ["admit", "deny", "claim", "warn"],
            2,
            "'Claim' suggests the speaker isn't sure the statement is true, or that it's disputed."
        ),

        quiz(
            "Choose the correct sentence.",
            [
                "The company denied leaked the data.",
                "The company denied that the data had been leaked.",
                "The company denied the data leak yesterday happen.",
                "The company denies leaking the data has."
            ],
            1,
            "'Deny that + clause' follows the same tense-shifting pattern as other reporting verbs."
        )

    ],

    summary: {

        tip:
            "Practice reporting a piece of news using a few different reporting verbs — notice how each one changes the tone of what you're saying.",

        review: [

            "claim / admit / deny / point out / warn",

            "verb choice shows attitude toward the claim",

            "misinformation, bias, credible, fact-check",

            "spread like wildfire, take at face value"

        ]

    }

};
