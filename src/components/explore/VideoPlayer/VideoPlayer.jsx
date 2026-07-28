import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import "./VideoPlayer.css";

import { NativeVideoAdapter } from "./adapters/NativeVideoAdapter";
import { YoutubePlayerAdapter } from "./adapters/YoutubePlayerAdapter";

export const VideoPlayer = forwardRef(function VideoPlayer({
    video,
    onTimeUpdate,
    onPlay,
    onPause,
    onSeeked,
    onEnded,
    onLoadedMetadata
}, ref) {

    const containerRef = useRef(null);
    const videoElementRef = useRef(null);
    const adapterRef = useRef(null);

    const propsRef = useRef({});
    useEffect(() => {
        propsRef.current = { onTimeUpdate, onPlay, onPause, onSeeked, onEnded, onLoadedMetadata };
    });

    useImperativeHandle(ref, () => ({
        get currentTime() {
            return adapterRef.current?.currentTime ?? 0;
        },
        set currentTime(time) {
            if (adapterRef.current) {
                adapterRef.current.currentTime = time;
            }
        },
        get duration() {
            return adapterRef.current?.duration ?? 0;
        },
        play() {
            adapterRef.current?.play();
        },
        pause() {
            adapterRef.current?.pause();
        }
    }), []);

    const sourceType = video.source?.type;
    const sourceVideoId = video.source?.videoId;
    const sourceSrc = video.source?.src;

    useEffect(() => {

        const callbacks = {
            onTimeUpdate: (time) => propsRef.current.onTimeUpdate?.({ target: { currentTime: time } }),
            onPlay: () => propsRef.current.onPlay?.(),
            onPause: () => propsRef.current.onPause?.(),
            onSeeked: () => propsRef.current.onSeeked?.(),
            onEnded: () => propsRef.current.onEnded?.(),
            onLoadedMetadata: () => propsRef.current.onLoadedMetadata?.()
        };

        if (sourceType === "youtube") {

            const adapter = new YoutubePlayerAdapter(containerRef.current, sourceVideoId, callbacks);

            adapter.init().then(() => {
                adapterRef.current = adapter;
            });

            return () => {
                adapter.destroy();
                adapterRef.current = null;
            };

        }

        const adapter = new NativeVideoAdapter(videoElementRef.current, callbacks);
        adapter.attach();
        adapterRef.current = adapter;

        return () => {
            adapter.destroy();
            adapterRef.current = null;
        };

    }, [video.id, sourceType, sourceVideoId, sourceSrc]);

    if (sourceType === "youtube") {

        return (
            <div className="video-player">
                <div className="video-player__element" ref={containerRef} />
            </div>
        );

    }

    return (

        <div className="video-player">

            <video
                ref={videoElementRef}
                className="video-player__element"
                src={sourceSrc}
                poster={video.thumbnail}
                controls
                preload="metadata"
            >
                Seu navegador não suporta a reprodução deste vídeo.
            </video>

        </div>

    );

});
