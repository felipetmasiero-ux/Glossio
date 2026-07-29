import { useNavigate } from "react-router-dom";

import "./ExploreVideoComplete.css";

import { Icon } from "../../common/Icon/Icon";
import { Badge } from "../../common/Badge/Badge";
import { Button } from "../../common/Button/Button";
import { RecommendationSection } from "../../common/RecommendationSection/RecommendationSection";
import { LessonRecommendationCard } from "../../common/LessonRecommendationCard/LessonRecommendationCard";

import { LessonRepository } from "../../../utils/lessons/LessonRepository";
import { getRelatedContent } from "../../../utils/recommendations";

import { useLessonProgress } from "../../../hooks/useLessonProgress";

import { TOPIC_LABELS, TOPIC_ICONS } from "../../../constants/topics";

export function ExploreVideoComplete({

    video,

    clickedCount,

    addedCount

}) {

    const navigate = useNavigate();

    const { completedLessons } = useLessonProgress();

    const relatedLessons = getRelatedContent({
        source: video,
        candidates: LessonRepository.getAll(video.language),
        language: video.language,
        completedIds: completedLessons
    });

    return (

        <div className="explore-video-complete animate-fade-in">

            <div className="explore-video-complete__stamp animate-celebrate">
                <Icon name="check" size={26} />
            </div>

            <p className="explore-video-complete__label text-mono-label">Vídeo concluído</p>

            <h1 className="explore-video-complete__title">
                {video.title}
            </h1>

            <div className="explore-video-complete__tags">

                <Badge>{video.level}</Badge>

                {video.topic && (
                    <Badge variant="neutral">
                        <Icon name={TOPIC_ICONS[video.topic] ?? "book"} size={14} />
                        {TOPIC_LABELS[video.topic] ?? video.topic}
                    </Badge>
                )}

            </div>

            {video.topic && (
                <p className="explore-video-complete__summary">
                    Você aprendeu vocabulário de {TOPIC_LABELS[video.topic] ?? video.topic}.
                </p>
            )}

            <dl className="explore-video-complete__stats">

                <div className="explore-video-complete__stat">
                    <dt>Palavras clicadas</dt>
                    <dd className="text-mono-number">{clickedCount}</dd>
                </div>

                <div className="explore-video-complete__stat">
                    <dt>Palavras adicionadas</dt>
                    <dd className="text-mono-number">{addedCount}</dd>
                </div>

            </dl>

            <div className="explore-video-complete__actions">
                <Button onClick={() => navigate("/explore")}>
                    Voltar ao Explore
                </Button>
            </div>

            <RecommendationSection
                title="Aprenda a gramática por trás"
                items={relatedLessons}
                renderItem={lesson => (
                    <LessonRecommendationCard key={lesson.id} lesson={lesson} />
                )}
            />

        </div>

    );

}
