import { Router } from "express";
import { getLessonProgress, putLessonProgress } from "../controllers/lessonProgressController.js";
import { auth } from "../middlewares/auth.js";

export const lessonProgressRoutes = Router();

lessonProgressRoutes.get("/", auth, getLessonProgress);
lessonProgressRoutes.put("/", auth, putLessonProgress);
