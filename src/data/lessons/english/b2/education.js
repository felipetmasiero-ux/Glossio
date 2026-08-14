import { educationBlocks } from "../../../grammar/shared/english/b2/education";
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

export const educationLesson = {

    id: "english-b2-education",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "education",

    order: 2,

    title: "Education & Learning",

    subtitle:
        "Fale sobre educação e aprendizado em inglês usando estruturas passivas avançadas e a construção causativa 'have something done'.",

    description:
        "Aprenda vocabulário de educação e aprendizado, e como usar a voz passiva e a construção causativa para descrever processos acadêmicos.",

    cover: "/covers/education.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "education",
        "passive",
        "causative"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss education systems, learning strategies and qualifications",

        "Use passive structures to describe academic processes",

        "Use the causative 'have/get something done'",

        "Distinguish the causative from the plain passive"

    ],

    vocabulary: vocabulary([
        "curriculum",
        "tuition",
        "lifelong learning",
        "hands-on",
        "rote learning",
        "cram",
        "drop out",
        "get a degree in",
        "qualification",
        "assess",
        "assessment",
        "self-paced",
        "keep up with",
        "fall behind",
        "grasp a concept",
        "tutor",
        "mentorship",
        "transferable skills",
        "academic",
        "get the hang of"
    ]),

    blocks: [

        heading("Describing Academic Processes"),

        paragraph(
            "Academic and formal English relies heavily on the passive voice to describe processes, and on the causative structure to describe arranging for someone else to do something."
        ),

        examples([
            {
                text: "Students are assessed through a combination of exams and coursework.",
                translation: "Os alunos são avaliados através de uma combinação de provas e trabalhos."
            },
            {
                text: "I had my thesis reviewed by a professor before submitting it.",
                translation: "Tive minha tese revisada por um professor antes de entregá-la."
            },
            {
                text: "The curriculum has been redesigned to include more hands-on learning.",
                translation: "O currículo foi reformulado para incluir mais aprendizado prático."
            },
            {
                text: "She's having her essay proofread before the deadline.",
                translation: "Ela está tendo seu texto revisado antes do prazo."
            },
            {
                text: "A lot of students get their assignments checked by a tutor first.",
                translation: "Muitos alunos fazem seus trabalhos serem revisados por um tutor primeiro."
            },
            {
                text: "New teaching methods are being introduced across the whole department.",
                translation: "Novos métodos de ensino estão sendo introduzidos em todo o departamento."
            }
        ]),

        dialogue([
            { speaker: "Aaliyah", text: "How's your thesis coming along?" },
            { speaker: "Ben", text: "Slowly. I've been trying to keep up with all the feedback from my advisor." },
            { speaker: "Aaliyah", text: "Have you had anyone else look at it?" },
            { speaker: "Ben", text: "Yeah, actually — I had it reviewed by a professor from another department last week." },
            { speaker: "Aaliyah", text: "That's smart. What did they say?" },
            { speaker: "Ben", text: "They pointed out a few gaps in my argument. I'm having it proofread again before I submit it." },
            { speaker: "Aaliyah", text: "Good idea. Honestly, I think our whole curriculum should be redesigned — it's way too theoretical." },
            { speaker: "Ben", text: "I agree. More hands-on learning would help a lot of us actually grasp the concepts." },
            { speaker: "Aaliyah", text: "Exactly. Anyway, are you getting a tutor for the final exam?" },
            { speaker: "Ben", text: "I might. I don't want to fall behind this close to graduation." }
        ]),

        grammar(educationBlocks[0].title, educationBlocks[0].text),

        list([

            "subject + be + past participle — passive",

            "have/get + object + past participle — causative",

            "assess, curriculum, hands-on, tutor",

            "keep up with, fall behind, grasp a concept"

        ]),

        tip(
            "Causative vs Plain Passive",
            "Don't confuse the causative with the passive. The causative shows someone arranged for the action: 'I had my car fixed' means I arranged it. The plain passive just describes what happened to the subject: 'My car was fixed' doesn't say who arranged it, if anyone."
        ),

        culture(
            "Continuous Assessment",
            "Many English-speaking education systems rely heavily on continuous assessment — coursework, presentations and projects throughout the term — rather than a single final exam, which can be a big adjustment for students used to a different system."
        ),

        quiz(
            "Choose the correct passive sentence.",
            [
                "Students assess through exams.",
                "Students are assessed through exams.",
                "Students assessing through exams.",
                "Students have assess through exams."
            ],
            1,
            "The passive needs 'be' + past participle: 'are assessed'."
        ),

        quiz(
            "Choose the correct causative sentence.",
            [
                "I fixed my laptop by a technician.",
                "I had my laptop fixed by a technician.",
                "I had fixed my laptop by a technician.",
                "I have my laptop fix by a technician."
            ],
            1,
            "The causative is have + object + past participle: 'I had my laptop fixed.'"
        ),

        quiz(
            "What does \"I had my essay proofread\" mean?",
            [
                "I proofread the essay myself.",
                "Someone else proofread the essay for me.",
                "The essay was never proofread.",
                "I will proofread the essay."
            ],
            1,
            "The causative shows the subject arranged for someone else to do the action."
        )

    ],

    summary: {

        tip:
            "Practice describing a process at your school or job using the passive, and describe something you arranged for someone else to do using the causative.",

        review: [

            "passive — subject + be + past participle",

            "causative — have/get + object + past participle",

            "curriculum, assessment, hands-on, tutor",

            "keep up with, fall behind, grasp a concept"

        ]

    }

};
