export const ACHIEVEMENT_CATEGORIES = {
    LEARN: "learn",
    EXPLORE: "explore",
    COLLECT: "collect",
    REVIEW: "review",
    STREAK: "streak",
    VOCABULARY: "vocabulary"
};

export const CATEGORY_LABELS = {
    [ACHIEVEMENT_CATEGORIES.LEARN]: "Learn",
    [ACHIEVEMENT_CATEGORIES.EXPLORE]: "Explore",
    [ACHIEVEMENT_CATEGORIES.COLLECT]: "Collect",
    [ACHIEVEMENT_CATEGORIES.REVIEW]: "Review",
    [ACHIEVEMENT_CATEGORIES.STREAK]: "Streak",
    [ACHIEVEMENT_CATEGORIES.VOCABULARY]: "Vocabulary"
};

// `metric` identifies which computed number (see getAchievements.js) this
// tier's progress is measured against.
export const ACHIEVEMENT_DEFINITIONS = [

    // Learn — lessons completed
    { id: "learn-1", category: ACHIEVEMENT_CATEGORIES.LEARN, metric: "lessonsCompleted", target: 1, icon: "book", title: "Primeira lição", description: "Complete sua primeira lição." },
    { id: "learn-5", category: ACHIEVEMENT_CATEGORIES.LEARN, metric: "lessonsCompleted", target: 5, icon: "book", title: "5 lições", description: "Complete 5 lições." },
    { id: "learn-10", category: ACHIEVEMENT_CATEGORIES.LEARN, metric: "lessonsCompleted", target: 10, icon: "book", title: "10 lições", description: "Complete 10 lições." },
    { id: "learn-25", category: ACHIEVEMENT_CATEGORIES.LEARN, metric: "lessonsCompleted", target: 25, icon: "book", title: "25 lições", description: "Complete 25 lições." },
    { id: "learn-50", category: ACHIEVEMENT_CATEGORIES.LEARN, metric: "lessonsCompleted", target: 50, icon: "book", title: "50 lições", description: "Complete 50 lições." },

    // Explore — videos completed
    { id: "explore-1", category: ACHIEVEMENT_CATEGORIES.EXPLORE, metric: "videosCompleted", target: 1, icon: "play", title: "Primeiro vídeo", description: "Assista seu primeiro vídeo até o fim." },
    { id: "explore-5", category: ACHIEVEMENT_CATEGORIES.EXPLORE, metric: "videosCompleted", target: 5, icon: "play", title: "5 vídeos", description: "Assista 5 vídeos até o fim." },
    { id: "explore-15", category: ACHIEVEMENT_CATEGORIES.EXPLORE, metric: "videosCompleted", target: 15, icon: "play", title: "15 vídeos", description: "Assista 15 vídeos até o fim." },
    { id: "explore-30", category: ACHIEVEMENT_CATEGORIES.EXPLORE, metric: "videosCompleted", target: 30, icon: "play", title: "30 vídeos", description: "Assista 30 vídeos até o fim." },

    // Collect — flashcards added
    { id: "collect-1", category: ACHIEVEMENT_CATEGORIES.COLLECT, metric: "flashcardsCount", target: 1, icon: "cards", title: "Primeiro flashcard", description: "Adicione seu primeiro flashcard." },
    { id: "collect-25", category: ACHIEVEMENT_CATEGORIES.COLLECT, metric: "flashcardsCount", target: 25, icon: "cards", title: "25 flashcards", description: "Adicione 25 flashcards." },
    { id: "collect-100", category: ACHIEVEMENT_CATEGORIES.COLLECT, metric: "flashcardsCount", target: 100, icon: "cards", title: "100 flashcards", description: "Adicione 100 flashcards." },
    { id: "collect-250", category: ACHIEVEMENT_CATEGORIES.COLLECT, metric: "flashcardsCount", target: 250, icon: "cards", title: "250 flashcards", description: "Adicione 250 flashcards." },

    // Review — flashcard reviews
    { id: "review-1", category: ACHIEVEMENT_CATEGORIES.REVIEW, metric: "totalReviews", target: 1, icon: "target", title: "Primeira revisão", description: "Faça sua primeira revisão de flashcard." },
    { id: "review-100", category: ACHIEVEMENT_CATEGORIES.REVIEW, metric: "totalReviews", target: 100, icon: "target", title: "100 revisões", description: "Faça 100 revisões de flashcards." },
    { id: "review-500", category: ACHIEVEMENT_CATEGORIES.REVIEW, metric: "totalReviews", target: 500, icon: "target", title: "500 revisões", description: "Faça 500 revisões de flashcards." },
    { id: "review-1000", category: ACHIEVEMENT_CATEGORIES.REVIEW, metric: "totalReviews", target: 1000, icon: "target", title: "1000 revisões", description: "Faça 1000 revisões de flashcards." },

    // Streak — consecutive study days
    { id: "streak-3", category: ACHIEVEMENT_CATEGORIES.STREAK, metric: "currentStreak", target: 3, icon: "flame", title: "3 dias", description: "Estude 3 dias seguidos." },
    { id: "streak-7", category: ACHIEVEMENT_CATEGORIES.STREAK, metric: "currentStreak", target: 7, icon: "flame", title: "7 dias", description: "Estude 7 dias seguidos." },
    { id: "streak-30", category: ACHIEVEMENT_CATEGORIES.STREAK, metric: "currentStreak", target: 30, icon: "flame", title: "30 dias", description: "Estude 30 dias seguidos." },
    { id: "streak-100", category: ACHIEVEMENT_CATEGORIES.STREAK, metric: "currentStreak", target: 100, icon: "flame", title: "100 dias", description: "Estude 100 dias seguidos." },

    // Vocabulary — words collected via flashcards
    { id: "vocabulary-100", category: ACHIEVEMENT_CATEGORIES.VOCABULARY, metric: "vocabularyCount", target: 100, icon: "list", title: "100 palavras", description: "Colecione 100 palavras." },
    { id: "vocabulary-250", category: ACHIEVEMENT_CATEGORIES.VOCABULARY, metric: "vocabularyCount", target: 250, icon: "list", title: "250 palavras", description: "Colecione 250 palavras." },
    { id: "vocabulary-500", category: ACHIEVEMENT_CATEGORIES.VOCABULARY, metric: "vocabularyCount", target: 500, icon: "list", title: "500 palavras", description: "Colecione 500 palavras." },
    { id: "vocabulary-1000", category: ACHIEVEMENT_CATEGORIES.VOCABULARY, metric: "vocabularyCount", target: 1000, icon: "list", title: "1000 palavras", description: "Colecione 1000 palavras." }

];
