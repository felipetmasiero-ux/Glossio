let apiPromise = null;

export function loadYouTubeIframeAPI() {

    if (window.YT?.Player) {
        return Promise.resolve(window.YT);
    }

    if (apiPromise) {
        return apiPromise;
    }

    apiPromise = new Promise((resolve) => {

        const previousReady = window.onYouTubeIframeAPIReady;

        window.onYouTubeIframeAPIReady = () => {
            previousReady?.();
            resolve(window.YT);
        };

        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);

    });

    return apiPromise;

}
