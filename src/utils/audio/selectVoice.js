// Picks the best available SpeechSynthesisVoice for a given BCP-47
// language code (see ttsLanguageCodes.js). Without this, the browser
// falls back to whatever its own default voice is for that language -
// on some systems that's a low-quality/robotic one, even though a much
// better voice (Siri-style on macOS/iOS, Chrome's own "Google" voices,
// Edge's "Online (Natural)" voices) is already installed and available
// through the exact same Web Speech API, at zero cost and zero new
// dependency. This only *selects* among voices the browser already
// exposes via speechSynthesis.getVoices() - it never downloads, embeds,
// or calls out to a third-party TTS provider.
const PREFERRED_VOICE_NAMES = {
    "en-US": ["Samantha", "Google US English", "Microsoft Aria Online (Natural)", "Microsoft Zira", "Alex"],
    "fr-FR": ["Amelie", "Google français", "Microsoft Denise Online (Natural)", "Thomas"],
    "pt-BR": ["Luciana", "Google português do Brasil", "Microsoft Francisca Online (Natural)"]
};

// Pure - takes whatever speechSynthesis.getVoices() returned, never calls
// it itself, so callers stay in control of when/how often that's read
// (voice lists load asynchronously in some browsers - see
// AudioPlaybackService.js's comment on playTts).
export function selectVoice(voices, languageCode) {

    if (!voices || voices.length === 0) return null;

    const preferredNames = PREFERRED_VOICE_NAMES[languageCode] ?? [];

    for (const name of preferredNames) {
        const match = voices.find(voice => voice.lang === languageCode && voice.name.includes(name));
        if (match) return match;
    }

    const exactLanguageMatch = voices.find(voice => voice.lang === languageCode);
    if (exactLanguageMatch) return exactLanguageMatch;

    // e.g. falls back to any "en-*" voice if "en-US" specifically isn't
    // installed - still far better than the browser's own default.
    const languagePrefix = languageCode.split("-")[0];
    const prefixMatch = voices.find(voice => voice.lang.startsWith(languagePrefix));
    if (prefixMatch) return prefixMatch;

    return null;

}
