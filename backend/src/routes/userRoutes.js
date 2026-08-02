import { Router } from "express";
import { getUser, updateUser, changePassword } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import { passwordChangeLimiter } from "../middlewares/rateLimiters.js";

export const userRoutes = Router();

userRoutes.get("/", auth, getUser);
userRoutes.put("/", auth, updateUser);
userRoutes.put("/password", auth, passwordChangeLimiter, changePassword);
