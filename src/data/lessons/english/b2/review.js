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

export const b2ReviewLesson = {

    id: "english-b2-review",

    language: "english",

    level: "B2",

    category: "Review",

    topic: "review",

    order: 12,

    title: "B2 Review & Real-Life Communication",

    subtitle:
        "Revise toda a gramática do módulo B2 em situações reais de comunicação, combinando dedução, condicionais, voz passiva, ênfase e muito mais.",

    description:
        "Uma revisão final combinando present perfect continuous, past perfect, causativo, modais de dedução, orações concessivas, condicionais, reporting verbs, orações relativas reduzidas, wish/if only, cleft sentences e discourse markers.",

    cover: "/covers/b2-review.webp",

    estimatedTime: 15,

    difficulty: 4,

    xp: 50,

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

        "Review every grammar point from the B2 module",

        "Recognize and combine multiple advanced structures in real conversation",

        "Test yourself with mixed questions from every lesson",

        "Feel ready to communicate with precision and nuance at B2 level"

    ],

    vocabulary: vocabulary([
        "pivotal",
        "in hindsight",
        "curriculum",
        "keep up with",
        "leadership",
        "networking",
        "inequality",
        "advocate for",
        "groundbreaking",
        "feasible",
        "irreversible",
        "mitigate",
        "credibility",
        "misinformation",
        "renowned",
        "resonate with",
        "reconcile",
        "empathize with",
        "frugal",
        "financial security",
        "compelling",
        "arguably"
    ]),

    blocks: [

        heading("You've Reached B2!"),

        paragraph(
            "Congratulations on completing the B2 module! You've learned to discuss personal development, education, careers, society, science, the environment, media, culture, relationships, economics and debate with real precision and nuance. This lesson brings every structure together."
        ),

        examples([
            {
                text: "I've been reconsidering my career for months, and last year I finally had my résumé reviewed by a professional.",
                translation: "Venho reconsiderando minha carreira há meses, e no ano passado finalmente tive meu currículo revisado por um profissional."
            },
            {
                text: "By the time I made the decision, I had already turned down two other offers.",
                translation: "Quando tomei a decisão, eu já tinha recusado duas outras propostas."
            },
            {
                text: "My old manager must have been surprised when I resigned — I'd never mentioned wanting to leave.",
                translation: "Meu antigo gerente deve ter ficado surpreso quando pedi demissão — eu nunca tinha mencionado que queria sair."
            },
            {
                text: "Although the transition was stressful, it turned out to be the right move.",
                translation: "Embora a transição tenha sido estressante, acabou sendo a decisão certa."
            },
            {
                text: "If I were starting over, I'd trust my instincts sooner.",
                translation: "Se eu estivesse começando de novo, confiaria nos meus instintos mais cedo."
            },
            {
                text: "If I hadn't taken that risk, I would never have discovered what I'm actually good at.",
                translation: "Se eu não tivesse corrido aquele risco, nunca teria descoberto no que realmente sou bom."
            },
            {
                text: "A colleague pointed out that hesitation had cost me other opportunities in the past.",
                translation: "Um colega apontou que a hesitação já tinha me custado outras oportunidades no passado."
            },
            {
                text: "What really changed everything was having a mentor willing to give me honest, constructive feedback.",
                translation: "O que realmente mudou tudo foi ter um mentor disposto a me dar um feedback honesto e construtivo."
            },
            {
                text: "If only I'd made this change sooner.",
                translation: "Eu queria ter feito essa mudança antes."
            },
            {
                text: "The whole situation was eventually resolved through honest conversations.",
                translation: "Toda a situação foi resolvida no fim das contas por meio de conversas honestas."
            },
            {
                text: "On balance, it was worth every risk I took.",
                translation: "No fim das contas, valeu cada risco que corri."
            }
        ]),

        dialogue([
            { speaker: "Naomi", text: "So, how's the new job going? I remember you'd been thinking about this for months." },
            { speaker: "Theo", text: "It's going really well, actually. If only I'd made the change sooner, honestly." },
            { speaker: "Naomi", text: "I bet. What made you finally decide?" },
            { speaker: "Theo", text: "A mentor pointed out that hesitation had cost me chances before. That really stuck with me." },
            { speaker: "Naomi", text: "That's great advice. Although the transition must have been stressful, it clearly paid off." },
            { speaker: "Theo", text: "It was, but it was worth it. My old manager must have been surprised when I resigned — I'd never mentioned wanting to leave." },
            { speaker: "Naomi", text: "I can imagine! Do you regret staying as long as you did?" },
            { speaker: "Theo", text: "A little. If I hadn't taken the risk eventually, though, I would never have discovered what I'm actually good at." },
            { speaker: "Naomi", text: "What really changed things for you?" },
            { speaker: "Theo", text: "Honestly, what really changed everything was having a mentor willing to give me honest feedback." },
            { speaker: "Naomi", text: "That makes sense. On balance, would you say it was the right call?" },
            { speaker: "Theo", text: "Definitely. No regrets." }
        ]),

        list([

            "Present Perfect Continuous vs Past Perfect",

            "Passive structures + Causative (have something done)",

            "Modal verbs of deduction and speculation",

            "Concessive clauses — although / despite / whereas",

            "Second Conditional — hypothetical present/future",

            "Third Conditional — imagining a different past",

            "Reporting verbs — claim / admit / deny / point out / warn",

            "Reduced relative clauses",

            "Wish and If Only",

            "Emphasis with cleft sentences",

            "Discourse markers and hedging"

        ]),

        quiz(
            "Choose the sentence that emphasizes duration.",
            ["I've written the report.", "I've been writing the report all day.", "I wrote the report.", "I had written the report."],
            1,
            "The present perfect continuous emphasizes the ongoing duration of an activity."
        ),

        quiz(
            "Choose the correct causative sentence.",
            ["I had fixed my car by a mechanic.", "I fixed my car by a mechanic.", "I had my car fixed by a mechanic.", "I have my car fix."],
            2,
            "The causative is have + object + past participle: 'I had my car fixed.'"
        ),

        quiz(
            "Choose the sentence expressing strong certainty something is NOT true.",
            ["She might not have left.", "She may not have left.", "She doesn't have to leave.", "She can't have left already."],
            3,
            "'Can't have' expresses strong certainty that something did not happen."
        ),

        quiz(
            "Choose the correct sentence.",
            ["Despite it was raining, we left.", "Despite raining, we left.", "Despite it rained, we left.", "Despite the rain, we left."],
            3,
            "'Despite' is followed by a noun, not a full clause: 'Despite the rain.'"
        ),

        quiz(
            "Choose the correct second conditional sentence.",
            ["If I was you, I would apply.", "If I am you, I would apply.", "If I will be you, I would apply.", "If I were you, I would apply."],
            3,
            "'Were' is used for all subjects in formal second conditional sentences."
        ),

        quiz(
            "Choose the correct third conditional sentence.",
            ["If I knew, I would have helped.", "If I have known, I would have helped.", "If I had known, I would have helped.", "If I had known, I would help."],
            2,
            "The third conditional keeps both parts in the past: if + past perfect, ... would have + past participle."
        ),

        quiz(
            "Choose the sentence suggesting doubt about whether something is true.",
            ["She admitted she was late.", "She pointed out she was late.", "She denied being late.", "She claimed she was on time."],
            3,
            "'Claim' suggests doubt about whether the statement is true."
        ),

        quiz(
            "Choose the correct reduced relative clause for \"the man who is waiting outside\".",
            ["the man waited outside", "the man wait outside", "the man to wait outside", "the man waiting outside"],
            3,
            "The active meaning ('is waiting') reduces to the -ing form."
        ),

        quiz(
            "Choose the sentence expressing regret about the past.",
            ["I wish I called her.", "I wish I call her.", "If only I call her.", "If only I had called her."],
            3,
            "'If only' + past perfect expresses regret about the past."
        ),

        quiz(
            "Choose the correct cleft sentence.",
            ["It what I need is time.", "What I need time.", "It's what I need is time.", "What I need is time."],
            3,
            "'What I need is...' is the correct cleft structure to emphasize the subject."
        ),

        quiz(
            "Choose the best hedging phrase for an uncertain claim.",
            ["This definitely proves...", "This obviously means...", "This absolutely confirms...", "This tends to suggest..."],
            3,
            "'Tends to suggest' appropriately hedges a claim that isn't absolute."
        ),

        tip(
            "Keep Practicing With Real Conversations",
            "The best way to consolidate B2 grammar is to use it in real conversations. Try discussing a topic you care about and see how many of these structures you can naturally combine — deduction, conditionals, hedging and more."
        ),

        culture(
            "Reaching B2: An Independent User, Upper Level",
            "The CEFR describes B2 as the level where you can interact with a degree of fluency and spontaneity, understand the main ideas of complex texts, and produce clear, detailed text on a wide range of subjects. It's often considered the level where English becomes a genuinely flexible communication tool, not just a set of learned phrases."
        )

    ],

    summary: {

        tip:
            "Well done! Try reviewing any grammar point you found difficult one more time, then keep practicing with real conversations and real content in English.",

        review: [

            "You've completed 11 lessons in the B2 module.",

            "You can discuss abstract topics with precision and nuance.",

            "You've combined deduction, conditionals, passive, causative, hedging and more.",

            "You're ready to keep building fluency beyond B2!"

        ]

    }

};
