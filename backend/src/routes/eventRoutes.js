import { Router } from "express";
import { getEvents, postEvents } from "../controllers/eventController.js";
import { auth } from "../middlewares/auth.js";

export const eventRoutes = Router();

eventRoutes.get("/", auth, getEvents);
eventRoutes.post("/", auth, postEvents);
