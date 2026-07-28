import { useEffect, useRef, useState } from "react";

import "./InteractiveTranscript.css";

import { EmptyState } from "../../common/EmptyState/EmptyState";
import { TranscriptRenderer } from "../TranscriptRenderer/TranscriptRenderer";
import { formatDuration } from "../../../utils/videos/formatDuration";

const AUTO_SCROLL_RESUME_DELAY = 2500;

const AUTO_SCROLL_ANIMATION_GUARD = 600;

const SEGMENTS_BEFORE = 2;

const SEGMENTS_AFTER = 2;

export function InteractiveTranscript({
    segments = [],
    currentTime = 0,
    onSeek,
    language,
    onWordClick = () => {},
    knownWords = new Set()
}) {

    const activeRef = useRef(null);

    const isAutoScrollingRef = useRef(false);

    const resumeTimeoutRef = useRef(null);

    const guardTimeoutRef = useRef(null);

    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

    const activeIndex = segments.findIndex(segment =>
        currentTime >= segment.startTime && currentTime < segment.endTime
    );

    let referenceIndex = activeIndex;

    if (referenceIndex === -1) {

        for (let i = segments.length - 1; i >= 0; i--) {

            if (segments[i].startTime <= currentTime) {
                referenceIndex = i;
                break;
            }

        }

        if (referenceIndex === -1) {
            referenceIndex = 0;
        }

    }

    const windowStart = Math.max(0, referenceIndex - SEGMENTS_BEFORE);

    const windowEnd = Math.min(segments.length, referenceIndex + SEGMENTS_AFTER + 1);

    const visibleSegments = segments.slice(windowStart, windowEnd);

    useEffect(() => {

        if (!autoScrollEnabled || !activeRef.current) {
            return;
        }

        isAutoScrollingRef.current = true;

        activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

        clearTimeout(guardTimeoutRef.current);

        guardTimeoutRef.current = setTimeout(() => {
            isAutoScrollingRef.current = false;
        }, AUTO_SCROLL_ANIMATION_GUARD);

    }, [activeIndex, autoScrollEnabled]);

    useEffect(() => () => {
        clearTimeout(resumeTimeoutRef.current);
        clearTimeout(guardTimeoutRef.current);
    }, []);

    function handleScroll() {

        if (isAutoScrollingRef.current) {
            return;
        }

        setAutoScrollEnabled(false);

        clearTimeout(resumeTimeoutRef.current);

        resumeTimeoutRef.current = setTimeout(() => {
            setAutoScrollEnabled(true);
        }, AUTO_SCROLL_RESUME_DELAY);

    }

    function handleSegmentKeyDown(event, startTime) {

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSeek(startTime);
        }

    }

    if (segments.length === 0) {

        return (
            <EmptyState
                icon="chat"
                title="Transcrição indisponível"
                description="Este vídeo ainda não tem uma transcrição cadastrada."
            />
        );

    }

    return (

        <div
            className="interactive-transcript"
            onScroll={handleScroll}
            aria-label="Transcrição do vídeo"
        >

            {
                visibleSegments.map((segment, offset) => {

                    const index = windowStart + offset;

                    const isActive = index === activeIndex;

                    return (

                        <div
                            key={index}
                            role="button"
                            tabIndex={0}
                            ref={isActive ? activeRef : null}
                            className={`interactive-transcript__segment ${isActive ? "interactive-transcript__segment--active" : ""}`}
                            onClick={() => onSeek(segment.startTime)}
                            onKeyDown={event => handleSegmentKeyDown(event, segment.startTime)}
                        >

                            <span className="interactive-transcript__time text-mono-label">
                                {formatDuration(segment.startTime)}
                            </span>

                            <span className="interactive-transcript__text text-reading">
                                <TranscriptRenderer
                                    segment={segment}
                                    language={language}
                                    onWordClick={onWordClick}
                                    knownWords={knownWords}
                                />
                            </span>

                        </div>

                    );

                })
            }

        </div>

    );

}
