export const AUDIO_PROVIDERS = {
    FILE: "file",
    TTS: "tts"
};

// The single place that decides "recorded file, or synthesize speech?" -
// AudioPlaybackService and useAudioPlayer never make this call themselves,
// they just play whatever this returns. Swapping providers for a given
// piece of content is entirely a content-authoring decision (does its
// audio() reference have a `file`?), never a code change here.
//
// `audio`: the optional reference authored via the audio() builder - either
// `{ file }` (a recorded clip, same root-relative path convention as
// `cover`) or `{}` (explicitly opt into TTS, no file yet). `undefined`/
// `null` means the item has no audio at all.
// `text`/`language`: always the sibling content already available wherever
// audio() was attached (a word, an example, a feedback field, ...) - the
// audio reference itself never repeats it.
export function resolveAudioSource({ audio, text, language }) {

    if (!audio) {
        return null;
    }

    if (audio.file) {
        return { provider: AUDIO_PROVIDERS.FILE, url: audio.file };
    }

    if (!text) {
        return null;
    }

    return { provider: AUDIO_PROVIDERS.TTS, text, language };

}
