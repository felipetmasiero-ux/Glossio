import "./VideoCard.css";

import { Badge } from "../../common/Badge/Badge";
import { Icon } from "../../common/Icon/Icon";

import { TOPIC_LABELS } from "../../../constants/topics";
import { formatDuration } from "../../../utils/videos/formatDuration";

export function VideoCard({ video }) {

    return (

        <div className="video-row">

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

        </div>

    );

}
