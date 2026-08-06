import { error, warning } from "./createIssue";

const KNOWN_AUDIO_FIELDS = ["file"];

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

// Shared by every place an audio() reference can appear: a block
// (paragraph/quote/tip/grammar/culture), an example/dialogue line item, a
// quiz feedback field, or a dictionary entry - one validator instead of
// repeating the same shape check at each call site.
//
// "Never set" is valid - audio is opt-in everywhere - but that shows up as
// two different values depending on the caller: block builders leave it
// `undefined` (createBlock spreads whatever was passed as the argument),
// while dictionary entries default it to `null` (matching the existing
// `pronunciation: null` placeholder convention - see
// src/data/dictionary/**/*.js). Both mean the same thing here.
export function validateAudioRef(audioValue, path) {

    if (audioValue == null) {
        return [];
    }

    if (typeof audioValue !== "object" || Array.isArray(audioValue)) {
        return [error("audio", path, `"audio" precisa ser um objeto (use o builder audio()).`)];
    }

    const issues = [];

    Object.keys(audioValue).forEach(key => {

        if (!KNOWN_AUDIO_FIELDS.includes(key)) {
            issues.push(warning("audio", path, `Campo de áudio desconhecido: "${key}". Campos válidos: ${KNOWN_AUDIO_FIELDS.join(", ")}.`));
            return;
        }

        if (!isNonEmptyString(audioValue[key])) {
            issues.push(error("audio", path, `"audio.${key}" precisa ser uma string não vazia quando presente.`));
        }

    });

    return issues;

}
