export class NativeVideoAdapter {

    constructor(videoElement, callbacks) {
        this.videoElement = videoElement;
        this.callbacks = callbacks;
        this.handlers = null;
    }

    attach() {

        const el = this.videoElement;

        this.handlers = {
            timeupdate: () => this.callbacks.onTimeUpdate(el.currentTime),
            play: () => this.callbacks.onPlay(),
            pause: () => this.callbacks.onPause(),
            seeked: () => this.callbacks.onSeeked(),
            ended: () => this.callbacks.onEnded(),
            loadedmetadata: () => this.callbacks.onLoadedMetadata()
        };

        for (const [eventName, handler] of Object.entries(this.handlers)) {
            el.addEventListener(eventName, handler);
        }

    }

    get currentTime() {
        return this.videoElement.currentTime;
    }

    set currentTime(time) {
        this.videoElement.currentTime = time;
    }

    get duration() {
        return this.videoElement.duration;
    }

    play() {
        this.videoElement.play();
    }

    pause() {
        this.videoElement.pause();
    }

    destroy() {

        if (!this.handlers) {
            return;
        }

        for (const [eventName, handler] of Object.entries(this.handlers)) {
            this.videoElement.removeEventListener(eventName, handler);
        }

        this.handlers = null;

    }

}
