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
  id: "portuguese-a1-countries",

  language: "portuguese",
  level: "A1",
  category: "Basics",
  topic: "countries",
  order: 3,

  title: "Countries & Nationalities",
  subtitle: "Learn how to talk about countries and where people come from.",
  description:
    "Build your vocabulary with common countries and nationalities used in everyday Portuguese conversations.",

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
    "Brasil",
    "brasileiro",
    "Estados Unidos",
    "americano",
    "França",
    "francês",
    "Japão",
    "japonês",
    "Espanha",
    "espanhol"
  ]),

  blocks: [

    heading("Talking about Countries"),

    paragraph(
      "When meeting someone, it is common to ask where they are from. In Portuguese, most nationality adjectives change form depending on whether the person is male or female."
    ),

    examples([
      {
        text: "De onde você é? — Eu sou do Brasil.",
        translation: "Where are you from? — I'm from Brazil."
      },

      {
        text: "Você é americano? — Não, eu sou brasileiro.",
        translation: "Are you American? — No, I'm Brazilian."
      },

      {
        text: "Ela é do Japão. Ela é japonesa.",
        translation: "She's from Japan. She's Japanese."
      }
    ]),

    dialogue([
      { speaker: "Ana", text: "De onde você é?" },
      { speaker: "Kenji", text: "Eu sou do Japão. Eu sou japonês. E você?" },
      { speaker: "Ana", text: "Eu sou da Espanha. Eu sou espanhola." },
      { speaker: "Kenji", text: "Legal! Você também fala francês?" },
      { speaker: "Ana", text: "Não, só espanhol e inglês." }
    ]),

    grammar(
      "Country vs Nationality",
      "The country name and the nationality adjective are different words: 'Brasil' is the country, 'brasileiro' is the nationality. Nationality adjectives also change with gender: 'brasileiro' becomes 'brasileira' for a woman."
    ),

    list([

      "Brasil → brasileiro / brasileira",

      "Estados Unidos → americano / americana",

      "França → francês / francesa",

      "Japão → japonês / japonesa",

      "Espanha → espanhol / espanhola"

    ]),

    tip(
      "Remember",
      "Country names in Portuguese almost always come with an article: 'o Brasil', 'a França', 'os Estados Unidos'. Nationalities, however, are not capitalized."
    ),

    culture(
      "One World, Many Nationalities",
      "Portuguese is spoken across several countries and continents, so asking about nationalities is one of the most common small-talk topics when traveling or meeting new people."
    ),

    quiz(
      "What is the nationality for a woman from Japan?",
      ["Japonês", "Japão", "Japonesa", "Japonesia"],
      2,
      "The correct feminine nationality adjective is 'japonesa'."
    ),

    quiz(
      "Which sentence is correct?",
      ["Eu venho brasileiro.", "Eu sou do Brasil.", "Eu sou Brasil.", "Eu sou de brasileiro."],
      1,
      "Use 'ser de/do/da' with the country name: 'Eu sou do Brasil.'"
    ),

    quiz(
      "How do you ask where someone is from?",
      ["Qual é o seu nome?", "De onde você é?", "Muito prazer", "E você?"],
      1,
      "'De onde você é?' is the standard way to ask about someone's origin."
    )

  ],

  summary: {

    tip: "Practice asking and answering 'De onde você é?' with different countries and their nationalities.",

    review: [
      "Brasil → brasileiro / brasileira",
      "Estados Unidos → americano / americana",
      "França → francês / francesa",
      "Japão → japonês / japonesa",
      "De onde você é? — Eu sou de/do/da..."
    ]

  }

};
