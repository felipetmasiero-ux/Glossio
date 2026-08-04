import { GoalsStorage, DEFAULT_GOALS } from "../goals/goalsStorage";

function readJSON(key, fallback) {
    const raw = localStorage.getItem(key);

    if (!raw) return fallback;

    try {
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function readProgressSnapshot() {
    return {
        language: localStorage.getItem("language") || null,
        exerciseProgress: readJSON("exerciseProgress", []),
        studyHistory: readJSON("studyHistory", []),
        dashboard: {
            lastActivity: readJSON("lastActivity", null),
            goals: GoalsStorage.getGoals()
        }
    };
}

// Canonical key order, and drops fields (like the server's `updatedAt`) that
// shouldn't affect whether local and server are considered "in sync". Goals
// is spread onto the fixed DEFAULT_GOALS template (rather than passed
// through as-is) for the same reason - a Postgres jsonb round trip doesn't
// guarantee key order, and an unsorted compare would flag that alone as a
// real change.
export function serializeProgress(snapshot) {
    return JSON.stringify({
        language: snapshot.language || null,
        exerciseProgress: snapshot.exerciseProgress ?? [],
        studyHistory: snapshot.studyHistory ?? [],
        dashboard: {
            lastActivity: snapshot.dashboard?.lastActivity ?? null,
            goals: { ...DEFAULT_GOALS, ...(snapshot.dashboard?.goals ?? {}) }
        }
    });
}

export function applyProgressSnapshot(snapshot) {
    localStorage.setItem("language", snapshot.language || "");
    localStorage.setItem("exerciseProgress", JSON.stringify(snapshot.exerciseProgress ?? []));
    localStorage.setItem("studyHistory", JSON.stringify(snapshot.studyHistory ?? []));
    localStorage.setItem("lastActivity", JSON.stringify(snapshot.dashboard?.lastActivity ?? null));
    GoalsStorage.saveGoals(snapshot.dashboard?.goals ?? DEFAULT_GOALS);
}

export function readFlashcardsSnapshot() {
    return readJSON("flashcards", []);
}

// Same canonical-key-order fix as serializeProgress, per card - a Postgres
// jsonb-shaped round trip (or FlashcardProvider's normalize-on-load resave)
// can reorder keys without changing content, which would otherwise look
// like a real change on every hydration and loop the one-time reload.
export function serializeFlashcards(cards) {
    return JSON.stringify((cards ?? []).map(card => ({
        id: card.id,
        word: card.word,
        translation: card.translation,
        language: card.language,
        moduleId: card.moduleId ?? null,
        lessonId: card.lessonId ?? null,
        category: card.category ?? null,
        favorite: card.favorite ?? false,
        easeFactor: card.easeFactor,
        interval: card.interval,
        repetitions: card.repetitions,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
        nextReview: card.nextReview,
        lastReviewedAt: card.lastReviewedAt ?? null
    })));
}

// The backend doesn't know about deckId/example/notes yet (local-only fields,
// no column on the server's Flashcard table) - a plain overwrite here would
// silently wipe them for a logged-in user on every hydration that applies the
// server snapshot. Merging by id keeps whatever the server owns in sync while
// preserving these three fields from whatever was already on disk.
export function applyFlashcardsSnapshot(cards) {
    const previousById = new Map(
        readFlashcardsSnapshot().map(card => [card.id, card])
    );

    const merged = (cards ?? []).map(card => ({
        ...card,
        deckId: card.deckId ?? previousById.get(card.id)?.deckId ?? null,
        example: card.example ?? previousById.get(card.id)?.example ?? null,
        notes: card.notes ?? previousById.get(card.id)?.notes ?? null
    }));

    localStorage.setItem("flashcards", JSON.stringify(merged));
}

// VideoProgressRepository stores localStorage["videoProgress"] nested by
// language: { [language]: { [videoId]: entry } }, with `language` only ever
// the outer key - never duplicated inside the entry itself. The API deals
// in a flat array (same shape family as flashcards), so these two functions
// are the flatten/unflatten boundary Cloud Sync needs that Flashcards didn't.
export function readVideoProgressSnapshot() {
    const nested = readJSON("videoProgress", {});
    const entries = [];

    for (const language of Object.keys(nested)) {
        const videos = nested[language];
        if (!videos || typeof videos !== "object") continue;

        for (const videoId of Object.keys(videos)) {
            entries.push({ ...videos[videoId], language, videoId });
        }
    }

    return entries;
}

export function applyVideoProgressSnapshot(entries) {
    const nested = {};

    for (const entry of entries ?? []) {
        const { language, videoId, ...rest } = entry;
        if (!language) continue;

        nested[language] = nested[language] || {};
        nested[language][videoId] = { videoId, ...rest };
    }

    localStorage.setItem("videoProgress", JSON.stringify(nested));
}

// Same fixed-key-order fix as serializeFlashcards, plus a stable sort - the
// array here is *derived* from Object.keys() on a plain object, so its
// order isn't guaranteed to already match the server's row order the way
// flashcards' local array (already a flat array) did.
export function serializeVideoProgress(entries) {
    const normalized = (entries ?? [])
        .map(entry => ({
            videoId: entry.videoId,
            language: entry.language,
            currentTime: entry.currentTime ?? 0,
            duration: entry.duration ?? 0,
            completed: entry.completed ?? false,
            completedAt: entry.completedAt ?? null,
            updatedAt: entry.updatedAt,
            clickedWords: entry.clickedWords ?? [],
            addedWords: entry.addedWords ?? []
        }))
        .sort((a, b) => `${a.language}::${a.videoId}`.localeCompare(`${b.language}::${b.videoId}`));

    return JSON.stringify(normalized);
}

// LessonProgressProvider stores localStorage["lessonProgress"] as a plain
// array of lesson-id strings - membership *is* completion, there's no
// per-entry object to flatten/unflatten, so these are trivial passthroughs.
export function readLessonProgressSnapshot() {
    return readJSON("lessonProgress", []);
}

export function applyLessonProgressSnapshot(lessonIds) {
    localStorage.setItem("lessonProgress", JSON.stringify(lessonIds ?? []));
}

// Sorted before stringifying - the array's local insertion order won't
// necessarily match the server's `orderBy` return, and an unsorted compare
// would flag that alone as "changed" (same class of bug as Sprint 21).
export function serializeLessonProgress(lessonIds) {
    return JSON.stringify([...(lessonIds ?? [])].sort());
}

export function readEventsSnapshot() {
    return readJSON("events", []);
}

export function applyEventsSnapshot(events) {
    localStorage.setItem("events", JSON.stringify(events ?? []));
}

// Used for the hydrate-side diff only - the push side uses a length-based
// tail-diff instead (events are POSTed as an append-only log, not replaced).
export function serializeEvents(events) {
    return JSON.stringify((events ?? []).map(event => ({
        id: event.id,
        type: event.type,
        payload: event.payload ?? {},
        timestamp: event.timestamp
    })));
}
