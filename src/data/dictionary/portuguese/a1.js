import { normalizeWord } from "../../../repositories/normalizeWord";

const rawEntries = [

    // Greetings
    { word: "oi", translation: "hi", examples: ["Oi, Camila!"], note: "Informal greeting.", topic: "greetings" },
    { word: "olá", translation: "hello", examples: ["Olá! Bem-vindo à nossa escola."], topic: "greetings" },
    { word: "tchau", translation: "bye", examples: ["Tchau! Até amanhã."], topic: "greetings" },
    { word: "adeus", translation: "goodbye", examples: ["Adeus! Tenha um bom dia."], topic: "greetings" },
    { word: "até mais", translation: "see you later", topic: "greetings" },
    { word: "até breve", translation: "see you soon", topic: "greetings" },
    { word: "bem-vindo", translation: "welcome", aliases: ["bem-vinda"], examples: ["Bem-vindo à nossa escola."], topic: "greetings" },
    { word: "valeu", translation: "thanks (informal)", topic: "greetings" },
    { word: "prazer", translation: "nice to meet you", topic: "greetings" },
    { word: "tenha um bom dia", translation: "have a nice day", topic: "greetings" },

    // Introductions
    { word: "meu nome é", translation: "my name is", examples: ["Meu nome é Sofia."], topic: "introductions" },
    { word: "qual é o seu nome", translation: "what's your name?", topic: "introductions" },
    { word: "de onde você é", translation: "where are you from?", topic: "introductions" },
    { word: "eu sou de", translation: "I'm from", examples: ["Eu sou do Brasil."], topic: "introductions" },
    { word: "igualmente", translation: "likewise", note: "A short, polite reply to 'muito prazer'.", topic: "introductions" },
    { word: "este é", translation: "this is (masculine)", aliases: ["esta é"], examples: ["Este é o meu amigo Marco."], topic: "introductions" },
    { word: "deixe-me me apresentar", translation: "let me introduce myself", topic: "introductions" },
    { word: "e você", translation: "and you?", topic: "introductions" },

    // Countries & Nationalities
    { word: "Brasil", translation: "Brazil", partOfSpeech: "noun", topic: "countries" },
    { word: "brasileiro", translation: "Brazilian", aliases: ["brasileira"], partOfSpeech: "adjective", topic: "countries" },
    { word: "Estados Unidos", translation: "United States", partOfSpeech: "noun", topic: "countries" },
    { word: "americano", translation: "American", aliases: ["americana"], partOfSpeech: "adjective", topic: "countries" },
    { word: "França", translation: "France", partOfSpeech: "noun", topic: "countries" },
    { word: "francês", translation: "French", aliases: ["francesa"], partOfSpeech: "adjective", topic: "countries" },
    { word: "Japão", translation: "Japan", partOfSpeech: "noun", topic: "countries" },
    { word: "japonês", translation: "Japanese", aliases: ["japonesa"], partOfSpeech: "adjective", topic: "countries" },
    { word: "Espanha", translation: "Spain", partOfSpeech: "noun", topic: "countries" },
    { word: "espanhol", translation: "Spanish", aliases: ["espanhola"], partOfSpeech: "adjective", topic: "countries" },

    // Numbers
    { word: "zero", translation: "zero", topic: "numbers" },
    { word: "um", translation: "one", topic: "numbers" },
    { word: "dois", translation: "two", topic: "numbers" },
    { word: "três", translation: "three", topic: "numbers" },
    { word: "quatro", translation: "four", topic: "numbers" },
    { word: "cinco", translation: "five", topic: "numbers" },
    { word: "dez", translation: "ten", topic: "numbers" },
    { word: "vinte", translation: "twenty", topic: "numbers" },
    { word: "cem", translation: "hundred", topic: "numbers" },
    { word: "quantos", translation: "how many", examples: ["Quantos irmãos você tem?"], topic: "numbers" },
    { word: "quantos anos", translation: "how old", examples: ["Quantos anos você tem?"], topic: "numbers" },

    // Family
    { word: "mãe", translation: "mother", partOfSpeech: "noun", topic: "family" },
    { word: "pai", translation: "father", partOfSpeech: "noun", topic: "family" },
    { word: "pais", translation: "parents", partOfSpeech: "noun", topic: "family" },
    { word: "irmão", translation: "brother", partOfSpeech: "noun", topic: "family" },
    { word: "irmã", translation: "sister", partOfSpeech: "noun", topic: "family" },
    { word: "irmãos", translation: "siblings", note: "Also the plural of 'irmão' (brothers), used generically for siblings.", partOfSpeech: "noun", topic: "family" },
    { word: "filho", translation: "son", partOfSpeech: "noun", topic: "family" },
    { word: "filha", translation: "daughter", partOfSpeech: "noun", topic: "family" },
    { word: "avó", translation: "grandmother", partOfSpeech: "noun", topic: "family" },
    { word: "avô", translation: "grandfather", partOfSpeech: "noun", topic: "family" },

    // Food
    { word: "pão", translation: "bread", partOfSpeech: "noun", topic: "food" },
    { word: "arroz", translation: "rice", partOfSpeech: "noun", topic: "food" },
    { word: "frango", translation: "chicken", partOfSpeech: "noun", topic: "food" },
    { word: "peixe", translation: "fish", partOfSpeech: "noun", topic: "food" },
    { word: "legumes", translation: "vegetables", partOfSpeech: "noun", topic: "food" },
    { word: "frutas", translation: "fruit", partOfSpeech: "noun", topic: "food" },
    { word: "água", translation: "water", partOfSpeech: "noun", topic: "food" },
    { word: "café", translation: "coffee", partOfSpeech: "noun", topic: "food" },
    { word: "estou com fome", translation: "I'm hungry", topic: "food" },
    { word: "estou com sede", translation: "I'm thirsty", topic: "food" },

    // Daily Routine
    { word: "acordar", translation: "to wake up", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "levantar", translation: "to get up", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "tomar café da manhã", translation: "to have breakfast", topic: "daily-routine" },
    { word: "ir trabalhar", translation: "to go to work", topic: "daily-routine" },
    { word: "almoçar", translation: "to have lunch", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "voltar para casa", translation: "to go home", topic: "daily-routine" },
    { word: "jantar", translation: "to have dinner", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "ir dormir", translation: "to go to bed", topic: "daily-routine" },
    { word: "de manhã", translation: "in the morning", topic: "daily-routine" },
    { word: "à noite", translation: "at night", topic: "daily-routine" },

    // Jobs
    { word: "professor", translation: "teacher", aliases: ["professora"], partOfSpeech: "noun", topic: "jobs" },
    { word: "médico", translation: "doctor", aliases: ["médica"], partOfSpeech: "noun", topic: "jobs" },
    { word: "engenheiro", translation: "engineer", aliases: ["engenheira"], partOfSpeech: "noun", topic: "jobs" },
    { word: "enfermeiro", translation: "nurse", aliases: ["enfermeira"], partOfSpeech: "noun", topic: "jobs" },
    { word: "gerente", translation: "manager", note: "Invariável: 'o gerente' ou 'a gerente'.", partOfSpeech: "noun", topic: "jobs" },
    { word: "estudante", translation: "student", note: "Invariável: 'o estudante' ou 'a estudante'.", partOfSpeech: "noun", topic: "jobs" },
    { word: "policial", translation: "police officer", partOfSpeech: "noun", topic: "jobs" },
    { word: "o que você faz", translation: "what do you do?", topic: "jobs" },
    { word: "eu trabalho como", translation: "I work as a...", topic: "jobs" },

    // Travel
    { word: "aeroporto", translation: "airport", partOfSpeech: "noun", topic: "travel" },
    { word: "passagem", translation: "ticket", partOfSpeech: "noun", topic: "travel" },
    { word: "trem", translation: "train", partOfSpeech: "noun", topic: "travel" },
    { word: "avião", translation: "plane", partOfSpeech: "noun", topic: "travel" },
    { word: "mala", translation: "suitcase", partOfSpeech: "noun", topic: "travel" },
    { word: "passaporte", translation: "passport", partOfSpeech: "noun", topic: "travel" },
    { word: "quarto", translation: "room", partOfSpeech: "noun", topic: "travel" },
    { word: "reservar", translation: "to book / to reserve", partOfSpeech: "verb", topic: "travel" },
    { word: "só ida", translation: "one-way ticket", topic: "travel" },
    { word: "ida e volta", translation: "round trip", topic: "travel" },

    // Weather
    { word: "está bonito", translation: "it's nice (weather)", topic: "weather" },
    { word: "está frio", translation: "it's cold", topic: "weather" },
    { word: "está quente", translation: "it's hot", topic: "weather" },
    { word: "está chovendo", translation: "it's raining", topic: "weather" },
    { word: "está nevando", translation: "it's snowing", topic: "weather" },
    { word: "sol", translation: "sun", partOfSpeech: "noun", topic: "weather" },
    { word: "chuva", translation: "rain", partOfSpeech: "noun", topic: "weather" },
    { word: "vento", translation: "wind", partOfSpeech: "noun", topic: "weather" },
    { word: "nuvem", translation: "cloud", partOfSpeech: "noun", topic: "weather" },
    { word: "que tempo está fazendo", translation: "what's the weather like?", topic: "weather" },

    // Shopping
    { word: "quanto custa", translation: "how much does it cost?", topic: "shopping" },
    { word: "caro", translation: "expensive", aliases: ["cara"], partOfSpeech: "adjective", topic: "shopping" },
    { word: "barato", translation: "cheap", aliases: ["barata"], partOfSpeech: "adjective", topic: "shopping" },
    { word: "preço", translation: "price", partOfSpeech: "noun", topic: "shopping" },
    { word: "pagar", translation: "to pay", partOfSpeech: "verb", topic: "shopping" },
    { word: "em dinheiro", translation: "in cash", topic: "shopping" },
    { word: "no cartão", translation: "by card", topic: "shopping" },
    { word: "loja", translation: "store", partOfSpeech: "noun", topic: "shopping" },
    { word: "caixa", translation: "cash register / checkout", partOfSpeech: "noun", topic: "shopping" },
    { word: "experimentar", translation: "to try on / to try", partOfSpeech: "verb", topic: "shopping" },

    // Hobbies
    { word: "leitura", translation: "reading", partOfSpeech: "noun", topic: "hobbies" },
    { word: "música", translation: "music", partOfSpeech: "noun", topic: "hobbies" },
    { word: "esporte", translation: "sport", partOfSpeech: "noun", topic: "hobbies" },
    { word: "dança", translation: "dance", partOfSpeech: "noun", topic: "hobbies" },
    { word: "pintura", translation: "painting", partOfSpeech: "noun", topic: "hobbies" },
    { word: "cinema", translation: "movies / cinema", partOfSpeech: "noun", topic: "hobbies" },
    { word: "jogar", translation: "to play (a game/sport)", partOfSpeech: "verb", topic: "hobbies" },
    { word: "gostar", translation: "to like", partOfSpeech: "verb", topic: "hobbies" },
    { word: "caminhada", translation: "hiking / walk", partOfSpeech: "noun", topic: "hobbies" },
    { word: "jardinagem", translation: "gardening", partOfSpeech: "noun", topic: "hobbies" }

];

export const portugueseA1Dictionary = rawEntries.map(entry => ({
    id: normalizeWord(entry.word),
    language: "portuguese",
    level: "A1",
    pronunciation: null,
    audio: null,
    partOfSpeech: null,
    topic: null,
    ...entry
}));
