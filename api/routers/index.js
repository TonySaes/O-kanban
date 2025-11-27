import { Router } from "express";
import { getWelcomeResponse } from "../controllers/main.controller.js"; 
import { listRouter } from "./list.router.js";
import { cardRouter } from "./card.router.js";
import { tagRouter } from "./tag.router.js";
import { authRouter } from "./auth.router.js";
import { llmRouter } from "./llm.router.js";

export const apiRouter = Router();

apiRouter.get("/", getWelcomeResponse);

// Et le reste des routes
apiRouter.use(authRouter);
apiRouter.use(listRouter);
apiRouter.use(cardRouter);
apiRouter.use(tagRouter);
apiRouter.use(llmRouter);
