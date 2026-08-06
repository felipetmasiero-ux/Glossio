import { normalizeWord } from "../../../repositories/normalizeWord";

const rawEntries = [

    { word: "bom dia", translation: "good morning" },
    { word: "boa tarde", translation: "good afternoon" },
    { word: "boa noite", translation: "good evening / good night", note: "Used both when arriving at night and before sleeping." },
    { word: "como vai", translation: "how's it going (informal)" },
    { word: "como você está", translation: "how are you" },
    { word: "muito prazer", translation: "nice to meet you" },
    { word: "até logo", translation: "see you later" },
    { word: "até amanhã", translation: "see you tomorrow" },
    { word: "por favor", translation: "please" },
    { word: "obrigado", translation: "thank you", aliases: ["obrigada"] },
    { word: "de nada", translation: "you're welcome" },
    { word: "com licença", translation: "excuse me" },
    { word: "desculpe", translation: "sorry / excuse me" },
    { word: "eu gostaria", translation: "I would like" },
    { word: "onde fica", translation: "where is" },
    { word: "há", translation: "there is / there are" },
    { word: "tem", translation: "there is / there are (informal) / has" },
    { word: "tudo bem", translation: "all good / okay", note: "Used both as a question ('Tudo bem?') and as an answer ('Tudo bem!')." },
    { word: "não sei", translation: "I don't know" },
    { word: "acho que sim", translation: "I think so" },
    { word: "acho que não", translation: "I don't think so" },
    { word: "sem problema", translation: "no problem" },
    { word: "com certeza", translation: "of course / for sure" },
    { word: "que horas são", translation: "what time is it" },
    { word: "à direita", translation: "on the right" },
    { word: "à esquerda", translation: "on the left" },
    { word: "em frente", translation: "straight ahead" },
    { word: "ao lado de", translation: "next to" },
    { word: "na frente de", translation: "in front of" },
    { word: "um pouco de", translation: "a little (of)" },
    { word: "muito obrigado", translation: "thank you very much", aliases: ["muito obrigada"] },
    { word: "boa sorte", translation: "good luck" }

];

export const portuguesePhrasesDictionary = rawEntries.map(entry => ({
    id: normalizeWord(entry.word),
    language: "portuguese",
    level: "A1",
    pronunciation: null,
    audio: null,
    partOfSpeech: null,
    topic: null,
    ...entry
}));
