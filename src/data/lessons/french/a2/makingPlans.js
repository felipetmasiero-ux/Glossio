import { makingPlansBlocks } from "../../../grammar/shared/french/makingPlans";
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

export const makingPlansLesson = {

    id: "french-a2-making-plans",

    language: "french",

    level: "A2",

    category: "Daily Life",

    topic: "plans",

    order: 11,

    title: "Fazendo Planos",

    subtitle:
        "Combine encontros com amigos e fale sobre planos futuros usando o futur proche em francês.",

    description:
        "Aprenda a fazer, confirmar e cancelar planos, e use o futur proche para falar de eventos futuros já combinados.",

    cover: "/covers/making-plans.webp",

    estimatedTime: 9,

    difficulty: 2,

    xp: 35,

    tags: [
        "plans",
        "vocabulary",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar"
    ],

    objectives: [

        "Make, confirm and cancel plans",

        "Use the futur proche for future arrangements",

        "Ask if someone is free or busy",

        "Invite someone to get together"

    ],

    vocabulary: vocabulary([
        "plan",
        "emploi du temps",
        "disponible",
        "occupé",
        "annuler",
        "reporter",
        "confirmer",
        "inviter",
        "se retrouver",
        "traîner"
    ]),

    blocks: [

        heading("Tu Es Libre ce Week-end ?"),

        paragraph(
            "Quand on parle de plans déjà arrangés dans le futur — des choses déjà décidées, comme une réunion ou un voyage — on utilise souvent le futur proche (aller + infinitif)."
        ),

        examples([
            {
                text: "Je vais retrouver mon ami samedi.",
                translation: "Eu vou me encontrar com meu amigo no sábado."
            },

            {
                text: "On va traîner ce week-end si tu es disponible.",
                translation: "Nós vamos sair juntos neste fim de semana, se você estiver disponível."
            },

            {
                text: "Elle va reporter la réunion parce qu'elle est occupée.",
                translation: "Ela está adiando a reunião porque está ocupada."
            }
        ]),

        dialogue([
            { speaker: "Ana", text: "Tu es disponible ce week-end ? Allons nous retrouver." },
            { speaker: "Marco", text: "En fait, je suis occupé samedi, mais je suis libre dimanche." },
            { speaker: "Ana", text: "Super, on va confirmer dimanche alors. Je vais inviter Sofia aussi." },
            { speaker: "Marco", text: "Parfait. S'il te plaît, n'annule pas cette fois !" }
        ]),

        grammar(makingPlansBlocks[0].title, makingPlansBlocks[0].text),

        list([

            "je vais retrouver.../on va traîner... (plans arrangés)",

            "Tu es disponible/occupé...?",

            "plan, emploi du temps, confirmer, annuler, reporter",

            "inviter, se retrouver, traîner"

        ]),

        tip(
            "Futur Simple vs Futur Proche",
            "Utilise le futur simple pour des prédictions ou des décisions prises au moment de parler : 'Je pense qu'il pleuvra.' Utilise le futur proche pour des plans déjà arrangés : 'Je vais dîner avec mes parents ce soir.'"
        ),

        culture(
            "Organiser des Plans à l'Avance",
            "Dans de nombreuses cultures francophones, il est courant et poli de vérifier l'emploi du temps de quelqu'un et de confirmer les plans quelques jours à l'avance, plutôt que d'inviter au dernier moment."
        ),

        quiz(
            "Quelle phrase parle d'un plan déjà arrangé ?",
            ["Je rencontrerai peut-être Ana demain.", "Je vais retrouver Ana demain.", "Je rencontre Ana toujours demain.", "Je retrouve Ana demain déjà."],
            1,
            "Les plans arrangés utilisent le futur proche : 'Je vais retrouver Ana demain.'"
        ),

        quiz(
            "Quel mot signifie 'déplacer un événement à plus tard' ?",
            ["annuler", "confirmer", "reporter", "inviter"],
            2,
            "'Reporter' signifie déplacer quelque chose à plus tard."
        ),

        quiz(
            "Comment demande-t-on si quelqu'un est libre pour se voir ?",
            ["Tu es disponible ce week-end ?", "Tu annules ce week-end ?", "Tu confirmes ce week-end ?", "Tu reportes ce week-end ?"],
            0,
            "'Tu es disponible...?' demande si quelqu'un est libre pour se voir."
        )

    ],

    summary: {

        tip:
            "Pratique à inviter un(e) ami(e) à traîner ce week-end, en utilisant le futur proche pour ton plan.",

        review: [

            "je vais retrouver.../on va traîner... (plans arrangés)",

            "Tu es disponible/occupé ?",

            "plan, emploi du temps, confirmer, annuler, reporter",

            "inviter, se retrouver, traîner"

        ]

    }

};
