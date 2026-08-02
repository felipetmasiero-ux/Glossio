import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimiters.js";

export const authRoutes = Router();

authRoutes.post("/register", registerLimiter, register);
authRoutes.post("/login", loginLimiter, login);
authRoutes.get("/me", auth, me);
