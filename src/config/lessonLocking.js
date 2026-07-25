// Gates sequential lesson unlocking (each lesson requires the previous one
// to be completed). Set VITE_DISABLE_LESSON_LOCKING=true in a local .env
// file to unlock everything while developing/testing content.
export const ENABLE_LESSON_LOCKING =
    import.meta.env.VITE_DISABLE_LESSON_LOCKING !== "true";
