import { normalizeWord } from "../../../repositories/normalizeWord";

const rawEntries = [

    // Greetings
    { word: "salut", translation: "oi", examples: ["Salut, Camille !"], note: "Informal greeting.", topic: "greetings" },
    { word: "bonne nuit", translation: "boa noite (ao dormir)", examples: ["Bonne nuit ! Fais de beaux rêves."], topic: "greetings" },
    { word: "au revoir", translation: "adeus / tchau", examples: ["Au revoir ! Bonne journée."], topic: "greetings" },
    { word: "à plus tard", translation: "até mais tarde", examples: ["À plus tard !"], topic: "greetings" },
    { word: "à demain", translation: "até amanhã", examples: ["À demain !"], topic: "greetings" },
    { word: "à tout à l'heure", translation: "até já / até logo", topic: "greetings" },
    { word: "bienvenue", translation: "bem-vindo(a)", examples: ["Bienvenue dans notre école."], topic: "greetings" },
    { word: "merci", translation: "obrigado(a)", examples: ["Merci pour ton aide."], topic: "greetings" },
    { word: "de rien", translation: "de nada", topic: "greetings" },
    { word: "bonne journée", translation: "tenha um bom dia", topic: "greetings" },
    { word: "bonne soirée", translation: "tenha uma boa noite (ao sair)", topic: "greetings" },
    { word: "s'il te plaît", translation: "por favor (informal)", note: "Used with 'tu'. The formal version is 's'il vous plaît'.", topic: "greetings" },

    // Introductions
    { word: "comment tu t'appelles ?", translation: "Qual é o seu nome? (informal)", topic: "introductions" },
    { word: "je viens de...", translation: "Eu venho de...", examples: ["Je viens de France."], topic: "introductions" },
    { word: "tu viens d'où ?", translation: "De onde você é? (informal)", topic: "introductions" },
    { word: "enchanté", translation: "prazer (em conhecer você)", aliases: ["enchantée"], topic: "introductions" },
    { word: "moi de même", translation: "igualmente", note: "A short, polite reply to 'Enchanté'.", topic: "introductions" },
    { word: "voici...", translation: "Este é / Esta é...", examples: ["Voici mon ami Thomas."], topic: "introductions" },
    { word: "je me présente", translation: "deixe-me me apresentar", topic: "introductions" },
    { word: "et toi ?", translation: "e você? (informal)", topic: "introductions" },

    // Countries & Nationalities
    { word: "Brésil", translation: "Brasil", partOfSpeech: "noun", topic: "countries" },
    { word: "brésilien", translation: "brasileiro(a)", aliases: ["brésilienne"], partOfSpeech: "adjective", topic: "countries" },
    { word: "États-Unis", translation: "Estados Unidos", partOfSpeech: "noun", topic: "countries" },
    { word: "américain", translation: "americano(a)", aliases: ["américaine"], partOfSpeech: "adjective", topic: "countries" },
    { word: "France", translation: "França", partOfSpeech: "noun", topic: "countries" },
    { word: "français", translation: "francês / francesa", aliases: ["française"], partOfSpeech: "adjective", topic: "countries" },
    { word: "Japon", translation: "Japão", partOfSpeech: "noun", topic: "countries" },
    { word: "japonais", translation: "japonês(a)", aliases: ["japonaise"], partOfSpeech: "adjective", topic: "countries" },
    { word: "Espagne", translation: "Espanha", partOfSpeech: "noun", topic: "countries" },
    { word: "espagnol", translation: "espanhol(a)", aliases: ["espagnole"], partOfSpeech: "adjective", topic: "countries" },

    // Numbers
    { word: "zéro", translation: "zero", topic: "numbers" },
    { word: "un", translation: "um", topic: "numbers" },
    { word: "deux", translation: "dois", topic: "numbers" },
    { word: "trois", translation: "três", topic: "numbers" },
    { word: "quatre", translation: "quatro", topic: "numbers" },
    { word: "cinq", translation: "cinco", topic: "numbers" },
    { word: "dix", translation: "dez", topic: "numbers" },
    { word: "vingt", translation: "vinte", topic: "numbers" },
    { word: "cent", translation: "cem", topic: "numbers" },
    { word: "combien", translation: "quanto(s)/quanta(s)", examples: ["Combien de frères as-tu ?"], topic: "numbers" },
    { word: "quel âge as-tu ?", translation: "quantos anos você tem? (informal)", topic: "numbers" },

    // Family
    { word: "mère", translation: "mãe", partOfSpeech: "noun", note: "Nome feminino: la mère.", topic: "family" },
    { word: "père", translation: "pai", partOfSpeech: "noun", note: "Nome masculino: le père.", topic: "family" },
    { word: "parents", translation: "pais", partOfSpeech: "noun", topic: "family" },
    { word: "frère", translation: "irmão", partOfSpeech: "noun", topic: "family" },
    { word: "sœur", translation: "irmã", partOfSpeech: "noun", topic: "family" },
    { word: "fratrie", translation: "irmãos (coletivo)", note: "Termo coletivo para irmãos e irmãs.", partOfSpeech: "noun", topic: "family" },
    { word: "fils", translation: "filho", partOfSpeech: "noun", topic: "family" },
    { word: "fille", translation: "filha", note: "Também significa 'menina/moça' dependendo do contexto.", partOfSpeech: "noun", topic: "family" },
    { word: "grand-mère", translation: "avó", partOfSpeech: "noun", topic: "family" },
    { word: "grand-père", translation: "avô", partOfSpeech: "noun", topic: "family" },

    // Food
    { word: "pain", translation: "pão", partOfSpeech: "noun", topic: "food" },
    { word: "riz", translation: "arroz", partOfSpeech: "noun", topic: "food" },
    { word: "poulet", translation: "frango", partOfSpeech: "noun", topic: "food" },
    { word: "poisson", translation: "peixe", partOfSpeech: "noun", topic: "food" },
    { word: "légumes", translation: "vegetais", partOfSpeech: "noun", topic: "food" },
    { word: "fruits", translation: "frutas", partOfSpeech: "noun", topic: "food" },
    { word: "eau", translation: "água", partOfSpeech: "noun", topic: "food" },
    { word: "café", translation: "café", partOfSpeech: "noun", topic: "food" },
    { word: "j'ai faim", translation: "estou com fome", topic: "food" },
    { word: "j'ai soif", translation: "estou com sede", topic: "food" },

    // Daily Routine
    { word: "se réveiller", translation: "acordar", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "se lever", translation: "levantar da cama", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "prendre le petit-déjeuner", translation: "tomar café da manhã", topic: "daily-routine" },
    { word: "aller au travail", translation: "ir trabalhar", topic: "daily-routine" },
    { word: "déjeuner", translation: "almoçar", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "rentrer à la maison", translation: "voltar para casa", topic: "daily-routine" },
    { word: "dîner", translation: "jantar", partOfSpeech: "verb", topic: "daily-routine" },
    { word: "aller se coucher", translation: "ir para a cama", topic: "daily-routine" },
    { word: "le matin", translation: "de manhã", topic: "daily-routine" },
    { word: "le soir", translation: "à noite", topic: "daily-routine" },

    // Jobs
    { word: "enseignant", translation: "professor(a)", aliases: ["enseignante"], partOfSpeech: "noun", topic: "jobs" },
    { word: "médecin", translation: "médico(a)", note: "Palavra invariável: 'un médecin' ou 'une médecin'.", partOfSpeech: "noun", topic: "jobs" },
    { word: "ingénieur", translation: "engenheiro(a)", aliases: ["ingénieure"], partOfSpeech: "noun", topic: "jobs" },
    { word: "infirmier", translation: "enfermeiro(a)", aliases: ["infirmière"], partOfSpeech: "noun", topic: "jobs" },
    { word: "gérant", translation: "gerente", aliases: ["gérante"], partOfSpeech: "noun", topic: "jobs" },
    { word: "étudiant", translation: "estudante", aliases: ["étudiante"], partOfSpeech: "noun", topic: "jobs" },
    { word: "policier", translation: "policial", aliases: ["policière"], partOfSpeech: "noun", topic: "jobs" },
    { word: "qu'est-ce que tu fais dans la vie ?", translation: "O que você faz (da vida)? (informal)", topic: "jobs" },
    { word: "je travaille comme...", translation: "Eu trabalho como...", topic: "jobs" },

    // Travel
    { word: "aéroport", translation: "aeroporto", partOfSpeech: "noun", topic: "travel" },
    { word: "billet", translation: "passagem / bilhete", partOfSpeech: "noun", topic: "travel" },
    { word: "train", translation: "trem", partOfSpeech: "noun", topic: "travel" },
    { word: "avion", translation: "avião", partOfSpeech: "noun", topic: "travel" },
    { word: "valise", translation: "mala", partOfSpeech: "noun", topic: "travel" },
    { word: "passeport", translation: "passaporte", partOfSpeech: "noun", topic: "travel" },
    { word: "chambre", translation: "quarto", partOfSpeech: "noun", topic: "travel" },
    { word: "réserver", translation: "reservar", partOfSpeech: "verb", topic: "travel" },
    { word: "aller simple", translation: "passagem só de ida", partOfSpeech: "noun", topic: "travel" },
    { word: "aller-retour", translation: "ida e volta", partOfSpeech: "noun", topic: "travel" },

    // Weather
    { word: "il fait beau", translation: "está bonito (tempo)", topic: "weather" },
    { word: "il fait froid", translation: "está frio", topic: "weather" },
    { word: "il fait chaud", translation: "está quente", topic: "weather" },
    { word: "il pleut", translation: "está chovendo", topic: "weather" },
    { word: "il neige", translation: "está nevando", topic: "weather" },
    { word: "soleil", translation: "sol", partOfSpeech: "noun", topic: "weather" },
    { word: "pluie", translation: "chuva", partOfSpeech: "noun", topic: "weather" },
    { word: "vent", translation: "vento", partOfSpeech: "noun", topic: "weather" },
    { word: "nuage", translation: "nuvem", partOfSpeech: "noun", topic: "weather" },
    { word: "quel temps fait-il ?", translation: "que tempo está fazendo?", topic: "weather" },

    // Shopping
    { word: "ça coûte combien ?", translation: "quanto custa?", topic: "shopping" },
    { word: "cher", translation: "caro(a)", partOfSpeech: "adjective", topic: "shopping" },
    { word: "bon marché", translation: "barato(a)", partOfSpeech: "adjective", topic: "shopping" },
    { word: "prix", translation: "preço", partOfSpeech: "noun", topic: "shopping" },
    { word: "payer", translation: "pagar", partOfSpeech: "verb", topic: "shopping" },
    { word: "en espèces", translation: "em dinheiro", topic: "shopping" },
    { word: "par carte", translation: "com cartão", topic: "shopping" },
    { word: "magasin", translation: "loja", partOfSpeech: "noun", topic: "shopping" },
    { word: "caisse", translation: "caixa (do estabelecimento)", partOfSpeech: "noun", topic: "shopping" },
    { word: "essayer", translation: "experimentar / tentar", partOfSpeech: "verb", topic: "shopping" },

    // Hobbies
    { word: "lecture", translation: "leitura", partOfSpeech: "noun", topic: "hobbies" },
    { word: "musique", translation: "música", partOfSpeech: "noun", topic: "hobbies" },
    { word: "sport", translation: "esporte", partOfSpeech: "noun", topic: "hobbies" },
    { word: "danse", translation: "dança", partOfSpeech: "noun", topic: "hobbies" },
    { word: "peinture", translation: "pintura", partOfSpeech: "noun", topic: "hobbies" },
    { word: "cinéma", translation: "cinema", partOfSpeech: "noun", topic: "hobbies" },
    { word: "jouer", translation: "jogar / tocar (instrumento)", partOfSpeech: "verb", topic: "hobbies" },
    { word: "aimer", translation: "gostar / amar", partOfSpeech: "verb", topic: "hobbies" },
    { word: "randonnée", translation: "caminhada / trilha", partOfSpeech: "noun", topic: "hobbies" },
    { word: "jardinage", translation: "jardinagem", partOfSpeech: "noun", topic: "hobbies" }

];

export const frenchA1Dictionary = rawEntries.map(entry => ({
    id: normalizeWord(entry.word),
    language: "french",
    level: "A1",
    pronunciation: null,
    audio: null,
    partOfSpeech: null,
    topic: null,
    ...entry
}));
