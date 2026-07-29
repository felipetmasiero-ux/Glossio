import "./VideoCardList.css";

import { useNavigate } from "react-router-dom";

import { VideoCard } from "../VideoCard/VideoCard";
import { EmptyState } from "../../common/EmptyState/EmptyState";

export function VideoCardList({ videos, onOpenVideo, hasActiveFilter = false, onClearFilters }) {

    const navigate = useNavigate();

    if (videos.length === 0) {

        return hasActiveFilter ? (
            <EmptyState
                icon="play"
                title="Nenhum resultado"
                description="Nenhum vídeo corresponde aos filtros atuais."
                actionLabel="Todos os tópicos"
                onAction={onClearFilters}
            />
        ) : (
            <EmptyState
                icon="play"
                title="Nenhum vídeo ainda"
                description="Ainda não há vídeos disponíveis para este idioma."
                actionLabel="Ver módulos de aprendizado"
                onAction={() => navigate("/lessons")}
            />
        );

    }

    return (

        <div className="video-card-list" aria-label="Vídeos disponíveis">
            {
                videos.map(video => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onOpen={() => onOpenVideo(video)}
                    />
                ))
            }
        </div>

    );

}
