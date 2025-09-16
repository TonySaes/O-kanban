import { Router } from "express";
import { listController } from "../controllers/list.controller.js";
import { checkId } from "../middlewares/check-id.middleware.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";
import { isAdmin } from "../middlewares/is-admin.middleware.js";

export const listRouter = Router();

// récuperer toutes les listes
listRouter.get("/lists", isAuthed, listController.getAll);

// récupérer les listes avec les cartes et les tags
listRouter.get("/lists/expanded", isAuthed, listController.getAllWithCardsAndTags);

// créer une liste
listRouter.post("/lists", isAuthed, isAdmin, listController.create);

// récuperer une liste par son id
listRouter.get("/lists/:id", isAuthed, checkId, listController.getById);

// supprimer une liste par son id
listRouter.delete("/lists/:id", isAuthed, isAdmin, checkId, listController.deleteById);

// mettre à jour une liste par son id
listRouter.patch("/lists/:id", isAuthed, isAdmin, checkId, listController.update);
