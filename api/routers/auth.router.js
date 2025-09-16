import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";

export const authRouter = Router();

authRouter.post("/auth/register", authController.registerUser);
authRouter.post("/auth/login", authController.loginUser);
authRouter.get("/auth/me", isAuthed, authController.getCurrentUserInfo);
