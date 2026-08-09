import { normalizeWord } from "../../../repositories/normalizeWord";

const rawEntries = [

    // Past Weekend
    { word: "ontem", translation: "yesterday", topic: "daily-routine" },
    { word: "semana passada", translation: "last week", topic: "daily-routine" },
    { word: "fim de semana passado", translation: "last weekend", topic: "daily-routine" },
    { word: "fiquei em casa", translation: "I stayed home", topic: "daily-routine" },
    { word: "saí", translation: "I went out", note: "Pretérito perfeito of 'sair'.", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "assisti a", translation: "I watched", note: "Pretérito perfeito of 'assistir a'.", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "viajei", translation: "I traveled", note: "Pretérito perfeito of 'viajar'.", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "conheci", translation: "I met / got to know", note: "Pretérito perfeito of 'conhecer'.", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "aconteceu", translation: "it happened", note: "Pretérito perfeito of 'acontecer'.", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "foi ótimo", translation: "it was great", topic: "daily-routine" },

    // Comparisons
    { word: "melhor", translation: "better", partOfSpeech: "adjective", topic: "shopping" },
    { word: "pior", translation: "worse", partOfSpeech: "adjective", topic: "shopping" },
    { word: "maior", translation: "bigger", partOfSpeech: "adjective", topic: "shopping" },
    { word: "menor", translation: "smaller", partOfSpeech: "adjective", topic: "shopping" },
    { word: "mais barato que", translation: "cheaper than", topic: "shopping" },
    { word: "mais caro que", translation: "more expensive than", topic: "shopping" },
    { word: "tão bom quanto", translation: "as good as", topic: "shopping" },
    { word: "qualidade", translation: "quality", partOfSpeech: "noun", topic: "shopping" },
    { word: "tamanho", translation: "size", partOfSpeech: "noun", topic: "shopping" },
    { word: "trocar", translation: "to exchange / to return (an item)", partOfSpeech: "verb", topic: "shopping" },

    // Health
    { word: "dor de cabeça", translation: "headache", partOfSpeech: "noun", topic: "health" },
    { word: "dor de garganta", translation: "sore throat", partOfSpeech: "noun", topic: "health" },
    { word: "febre", translation: "fever", partOfSpeech: "noun", topic: "health" },
    { word: "gripe", translation: "flu", partOfSpeech: "noun", topic: "health" },
    { word: "remédio", translation: "medicine", partOfSpeech: "noun", topic: "health" },
    { word: "farmácia", translation: "pharmacy", partOfSpeech: "noun", topic: "health" },
    { word: "consultório", translation: "doctor's office", partOfSpeech: "noun", topic: "health" },
    { word: "marcar uma consulta", translation: "to make a (medical) appointment", topic: "health" },
    { word: "dever", translation: "should / must", note: "Modal verb, used with the infinitive to give advice: 'Você deve descansar.'", partOfSpeech: "verb", topic: "health" },
    { word: "descansar", translation: "to rest", partOfSpeech: "verb", topic: "health" },

    // Weather Forecast
    { word: "previsão do tempo", translation: "weather forecast", partOfSpeech: "noun", topic: "weather" },
    { word: "temperatura", translation: "temperature", partOfSpeech: "noun", topic: "weather" },
    { word: "grau", translation: "degree", aliases: ["graus"], partOfSpeech: "noun", topic: "weather" },
    { word: "ensolarado", translation: "sunny", aliases: ["ensolarada"], partOfSpeech: "adjective", topic: "weather" },
    { word: "nublado", translation: "cloudy", aliases: ["nublada"], partOfSpeech: "adjective", topic: "weather" },
    { word: "tempestade", translation: "storm", partOfSpeech: "noun", topic: "weather" },
    { word: "neblina", translation: "fog", partOfSpeech: "noun", topic: "weather" },
    { word: "amanhã", translation: "tomorrow", topic: "weather" },
    { word: "na próxima semana", translation: "next week", topic: "weather" },
    { word: "provavelmente", translation: "probably", topic: "weather" },

    // Directions
    { word: "atravessar", translation: "to cross", partOfSpeech: "verb", topic: "transportation" },
    { word: "virar", translation: "to turn", partOfSpeech: "verb", topic: "transportation" },
    { word: "quadra", translation: "(city) block", partOfSpeech: "noun", topic: "transportation" },
    { word: "esquina", translation: "corner", partOfSpeech: "noun", topic: "transportation" },
    { word: "pegar o ônibus", translation: "to catch / take the bus", topic: "transportation" },
    { word: "descer", translation: "to get off (a bus/train/subway)", partOfSpeech: "verb", topic: "transportation" },
    { word: "metrô", translation: "subway", partOfSpeech: "noun", topic: "transportation" },
    { word: "ponto de ônibus", translation: "bus stop", partOfSpeech: "noun", topic: "transportation" },
    { word: "siga", translation: "go straight / continue (command)", note: "Imperative of 'seguir', used with 'você'.", topic: "transportation" },
    { word: "vá", translation: "go (command)", note: "Imperative of 'ir', used with 'você'.", topic: "transportation" },

    // Past Habits
    { word: "antigamente", translation: "in the past / back then", topic: "past-habits" },
    { word: "quando eu era criança", translation: "when I was a child", topic: "past-habits" },
    { word: "costumava", translation: "used to", note: "Pretérito imperfeito of 'costumar' + infinitive: 'Eu costumava jogar futebol.'", partOfSpeech: "verb", topic: "past-habits" },
    { word: "morava", translation: "I used to live", note: "Pretérito imperfeito of 'morar'.", partOfSpeech: "verb", topic: "past-habits" },
    { word: "brincava", translation: "I used to play", note: "Pretérito imperfeito of 'brincar'.", partOfSpeech: "verb", topic: "past-habits" },
    { word: "estudava", translation: "I used to study", note: "Pretérito imperfeito of 'estudar'.", partOfSpeech: "verb", topic: "past-habits" },
    { word: "não tinha", translation: "didn't use to have", note: "Pretérito imperfeito of 'ter', negated.", topic: "past-habits" },
    { word: "tudo era diferente", translation: "everything was different", topic: "past-habits" },
    { word: "mudou", translation: "changed", note: "Pretérito perfeito of 'mudar'.", partOfSpeech: "verb", topic: "past-habits" },
    { word: "bairro", translation: "neighborhood", partOfSpeech: "noun", topic: "past-habits" },

    // Free Time
    { word: "ter vontade de", translation: "to feel like (doing something)", topic: "hobbies" },
    { word: "estar a fim de", translation: "to be up for / to feel like (informal)", topic: "hobbies" },
    { word: "preferir", translation: "to prefer", partOfSpeech: "verb", topic: "hobbies" },
    { word: "ao ar livre", translation: "outdoors", topic: "hobbies" },
    { word: "relaxar", translation: "to relax", partOfSpeech: "verb", topic: "hobbies" },
    { word: "maratona de séries", translation: "TV series binge / marathon", partOfSpeech: "noun", topic: "hobbies" },
    { word: "passatempo", translation: "pastime / hobby", partOfSpeech: "noun", topic: "hobbies" },
    { word: "me divertir", translation: "to have fun", topic: "hobbies" },
    { word: "entediado", translation: "bored", aliases: ["entediada"], partOfSpeech: "adjective", topic: "hobbies" },
    { word: "praticar", translation: "to practice (a sport/activity)", partOfSpeech: "verb", topic: "hobbies" },

    // Feelings
    { word: "ficar feliz", translation: "to become happy", topic: "feelings" },
    { word: "ficar triste", translation: "to become sad", topic: "feelings" },
    { word: "ficar nervoso", translation: "to become nervous", aliases: ["ficar nervosa"], topic: "feelings" },
    { word: "ficar surpreso", translation: "to become surprised", aliases: ["ficar surpresa"], topic: "feelings" },
    { word: "animado", translation: "excited", aliases: ["animada"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "preocupado", translation: "worried", aliases: ["preocupada"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "aliviado", translation: "relieved", aliases: ["aliviada"], partOfSpeech: "adjective", topic: "feelings" },
    { word: "com raiva", translation: "angry", topic: "feelings" },
    { word: "felizíssimo", translation: "extremely happy", aliases: ["felizíssima"], note: "Superlative of 'feliz' with the suffix '-íssimo'.", partOfSpeech: "adjective", topic: "feelings" },
    { word: "do nada", translation: "out of nowhere / for no reason", topic: "feelings" },

    // Restaurant
    { word: "poderia", translation: "could", note: "Conditional of 'poder', used to make polite requests: 'Poderia me trazer o cardápio?'", partOfSpeech: "verb", topic: "restaurant" },
    { word: "cardápio", translation: "menu", partOfSpeech: "noun", topic: "restaurant" },
    { word: "garçom", translation: "waiter", aliases: ["garçonete"], partOfSpeech: "noun", topic: "restaurant" },
    { word: "recomendar", translation: "to recommend", partOfSpeech: "verb", topic: "restaurant" },
    { word: "a conta, por favor", translation: "the bill, please", topic: "restaurant" },
    { word: "gorjeta", translation: "tip", partOfSpeech: "noun", topic: "restaurant" },
    { word: "sobremesa", translation: "dessert", partOfSpeech: "noun", topic: "restaurant" },
    { word: "ao ponto", translation: "medium (steak)", topic: "restaurant" },
    { word: "sem gelo", translation: "without ice", topic: "restaurant" },
    { word: "trazer", translation: "to bring", partOfSpeech: "verb", topic: "restaurant" },

    // Hotel
    { word: "recepção", translation: "reception / front desk", partOfSpeech: "noun", topic: "hotel" },
    { word: "fazer o check-in", translation: "to check in", topic: "hotel" },
    { word: "fazer o check-out", translation: "to check out", topic: "hotel" },
    { word: "quarto de casal", translation: "double room", partOfSpeech: "noun", topic: "hotel" },
    { word: "vista para o mar", translation: "sea view", partOfSpeech: "noun", topic: "hotel" },
    { word: "reclamar", translation: "to complain", partOfSpeech: "verb", topic: "hotel" },
    { word: "barulho", translation: "noise", partOfSpeech: "noun", topic: "hotel" },
    { word: "toalha", translation: "towel", partOfSpeech: "noun", topic: "hotel" },
    { word: "vaga", translation: "vacancy", partOfSpeech: "noun", topic: "hotel" },
    { word: "diária", translation: "daily room rate", partOfSpeech: "noun", topic: "hotel" },

    // Making Plans
    { word: "pretender", translation: "to intend to", partOfSpeech: "verb", topic: "plans" },
    { word: "estar pensando em", translation: "to be thinking about (doing something)", topic: "plans" },
    { word: "convidar", translation: "to invite", partOfSpeech: "verb", topic: "plans" },
    { word: "combinar", translation: "to arrange / to agree on (plans)", partOfSpeech: "verb", topic: "plans" },
    { word: "marcar", translation: "to schedule", partOfSpeech: "verb", topic: "plans" },
    { word: "topar", translation: "to be up for it (informal, accepting an invitation)", partOfSpeech: "verb", topic: "plans" },
    { word: "tanto faz", translation: "either way / whatever works", topic: "plans" },
    { word: "confirmar", translation: "to confirm", partOfSpeech: "verb", topic: "plans" },
    { word: "cancelar", translation: "to cancel", partOfSpeech: "verb", topic: "plans" },
    { word: "ficou combinado", translation: "it's settled / agreed", topic: "plans" },

    // Life Journey
    { word: "tenho estudado", translation: "I have been studying", note: "Pretérito perfeito composto of 'estudar' - a continuous/repeated action up to now.", topic: "life-experiences" },
    { word: "ultimamente", translation: "lately", topic: "life-experiences" },
    { word: "trajetória", translation: "journey / path (in life or career)", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "conquista", translation: "achievement", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "desafio", translation: "challenge", partOfSpeech: "noun", topic: "life-experiences" },
    { word: "alcançar", translation: "to achieve / to reach", partOfSpeech: "verb", topic: "life-experiences" },
    { word: "já", translation: "already / ever", topic: "life-experiences" },
    { word: "nunca", translation: "never", topic: "life-experiences" },
    { word: "ao longo da vida", translation: "throughout life / over the course of life", topic: "life-experiences" },
    { word: "continuar", translation: "to continue", partOfSpeech: "verb", topic: "life-experiences" }

];

export const portugueseA2Dictionary = rawEntries.map(entry => ({
    id: normalizeWord(entry.word),
    language: "portuguese",
    level: "A2",
    pronunciation: null,
    audio: null,
    partOfSpeech: null,
    topic: null,
    ...entry
}));
