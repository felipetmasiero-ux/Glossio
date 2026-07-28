import "./VideoCard.css";

import { Badge } from "../../common/Badge/Badge";
import { Icon } from "../../common/Icon/Icon";

import { TOPIC_LABELS } from "../../../constants/topics";
import { formatDuration } from "../../../utils/videos/formatDuration";

export function VideoCard({ video, onOpen }) {

    return (

        <button
            type="button"
            className="video-row"
            onClick={onOpen}
            aria-label={`Assistir ${video.title}`}
        >

            <span className="video-row__thumbnail">
                {
                    video.thumbnail
                        ? <img src={video.thumbnail} alt="" className="video-row__thumbnail-img" />
                        : <Icon name="play" size={16} />
                }
            </span>

            <span className="video-row__body">

                <span className="video-row__title">
                    {video.title}
                </span>

                <span className="video-row__meta">
                    {video.creator && (
                        <span className="video-row__creator">{video.creator}</span>
                    )}

                    {video.topic && (
                        <Badge variant="neutral">
                            {TOPIC_LABELS[video.topic] ?? video.topic}
                        </Badge>
                    )}
                </span>

            </span>

            <span className="video-row__stats">
                <span className="video-row__level text-mono-label">{video.level}</span>
                <span className="video-row__duration text-mono-label">{formatDuration(video.duration)}</span>
            </span>

            <span className="video-row__action">
                <Icon name="chevron-right" size={17} />
            </span>

        </button>

    );

}
