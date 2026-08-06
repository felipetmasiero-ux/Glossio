import { normalizeWord } from "../../../repositories/normalizeWord";

const rawEntries = [

    { word: "I'm", translation: "eu sou / estou", note: "Contração de 'I am'." },
    { word: "you're", translation: "você é / está", note: "Contração de 'you are'." },
    { word: "we're", translation: "nós somos / estamos", note: "Contração de 'we are'." },
    { word: "they're", translation: "eles são / estão", note: "Contração de 'they are'." },
    { word: "he's", translation: "ele é / está", note: "Contração de 'he is'." },
    { word: "she's", translation: "ela é / está", note: "Contração de 'she is'." },
    { word: "it's", translation: "isso é / está", note: "Contração de 'it is'." },
    { word: "I've", translation: "eu tenho / já", note: "Contração de 'I have'." },
    { word: "we've", translation: "nós temos", note: "Contração de 'we have'." },
    { word: "don't", translation: "não (presente)", note: "Contração de 'do not'." },
    { word: "can't", translation: "não posso / consegue", note: "Contração de 'cannot'." },
    { word: "won't", translation: "não vai / irá", note: "Contração de 'will not'." },
    { word: "didn't", translation: "não (passado)", note: "Contração de 'did not'." },
    { word: "doesn't", translation: "não (presente, 3ª pessoa)", note: "Contração de 'does not'." },
    { word: "isn't", translation: "não é / está", note: "Contração de 'is not'." },
    { word: "aren't", translation: "não são / estão", note: "Contração de 'are not'." }

];

export const englishContractionsDictionary = rawEntries.map(entry => ({
    id: normalizeWord(entry.word),
    language: "english",
    level: "A1",
    pronunciation: null,
    audio: null,
    partOfSpeech: null,
    topic: null,
    ...entry
}));
