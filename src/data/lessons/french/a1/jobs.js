import { jobsBlocks } from "../../../grammar/shared/french/jobs";
import {
    heading,
    paragraph,
    examples,
    dialogue,
    grammar,
    list,
    tip,
    culture,
    quiz,
    vocabulary
} from "../../../../utils/lessons/builders";

export const jobsLesson = {

    id: "french-a1-jobs",

    language: "french",

    level: "A1",

    category: "Basics",

    topic: "jobs",

    order: 8,

    title: "Profissões",

    subtitle:
        "Fale sobre ocupações e o que as pessoas fazem profissionalmente em francês.",

    description:
        "Aprenda os nomes de profissões mais comuns em francês e como perguntar e responder 'Qu'est-ce que tu fais dans la vie ?'",

    cover: "/covers/jobs.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 25,

    tags: [
        "jobs",
        "vocabulary",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Name common occupations",

        "Ask 'Qu'est-ce que tu fais dans la vie ?'",

        "Say what you do for a living",

        "Use masculine and feminine job titles"

    ],

    vocabulary: vocabulary([
        "enseignant",
        "médecin",
        "ingénieur",
        "infirmier",
        "gérant",
        "étudiant",
        "policier",
        "qu'est-ce que tu fais dans la vie ?",
        "je travaille comme..."
    ]),

    blocks: [

        heading("Talking about Work"),

        paragraph(
            "In French, asking about someone's job is a common way to start a conversation. A natural, informal question is 'Qu'est-ce que tu fais dans la vie ?' — literally 'What do you do in life?'"
        ),

        examples([
            {
                text: "Qu'est-ce que tu fais dans la vie ? — Je suis enseignant.",
                translation: "O que você faz? — Eu sou professor."
            },

            {
                text: "Elle travaille comme infirmière à l'hôpital.",
                translation: "Ela trabalha como enfermeira no hospital."
            },

            {
                text: "Je suis étudiant. J'étudie l'ingénierie.",
                translation: "Eu sou estudante. Eu estudo engenharia."
            }
        ]),

        dialogue([
            { speaker: "Sofia", text: "Alors, qu'est-ce que tu fais dans la vie, Marco ?" },
            { speaker: "Marco", text: "Je suis ingénieur. Je travaille dans une entreprise de logiciels." },
            { speaker: "Sofia", text: "Super ! Moi, je suis enseignante." },
            { speaker: "Marco", text: "Génial ! Qu'est-ce que tu enseignes ?" },
            { speaker: "Sofia", text: "J'enseigne le français aux débutants." }
        ]),

        grammar(jobsBlocks[0].title, jobsBlocks[0].text),

        list([

            "Je suis enseignant / enseignante.",

            "Je suis médecin.",

            "Je suis ingénieur / ingénieure.",

            "Je suis étudiant / étudiante.",

            "Je travaille comme infirmier / infirmière."

        ]),

        tip(
            "Travailler comme vs Travailler chez",
            "'Travailler comme' describes your role: 'Je travaille comme serveur.' 'Travailler chez/pour' describes the company: 'Je travaille chez Renault.' / 'Je travaille pour Google.'"
        ),

        culture(
            "Small Talk about Jobs",
            "In French-speaking cultures, asking 'Qu'est-ce que tu fais dans la vie ?' at a party or event is common small talk, though topics like salary usually remain more private than in some other cultures."
        ),

        quiz(
            "Which question asks about someone's job?",
            ["Qu'est-ce que tu fais dans la vie ?", "Quel âge as-tu ?", "Tu viens d'où ?", "Comment tu t'appelles ?"],
            0,
            "'Qu'est-ce que tu fais dans la vie ?' is the natural way to ask about someone's occupation."
        ),

        quiz(
            "Which sentence is correct for a woman?",
            ["Je suis infirmier.", "Je suis infirmière.", "Je suis un infirmier.", "Je infirmière."],
            1,
            "The feminine form of 'infirmier' is 'infirmière'."
        ),

        quiz(
            "Which job title does not change between masculine and feminine?",
            ["Enseignant", "Étudiant", "Médecin", "Policier"],
            2,
            "'Médecin' stays the same for both genders: 'un médecin' or 'une médecin'."
        )

    ],

    summary: {

        tip:
            "Practice saying what you do (or want to do) using 'Je suis...' and 'Je travaille comme...'",

        review: [

            "Qu'est-ce que tu fais dans la vie ? — Je suis...",

            "Most job titles change with gender: enseignant/enseignante",

            "Médecin stays the same for both genders",

            "enseignant, médecin, ingénieur, infirmier, étudiant"

        ]

    }

};
