import { societyBlocks } from "../../../grammar/shared/english/b2/society";
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

export const societyLesson = {

    id: "english-b2-society",

    language: "english",

    level: "B2",

    category: "Grammar",

    topic: "society",

    order: 4,

    title: "Society, Politics & Social Issues",

    subtitle:
        "Discuta questões sociais em inglês usando orações concessivas: although, even though, despite, in spite of e whereas.",

    description:
        "Aprenda vocabulário sobre desigualdade, políticas públicas e questões sociais, e como usar orações concessivas para contrastar ideias com precisão.",

    cover: "/covers/society.webp",

    estimatedTime: 12,

    difficulty: 4,

    xp: 45,

    tags: [
        "society",
        "concessive-clauses",
        "grammar"
    ],

    skills: [
        "reading",
        "vocabulary",
        "grammar",
        "listening"
    ],

    objectives: [

        "Discuss social issues, inequality and public policy",

        "Use 'although'/'even though' with a full clause",

        "Use 'despite'/'in spite of' with a noun or -ing form",

        "Use 'whereas' to directly contrast two facts"

    ],

    vocabulary: vocabulary([
        "inequality",
        "institution",
        "marginalized",
        "underprivileged",
        "welfare",
        "public policy",
        "grassroots",
        "advocate for",
        "raise awareness",
        "bridge the gap",
        "tackle an issue",
        "social mobility",
        "discrimination",
        "accountability",
        "civic duty",
        "community outreach",
        "divide",
        "status quo",
        "stakeholder",
        "common ground"
    ]),

    blocks: [

        heading("Contrasting Ideas About Society"),

        paragraph(
            "Discussing social issues clearly means being precise about contrast: 'although'/'even though' introduce a full clause, 'despite'/'in spite of' are followed by a noun or -ing form, and 'whereas' directly contrasts two facts."
        ),

        examples([
            {
                text: "Although the policy was controversial, it passed easily in parliament.",
                translation: "Embora a política fosse controversa, ela foi aprovada facilmente no parlamento."
            },
            {
                text: "Despite the controversy, the policy passed easily.",
                translation: "Apesar da controvérsia, a política foi aprovada facilmente."
            },
            {
                text: "Even though the community raised concerns, the project moved forward.",
                translation: "Mesmo que a comunidade tenha levantado preocupações, o projeto seguiu em frente."
            },
            {
                text: "Unemployment is falling in the city, whereas it's rising in rural areas.",
                translation: "O desemprego está caindo na cidade, enquanto está aumentando nas áreas rurais."
            },
            {
                text: "In spite of years of advocacy, real change has been slow.",
                translation: "Apesar de anos de ativismo, a mudança real tem sido lenta."
            },
            {
                text: "Although it's a small organization, it has a huge impact on the community.",
                translation: "Embora seja uma organização pequena, ela tem um impacto enorme na comunidade."
            }
        ]),

        dialogue([
            { speaker: "Fatima", text: "Did you see the news about the new housing policy?" },
            { speaker: "Carlos", text: "Yeah, it's pretty controversial. Although I understand the goal, I'm not sure it'll actually help the people who need it most." },
            { speaker: "Fatima", text: "I see it differently. Despite the criticism, I think it's a step in the right direction." },
            { speaker: "Carlos", text: "Maybe. But whereas the city center is getting new investment, a lot of underprivileged neighborhoods are still being ignored." },
            { speaker: "Fatima", text: "That's a fair point. In spite of all the public policy debates, real change often takes years." },
            { speaker: "Carlos", text: "Exactly. Even though I support the idea, I think we need to hold the government accountable for actually following through." },
            { speaker: "Fatima", text: "Agreed. It's easy to raise awareness; it's much harder to bridge the gap between promises and results." },
            { speaker: "Carlos", text: "Well said. On balance, I'm cautiously optimistic, though." }
        ]),

        grammar(societyBlocks[0].title, societyBlocks[0].text),

        list([

            "although / even though + full clause",

            "despite / in spite of + noun or -ing",

            "whereas — direct contrast between two facts",

            "inequality, marginalized, advocate for, accountability"

        ]),

        tip(
            "Despite/In Spite Of Are Never Followed by a Full Clause",
            "Don't use 'despite' or 'in spite of' directly before a subject and verb. Say 'despite the rain' or 'despite being tired', not 'despite it was raining.' If you need a full clause, use 'although' or 'even though' instead."
        ),

        culture(
            "Discussing Social Issues Respectfully",
            "In English-speaking public discourse, phrases like 'I see it differently' or 'that's a fair point' are common ways to disagree respectfully during a discussion about social or political issues, without dismissing the other person's view."
        ),

        quiz(
            "Choose the correct sentence.",
            [
                "Despite it was raining, we went out.",
                "Despite the rain, we went out.",
                "Despite raining, we went out.",
                "Despite it rained, we went out."
            ],
            1,
            "'Despite' is followed by a noun ('the rain'), not a full clause."
        ),

        quiz(
            "Choose the correct sentence using 'whereas'.",
            [
                "Sales are up this year, whereas they were down last year.",
                "Sales are up this year, whereas were down last year.",
                "Sales are up this year, whereas down last year.",
                "Sales are up this year, whereas being down last year."
            ],
            0,
            "'Whereas' introduces a full contrasting clause, with its own subject: 'whereas they were down last year.'"
        ),

        quiz(
            "Which word is followed by a full clause (subject + verb)?",
            ["despite", "in spite of", "although", "because of"],
            2,
            "'Although' is followed by a full clause; 'despite', 'in spite of' and 'because of' are followed by a noun or -ing form."
        )

    ],

    summary: {

        tip:
            "Practice contrasting two facts about a social issue you care about, using 'although' with a full clause and 'despite' with a noun.",

        review: [

            "although / even though + clause",

            "despite / in spite of + noun/-ing",

            "whereas — direct contrast",

            "inequality, marginalized, advocate for, common ground"

        ]

    }

};
