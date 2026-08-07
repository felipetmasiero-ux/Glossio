import { AUDIO_PROVIDERS } from "./resolveAudioSource";
import { getTtsLanguageCode } from "./ttsLanguageCodes";
import { selectVoice } from "./selectVoice";

export const AUDIO_STATUS = {
    IDLE: "idle",
    LOADING: "loading",
    PLAYING: "playing",
    ENDED: "ended",
    ERROR: "error"
};

// The one place HTMLAudioElement / window.speechSynthesis get touched - no
// component should ever call `new Audio()` or reach into
// `window.speechSynthesis` directly (see useAudioPlayer, the only caller).
// Returns a fresh controller per call, not a shared singleton, so more than
// one <AudioButton> can exist on screen at once without fighting over the
// same underlying element/utterance.
//
// `activeToken` guards every async callback (canplay/ended/error/onstart/
// onend/onerror) against firing after a *newer* play() call or an explicit
// stop()/pause() has already superseded it - otherwise a quick
// play -> pause -> play could let a stale event from the first playback
// flip the status after the second one has already started.
export function createAudioController({ onStatusChange } = {}) {

    let audioElement = null;

    let activeToken = 0;

    function setStatus(status) {
        onStatusChange?.(status);
    }

    function playFile(url) {

        const token = ++activeToken;

        setStatus(AUDIO_STATUS.LOADING);

        const element = new Audio(url);

        audioElement = element;

        element.addEventListener("canplay", () => {

            if (token !== activeToken) return;

            const playResult = element.play();

            if (playResult?.catch) {
                playResult.catch(() => {
                    if (token === activeToken) setStatus(AUDIO_STATUS.ERROR);
                });
            }

            setStatus(AUDIO_STATUS.PLAYING);

        }, { once: true });

        element.addEventListener("ended", () => {
            if (token === activeToken) setStatus(AUDIO_STATUS.ENDED);
        });

        element.addEventListener("error", () => {
            if (token === activeToken) setStatus(AUDIO_STATUS.ERROR);
        });

        element.load();

    }

    function playTts(text, language) {

        const token = ++activeToken;

        const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

        if (!synth || typeof SpeechSynthesisUtterance === "undefined") {
            setStatus(AUDIO_STATUS.ERROR);
            return;
        }

        setStatus(AUDIO_STATUS.LOADING);

        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        const languageCode = getTtsLanguageCode(language);

        utterance.lang = languageCode;

        // getVoices() can return [] on the very first call in some browsers
        // (Chrome loads the list asynchronously in the background) - when
        // that happens, selectVoice() returns null and the utterance just
        // keeps the browser's own default voice for `lang` (today's
        // behavior). Every subsequent call in the same page load has the
        // full list, so this self-corrects without any extra plumbing.
        const voice = selectVoice(synth.getVoices(), languageCode);

        if (voice) {
            utterance.voice = voice;
        }

        utterance.onstart = () => {
            if (token === activeToken) setStatus(AUDIO_STATUS.PLAYING);
        };

        utterance.onend = () => {
            if (token === activeToken) setStatus(AUDIO_STATUS.ENDED);
        };

        utterance.onerror = () => {
            if (token === activeToken) setStatus(AUDIO_STATUS.ERROR);
        };

        synth.speak(utterance);

    }

    function play(source) {

        if (source?.provider === AUDIO_PROVIDERS.FILE) {
            playFile(source.url);
            return;
        }

        if (source?.provider === AUDIO_PROVIDERS.TTS) {
            playTts(source.text, source.language);
            return;
        }

        setStatus(AUDIO_STATUS.ERROR);

    }

    function pause() {

        activeToken += 1;

        if (audioElement) {
            audioElement.pause();
        }

        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        setStatus(AUDIO_STATUS.IDLE);

    }

    function stop() {

        activeToken += 1;

        if (audioElement) {
            audioElement.pause();
            audioElement.removeAttribute("src");
            audioElement = null;
        }

        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

    }

    return { play, pause, stop };

}
