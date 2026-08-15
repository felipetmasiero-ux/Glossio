import { technologyHabitsB1Blocks } from "../../../grammar/shared/french/technologyHabitsB1";
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

export const technologyHabitsLesson = {

    id: "french-b1-technology-habits",

    language: "french",

    level: "B1",

    category: "Grammar",

    topic: "technology-habits",

    order: 7,

    title: "Technologie et Communication",

    subtitle:
        "Fale sobre hábitos digitais em francês explicando causas e consequências com 'parce que', 'à cause de', 'grâce à' e 'donc'.",

    description:
        "Aprenda vocabulário de tecnologia e redes sociais, e como expressar causa e consequência em francês.",

    cover: "/covers/technology-habits-fr.webp",

    estimatedTime: 12,

    difficulty: 3,

    xp: 40,

    tags: [
        "technology",
        "cause-consequence",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Talk about technology habits and digital communication",

        "Express cause using 'parce que', 'à cause de' and 'grâce à'",

        "Use 'puisque' for an already-known cause",

        "Express consequence using 'donc' and 'c'est pourquoi'"

    ],

    vocabulary: vocabulary([
        "temps d'écran",
        "accro à",
        "notification",
        "faire plusieurs choses à la fois",
        "application de productivité",
        "appel vidéo",
        "stockage en ligne",
        "intelligence artificielle",
        "cybersécurité",
        "vie privée en ligne",
        "déconnexion numérique",
        "rester en contact",
        "rester connecté",
        "influenceur",
        "devenir viral",
        "publier",
        "faire défiler",
        "se déconnecter",
        "donc",
        "c'est pourquoi",
        "puisque"
    ]),

    blocks: [

        heading("Expliquer les Causes et les Conséquences"),

        paragraph(
            "Pour discuter de nos habitudes technologiques, on explique souvent pourquoi on fait certaines choses, et quelles en sont les conséquences. Le français a plusieurs façons d'exprimer la cause et la conséquence."
        ),

        examples([
            {
                text: "Je suis en retard à cause des embouteillages.",
                translation: "Estou atrasado por causa do trânsito."
            },
            {
                text: "J'ai trouvé ce travail grâce à mon réseau professionnel en ligne.",
                translation: "Consegui esse trabalho graças à minha rede de contatos online."
            },
            {
                text: "Je passe trop de temps sur mon téléphone, donc j'ai décidé de faire une déconnexion numérique.",
                translation: "Passo tempo demais no celular, então decidi fazer uma desintoxicação digital."
            },
            {
                text: "Puisque tout le monde est connecté en permanence, il est difficile de se déconnecter vraiment.",
                translation: "Já que todo mundo está conectado o tempo todo, é difícil realmente se desconectar."
            },
            {
                text: "Il a raté son rendez-vous parce que son téléphone n'avait plus de batterie.",
                translation: "Ele perdeu o compromisso porque o celular dele tinha ficado sem bateria."
            },
            {
                text: "Cette application est mal sécurisée ; c'est pourquoi je ne l'utilise plus.",
                translation: "Esse aplicativo tem pouca segurança; por isso não uso mais."
            },
            {
                text: "Grâce aux appels vidéo, je peux rester en contact avec ma famille à l'étranger.",
                translation: "Graças às chamadas de vídeo, consigo manter contato com minha família no exterior."
            }
        ]),

        dialogue([
            { speaker: "Léna", text: "Tu as l'air toujours sur ton téléphone en ce moment." },
            { speaker: "Malo", text: "Je sais, je suis un peu accro, pour être honnête. Je passe trop de temps à faire défiler les réseaux sociaux." },
            { speaker: "Léna", text: "Pourquoi tu ne fais pas une déconnexion numérique, alors ?" },
            { speaker: "Malo", text: "J'y pense. Puisque je travaille aussi devant un écran toute la journée, mon temps d'écran total est énorme." },
            { speaker: "Léna", text: "C'est vrai que grâce à la technologie, on reste connectés, mais à cause de ça, on oublie parfois de vivre le moment présent." },
            { speaker: "Malo", text: "Exactement. Donc j'ai décidé d'éteindre les notifications le soir, au moins." },
            { speaker: "Léna", text: "Bonne idée. C'est un bon début." },
            { speaker: "Malo", text: "Oui, et grâce à ça, je dors déjà un peu mieux." }
        ]),

        grammar(technologyHabitsB1Blocks[0].title, technologyHabitsB1Blocks[0].text),

        list([

            "parce que + phrase — cause",

            "à cause de / grâce à + nom — cause négative / positive",

            "puisque — cause déjà connue",

            "donc / c'est pourquoi — conséquence"

        ]),

        tip(
            "À Cause De vs Grâce À",
            "Ne confonds pas 'à cause de' et 'grâce à'. 'À cause de' introduit souvent une cause négative ou neutre ('à cause de la pluie'), alors que 'grâce à' introduit presque toujours une cause positive ('grâce à ton aide')."
        ),

        culture(
            "La Fracture Numérique",
            "Dans les pays francophones, on parle de plus en plus de 'fracture numérique' et de 'droit à la déconnexion' — en France, certaines entreprises ont même l'obligation légale de respecter le droit de leurs employés à ne pas répondre aux e-mails en dehors des heures de travail."
        ),

        quiz(
            "Choisis la bonne phrase (cause positive).",
            ["J'ai réussi à cause de ton aide.", "J'ai réussi grâce à ton aide.", "J'ai réussi puisque ton aide.", "J'ai réussi donc ton aide."],
            1,
            "'Grâce à' introduit une cause positive."
        ),

        quiz(
            "Quel mot introduit une cause déjà connue des deux personnes ?",
            ["parce que", "à cause de", "puisque", "donc"],
            2,
            "'Puisque' introduit une cause que les deux personnes connaissent déjà."
        ),

        quiz(
            "Choisis le mot qui exprime une conséquence.",
            ["grâce à", "à cause de", "parce que", "donc"],
            3,
            "'Donc' introduit une conséquence."
        )

    ],

    summary: {

        tip:
            "Pratique à expliquer tes habitudes technologiques : pourquoi tu les as (cause) et ce qui en résulte (conséquence).",

        review: [

            "parce que / à cause de / grâce à — cause",

            "puisque — cause déjà connue",

            "donc / c'est pourquoi — conséquence",

            "accro à, temps d'écran, se déconnecter"

        ]

    }

};
