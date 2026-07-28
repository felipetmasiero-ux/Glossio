import "./VideoCardList.css";

import { VideoCard } from "../VideoCard/VideoCard";
import { EmptyState } from "../../common/EmptyState/EmptyState";

export function VideoCardList({ videos, onOpenVideo }) {

    if (videos.length === 0) {

        return (
            <EmptyState
                icon="play"
                title="Nenhum conteúdo encontrado"
                description="Tente outro tópico ou nível."
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
