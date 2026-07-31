import { Router } from "express";
import { getProgress, putProgress } from "../controllers/progressController.js";
import { auth } from "../middlewares/auth.js";

export const progressRoutes = Router();

progressRoutes.get("/", auth, getProgress);
progressRoutes.put("/", auth, putProgress);
