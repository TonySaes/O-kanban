import { Router } from "express";
import { getWelcomeResponse } from "../controllers/main.controller.js"; 
import { listRouter } from "./list.router.js";
import { cardRouter } from "./card.router.js";
import { tagRouter } from "./tag.router.js";
import { authRouter } from "./auth.router.js";

// Le router principal : c'est celui qui regroupe les autres routers : c'est le point d'entrée de l'API
export const apiRouter = Router();

// On propose un petit JSON d'accueil sur la route `/` histoire d'etre convivial 🍻
apiRouter.get("/", getWelcomeResponse);

// Et le reste des routes
apiRouter.use(authRouter);
apiRouter.use(listRouter);
apiRouter.use(cardRouter);
apiRouter.use(tagRouter);
