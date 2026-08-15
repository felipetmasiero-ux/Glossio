import { relationshipsB1Blocks } from "../../../grammar/shared/french/relationshipsB1";
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

export const relationshipsLesson = {

    id: "french-b1-relationships",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "relationships",

    order: 3,

    title: "Relations et Personnalité",

    subtitle:
        "Descreva pessoas e relacionamentos em francês usando os pronomes relativos qui, que, où e dont.",

    description:
        "Aprenda vocabulário de personalidade e relacionamentos, e como usar os pronomes relativos qui, que, où e dont para descrever pessoas, lugares e coisas.",

    cover: "/covers/relationships-fr.webp",

    estimatedTime: 11,

    difficulty: 3,

    xp: 35,

    tags: [
        "relationships",
        "personality",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Describe someone's personality in detail",

        "Talk about friendships and relationships",

        "Use the relative pronouns qui, que, où and dont",

        "Choose the correct relative pronoun based on its function"

    ],

    vocabulary: vocabulary([
        "personnalité",
        "digne de confiance",
        "extraverti",
        "facile à vivre",
        "fiable",
        "têtu",
        "bien s'entendre avec",
        "ami proche",
        "connaissance",
        "faire confiance à",
        "dispute",
        "se réconcilier",
        "être en couple",
        "rompre",
        "taper sur les nerfs de quelqu'un",
        "bienveillant",
        "honnête",
        "sens de l'humour",
        "rancunier",
        "complice"
    ]),

    blocks: [

        heading("Décrire les Gens et les Relations"),

        paragraph(
            "Pour décrire une personne, un lieu ou une chose plus précisément, le français utilise les pronoms relatifs : 'qui' pour le sujet, 'que' pour le complément d'objet direct, 'où' pour un lieu ou un moment, et 'dont' pour les verbes construits avec 'de'."
        ),

        examples([
            {
                text: "C'est l'amie qui me fait toujours rire, même dans les moments difficiles.",
                translation: "É a amiga que sempre me faz rir, mesmo nos momentos difíceis."
            },
            {
                text: "C'est le café où on s'est rencontrés pour la première fois.",
                translation: "É o café onde nos conhecemos pela primeira vez."
            },
            {
                text: "Je ne fais pas confiance aux gens qui n'admettent jamais leurs erreurs.",
                translation: "Eu não confio em pessoas que nunca admitem seus erros."
            },
            {
                text: "Le collègue dont je t'ai parlé est en fait un très bon ami maintenant.",
                translation: "O colega de quem eu te falei na verdade é um bom amigo agora."
            },
            {
                text: "Nous avons eu une dispute qui a duré tout le week-end.",
                translation: "Tivemos uma briga que durou o fim de semana inteiro."
            },
            {
                text: "C'est quelqu'un dont j'ai vraiment besoin en ce moment.",
                translation: "É alguém de quem eu realmente preciso neste momento."
            },
            {
                text: "C'est le genre de personne que tout le monde apprécie.",
                translation: "É o tipo de pessoa que todo mundo aprecia."
            }
        ]),

        dialogue([
            { speaker: "Inès", text: "Tu as rencontré la nouvelle copine de Ben ?" },
            { speaker: "Théo", text: "Oui, elle est très extravertie. C'est le genre de personne qui parle à tout le monde à une fête." },
            { speaker: "Inès", text: "C'est vrai ! Ben est plutôt timide d'habitude, mais elle apporte un côté différent chez lui." },
            { speaker: "Théo", text: "Ils se sont rencontrés dans ce café où on va souvent étudier, en fait." },
            { speaker: "Inès", text: "Sans blague ! Petit monde. J'espère qu'ils s'entendent bien — Ben peut être un peu têtu parfois." },
            { speaker: "Théo", text: "C'est vrai, mais c'est aussi une des personnes les plus honnêtes et fiables que je connaisse." },
            { speaker: "Inès", text: "Complètement d'accord. J'espère juste qu'ils n'auront pas trop de disputes pour de petites choses." },
            { speaker: "Théo", text: "Je suis sûr que ça va bien se passer. Ils ont l'air de bien s'entendre." }
        ]),

        grammar(relationshipsB1Blocks[0].title, relationshipsB1Blocks[0].text),

        list([

            "qui — sujet",

            "que — complément d'objet direct",

            "où — lieu ou moment",

            "dont — verbes construits avec 'de'"

        ]),

        tip(
            "Que Devient Qu'",
            "'Que' devient 'qu'' devant une voyelle : 'la personne qu'il aime.' Mais 'qui' reste toujours 'qui', même devant une voyelle : 'la personne qui arrive.'"
        ),

        culture(
            "Décrire les Gens avec Franchise",
            "Entre amis proches dans les cultures francophones, décrire la personnalité de quelqu'un honnêtement — même en mentionnant un défaut comme 'têtu' — est généralement vu comme un signe d'affection, pas de méchanceté."
        ),

        quiz(
            "Choisis le bon pronom : \"C'est la personne ___ m'a aidé l'année dernière.\"",
            ["que", "qui", "où", "dont"],
            1,
            "'Qui' remplace le sujet du verbe qui suit : 'qui m'a aidé.'"
        ),

        quiz(
            "Choisis la bonne phrase.",
            [
                "C'est le restaurant que nous avons dîné.",
                "C'est le restaurant où nous avons dîné.",
                "C'est le restaurant qui nous avons dîné.",
                "C'est le restaurant dont nous avons dîné."
            ],
            1,
            "'Où' introduit un lieu : 'le restaurant où nous avons dîné.'"
        ),

        quiz(
            "Quel pronom utilise-t-on avec un verbe construit avec 'de' ?",
            ["qui", "que", "où", "dont"],
            3,
            "'Dont' remplace un complément introduit par 'de' : 'parler de quelqu'un' → 'la personne dont je parle.'"
        )

    ],

    summary: {

        tip:
            "Pratique à décrire des gens que tu connais avec 'qui', des choses avec 'que', des lieux avec 'où', et des personnes dont tu as parlé avec 'dont'.",

        review: [

            "qui / que / où / dont",

            "qui = sujet, que = complément d'objet direct",

            "digne de confiance, extraverti, fiable, têtu",

            "bien s'entendre avec, rompre, se réconcilier"

        ]

    }

};
