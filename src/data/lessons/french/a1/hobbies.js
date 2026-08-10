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

export const hobbiesLesson = {

    id: "french-a1-hobbies",

    language: "french",

    level: "A1",

    category: "Daily Life",

    topic: "hobbies",

    order: 12,

    title: "Hobbies",

    subtitle:
        "Fale sobre tempo livre e o que você gosta de fazer em francês.",

    description:
        "Aprenda a falar sobre hobbies e atividades de tempo livre usando 'aimer' e 'jouer' em francês.",

    cover: "/covers/hobbies.webp",

    estimatedTime: 8,

    difficulty: 1,

    xp: 30,

    tags: [
        "hobbies",
        "vocabulary",
        "beginner"
    ],

    skills: [
        "reading",
        "vocabulary",
        "speaking"
    ],

    objectives: [

        "Name common hobbies and free-time activities",

        "Use 'aimer' to say what you like",

        "Use 'jouer à/de' correctly",

        "Ask someone about their hobbies"

    ],

    vocabulary: vocabulary([
        "lecture",
        "musique",
        "sport",
        "danse",
        "peinture",
        "cinéma",
        "jouer",
        "aimer",
        "randonnée",
        "jardinage"
    ]),

    blocks: [

        heading("Free Time"),

        paragraph(
            "Talking about hobbies is a great way to get to know someone. In French, use 'aimer' + noun or infinitive to say what you like: 'J'aime la musique.' / 'J'aime lire.'"
        ),

        examples([
            {
                text: "J'aime la lecture et la musique.",
                translation: "Eu gosto de leitura e música."
            },

            {
                text: "Elle adore la randonnée et le jardinage.",
                translation: "Ela adora caminhada e jardinagem."
            },

            {
                text: "Il joue de la guitare et il fait de la peinture.",
                translation: "Ele toca guitarra e pinta (faz pintura)."
            }
        ]),

        dialogue([
            { speaker: "Camille", text: "Qu'est-ce que tu aimes faire pendant ton temps libre ?" },
            { speaker: "Thomas", text: "J'aime le sport, surtout la randonnée. Et toi ?" },
            { speaker: "Camille", text: "Moi, j'aime la peinture et le cinéma." },
            { speaker: "Thomas", text: "Tu joues d'un instrument ?" },
            { speaker: "Camille", text: "Non, mais j'adore écouter de la musique." }
        ]),

        grammar(
            "Jouer à vs Jouer de",
            "Use 'jouer à' for games and sports: 'jouer au football', 'jouer aux cartes'. Use 'jouer de' for musical instruments: 'jouer de la guitare', 'jouer du piano'."
        ),

        list([

            "J'aime la lecture / la musique / le sport.",

            "J'aime la danse / la peinture / le cinéma.",

            "jouer à + sport ou jeu",

            "jouer de + instrument de musique",

            "faire de la randonnée / du jardinage"

        ]),

        tip(
            "Aimer, adorer, détester",
            "Use 'aimer' (to like), 'adorer' (to love) or 'détester' (to hate) followed by 'le/la/les' + noun or a verb in the infinitive to talk about your preferences."
        ),

        culture(
            "Popular Hobbies in France",
            "Hobbies like cycling, hiking (la randonnée) and cinema are very popular in France. Many towns also have local clubs for painting, dance or music that welcome beginners."
        ),

        quiz(
            "Which sentence is correct for playing an instrument?",
            ["Je joue au piano.", "Je joue de piano.", "Je joue du piano.", "Je joue le piano."],
            2,
            "Use 'jouer de' with instruments: 'Je joue du piano.'"
        ),

        quiz(
            "Which sentence is correct for a sport?",
            ["Je joue de football.", "Je joue au football.", "Je joue le football.", "Je joue football."],
            1,
            "Use 'jouer à' with sports and games: 'Je joue au football.'"
        ),

        quiz(
            "Which word means 'hiking'?",
            ["Jardinage", "Peinture", "Randonnée", "Danse"],
            2,
            "'Randonnée' means 'hiking' in French."
        )

    ],

    summary: {

        tip:
            "Practice talking about your own hobbies out loud using 'J'aime...', 'jouer à/de' and the vocabulary from this lesson.",

        review: [

            "J'aime la lecture / la musique / le sport.",

            "jouer à (sport/jeu) vs jouer de (instrument)",

            "aimer, adorer, détester + nom ou infinitif",

            "randonnée, jardinage, peinture, danse"

        ]

    }

};
