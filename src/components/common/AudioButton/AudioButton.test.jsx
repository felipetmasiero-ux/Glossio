import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { AudioButton } from "./AudioButton";
import { AUDIO_STATUS } from "../../../utils/audio/AudioPlaybackService";

vi.mock("../../../hooks/audio/useAudioPlayer", () => ({ useAudioPlayer: vi.fn() }));

import { useAudioPlayer } from "../../../hooks/audio/useAudioPlayer";

function mockPlayer({ status = AUDIO_STATUS.IDLE, hasAudio = true, play = vi.fn(), pause = vi.fn(), replay = vi.fn() } = {}) {
    useAudioPlayer.mockReturnValue({ status, hasAudio, play, pause, replay });
    return { play, pause, replay };
}

describe("AudioButton", () => {

    it("renders nothing when the item has no audio reference - compatibility with every existing lesson", () => {

        mockPlayer({ hasAudio: false });

        const { container } = render(<AudioButton audio={null} text="hello" language="english" />);

        expect(container.firstChild).toBeNull();

    });

    it("renders a real, keyboard-focusable button when audio is available", () => {

        mockPlayer({ status: AUDIO_STATUS.IDLE });

        render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);

        const button = screen.getByRole("button");

        expect(button.tagName).toBe("BUTTON");
        expect(button).not.toHaveProperty("disabled", true);

    });

    it("labels the button according to the current status", () => {

        const { rerender } = render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);

        mockPlayer({ status: AUDIO_STATUS.IDLE });
        rerender(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);
        expect(screen.getByLabelText("Reproduzir áudio")).not.toBeNull();

        mockPlayer({ status: AUDIO_STATUS.PLAYING });
        rerender(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);
        expect(screen.getByLabelText("Pausar áudio")).not.toBeNull();

        mockPlayer({ status: AUDIO_STATUS.ENDED });
        rerender(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);
        expect(screen.getByLabelText("Reproduzir áudio novamente")).not.toBeNull();

        mockPlayer({ status: AUDIO_STATUS.LOADING });
        rerender(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);
        expect(screen.getByLabelText("Carregando áudio")).not.toBeNull();

    });

    it("calls play() when idle and clicked", () => {

        const { play } = mockPlayer({ status: AUDIO_STATUS.IDLE });

        render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);

        fireEvent.click(screen.getByRole("button"));

        expect(play).toHaveBeenCalled();

    });

    it("calls pause() when playing and clicked", () => {

        const { pause, play } = mockPlayer({ status: AUDIO_STATUS.PLAYING });

        render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);

        fireEvent.click(screen.getByRole("button"));

        expect(pause).toHaveBeenCalled();
        expect(play).not.toHaveBeenCalled();

    });

    it("calls replay() when ended and clicked", () => {

        const { replay } = mockPlayer({ status: AUDIO_STATUS.ENDED });

        render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);

        fireEvent.click(screen.getByRole("button"));

        expect(replay).toHaveBeenCalled();

    });

    it("is disabled while loading and does not trigger play again on click", () => {

        const { play } = mockPlayer({ status: AUDIO_STATUS.LOADING });

        render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);

        const button = screen.getByRole("button");

        expect(button.disabled).toBe(true);

        fireEvent.click(button);

        expect(play).not.toHaveBeenCalled();

    });

    it("calls onPlay when starting playback from idle", () => {

        mockPlayer({ status: AUDIO_STATUS.IDLE });
        const onPlay = vi.fn();

        render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" onPlay={onPlay} />);

        fireEvent.click(screen.getByRole("button"));

        expect(onPlay).toHaveBeenCalledTimes(1);

    });

    it("calls onPlay again on replay", () => {

        mockPlayer({ status: AUDIO_STATUS.ENDED });
        const onPlay = vi.fn();

        render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" onPlay={onPlay} />);

        fireEvent.click(screen.getByRole("button"));

        expect(onPlay).toHaveBeenCalledTimes(1);

    });

    it("does not call onPlay when pausing", () => {

        mockPlayer({ status: AUDIO_STATUS.PLAYING });
        const onPlay = vi.fn();

        render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" onPlay={onPlay} />);

        fireEvent.click(screen.getByRole("button"));

        expect(onPlay).not.toHaveBeenCalled();

    });

    it("works without an onPlay prop - every existing caller omits it", () => {

        mockPlayer({ status: AUDIO_STATUS.IDLE });

        render(<AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />);

        expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();

    });

    it("does not bubble its click to a surrounding clickable card", () => {

        mockPlayer({ status: AUDIO_STATUS.IDLE });

        const parentClick = vi.fn();

        render(
            <div onClick={parentClick}>
                <AudioButton audio={{ file: "/a.mp3" }} text="hello" language="english" />
            </div>
        );

        fireEvent.click(screen.getByRole("button"));

        expect(parentClick).not.toHaveBeenCalled();

    });

});
