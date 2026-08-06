// SpeechSynthesisUtterance.lang needs a real BCP-47 tag, not the lowercase
// language keys the rest of the app uses (dictionaries/coursesByLanguage
// are keyed "english"/"french"/"portuguese"). One small map instead of
// spreading this translation across every TTS call site.
const TTS_LANGUAGE_CODES = {
    english: "en-US",
    french: "fr-FR",
    portuguese: "pt-BR"
};

const DEFAULT_TTS_LANGUAGE_CODE = "en-US";

export function getTtsLanguageCode(language) {
    return TTS_LANGUAGE_CODES[language?.toLowerCase()] ?? DEFAULT_TTS_LANGUAGE_CODE;
}
