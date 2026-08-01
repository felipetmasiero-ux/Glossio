// Tiny shared shape so every question file stays consistent - no behavior,
// just a constructor to avoid repeating the same object keys everywhere.
export function question(id, level, type, prompt, options, correctIndex) {
    return { id, level, type, prompt, options, correctIndex };
}
