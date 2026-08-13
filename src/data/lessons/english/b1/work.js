import { workBlocks } from "../../../grammar/shared/english/b1/work";
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

export const workLesson = {

    id: "english-b1-work",

    language: "english",

    level: "B1",

    category: "Grammar",

    topic: "work",

    order: 4,

    title: "Work & Professional Life",

    subtitle:
        "Fale sobre o ambiente de trabalho em inglês usando verbos modais de obrigação, permissão e conselho: must, have to, should, can e could.",

    description:
        "Aprenda vocabulário do ambiente profissional e como usar 'must', 'have to', 'don't have to', 'mustn't', 'should' e 'can/could' corretamente.",

    cover: "/covers/work.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 40,

    tags: [
        "work",
        "modals",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about workplace situations and responsibilities",

        "Use 'must'/'have to' for obligation and 'mustn't' for prohibition",

        "Use 'can'/'could'/'may' for permission",

        "Use 'should'/'ought to' to give advice at work"

    ],

    vocabulary: vocabulary([
        "colleague",
        "deadline",
        "workload",
        "overtime",
        "resign",
        "quit",
        "get fired",
        "job interview",
        "cover letter",
        "résumé",
        "workplace",
        "task",
        "responsibility",
        "meeting",
        "negotiate",
        "salary",
        "benefits",
        "teamwork"
    ]),

    blocks: [

        heading("Rules, Permission and Advice at Work"),

        paragraph(
            "Workplace English relies heavily on modal verbs: 'must' and 'have to' for obligation, 'mustn't' for prohibition, 'can'/'could'/'may' for permission, and 'should'/'ought to' for advice. Choosing the right one changes how strong or optional something sounds."
        ),

        examples([
            {
                text: "You have to submit the report by Friday, or the client will be upset.",
                translation: "Você tem que enviar o relatório até sexta-feira, ou o cliente vai ficar chateado."
            },
            {
                text: "You don't have to come to the meeting if you're busy — it's optional.",
                translation: "Você não precisa vir à reunião se estiver ocupado — é opcional."
            },
            {
                text: "You mustn't share confidential information with other departments.",
                translation: "Você não pode compartilhar informações confidenciais com outros departamentos."
            },
            {
                text: "Could I leave a bit early today? I have a doctor's appointment.",
                translation: "Eu poderia sair um pouco mais cedo hoje? Tenho uma consulta médica."
            },
            {
                text: "You should ask for a raise — you've done such a great job this year.",
                translation: "Você deveria pedir um aumento — você fez um trabalho tão bom este ano."
            },
            {
                text: "Employees may work from home on Fridays.",
                translation: "Os funcionários podem trabalhar de casa às sextas-feiras."
            }
        ]),

        dialogue([
            { speaker: "Grace", text: "Oliver, do you have a minute? I need some advice." },
            { speaker: "Oliver", text: "Sure, what's up?" },
            { speaker: "Grace", text: "My workload has been really heavy lately. Do you think I should talk to our manager about it?" },
            { speaker: "Oliver", text: "Definitely. You shouldn't have to deal with all that stress alone." },
            { speaker: "Grace", text: "You're right. Also, could I ask you something? Do we have to come in on Saturday for the project?" },
            { speaker: "Oliver", text: "No, we don't have to — it's optional, but the deadline is still Monday." },
            { speaker: "Grace", text: "Okay, that helps. I mustn't forget to finish the presentation tonight, though." },
            { speaker: "Oliver", text: "Good luck! And remember, you can always ask me if you need help with the workload." }
        ]),

        grammar(workBlocks[0].title, workBlocks[0].text),

        list([

            "must / have to — obligation",

            "don't have to — no obligation",

            "mustn't — prohibition",

            "can / could / may — permission",

            "should / ought to — advice"

        ]),

        tip(
            "Don't Have To vs Mustn't",
            "Don't confuse these two. 'You don't have to work overtime' means it's optional. 'You mustn't be late' means it's forbidden. They are opposites, even though both use 'must'-related words."
        ),

        culture(
            "Talking to Your Manager",
            "In many English-speaking workplaces, it's normal and even encouraged to speak directly with your manager about workload, deadlines or requesting time off, rather than avoiding the conversation."
        ),

        quiz(
            "Choose the correct sentence for prohibition.",
            [
                "You don't have to smoke here.",
                "You mustn't smoke here.",
                "You should smoke here.",
                "You could smoke here."
            ],
            1,
            "'Mustn't' expresses prohibition — something that is not allowed."
        ),

        quiz(
            "Choose the correct sentence for advice.",
            [
                "You have to ask for a raise.",
                "You mustn't ask for a raise.",
                "You should ask for a raise.",
                "You can ask for a raise."
            ],
            2,
            "'Should' is used to give advice, not a strict obligation."
        ),

        quiz(
            "\"You ___ come to the meeting — it's optional.\" Choose the correct modal.",
            ["mustn't", "have to", "don't have to", "should"],
            2,
            "'Don't have to' shows there is no obligation — the meeting is optional."
        )

    ],

    summary: {

        tip:
            "Practice describing your own workplace rules using 'have to' for obligations, 'mustn't' for things that are forbidden, and 'should' for advice.",

        review: [

            "must / have to — obligation",

            "mustn't — prohibition",

            "can / could / may — permission",

            "should / ought to — advice"

        ]

    }

};
