import { useCallback, useEffect, useRef, useState } from "react";

import { createAudioController, AUDIO_STATUS } from "../../utils/audio/AudioPlaybackService";
import { resolveAudioSource } from "../../utils/audio/resolveAudioSource";

// The only thing components should use to play audio - wraps
// AudioPlaybackService (the only code that touches Audio()/
// speechSynthesis) behind React state, and resolveAudioSource (the only
// place that decides file vs TTS) behind a single play() call. AudioButton
// is the only consumer today, but any future audio entry point reuses this
// same hook instead of talking to the service directly.
//
// `audio`/`text`/`language`: same trio resolveAudioSource takes - `audio`
// is the optional reference authored via the audio() builder, `text` is
// whatever it's attached to (a word, an example, a feedback field...).
export function useAudioPlayer({ audio, text, language }) {

    const [status, setStatus] = useState(AUDIO_STATUS.IDLE);

    const controllerRef = useRef(null);

    useEffect(() => {

        const controller = createAudioController({ onStatusChange: setStatus });

        controllerRef.current = controller;

        return () => {
            controller.stop();
            controllerRef.current = null;
        };

    }, []);

    const play = useCallback(() => {

        const source = resolveAudioSource({ audio, text, language });

        controllerRef.current?.play(source);

    }, [audio, text, language]);

    const pause = useCallback(() => {
        controllerRef.current?.pause();
    }, []);

    return {
        status,
        hasAudio: Boolean(audio),
        play,
        pause,
        // Same action as play() - a separate name in the returned API
        // because AudioButton calls it from a visually distinct "replay"
        // state (after the clip finished), not because the mechanics
        // differ: there's no partial resume, every play starts from the
        // beginning.
        replay: play
    };

}
