import { useMemo, useState } from "react";

import "./ExploreHub.css";

import { useLanguage } from "../../hooks/useLanguage";

import { VideoRepository } from "../../repositories/VideoRepository";

import { VideoCardList } from "../../components/explore/VideoCardList/VideoCardList";
import { VideoFilters } from "../../components/explore/VideoFilters/VideoFilters";

const FLAGS = {
    English: "🇺🇸",
    French: "🇫🇷",
    Portuguese: "🇧🇷"
};

export function ExploreHub() {

    const { language } = useLanguage();

    const videos = VideoRepository.getAll(language);

    const [levelFilter, setLevelFilter] = useState(null);

    const [topicFilter, setTopicFilter] = useState(null);

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

            <VideoCardList videos={filteredVideos} />

        </div>

    );

}
