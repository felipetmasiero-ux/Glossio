export function normalizeVideo(video) {

    if (!video) {

        return null;

    }

    return {

        id: video.id,

        title: video.title,

        language: video.language,

        level: video.level,

        topic: video.topic ?? null,

        duration: video.duration ?? 0,

        creator: video.creator ?? null,

        thumbnail: video.thumbnail ?? null,

        videoUrl: video.videoUrl,

        transcript: video.transcript ?? []

    };

}
