import { workCareersBlocks } from "../../../grammar/shared/english/b2/workCareers";
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

    id: "english-b2-work-careers",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "work-careers",

    order: 3,

    title: "Work, Careers & Professional Communication",

    subtitle:
        "Fale sobre situações profissionais em inglês usando verbos modais de dedução e especulação: must, might, could e can't.",

    description:
        "Aprenda vocabulário de liderança e cultura organizacional, e como usar verbos modais para expressar certeza, possibilidade e dedução no presente e no passado.",

    cover: "/covers/work-careers.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "work",
        "careers",
        "modals"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss careers, leadership and workplace culture",

        "Use modal verbs to express certainty and possibility",

        "Make deductions about the present using modal verbs",

        "Make deductions about the past using modal + have + past participle"

    ],

    vocabulary: vocabulary([
        "leadership",
        "leadership skills",
        "accountable",
        "hold someone accountable",
        "delegate",
        "workplace culture",
        "constructive feedback",
        "underperform",
        "networking",
        "soft skills",
        "onboarding",
        "probation period",
        "severance package",
        "work ethic",
        "micromanage",
        "take the initiative",
        "climb the corporate ladder",
        "red tape",
        "touch base",
        "follow up on",
        "professional development",
        "corporate"
    ]),

    blocks: [

        heading("Making Deductions"),

        paragraph(
            "In professional English, we constantly speculate about situations we don't have full information about — where a colleague is, why a decision was made — using modal verbs to show exactly how certain we are."
        ),

        examples([
            {
                text: "She must be exhausted after that presentation — she's been preparing for weeks.",
                translation: "Ela deve estar exausta depois daquela apresentação — ela vem se preparando há semanas."
            },
            {
                text: "He might have missed the email about the meeting.",
                translation: "Ele pode ter perdido o e-mail sobre a reunião."
            },
            {
                text: "They can't have finished the project already — it's only been an hour.",
                translation: "Eles não podem ter terminado o projeto já — faz só uma hora."
            },
            {
                text: "She could be in a meeting right now; that's probably why she's not answering.",
                translation: "Ela pode estar numa reunião agora; provavelmente é por isso que não está respondendo."
            },
            {
                text: "He must have forgotten about the interview — he's usually never late.",
                translation: "Ele deve ter esquecido da entrevista — normalmente ele nunca se atrasa."
            },
            {
                text: "This might not be the best time to ask for a raise, given the layoffs.",
                translation: "Talvez não seja o melhor momento para pedir um aumento, considerando as demissões."
            }
        ]),

        dialogue([
            { speaker: "Isabelle", text: "Have you seen Daniel today? He wasn't at the morning meeting." },
            { speaker: "Owen", text: "No, I haven't. He must be running late or something." },
            { speaker: "Isabelle", text: "That's odd, he's usually never late. He might have overslept." },
            { speaker: "Owen", text: "Or maybe he's stuck in traffic. He can't have forgotten — he mentioned it yesterday." },
            { speaker: "Isabelle", text: "True. Should we message him?" },
            { speaker: "Owen", text: "Might as well. Actually, he could just be dealing with something urgent at home." },
            { speaker: "Isabelle", text: "That's possible too. Anyway, have you heard anything about the promotion decisions?" },
            { speaker: "Owen", text: "Not officially, but rumor has it they must have already decided — HR's been in closed meetings all week." },
            { speaker: "Isabelle", text: "Interesting. I guess we'll find out soon enough." }
        ]),

        grammar(workCareersBlocks[0].title, workCareersBlocks[0].text),

        list([

            "must + verb — strong certainty (true)",

            "can't + verb — strong certainty (not true)",

            "might/could/may + verb — possibility",

            "must/might/can't + have + past participle — past deduction"

        ]),

        tip(
            "Must (Deduction) vs Have To (Obligation)",
            "Don't confuse 'must' for deduction with 'have to' for obligation. 'She must be tired' is a guess based on evidence. 'She has to finish the report' is an obligation. They look similar but mean very different things."
        ),

        culture(
            "Reading Between the Lines at Work",
            "In many English-speaking workplaces, casual speculation about colleagues ('She must be busy') is common small talk, but making confident claims about sensitive topics — like layoffs or promotions — without real evidence is generally considered unprofessional."
        ),

        quiz(
            "Choose the sentence expressing strong certainty something is true.",
            ["She might be at lunch.", "She must be at lunch.", "She could be at lunch.", "She may be at lunch."],
            1,
            "'Must' expresses strong certainty that something is true, based on evidence."
        ),

        quiz(
            "Choose the correct past deduction.",
            [
                "He must forgot the meeting.",
                "He must have forgotten the meeting.",
                "He must has forgotten the meeting.",
                "He must forgetting the meeting."
            ],
            1,
            "Past deduction uses modal + have + past participle: 'must have forgotten'."
        ),

        quiz(
            "Choose the sentence expressing strong certainty something is NOT true.",
            [
                "They might not have left yet.",
                "They can't have left yet.",
                "They may not have left yet.",
                "They don't have to leave yet."
            ],
            1,
            "'Can't have' expresses strong certainty that something did not happen."
        )

    ],

    summary: {

        tip:
            "Practice speculating about everyday situations using 'must', 'might', 'could' and 'can't' — both about now and about the past.",

        review: [

            "must/can't — strong certainty",

            "might/could/may — possibility",

            "modal + have + past participle — past deduction",

            "leadership, accountable, delegate, soft skills"

        ]

    }

};
