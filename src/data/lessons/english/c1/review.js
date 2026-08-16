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

export const c1ReviewLesson = {

    id: "english-c1-review",

    language: "english",

    level: "C1",

    category: "Review",

    topic: "review",

    order: 12,

    title: "C1 Review & Advanced Real-World Communication",

    subtitle:
        "Revise toda a gramática do módulo C1 em situações reais de negociação, debate e análise crítica.",

    description:
        "Uma revisão final combinando future in the past, nominalização, mixed conditionals, inversão, modais avançados de especulação, participle clauses, reported speech avançado, relative clauses formais, wishes avançados, complex noun phrases e hedging.",

    cover: "/covers/c1-review.webp",

    estimatedTime: 17,

    difficulty: 5,

    xp: 60,

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

        "Review every grammar point from the C1 module",

        "Recognize and combine multiple advanced structures in real conversation",

        "Test yourself with mixed questions from every lesson",

        "Feel ready to communicate with precision, nuance and fluency at C1 level"

    ],

    vocabulary: vocabulary([
        "at a crossroads",
        "in retrospect",
        "call into question",
        "a rule of thumb",
        "on the same page",
        "a key player",
        "the status quo",
        "a watershed moment",
        "at the forefront of",
        "a gray area",
        "a wake-up call",
        "the writing is on the wall",
        "take something with a grain of salt",
        "a hidden agenda",
        "a tour de force",
        "strike a chord with",
        "make peace with",
        "an underlying insecurity",
        "a shrewd decision",
        "weigh up the trade-offs",
        "a fair point",
        "agree to disagree"
    ]),

    blocks: [

        heading("You've Reached C1!"),

        paragraph(
            "Congratulations on completing the C1 module! You've learned to discuss identity, education, leadership, society, technology, the environment, media, culture, psychology, economics and argumentation with real precision, nuance and flexibility. This lesson brings every structure together."
        ),

        examples([
            {
                text: "I'd been grappling with self-doubt for years before I finally reached a crossroads and recalibrated my whole approach.",
                translation: "Eu vinha lidando com insegurança havia anos antes de finalmente chegar a uma encruzilhada e recalibrar toda a minha abordagem."
            },
            {
                text: "A less rigid assessment of performance is arguably long overdue, though that claim calls for real scrutiny.",
                translation: "Uma avaliação de desempenho menos rígida é, sem dúvida, algo atrasado, embora essa afirmação exija um escrutínio real."
            },
            {
                text: "If she hadn't pushed back on that decision, we wouldn't be on the same page today.",
                translation: "Se ela não tivesse resistido àquela decisão, não estaríamos alinhados hoje."
            },
            {
                text: "Rarely do institutions admit their mistakes, which only entrenches the status quo further.",
                translation: "Raramente instituições admitem seus erros, o que só aprofunda ainda mais o status quo."
            },
            {
                text: "There's every chance this breakthrough is bound to raise ethical questions we haven't fully mapped out.",
                translation: "Há grandes chances de que essa descoberta certamente levante questões éticas que ainda não mapeamos totalmente."
            },
            {
                text: "Faced with dwindling resources, the team finally phased out its stopgap measures for good.",
                translation: "Diante de recursos cada vez mais escassos, a equipe finalmente eliminou suas medidas paliativas de vez."
            },
            {
                text: "The story is said to have been cherry-picked, so I'm taking it with a grain of salt.",
                translation: "Diz-se que a história foi selecionada de forma conveniente, então estou desconfiando dela."
            },
            {
                text: "It's a tour de force of understated performance, which struck a chord with almost everyone who saw it.",
                translation: "É um feito extraordinário de atuação sutil, o que emocionou quase todo mundo que assistiu."
            },
            {
                text: "I'd rather you hadn't brought that up, but it's about time we made peace with the whole situation.",
                translation: "Eu preferia que você não tivesse tocado nesse assunto, mas já é hora de fazermos as pazes com toda a situação."
            },
            {
                text: "There's been a sharp increase in demand, though it's still a calculated, if shrewd, risk to expand now.",
                translation: "Houve um aumento acentuado na demanda, embora ainda seja um risco calculado, mesmo que astuto, expandir agora."
            },
            {
                text: "That's a fair point, and to some extent I agree, but that's arguably an oversimplification of a complex issue.",
                translation: "Esse é um ponto justo, e até certo ponto eu concordo, mas isso é, sem dúvida, uma simplificação exagerada de uma questão complexa."
            }
        ]),

        dialogue([
            { speaker: "Isla", text: "It's been a while! How's everything since you were at that crossroads last year?" },
            { speaker: "Marcus", text: "Good, actually. In retrospect, I'd been grappling with a lot more self-doubt than I realized." },
            { speaker: "Isla", text: "What finally changed things?" },
            { speaker: "Marcus", text: "Honestly, a mentor pointed out that my whole approach was predicated on a rather shaky assumption. That really hit home." },
            { speaker: "Isla", text: "Rarely do people take feedback like that so well." },
            { speaker: "Marcus", text: "I had reservations at first, sure. But if I hadn't pushed back and questioned it myself, I wouldn't be on the same page with my own goals now." },
            { speaker: "Isla", text: "That's a fair point. I've been dealing with something similar at work, actually — we're a bit at loggerheads over a new project." },
            { speaker: "Marcus", text: "Faced with that kind of disagreement, what's your instinct?" },
              { speaker: "Isla", text: "To some extent, I agree with the other side, but it's arguably an oversimplification of the real risk involved." },
            { speaker: "Marcus", text: "Sounds like a well-reasoned position. Admittedly, that's exactly the kind of nuance I used to struggle to express." },
            { speaker: "Isla", text: "Same. It's genuinely a wake-up call how much precision actually changes a conversation." },
            { speaker: "Marcus", text: "Couldn't agree more. All things considered, I think we've both come a long way." }
        ]),

        list([

            "Future in the past + past perfect continuous for narrative background",

            "Nominalisation and academic hedging",

            "Mixed conditionals",

            "Inversion after negative and restrictive adverbials",

            "Advanced modals of speculation (present and future)",

            "Participle clauses (reduced adverbial clauses)",

            "Advanced reported speech: passive reporting structures",

            "Sentential relative clauses and relative clauses with prepositions",

            "Advanced wishes, regrets and retrospective criticism",

            "Complex noun phrases for approximation and quantification",

            "Hedging, stance and qualification in extended argument"

        ]),

        quiz(
            "Choose the sentence describing an interrupted past plan.",
            ["I was about to quit when I got a promotion.", "I quit my job.", "I had quit my job.", "I quit because I got a promotion."],
            0,
            "'Was about to' describes a plan that was interrupted by something else happening."
        ),

        quiz(
            "Choose the most natural nominalised version of \"They should assess students less rigidly.\"",
            ["They assess students less rigidly.", "A less rigid assessment of students is arguably overdue.", "Assessing students rigidly is bad.", "Students are assessed less rigidly."],
            1,
            "Nominalising 'assess' into 'assessment' produces a more formal, academic sentence."
        ),

        quiz(
            "Choose the correct mixed conditional (past condition, present result).",
            ["If she doesn't spearhead the project, we won't succeed.", "If she hadn't spearheaded the project, we wouldn't be here today.", "If she spearheads the project, we will succeed.", "If she had spearheaded it, we would succeed tomorrow."],
            1,
            "'If + past perfect, ... would + base verb' connects a past condition to a present result."
        ),

        quiz(
            "Choose the correctly inverted sentence.",
            ["Rarely institutions admit their mistakes.", "Rarely do institutions admit their mistakes.", "Rarely institutions do admit mistakes.", "Institutions rarely do admit mistakes."],
            1,
            "After 'rarely' at the start of a sentence, the auxiliary 'do' comes before the subject."
        ),

        quiz(
            "Choose the expression showing near certainty about the future.",
            ["could conceivably", "is bound to", "there's a slim chance", "it's unlikely to"],
            1,
            "'Is bound to' expresses near certainty about a future outcome."
        ),

        quiz(
            "Choose the correct participle clause.",
            ["Face with declining resources, policies are changing.", "Faced with declining resources, policies are changing.", "Facing with declining resources, policies are changing.", "Faced declining resources, policies are changing."],
            1,
            "The passive past participle 'Faced with' correctly replaces 'Because it is faced with'."
        ),

        quiz(
            "Choose the correct passive reporting structure.",
            ["The company said to have known about it.", "The company is said to have known about it.", "The company is said know about it.", "The company said that known about it."],
            1,
            "'Is said to have known' is the correct passive reporting structure for a past claim."
        ),

        quiz(
            "Choose the sentence using a correct sentential relative clause.",
            ["The film flopped, what surprised everyone.", "The film flopped, which surprised everyone.", "The film flopped, that surprised everyone.", "The film flopped, who surprised everyone."],
            1,
            "'Which' comments on the whole previous clause, not 'what', 'that' or 'who'."
        ),

        quiz(
            "Choose the correct structure for a wish about someone's past action.",
            ["I'd rather you don't tell him.", "I'd rather you didn't tell him.", "I'd rather you hadn't told him.", "I'd rather you won't tell him."],
            2,
            "'I'd rather you hadn't told him' (past perfect) expresses a wish about a past action that already happened."
        ),

        quiz(
            "Choose the more formal, natural noun-phrase version of \"Prices went up a lot.\"",
            ["Prices went up.", "There has been a sharp increase in prices.", "Prices are increasing a lot currently.", "A lot happened to prices."],
            1,
            "'There has been a sharp increase in prices' is the natural complex-noun-phrase version in formal English."
        ),

        quiz(
            "Choose the phrase that signals partial agreement before a counterpoint.",
            ["I completely agree.", "To some extent, I agree, but...", "I completely disagree.", "That's obviously wrong."],
            1,
            "'To some extent, I agree, but...' signals partial agreement before introducing a counterpoint."
        ),

        tip(
            "Keep Practicing With Real Conversations",
            "The best way to consolidate C1 grammar is to use it in real, extended conversations — try discussing something you genuinely care about and see how naturally you can combine hedging, nuance, and precise structure without sounding rehearsed."
        ),

        culture(
            "Reaching C1: An Advanced, Proficient User",
            "The CEFR describes C1 as the level of an advanced, proficient user: you can understand a wide range of demanding texts, recognize implicit meaning, express yourself fluently and spontaneously, and use language flexibly for social, academic and professional purposes. From here, English becomes a genuinely versatile tool — not just for communicating, but for persuading, analyzing and connecting with real nuance."
        )

    ],

    summary: {

        tip:
            "Well done! Try reviewing any structure you found difficult one more time, then keep practicing with real arguments and real conversations in English.",

        review: [

            "You've completed 11 lessons in the C1 module.",

            "You can argue, negotiate and analyze with real precision and nuance.",

            "You've combined future in the past, mixed conditionals, inversion, passive reporting, participle clauses and hedging.",

            "You've reached C1 — an advanced, proficient user of English!"

        ]

    }

};
