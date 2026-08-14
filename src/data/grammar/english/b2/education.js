import { educationBlocks } from "../../shared/english/b2/education";

export const educationTopic = {

    id: "english-b2-education",

    language: "english",

    level: "B2",

    topic: "education",

    lessonId: "english-b2-education",

    title: "Passive Structures and the Causative (Have Something Done)",

    summary: "Use the passive to focus on a process, and the causative to show someone arranged for another person to do something.",

    explanation: educationBlocks,

    rules: [
        "subject + be + past participle for the passive.",
        "have/get + object + past participle for the causative.",
        "The causative always implies someone else performs the action for the subject."
    ],

    examples: [
        "The report was written by the whole team.",
        "I had my hair cut yesterday.",
        "She's getting her car serviced this week.",
        "The exams are marked by two different teachers."
    ],

    notes: [
        "'Get something done' is more common in informal speech; 'have something done' works in both formal and informal contexts."
    ],

    commonMistakes: [
        "Using the wrong word order in the causative: 'I had fixed my car' instead of 'I had my car fixed'."
    ],

    tips: [
        "Ask: did the subject do this themselves, or did they arrange for someone else to do it? If someone else did it for them, use the causative."
    ]

};
