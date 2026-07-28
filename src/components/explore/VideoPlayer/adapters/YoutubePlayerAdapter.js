import { loadYouTubeIframeAPI } from "./loadYouTubeIframeAPI";

const POLL_INTERVAL_MS = 250;
const SEEK_GAP_THRESHOLD_SECONDS = 1.5;

export class YoutubePlayerAdapter {

    constructor(host, videoId, callbacks) {
        this.host = host;
        this.videoId = videoId;
        this.callbacks = callbacks;
        this.player = null;
        this.mountNode = null;
        this.pollTimer = null;
        this.lastKnownTime = 0;
        this.destroyed = false;
    }

    async init() {

        const YT = await loadYouTubeIframeAPI();

        if (this.destroyed) {
            return;
        }

        this.mountNode = document.createElement("div");
        this.host.appendChild(this.mountNode);

        await new Promise((resolve) => {

            this.player = new YT.Player(this.mountNode, {
                videoId: this.videoId,
                events: {
                    onReady: () => {
                        this.callbacks.onLoadedMetadata();
                        resolve();
                    },
                    onStateChange: (event) => this.handleStateChange(event)
                }
            });

        });

    }

    handleStateChange(event) {

        const YT = window.YT;

        if (event.data === YT.PlayerState.PLAYING) {
            this.callbacks.onPlay();
            this.startPolling();
        } else if (event.data === YT.PlayerState.PAUSED) {
            this.stopPolling();
            this.callbacks.onPause();
        } else if (event.data === YT.PlayerState.ENDED) {
            this.stopPolling();
            this.callbacks.onEnded();
        }

    }

    startPolling() {

        this.stopPolling();

        this.pollTimer = setInterval(() => {

            const time = this.player.getCurrentTime();
            const expected = this.lastKnownTime + POLL_INTERVAL_MS / 1000;

            if (Math.abs(time - expected) > SEEK_GAP_THRESHOLD_SECONDS) {
                this.callbacks.onSeeked();
            }

            this.lastKnownTime = time;
            this.callbacks.onTimeUpdate(time);

        }, POLL_INTERVAL_MS);

    }

    stopPolling() {

        if (this.pollTimer) {
            clearInterval(this.pollTimer);
            this.pollTimer = null;
        }

    }

    get currentTime() {
        return this.lastKnownTime;
    }

    set currentTime(time) {

        if (!this.player) {
            return;
        }

        this.player.seekTo(time, true);
        this.lastKnownTime = time;
        this.callbacks.onSeeked();

    }

    get duration() {
        return this.player ? this.player.getDuration() : 0;
    }

    play() {
        this.player?.playVideo();
    }

    pause() {
        this.player?.pauseVideo();
    }

    destroy() {

        this.destroyed = true;
        this.stopPolling();

        this.player?.destroy?.();
        this.player = null;

        if (this.mountNode?.parentNode) {
            this.mountNode.parentNode.removeChild(this.mountNode);
        }

        this.mountNode = null;

    }

}
