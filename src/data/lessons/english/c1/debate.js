import { debateBlocks } from "../../../grammar/shared/english/c1/debate";
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

export const debateLesson = {

    id: "english-c1-debate",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "debate",

    order: 11,

    title: "Argumentation, Debate & Nuanced Communication",

    subtitle:
        "Construa argumentos sofisticados e responda a contra-argumentos usando hedging, stance e qualificação.",

    description:
        "A lição mais avançada do módulo: aprenda a qualificar afirmações, reconhecer pontos válidos do outro lado e discordar diplomaticamente com precisão.",

    cover: "/covers/debate-c1.webp",

    estimatedTime: 16,

    difficulty: 5,

    xp: 55,

    tags: [
        "debate",
        "grammar",
        "argumentation"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Build complex arguments and respond to counterarguments",

        "Qualify statements and express partial agreement",

        "Disagree diplomatically and reformulate a position",

        "Use hedging and stance markers naturally in extended discussion"

    ],

    vocabulary: vocabulary([
        "a compelling case",
        "a sweeping statement",
        "all things considered",
        "a fair point",
        "poke holes in an argument",
        "unpack an argument",
        "a underlying assumption",
        "concede a point",
        "a moot point",
        "a nuanced take",
        "at loggerheads",
        "come to a head",
        "a red herring",
        "stand your ground",
        "a valid counterpoint",
        "reconcile two views",
        "a leap in logic",
        "an oversimplification",
        "agree to disagree",
        "a well-reasoned argument"
    ]),

    blocks: [

        heading("Arguing With Sophistication"),

        paragraph(
            "Sophisticated argumentation isn't about winning — it's about signaling precisely how confident you are and where you genuinely agree, before making your case. This lesson brings together the hedging and qualifying language that defines fluent C1 debate."
        ),

        examples([
            {
                text: "It could be argued that the policy simply hasn't had enough time to work — that said, the early signs aren't encouraging.",
                translation: "Poder-se-ia argumentar que a política simplesmente não teve tempo suficiente para funcionar — ainda assim, os sinais iniciais não são animadores."
            },
            {
                text: "That's a fair point, and I'll concede that much, but it doesn't fully unpack the underlying assumption here.",
                translation: "Esse é um ponto justo, e eu admito isso, mas não desmonta totalmente a suposição de fundo aqui."
            },
            {
                text: "To some extent, I agree, but that argument is arguably a bit of an oversimplification.",
                translation: "Até certo ponto, eu concordo, mas esse argumento é, sem dúvida, uma simplificação um tanto exagerada."
            },
            {
                text: "There is some evidence to suggest a valid counterpoint, insofar as the data covers a limited timeframe.",
                translation: "Há algumas evidências que sugerem um contraponto válido, na medida em que os dados cobrem um período limitado."
            },
            {
                text: "Admittedly, that's a well-reasoned argument, but I think it's a red herring in this particular debate.",
                translation: "Admito que é um argumento bem fundamentado, mas acho que é uma pista falsa nesse debate específico."
            },
            {
                text: "We're clearly at loggerheads on this, so let's at least try to reconcile where our views actually overlap.",
                translation: "Estamos claramente em conflito nisso, então vamos pelo menos tentar conciliar onde nossas visões realmente se sobrepõem."
            }
        ]),

        dialogue([
            { speaker: "Freya", text: "I think remote work has clearly been a net positive for productivity." },
            { speaker: "Noah", text: "It could be argued that, but isn't that a bit of a sweeping statement without more data?" },
            { speaker: "Freya", text: "Fair — there is some evidence to suggest it, though, especially in knowledge-based industries." },
            { speaker: "Noah", text: "That's a fair point. I'll concede that much. But insofar as we're only looking at self-reported surveys, I'd stay cautious." },
              { speaker: "Freya", text: "Admittedly, that's a valid counterpoint. I might be making a leap in logic there." },
            { speaker: "Noah", text: "To some extent, I agree with your overall case — it's genuinely compelling." },
            { speaker: "Freya", text: "But?" },
            { speaker: "Noah", text: "But I think the claim about creativity is a bit of an oversimplification. That's more of a moot point without controlled studies." },
            { speaker: "Freya", text: "Okay, that's a well-reasoned pushback. All things considered, maybe we should just agree to disagree on that one point." },
            { speaker: "Noah", text: "Deal. Though I'd say we've actually managed to reconcile most of it." }
        ]),

        grammar(debateBlocks[0].title, debateBlocks[0].text),

        list([

            "it could be argued that / there is some evidence to suggest — hedged claims",

            "to some extent, I agree, but... — partial agreement",

            "that said / admittedly — acknowledging the other side",

            "insofar as — limiting a claim to a specific respect"

        ]),

        tip(
            "Concede Before You Counter",
            "Acknowledging a valid point ('that's a fair point', 'admittedly...') before disagreeing makes your counterargument land better — it signals you've actually listened, rather than just waiting to speak."
        ),

        culture(
            "Debate Culture in English-Speaking Education",
            "Formal debate and Socratic discussion are a core part of secondary and university education in many English-speaking countries, which is part of why this hedging and stance vocabulary is so deeply embedded in academic and professional English — it's taught explicitly, not just picked up by chance."
        ),

        quiz(
            "Choose the phrase that signals partial agreement before a counterpoint.",
            ["I completely agree.", "To some extent, I agree, but...", "I completely disagree.", "That's obviously wrong."],
            1,
            "'To some extent, I agree, but...' signals partial agreement before introducing a counterpoint."
        ),

        quiz(
            "What does 'insofar as' do in an argument?",
            ["it rejects the argument completely", "it limits a claim to a specific respect or condition", "it strongly emphasizes certainty", "it changes the subject entirely"],
            1,
            "'Insofar as' limits a claim to a specific respect: 'it works, insofar as it reduces costs.'"
        ),

        quiz(
            "What does 'a red herring' mean in an argument?",
            ["the strongest point in an argument", "a distraction that misleads from the real issue", "a statistic used as evidence", "a formal way to end a debate"],
            1,
            "'A red herring' is a misleading distraction from the actual point being debated."
        )

    ],

    summary: {

        tip:
            "Practice debating a topic you care about, using at least one hedge, one partial agreement, and one diplomatic disagreement.",

        review: [

            "hedging: it could be argued that, there is some evidence to suggest",

            "partial agreement: to some extent, I agree, but...",

            "that said, admittedly, insofar as",

            "a compelling case, a fair point, an oversimplification, agree to disagree"

        ]

    }

};
