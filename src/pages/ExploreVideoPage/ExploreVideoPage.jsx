import { useMemo, useRef, useState } from "react";

import "./ExploreVideoPage.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useFlashcards } from "../../hooks/useFlashcards";
import { useVideoProgress } from "../../hooks/explore/useVideoProgress";

import { VideoRepository } from "../../repositories/VideoRepository";
import { DictionaryRepository } from "../../repositories/DictionaryRepository";
import { normalizeWord } from "../../repositories/normalizeWord";

import { TOPIC_LABELS } from "../../constants/topics";
import { formatDuration } from "../../utils/videos/formatDuration";

import { VideoPlayer } from "../../components/explore/VideoPlayer/VideoPlayer";
import { InteractiveTranscript } from "../../components/explore/InteractiveTranscript/InteractiveTranscript";
import { ExploreVideoComplete } from "../../components/explore/ExploreVideoComplete/ExploreVideoComplete";
import { WordPopup } from "../../components/lessons/WordPopup/WordPopup";
import { Badge } from "../../components/common/Badge/Badge";
import { Icon } from "../../components/common/Icon/Icon";
import { Skeleton } from "../../components/common/Skeleton/Skeleton";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { Seo } from "../../components/common/Seo/Seo";

const TRANSCRIPT_SKELETON_PATTERN = [
    ["68%"],
    ["92%", "54%"],
    ["97%", "38%"],
    ["62%"],
    ["48%"]
];

