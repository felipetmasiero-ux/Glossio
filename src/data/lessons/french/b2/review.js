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

export const b2ReviewLesson = {

    id: "french-b2-review",

    language: "french",

    level: "B2",

    category: "Review",

    topic: "review",

    order: 12,

    title: "Révision B2 et Communication Réelle",

    subtitle:
        "Revise toda a gramática do módulo B2 de francês em situações reais de comunicação, combinando plus-que-parfait, subjuntivo, hipóteses e mise en relief.",

    description:
        "Uma revisão final combinando plus-que-parfait, causatif, devoir (dedução/arrependimento), concessão, hipótese irreal do passado, conectores soutenus, verbos declarativos, ce qui/ce que/ce dont, subjuntivo emocional, mise en relief e marcadores de nuance.",

    cover: "/covers/b2-review-fr.webp",

    estimatedTime: 16,

    difficulty: 4,

    xp: 50,

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

        "Review every grammar point from the French B2 module",

        "Recognize and combine multiple advanced structures in real conversation",

        "Test yourself with mixed questions from every lesson",

        "Feel ready to communicate with precision and nuance at B2 level in French"

    ],

    vocabulary: vocabulary([
        "bilan",
        "lâcher prise",
        "maîtriser",
        "combler une lacune",
        "faire ses preuves",
        "hiérarchie",
        "bien que",
        "solidarité",
        "bouleverser",
        "enjeu éthique",
        "étant donné que",
        "urgence climatique",
        "nier que",
        "esprit critique",
        "ce qui",
        "susciter l'intérêt",
        "je regrette que",
        "trouver un terrain d'entente",
        "c'est...qui",
        "pouvoir d'achat",
        "il semblerait que",
        "peser le pour et le contre"
    ]),

    blocks: [

        heading("Tu as Atteint le Niveau B2 !"),

        paragraph(
            "Félicitations pour avoir terminé le module B2 ! Tu as appris à discuter de développement personnel, d'éducation, de carrière, de société, de science, d'environnement, de médias, de culture, de relations, d'économie et de débat avec précision et nuance. Cette leçon rassemble toutes les structures ensemble."
        ),

        examples([
            {
                text: "Ça fait des années que je voulais changer de vie, et j'avais déjà commencé à économiser avant de me lancer.",
                translation: "Fazia anos que eu queria mudar de vida, e eu já tinha começado a economizar antes de me lançar."
            },
            {
                text: "J'ai fait réviser mon projet par plusieurs experts avant de le présenter.",
                translation: "Fiz vários especialistas revisarem meu projeto antes de apresentá-lo."
            },
            {
                text: "Ça a dû être difficile pour toi, mais tu aurais peut-être dû en parler plus tôt.",
                translation: "Isso deve ter sido difícil pra você, mas talvez você devesse ter falado sobre isso mais cedo."
            },
            {
                text: "Bien que la décision ait été risquée, elle s'est révélée payante.",
                translation: "Embora a decisão tenha sido arriscada, ela se mostrou compensadora."
            },
            {
                text: "Si j'avais su à quel point ce serait difficile, j'aurais peut-être hésité.",
                translation: "Se eu soubesse o quão difícil seria, talvez tivesse hesitado."
            },
            {
                text: "Étant donné que la situation évoluait vite, il fallait s'adapter constamment, si bien qu'on a dû revoir tout notre plan.",
                translation: "Dado que a situação evoluía rápido, era preciso se adaptar constantemente, tanto que tivemos que revisar todo o plano."
            },
            {
                text: "Certains ont prétendu que ce projet était voué à l'échec, mais personne n'a jamais pu le prouver.",
                translation: "Alguns alegaram que esse projeto estava fadado ao fracasso, mas ninguém nunca conseguiu provar isso."
            },
            {
                text: "Ce qui compte le plus, ce n'est pas le résultat, c'est ce qu'on apprend en chemin.",
                translation: "O que mais importa não é o resultado, é o que se aprende no caminho."
            },
            {
                text: "Je regrette qu'on n'ait pas pris cette décision plus tôt, mais je suis fier du chemin parcouru.",
                translation: "Lamento que a gente não tenha tomado essa decisão antes, mas estou orgulhoso do caminho percorrido."
            },
            {
                text: "C'est cette expérience-là qui m'a vraiment transformé.",
                translation: "Foi essa experiência que realmente me transformou."
            },
            {
                text: "Il semblerait que ce choix ait été le bon, mais seul le temps nous le dira vraiment.",
                translation: "Parece que essa escolha foi a certa, mas só o tempo vai realmente dizer."
            }
        ]),

        dialogue([
            { speaker: "Léna", text: "Alors, comment tu te sens, un an après ton grand changement de carrière ?" },
            { speaker: "Karim", text: "Honnêtement, bien mieux que je ne l'espérais. Ça a dû être un choc pour mes anciens collègues, remarque." },
            { speaker: "Léna", text: "Sûrement ! Bien que la décision ait semblé risquée, elle s'est révélée payante, non ?" },
            { speaker: "Karim", text: "Complètement. Si j'avais su à quel point je serais plus épanoui, j'aurais peut-être sauté le pas plus tôt." },
            { speaker: "Léna", text: "Ce qui m'impressionne, c'est que tu as fait réviser ton projet par plusieurs experts avant de te lancer." },
            { speaker: "Karim", text: "Oui, je voulais être bien préparé. Étant donné que je changeais complètement de secteur, il fallait anticiper un maximum." },
            { speaker: "Léna", text: "C'est cette préparation-là qui a dû faire toute la différence, j'imagine." },
            { speaker: "Karim", text: "Exactement. Il semblerait que ce soit la clé : prendre le temps de bien réfléchir avant d'agir." },
            { speaker: "Léna", text: "Je regrette presque de ne pas avoir fait pareil il y a des années." },
            { speaker: "Karim", text: "Il n'est jamais trop tard. Force est de constater que tu en parles depuis un moment, toi aussi." }
        ]),

        list([

            "Plus-que-parfait et expressions de durée",

            "Le causatif : faire + infinitif",

            "Devoir : déduction et regret",

            "Bien que / quoique + subjonctif (concession)",

            "Si + plus-que-parfait, conditionnel passé (hypothèse irréelle du passé)",

            "Connecteurs de cause/conséquence en registre soutenu",

            "Nier que et les verbes déclaratifs nuancés",

            "Ce qui, ce que, ce dont",

            "Regret et subjonctif après les verbes de sentiment",

            "La mise en relief : c'est... qui/que...",

            "Marqueurs de discours et nuance"

        ]),

        quiz(
            "Quelle phrase utilise correctement le plus-que-parfait ?",
            [
                "Quand je suis arrivé, il partait déjà.",
                "Quand je suis arrivé, il était déjà parti.",
                "Quand je suis arrivé, il part déjà.",
                "Quand je suis arrivé, il sera déjà parti."
            ],
            1,
            "Le plus-que-parfait situe une action avant une autre action passée : 'il était déjà parti'."
        ),

        quiz(
            "Choisis la bonne phrase causative.",
            [
                "J'ai construit ma maison par un architecte.",
                "J'ai fait construire ma maison par un architecte.",
                "J'ai fait construit ma maison.",
                "J'ai faire construire ma maison."
            ],
            1,
            "Le causatif est 'faire' + infinitif : 'j'ai fait construire'."
        ),

        quiz(
            "Choisis la phrase qui exprime un regret.",
            ["Tu dois lui parler.", "Tu devrais lui parler.", "Tu aurais dû lui parler.", "Tu as dû lui parler."],
            2,
            "'Devoir' au conditionnel passé exprime un regret : 'tu aurais dû lui parler'."
        ),

        quiz(
            "Quel mode suit \"bien que\" ?",
            ["l'indicatif", "le subjonctif", "le conditionnel", "l'infinitif"],
            1,
            "'Bien que' est toujours suivi du subjonctif."
        ),

        quiz(
            "Choisis la bonne phrase hypothétique irréelle du passé.",
            [
                "Si j'avais su, je viendrais.",
                "Si je savais, je serais venu.",
                "Si j'avais su, je serais venu.",
                "Si je saurais, je serais venu."
            ],
            2,
            "Si + plus-que-parfait, ... conditionnel passé : 'si j'avais su, je serais venu'."
        ),

        quiz(
            "Quel connecteur exprime une conséquence en registre soutenu ?",
            ["étant donné que", "dans la mesure où", "si bien que", "puisque"],
            2,
            "'Si bien que' exprime une conséquence en registre soutenu."
        ),

        quiz(
            "Choisis le bon mode après \"nier que\".",
            ["Il nie qu'il a menti.", "Il nie qu'il ait menti.", "Il nie qu'il mentira.", "Il nie qu'il mentait."],
            1,
            "'Nier que' est suivi du subjonctif : 'il nie qu'il ait menti'."
        ),

        quiz(
            "Complète : \"Je ne comprends pas ___ elle veut dire.\"",
            ["ce qui", "ce que", "ce dont", "dont"],
            1,
            "'Ce que' est le complément d'objet direct de 'dire'."
        ),

        quiz(
            "Pourquoi le subjonctif après \"être déçu que\" ?",
            ["Parce que c'est un fait certain", "Parce que l'accent est mis sur l'émotion", "Parce que c'est une question", "Parce que c'est au passé"],
            1,
            "Les verbes de sentiment prennent le subjonctif car l'accent est mis sur l'émotion, pas sur le fait."
        ),

        quiz(
            "Choisis la bonne mise en relief.",
            ["C'est lui que a téléphoné.", "C'est lui qui a téléphoné.", "C'est lui dont a téléphoné.", "C'est lui où a téléphoné."],
            1,
            "'C'est... qui' met en valeur le sujet : 'c'est lui qui a téléphoné'."
        ),

        quiz(
            "Quelle expression exprime une supposition prudente ?",
            ["c'est certain que", "il semblerait que", "il est évident que", "sans aucun doute"],
            1,
            "'Il semblerait que' exprime une supposition prudente, pas une certitude."
        ),

        tip(
            "Continue à Pratiquer",
            "La meilleure façon de consolider la grammaire B2, c'est de l'utiliser dans de vraies conversations. Essaie de discuter d'un sujet complexe et vois combien de ces structures tu arrives à combiner naturellement, avec nuance."
        ),

        culture(
            "Atteindre le Niveau B2",
            "Le CECRL décrit le niveau B2 comme celui de l'utilisateur indépendant, niveau avancé : tu peux comprendre l'essentiel de textes complexes, interagir avec spontanéité et aisance, et argumenter sur un sujet en donnant les avantages et les inconvénients de différentes options. C'est un vrai tournant dans ton parcours d'apprentissage du français."
        )

    ],

    summary: {

        tip:
            "Bravo ! Révise les points de grammaire qui t'ont semblé difficiles, puis continue à pratiquer avec de vraies conversations et du contenu authentique en français.",

        review: [

            "Tu as terminé 11 leçons du module B2.",

            "Tu peux discuter de sujets abstraits avec précision et nuance.",

            "Tu as combiné plus-que-parfait, subjonctif, hypothèses, mise en relief et bien plus.",

            "Tu es prêt à continuer à progresser au-delà du niveau B2 !"

        ]

    }

};
