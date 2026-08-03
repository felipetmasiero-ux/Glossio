import { Router } from "express";
import { health, ready, metrics } from "../controllers/healthController.js";

export const healthRoutes = Router();

healthRoutes.get("/health", health);
healthRoutes.get("/ready", ready);
healthRoutes.get("/metrics", metrics);
