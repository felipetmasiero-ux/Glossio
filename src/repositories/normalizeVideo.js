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

        description: video.description ?? null,

        duration: video.duration ?? 0,

        creator: video.creator ?? null,

        thumbnail: video.thumbnail ?? null,

        source: video.source ?? null,

        transcript: video.transcript ?? []

    };

}
