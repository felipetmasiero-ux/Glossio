import { useRef, useState } from "react";

import { VideoProgressRepository } from "../../repositories/VideoProgressRepository";
import { useEvents } from "../useEvents";
import { EVENT_TYPES } from "../../constants/events";

const SAVE_INTERVAL_SECONDS = 5;

export function useVideoProgress(video) {

    const { logEvent } = useEvents();

    const [initialProgress] = useState(() =>
        video ? VideoProgressRepository.getVideoProgress(video.language, video.id) : null
    );

    // Must reflect any saved progress right away, not just after a fresh
    // `handleEnded()` fires this session - otherwise reopening a video
    // already marked completed briefly (or permanently, since nothing else
    // ever flips it) shows the player again instead of the completion screen.
    const [completed, setCompleted] = useState(() => Boolean(initialProgress?.completed));

    const playLoggedRef = useRef(false);

    const completedLoggedRef = useRef(Boolean(initialProgress?.completed));

    const lastSavedTimeRef = useRef(initialProgress?.currentTime ?? 0);

    const resumeAppliedRef = useRef(false);

    function persist(currentTime, extra = {}) {

        if (!video) {
            return;
        }

        VideoProgressRepository.updateVideoProgress(video.language, video.id, {
            currentTime,
            duration: video.duration,
            ...extra
        });

    }

    function handlePlay() {

        if (!video || playLoggedRef.current) {
            return;
        }

        playLoggedRef.current = true;

        if (!initialProgress) {
            logEvent(EVENT_TYPES.VIDEO_STARTED, { videoId: video.id });
        } else if (!initialProgress.completed) {
            logEvent(EVENT_TYPES.VIDEO_RESUMED, { videoId: video.id });
        }

    }

    function handleTimeUpdate(currentTime) {

        if (currentTime - lastSavedTimeRef.current >= SAVE_INTERVAL_SECONDS) {
            lastSavedTimeRef.current = currentTime;
            persist(currentTime);
        }

    }

    function handlePause(currentTime) {

        lastSavedTimeRef.current = currentTime;

        persist(currentTime);

    }

    function handleSeeked(currentTime) {

        lastSavedTimeRef.current = currentTime;

        persist(currentTime);

    }

    function handleEnded() {

        if (!video || completedLoggedRef.current) {
            return;
        }

        completedLoggedRef.current = true;

        persist(video.duration, {
            completed: true,
            completedAt: Date.now()
        });

        logEvent(EVENT_TYPES.VIDEO_COMPLETED, { videoId: video.id });

        setCompleted(true);

    }

    function applyResume(videoElement) {

        if (resumeAppliedRef.current || !videoElement) {
            return;
        }

        resumeAppliedRef.current = true;

        if (initialProgress && !initialProgress.completed) {
            videoElement.currentTime = initialProgress.currentTime;
        }

    }

    return {
        initialProgress,
        completed,
        handlePlay,
        handleTimeUpdate,
        handlePause,
        handleSeeked,
        handleEnded,
        applyResume
    };

}
