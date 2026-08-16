import { workCareersBlocks } from "../../../grammar/shared/english/c1/workCareers";
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

export const workCareersLesson = {

    id: "english-c1-work-careers",

    language: "english",

    level: "C1",

    category: "Grammar",

    topic: "work-careers",

    order: 3,

    title: "Work, Leadership & Professional Communication",

    subtitle:
        "Negocie e discorde diplomaticamente no ambiente profissional usando mixed conditionals.",

    description:
        "Desenvolva vocabulário de liderança e comunicação profissional, e aprenda a combinar condicionais de diferentes tempos verbais para falar de decisões e suas consequências.",

    cover: "/covers/work-careers-c1.webp",

    estimatedTime: 15,

    difficulty: 5,

    xp: 50,

    tags: [
        "work-careers",
        "grammar",
        "leadership"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Negotiate and disagree diplomatically in professional settings",

        "Discuss leadership and workplace decisions with precision",

        "Use mixed conditionals to connect past decisions and present outcomes",

        "Apply professional collocations and diplomatic language naturally"

    ],

    vocabulary: vocabulary([
        "spearhead",
        "streamline",
        "answerable to",
        "at the helm",
        "bring to the table",
        "reservations",
        "iron out",
        "get the ball rolling",
        "downsize",
        "diplomatically",
        "on the same page",
        "leverage (verb)",
        "a tall order",
        "hover over someone's shoulder",
        "cut someone some slack",
        "a key player",
        "in good faith",
        "push back on",
        "a steep learning curve",
        "constructive criticism"
    ]),

    blocks: [

        heading("Leading and Negotiating With Precision"),

        paragraph(
            "Professional English at this level requires diplomatic phrasing and precise timing. Mixed conditionals are especially useful here, because they let you connect a past decision to a present result, or a present trait to a past outcome."
        ),

        examples([
            {
                text: "If she hadn't spearheaded that project, we wouldn't be at the helm of this market today.",
                translation: "Se ela não tivesse liderado aquele projeto, não estaríamos à frente desse mercado hoje."
              },
            {
                text: "If he weren't so used to hovering over his team's shoulder, he wouldn't have downsized morale so badly last quarter.",
                translation: "Se ele não tivesse o hábito de ficar em cima da equipe, não teria prejudicado tanto o moral no último trimestre."
            },
            {
                text: "We're finally on the same page, though it was a tall order to get here.",
                translation: "Finalmente estamos alinhados, embora tenha sido uma tarefa difícil chegar até aqui."
            },
            {
                text: "If the team hadn't pushed back on that decision, we wouldn't have such a solid plan now.",
                translation: "Se a equipe não tivesse resistido àquela decisão, não teríamos um plano tão sólido agora."
            },
            {
                text: "Let's iron out the details before we bring this to the stakeholders.",
                translation: "Vamos acertar os detalhes antes de levar isso às partes interessadas."
            },
            {
                text: "If I hadn't cut him some slack early on, he wouldn't be such a key player on the team now.",
                translation: "Se eu não tivesse sido mais tolerante com ele no início, ele não seria um elemento tão importante da equipe agora."
            }
        ]),

        dialogue([
            { speaker: "Charlotte", text: "How's the restructuring going? I heard you're spearheading it now." },
            { speaker: "Ben", text: "It's a tall order, honestly. If I hadn't leveraged the team's feedback early, we'd be way behind now." },
            { speaker: "Charlotte", text: "Any pushback so far?" },
            { speaker: "Ben", text: "A bit. A few people pushed back on the timeline, but it was raised in good faith, so we're ironing it out." },
            { speaker: "Charlotte", text: "Good. And the downsizing rumors?" },
            { speaker: "Ben", text: "Overblown. If leadership were planning that, we wouldn't have hired three new people last month." },
            { speaker: "Charlotte", text: "Fair. Who's really been a key player through all this?" },
            { speaker: "Ben", text: "Honestly, if she hadn't gotten the ball rolling on the streamlined process, we wouldn't be on the same page as fast as we are." },
            { speaker: "Charlotte", text: "Sounds like you're handling it diplomatically." },
            { speaker: "Ben", text: "Trying to. Constructive criticism only works if people feel answerable to something, not just to me." }
        ]),

        grammar(workCareersBlocks[0].title, workCareersBlocks[0].text),

        list([

            "mixed conditional: past condition + present result",

            "mixed conditional: present condition + past result",

            "spearhead, streamline, iron out, get the ball rolling",

            "on the same page, a tall order, cut someone some slack, a key player"

        ]),

        tip(
            "Diplomatic Disagreement",
            "'Push back on' and 'have reservations about' are more diplomatic than 'disagree with' in professional English — they signal a specific, considered objection rather than a blanket rejection, which tends to land better in meetings."
        ),

        culture(
            "Directness at Work: US vs UK English",
            "Professional communication norms vary even within English-speaking countries: American workplace English tends to be more direct and enthusiastic ('This is a great idea, but...'), while British workplace English often relies more heavily on understatement and hedging ('I have some slight reservations about...') to soften disagreement."
        ),

        quiz(
            "Choose the correct mixed conditional (past condition, present result).",
            [
                "If she doesn't spearhead the project, we won't succeed.",
                "If she hadn't spearheaded the project, we wouldn't be here today.",
                "If she spearheads the project, we will succeed.",
                "If she had spearheaded the project, we would succeed tomorrow."
            ],
            1,
            "'If + past perfect, ... would + base verb' connects a past condition to a present result."
        ),

        quiz(
            "What does 'iron out the details' mean?",
            ["to ignore small problems", "to resolve small remaining issues", "to make something more complicated", "to cancel a plan entirely"],
            1,
            "'Iron out the details' means to resolve small remaining issues before finalizing something."
        ),

        quiz(
            "Which phrase is the most diplomatic way to express disagreement at work?",
            ["That's completely wrong.", "I have some reservations about this approach.", "I don't agree at all.", "This makes no sense."],
            1,
            "'I have some reservations about this approach' expresses disagreement diplomatically, without being blunt."
        )

    ],

    summary: {

        tip:
            "Practice describing a real professional decision using a mixed conditional — connect a past choice to a present outcome.",

        review: [

            "mixed conditionals: past condition/present result and present condition/past result",

            "spearhead, streamline, iron out, get the ball rolling",

            "on the same page, a tall order, cut someone some slack, a key player"

        ]

    }

};
