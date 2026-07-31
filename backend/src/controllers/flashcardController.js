import { getOrMigrateFlashcards, replaceFlashcards } from "../services/flashcardService.js";

export async function getFlashcards(req, res, next) {
    try {
        const flashcards = await getOrMigrateFlashcards(req.userId);
        res.status(200).json(flashcards);
    } catch (err) {
        next(err);
    }
}

export async function putFlashcards(req, res, next) {
    try {
        const flashcards = await replaceFlashcards(req.userId, req.body);
        res.status(200).json(flashcards);
    } catch (err) {
        next(err);
    }
}
