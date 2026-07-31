import { Router } from "express";
import { getFlashcards, putFlashcards } from "../controllers/flashcardController.js";
import { auth } from "../middlewares/auth.js";

export const flashcardRoutes = Router();

flashcardRoutes.get("/", auth, getFlashcards);
flashcardRoutes.put("/", auth, putFlashcards);
