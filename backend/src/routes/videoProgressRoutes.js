import { Router } from "express";
import { getVideoProgress, putVideoProgress } from "../controllers/videoProgressController.js";
import { auth } from "../middlewares/auth.js";

export const videoProgressRoutes = Router();

videoProgressRoutes.get("/", auth, getVideoProgress);
videoProgressRoutes.put("/", auth, putVideoProgress);