export function ExploreVideoPage() {

    const navigate = useNavigate();

    const { videoId } = useParams();

    const { language } = useLanguage();

    const { flashcards } = useFlashcards();

    const video = VideoRepository.getById(language, videoId);

    const {
        initialProgress,
        completed,
        handlePlay: trackPlay,
        handleTimeUpdate: trackTimeUpdate,
        handlePause: trackPause,
        handleSeeked: trackSeeked,
        handleEnded: trackEnded,
        applyResume
    } = useVideoProgress(video);

    const videoRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(() =>
        initialProgress && !initialProgress.completed ? initialProgress.currentTime : 0
    );

    const [openPopups, setOpenPopups] = useState([]);

    const [clickedWords, setClickedWords] = useState(() => new Set());

    const [addedWords, setAddedWords] = useState(() => new Set());

    const [isPlayerReady, setIsPlayerReady] = useState(false);

    const knownWords = useMemo(() => {

        return new Set(
            flashcards
                .filter(card => card.language === language)
                .map(card => normalizeWord(card.word))
        );

    }, [flashcards, language]);

    function handleTimeUpdate(event) {

        const time = event.target.currentTime;

        setCurrentTime(time);

        trackTimeUpdate(time);

    }

    function handlePause() {
        trackPause(videoRef.current?.currentTime ?? currentTime);
    }

    function handleSeeked() {
        trackSeeked(videoRef.current?.currentTime ?? currentTime);
    }

    function handleEnded() {
        setOpenPopups([]);
        trackEnded();
    }

    function handleLoadedMetadata() {
        applyResume(videoRef.current);
        setIsPlayerReady(true);
    }

    function handleSeek(time) {

        setCurrentTime(time);

        if (videoRef.current) {
            videoRef.current.currentTime = time;
        }

    }

    function handleWordClick({ word, language: dictLanguage, anchor }) {

        if (!anchor) {
            return;
        }

        const entry = DictionaryRepository.getEntry(dictLanguage, word);

        if (!entry) {
            return;
        }

        setClickedWords(previous => new Set(previous).add(normalizeWord(word)));

        setOpenPopups(previous => {

            if (previous.some(popup => popup.anchor === anchor)) {
                return previous;
            }

            return [
                ...previous,
                { id: crypto.randomUUID(), entry, anchor }
            ];

        });

    }

    function handleClosePopup(id) {

        setOpenPopups(previous =>
            previous.filter(popup => popup.id !== id)
        );

    }

    function handleWordAdded(word) {
        setAddedWords(previous => new Set(previous).add(normalizeWord(word)));
    }

    if (!video) {

        return (
            <div className="page-container">
                <Seo title="Vídeo não encontrado" robots="noindex, nofollow" />
                <EmptyState
                    icon="play"
                    title="Vídeo não encontrado"
                    description="Este vídeo pode ter sido movido ou não existe mais."
                    actionLabel="Voltar ao Explore"
                    onAction={() => navigate("/explore")}
                />
            </div>
        );

    }

    if (completed) {

        return (
            <div className="page-container explore-video-page animate-fade-in">
                <Seo title={video.title} description={video.description} robots="noindex, nofollow" path={`/explore/${videoId}`} />
                <ExploreVideoComplete
                    video={video}
                    clickedCount={clickedWords.size}
                    addedCount={addedWords.size}
                />
            </div>
        );

    }

    return (

        <div className="page-container explore-video-page animate-fade-in">

            <Seo title={video.title} description={video.description} robots="noindex, nofollow" path={`/explore/${videoId}`} />

            <nav className="explore-video-page__breadcrumb" aria-label="Breadcrumb">

                <Link to="/explore" className="explore-video-page__back">
                    <Icon name="chevron-left" size={15} />
                    Explore
                </Link>

                <span className="explore-video-page__breadcrumb-separator" aria-hidden="true">/</span>

                <span className="explore-video-page__breadcrumb-current">{video.title}</span>

            </nav>

            <div className="explore-video-page__header">

                <div className="explore-video-page__tags">
                    <Badge>{video.level}</Badge>
                    {video.topic && (
                        <Badge variant="neutral">
                            {TOPIC_LABELS[video.topic] ?? video.topic}
                        </Badge>
                    )}
                </div>

                <h1 className="explore-video-page__title">
                    {video.title}
                </h1>

                {video.description && (
                    <p className="explore-video-page__description">
                        {video.description}
                    </p>
                )}

                <p className="explore-video-page__meta">
                    {video.creator && <span>{video.creator}</span>}
                    <span className="explore-video-page__duration text-mono-label">
                        <Icon name="clock" size={13} />
                        {formatDuration(video.duration)}
                    </span>
                </p>

            </div>

            <div className="explore-video-page__layout">

                <div className="explore-video-page__player-zone">

                    <div className="explore-video-page__player-wrap">

                        <VideoPlayer
                            ref={videoRef}
                            video={video}
                            onTimeUpdate={handleTimeUpdate}
                            onPlay={trackPlay}
                            onPause={handlePause}
                            onSeeked={handleSeeked}
                            onEnded={handleEnded}
                            onLoadedMetadata={handleLoadedMetadata}
                        />

                        {!isPlayerReady && (
                            <Skeleton className="explore-video-page__player-skeleton" />
                        )}

                    </div>

                </div>

                <div className="explore-video-page__transcript-zone">

                    {
                        isPlayerReady

                            ? (
                                <InteractiveTranscript
                                    segments={video.transcript}
                                    currentTime={currentTime}
                                    onSeek={handleSeek}
                                    language={video.language}
                                    onWordClick={handleWordClick}
                                    knownWords={knownWords}
                                />
                            )

                            : (
                                <div className="explore-video-page__transcript-skeleton" aria-hidden="true">
                                    {
                                        TRANSCRIPT_SKELETON_PATTERN.map((lines, index) => (
                                            <div key={index} className="explore-video-page__transcript-skeleton-row">
                                                <Skeleton className="explore-video-page__transcript-skeleton-time" />
                                                <div className="explore-video-page__transcript-skeleton-lines">
                                                    {
                                                        lines.map((width, lineIndex) => (
                                                            <Skeleton
                                                                key={lineIndex}
                                                                className="explore-video-page__transcript-skeleton-line"
                                                                style={{ width }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                    }

                </div>

            </div>

            {
                openPopups.map(popup => (
                    <WordPopup
                        key={popup.id}
                        variant="explore"
                        word={popup.entry}
                        anchorElement={popup.anchor}
                        onClose={() => handleClosePopup(popup.id)}
                        onAdd={handleWordAdded}
                    />
                ))
            }

        </div>

    );

}
