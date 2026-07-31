import { Router } from "express";
import { authRoutes } from "./authRoutes.js";
import { progressRoutes } from "./progressRoutes.js";
import { userRoutes } from "./userRoutes.js";
import { flashcardRoutes } from "./flashcardRoutes.js";
import { videoProgressRoutes } from "./videoProgressRoutes.js";
import { lessonProgressRoutes } from "./lessonProgressRoutes.js";
import { eventRoutes } from "./eventRoutes.js";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/progress", progressRoutes);
routes.use("/user", userRoutes);
routes.use("/flashcards", flashcardRoutes);
routes.use("/video-progress", videoProgressRoutes);
routes.use("/lesson-progress", lessonProgressRoutes);
routes.use("/events", eventRoutes);
