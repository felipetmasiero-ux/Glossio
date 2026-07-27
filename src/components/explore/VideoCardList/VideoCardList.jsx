import "./VideoCardList.css";

import { VideoCard } from "../VideoCard/VideoCard";
import { EmptyState } from "../../common/EmptyState/EmptyState";

export function VideoCardList({ videos }) {

    if (videos.length === 0) {

        return (
            <EmptyState
                icon="play"
                title="Nenhum vídeo encontrado"
                description="Ainda não há vídeos disponíveis para este idioma ou filtro."
            />
        );

    }

    return (

        <div className="video-card-list" aria-label="Vídeos disponíveis">
            {
                videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))
            }
        </div>

    );

}
