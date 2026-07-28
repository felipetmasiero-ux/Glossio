import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ExploreHub.css";

import { useLanguage } from "../../hooks/useLanguage";

import { VideoRepository } from "../../repositories/VideoRepository";

import { VideoCardList } from "../../components/explore/VideoCardList/VideoCardList";
import { VideoFilters } from "../../components/explore/VideoFilters/VideoFilters";
import { Skeleton } from "../../components/common/Skeleton/Skeleton";

const HUB_LOADING_DELAY = 350;

const SKELETON_ROW_COUNT = 4;

const FLAGS = {
    English: "🇺🇸",
    French: "🇫🇷",
    Portuguese: "🇧🇷"
};

export function ExploreHub() {

    const navigate = useNavigate();

    const { language } = useLanguage();

    const videos = VideoRepository.getAll(language);

    const [levelFilter, setLevelFilter] = useState(null);

    const [topicFilter, setTopicFilter] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), HUB_LOADING_DELAY);
        return () => clearTimeout(timeout);
    }, []);

    const levels = useMemo(
        () => [...new Set(videos.map(video => video.level))],
        [videos]
    );

    const topics = useMemo(
        () => [...new Set(videos.map(video => video.topic).filter(Boolean))],
        [videos]
    );

    const filteredVideos = videos.filter(video =>
        (!levelFilter || video.level === levelFilter) &&
        (!topicFilter || video.topic === topicFilter)
    );

    const hasActiveFilter = Boolean(levelFilter || topicFilter);

    const resultCount = filteredVideos.length;

    const resultLabel = hasActiveFilter
        ? `${resultCount} ${resultCount === 1 ? "resultado" : "resultados"}`
        : `${resultCount} ${resultCount === 1 ? "vídeo" : "vídeos"}`;

    return (

        <div className="page-container explore-hub">

            <div className="explore-hub__header">

                <div>
                    <p className="explore-hub__label text-mono-label">Explore</p>
                    <h1 className="explore-hub__title">Vídeos</h1>
                </div>

                {language && (
                    <span className="explore-hub__language-badge">
                        {FLAGS[language] ?? "🌐"} {language}
                    </span>
                )}

            </div>

            <p className="explore-hub__description">
                Pratique com conteúdo autêntico no seu idioma e nível.
            </p>

            <VideoFilters
                levels={levels}
                topics={topics}
                selectedLevel={levelFilter}
                selectedTopic={topicFilter}
                onLevelChange={setLevelFilter}
                onTopicChange={setTopicFilter}
            />

            {
                isLoading

                    ? (
                        <div className="explore-hub__skeleton" aria-hidden="true">
                            {
                                Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
                                    <div key={index} className="explore-hub__skeleton-row">
                                        <Skeleton className="explore-hub__skeleton-thumb" />
                                        <div className="explore-hub__skeleton-body">
                                            <Skeleton className="explore-hub__skeleton-line explore-hub__skeleton-line--title" />
                                            <Skeleton className="explore-hub__skeleton-line explore-hub__skeleton-line--meta" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )

                    : (
                        <>

                            <p className="explore-hub__count text-mono-label">
                                {resultLabel}
                            </p>

                            <VideoCardList
                                videos={filteredVideos}
                                onOpenVideo={video => navigate(`/explore/${video.id}`)}
                            />

                        </>
                    )
            }

        </div>

    );

}
