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

export const countriesLesson = {
  id: "french-a1-countries",

  language: "french",
  level: "A1",
  category: "Basics",
  topic: "countries",
  order: 3,

  title: "Countries & Nationalities",
  subtitle: "Learn how to talk about countries and where people come from.",
  description:
    "Build your vocabulary with common countries and nationalities used in everyday French conversations.",

  cover: "/covers/countries.webp",

  estimatedTime: 8,
  difficulty: 1,
  xp: 30,

  tags: ["countries", "nationalities", "conversation"],
  skills: ["reading", "vocabulary", "speaking"],

  objectives: [
    "Name common countries.",
    "Talk about nationalities.",
    "Ask where someone is from.",
    "Answer where you are from."
  ],

  vocabulary: vocabulary([
    "Brésil",
    "brésilien",
    "États-Unis",
    "américain",
    "France",
    "français",
    "Japon",
    "japonais",
    "Espagne",
    "espagnol"
  ]),

  blocks: [

    heading("Talking about Countries"),

    paragraph(
      "When meeting someone, it is common to ask where they are from. In French, most nationality adjectives are related to the country's name, but they change form depending on whether the person is male or female."
    ),

    examples([
      {
        text: "Tu viens d'où ? — Je viens du Brésil.",
        translation: "De onde você é? — Eu venho do Brasil."
      },

      {
        text: "Tu es américain ? — Non, je suis brésilien.",
        translation: "Você é americano? — Não, eu sou brasileiro."
      },

      {
        text: "Elle vient du Japon. Elle est japonaise.",
        translation: "Ela vem do Japão. Ela é japonesa."
      }
    ]),

    dialogue([
      { speaker: "Anna", text: "Tu viens d'où ?" },
      { speaker: "Kenji", text: "Je viens du Japon. Je suis japonais. Et toi ?" },
      { speaker: "Anna", text: "Je viens d'Espagne. Je suis espagnole." },
      { speaker: "Kenji", text: "Super ! Tu parles français aussi ?" },
      { speaker: "Anna", text: "Non, seulement espagnol et anglais." }
    ]),

    grammar(
      "Country vs Nationality",
      "The country name and the nationality adjective are different words: 'la France' is the country, 'français' is the nationality. Nationality adjectives also change with gender: 'français' becomes 'française' for a woman."
    ),

    list([

      "le Brésil → brésilien / brésilienne",

      "la France → français / française",

      "le Japon → japonais / japonaise",

      "l'Espagne → espagnol / espagnole",

      "les États-Unis → américain / américaine"

    ]),

    tip(
      "Remember",
      "Country names in French almost always come with an article: 'la France', 'le Japon', 'les États-Unis'. Nationalities, however, are not capitalized when used as adjectives."
    ),

    culture(
      "One World, Many Nationalities",
      "French is spoken as a second language in many countries around the world, so asking about nationalities is one of the most common small-talk topics when traveling or meeting new people."
    ),

    quiz(
      "What is the nationality for a woman from Japan?",
      ["Japonais", "Japon", "Japonaise", "Japonienne"],
      2,
      "The correct feminine nationality adjective is 'japonaise'."
    ),

    quiz(
      "Which sentence is correct?",
      ["Je viens brésilien.", "Je viens du Brésil.", "Je suis Brésil.", "Je suis du brésilien."],
      1,
      "Use 'venir de/du' with the country name: 'Je viens du Brésil.'"
    ),

    quiz(
      "How do you ask where someone is from?",
      ["Comment tu t'appelles ?", "Tu viens d'où ?", "Enchanté", "Et toi ?"],
      1,
      "'Tu viens d'où ?' is the informal way to ask about someone's origin."
    )

  ],

  summary: {

    tip: "Practice asking and answering 'Tu viens d'où ?' with different countries and their nationalities.",

    review: [
      "le Brésil → brésilien / brésilienne",
      "la France → français / française",
      "le Japon → japonais / japonaise",
      "l'Espagne → espagnol / espagnole",
      "Tu viens d'où ? — Je viens de/du..."
    ]

  }

};
