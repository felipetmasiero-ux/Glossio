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

export const b1ReviewLesson = {

    id: "french-b1-review",

    language: "french",

    level: "B1",

    category: "Review",

    topic: "review",

    order: 12,

    title: "Révision B1 et Communication Réelle",

    subtitle:
        "Revise toda a gramática do módulo B1 de francês em situações reais de comunicação, combinando passé composé, subjuntivo, condicionnel e voz passiva.",

    description:
        "Uma revisão final combinando passé composé, imparfait, futur, pronomes relativos, conditionnel de politesse, subjonctif, cause/conséquence, si hypothétique, voz passiva e discours rapporté.",

    cover: "/covers/b1-review-fr.webp",

    estimatedTime: 15,

    difficulty: 3,

    xp: 45,

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

        "Review every grammar point from the French B1 module",

        "Recognize and combine multiple structures in real conversation",

        "Test yourself with mixed questions from every lesson",

        "Feel ready to communicate confidently at B1 level in French"

    ],

    vocabulary: vocabulary([
        "tournant décisif",
        "parcours",
        "ambitieux",
        "promotion",
        "digne de confiance",
        "sens de l'humour",
        "collègue",
        "négocier",
        "se perdre",
        "imprévu",
        "stressé",
        "bien-être",
        "accro à",
        "se déconnecter",
        "à mon avis",
        "au contraire",
        "durable",
        "recycler",
        "captivant",
        "adaptation",
        "gros titre",
        "tout à coup"
    ]),

    blocks: [

        heading("Tu as Atteint le Niveau B1 !"),

        paragraph(
            "Félicitations pour avoir terminé le module B1 ! Tu as appris à parler d'expériences, de projets, de relations, de travail, de voyages, de santé, de technologie, d'opinions, d'environnement, de médias et d'actualités. Cette leçon rassemble toutes les structures ensemble."
        ),

        examples([
            {
                text: "Je me suis inscrit à cette formation parce que je voulais changer de carrière.",
                translation: "Me inscrevi nesse curso porque eu queria mudar de carreira."
            },
            {
                text: "Je vais commencer la semaine prochaine — j'ai déjà tout organisé.",
                translation: "Vou começar semana que vem — já organizei tudo."
            },
            {
                text: "C'est un collègue dont je t'ai déjà parlé plusieurs fois.",
                translation: "É um colega de quem eu já te falei várias vezes."
            },
            {
                text: "Pourriez-vous me donner votre avis sur mon projet ?",
                translation: "Você poderia me dar sua opinião sobre meu projeto?"
            },
            {
                text: "On était en train de préparer la présentation quand tout à coup, l'ordinateur est tombé en panne.",
                translation: "Estávamos preparando a apresentação quando, de repente, o computador quebrou."
            },
            {
                text: "Il faut que je fasse plus attention à mon bien-être en ce moment.",
                translation: "Preciso prestar mais atenção ao meu bem-estar neste momento."
            },
            {
                text: "Je suis un peu accro à mon téléphone, donc j'ai décidé de faire une pause numérique.",
                translation: "Sou um pouco viciado no celular, então decidi fazer uma pausa digital."
            },
            {
                text: "Je ne pense pas que ce soit la meilleure solution, mais je respecte ton point de vue.",
                translation: "Não acho que essa seja a melhor solução, mas respeito seu ponto de vista."
            },
            {
                text: "Si je changeais vraiment de carrière, je serais sans doute plus heureux.",
                translation: "Se eu realmente mudasse de carreira, provavelmente seria mais feliz."
            },
            {
                text: "Cette décision a été bien accueillie par toute l'équipe.",
                translation: "Essa decisão foi bem recebida por toda a equipe."
            },
            {
                text: "Mon collègue m'a dit qu'il était fier de moi.",
                translation: "Meu colega me disse que estava orgulhoso de mim."
            }
        ]),

        dialogue([
            { speaker: "Camille", text: "Alors, comment ça se passe dans ton nouveau travail ?" },
            { speaker: "Hugo", text: "Très bien ! Je me suis inscrit à une formation aussi, parce que je voulais continuer à progresser." },
            { speaker: "Camille", text: "C'est génial. Tu as un collègue dont tu m'avais parlé, non ? Comment ça se passe avec lui ?" },
            { speaker: "Hugo", text: "Oui, on s'entend très bien. D'ailleurs, il m'a dit qu'il était impressionné par mon travail." },
            { speaker: "Camille", text: "Ça ne m'étonne pas. Est-ce que tu es toujours aussi stressé qu'avant ?" },
            { speaker: "Hugo", text: "Un peu moins. Il faut que je fasse plus attention à mon bien-être, mais je fais des efforts." },
            { speaker: "Camille", text: "Bonne idée. Et sinon, tu as des projets pour la suite ?" },
            { speaker: "Hugo", text: "Je vais peut-être postuler à une promotion l'année prochaine. Si ça marchait, je serais vraiment fier de moi." },
            { speaker: "Camille", text: "Je pense que tu as toutes tes chances. À mon avis, tu as beaucoup progressé." },
            { speaker: "Hugo", text: "Merci, ça me touche. Avec le recul, je suis vraiment content d'avoir pris cette décision." }
        ]),

        list([

            "Le passé composé et l'imparfait",

            "Le futur simple et le futur proche",

            "Les pronoms relatifs : qui, que, où, dont",

            "Le conditionnel de politesse",

            "Raconter une histoire — passé composé + imparfait + pronoms",

            "Il faut que + subjonctif",

            "Cause et conséquence",

            "Exprimer une opinion : indicatif ou subjonctif",

            "Les phrases avec si : réel ou hypothétique",

            "La voix passive",

            "Le discours rapporté"

        ]),

        quiz(
            "Quelle phrase décrit le contexte au passé ?",
            ["Il a fait beau.", "Il faisait beau.", "Il fera beau.", "Il ferait beau."],
            1,
            "L'imparfait ('il faisait beau') décrit le contexte."
        ),

        quiz(
            "Quelle phrase exprime un projet déjà décidé ?",
            ["Je partirai un jour.", "Je vais partir demain.", "Je partirais si je pouvais.", "Je pars parfois."],
            1,
            "Le futur proche ('je vais partir') exprime un projet déjà décidé."
        ),

        quiz(
            "Choisis le bon pronom : \"C'est le livre ___ j'ai lu.\"",
            ["qui", "que", "où", "dont"],
            1,
            "'Que' remplace le complément d'objet direct : 'le livre que j'ai lu'."
        ),

        quiz(
            "Quelle est la phrase la plus polie ?",
            ["Donne-moi ça.", "Pourrais-tu me donner ça ?", "Tu me donnes ça ?", "Donnez ça !"],
            1,
            "Le conditionnel ('pourrais-tu') rend la demande plus polie."
        ),

        quiz(
            "Quel pronom remplace un lieu ?",
            ["le", "en", "y", "que"],
            2,
            "'Y' remplace un lieu déjà mentionné."
        ),

        quiz(
            "Choisis la bonne forme : \"Il faut que tu ___ à l'heure.\"",
            ["es", "sois", "être", "étais"],
            1,
            "Après 'il faut que', on utilise le subjonctif : 'que tu sois'."
        ),

        quiz(
            "Quel mot exprime une conséquence ?",
            ["grâce à", "puisque", "donc", "à cause de"],
            2,
            "'Donc' exprime une conséquence."
        ),

        quiz(
            "Choisis la bonne phrase après une opinion négative.",
            ["Je ne pense pas que c'est vrai.", "Je ne pense pas que ce soit vrai.", "Je ne pense pas c'est vrai.", "Je ne pense pas être vrai."],
            1,
            "Après 'je ne pense pas que', on utilise le subjonctif : 'ce soit vrai'."
        ),

        quiz(
            "Complète : \"Si j'avais plus de temps, je ___ plus souvent.\"",
            ["voyage", "voyagerai", "voyagerais", "voyageais"],
            2,
            "'Si' + imparfait est suivi du conditionnel présent : 'je voyagerais'."
        ),

        quiz(
            "Choisis la bonne phrase passive.",
            ["Ce livre écrit par elle.", "Ce livre a été écrit par elle.", "Ce livre écrit elle.", "Ce livre est écrivait par elle."],
            1,
            "La voix passive se forme avec 'être' + participe passé : 'a été écrit'."
        ),

        quiz(
            "Discours direct : \"Je suis prêt.\" Choisis la version rapportée.",
            ["Il a dit qu'il est prêt.", "Il a dit qu'il était prêt.", "Il a dit qu'il a été prêt.", "Il dit qu'il était prêt."],
            1,
            "Le présent ('je suis') devient l'imparfait ('il était') au discours rapporté."
        ),

        tip(
            "Continue à Pratiquer",
            "La meilleure façon de consolider la grammaire B1, c'est de l'utiliser dans de vraies conversations. Essaie de discuter d'un sujet qui te tient à cœur et vois combien de ces structures tu arrives à combiner naturellement."
        ),

        culture(
            "Atteindre le Niveau B1",
            "Le CECRL décrit le niveau B1 comme celui de l'utilisateur indépendant : tu peux comprendre l'essentiel d'une conversation sur des sujets familiers, raconter des expériences, exprimer des opinions et justifier tes choix. C'est une étape importante dans ton apprentissage du français."
        )

    ],

    summary: {

        tip:
            "Bravo ! Révise les points de grammaire qui t'ont semblé difficiles, puis continue à pratiquer avec de vraies conversations en français.",

        review: [

            "Tu as terminé 11 leçons du module B1.",

            "Tu peux parler d'expériences, de projets et d'opinions avec plus de précision.",

            "Tu as combiné passé composé, subjonctif, conditionnel, passif et discours rapporté.",

            "Tu es prêt à continuer à progresser vers le niveau B2 !"

        ]

    }

};
