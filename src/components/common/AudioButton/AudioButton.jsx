import { useAudioPlayer } from "../../../hooks/audio/useAudioPlayer";
import { AUDIO_STATUS } from "../../../utils/audio/AudioPlaybackService";
import { Icon } from "../Icon/Icon";

import "./AudioButton.css";

const LABEL_BY_STATUS = {
    [AUDIO_STATUS.IDLE]: "Reproduzir áudio",
    [AUDIO_STATUS.LOADING]: "Carregando áudio",
    [AUDIO_STATUS.PLAYING]: "Pausar áudio",
    [AUDIO_STATUS.ENDED]: "Reproduzir áudio novamente",
    [AUDIO_STATUS.ERROR]: "Não foi possível reproduzir o áudio - tocar para tentar de novo"
};

// The one reusable player UI - every place audio can appear (vocabulary,
// examples, dialogue, feedback, prose blocks) renders this same component
// instead of its own play button. A native <button>, so keyboard support
// (Tab + Enter/Space) comes for free; aria-label changes with `status` so
// screen readers announce what the button does *right now*, not just
// "button". Renders nothing when the item has no audio() reference at all -
// no empty button, no error, for every piece of content that predates this
// feature (see AudioButton.test.jsx's compatibility case).
//
// `onPlay` is optional (default no-op) - called right before a *new*
// playback starts (first play, replay, or retry after an error - never on
// pause). Every existing caller omits it and is completely unaffected;
// it exists so a caller that needs to count plays/detect a replay (e.g. a
// listening exercise's analytics) can, without reaching into
// useAudioPlayer/AudioPlaybackService directly.
export function AudioButton({ audio, text, language, className = "", onPlay }) {

    const { status, hasAudio, play, pause, replay } = useAudioPlayer({ audio, text, language });

    if (!hasAudio) {
        return null;
    }

    function handleClick(event) {

        // Every place this renders sits inside a larger clickable surface
        // (a flip card, a popup) - this button's own action must win
        // instead of bubbling into the parent's onClick.
        event.stopPropagation();

        if (status === AUDIO_STATUS.PLAYING) {
            pause();
            return;
        }

        if (status === AUDIO_STATUS.LOADING) {
            return;
        }

        if (status === AUDIO_STATUS.ENDED) {
            onPlay?.();
            replay();
            return;
        }

        onPlay?.();
        play();

    }

    return (

        <button
            type="button"
            className={`audio-button audio-button--${status} ${className}`.trim()}
            onClick={handleClick}
            aria-label={LABEL_BY_STATUS[status]}
            disabled={status === AUDIO_STATUS.LOADING}
        >

            {
                status === AUDIO_STATUS.LOADING
                    ? <span className="audio-button__spinner animate-spin" aria-hidden="true" />
                    : status === AUDIO_STATUS.PLAYING
                        ? <Icon name="pause" size={14} />
                        : status === AUDIO_STATUS.ENDED
                            ? <Icon name="replay" size={14} />
                            : <Icon name="play" size={14} />
            }

        </button>

    );

}
