import { Router } from "express";
import { cardController } from "../controllers/card.controller.js";
import { checkId } from "../middlewares/check-id.middleware.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";
import { isAdmin } from "../middlewares/is-admin.middleware.js";

export const cardRouter = Router();

// récuperer toutes les cartes
cardRouter.get("/cards", isAuthed, cardController.getAll);

// récuperer une carte par son id
cardRouter.get("/cards/:id", isAuthed, checkId, cardController.getById);

// créer une carte
cardRouter.post("/cards", isAuthed, isAdmin, cardController.create);

// mettre à jour une carte par son id
cardRouter.patch("/cards/:id", isAuthed, isAdmin, checkId, cardController.update);

// supprimer une carte par son id
cardRouter.delete("/cards/:id", isAuthed, isAdmin, checkId, cardController.deleteById);

// récuperer les cartes d'une liste spécifique
cardRouter.get("/lists/:id/cards", isAuthed, checkId, cardController.getAllFromList);

// associer une carte et un tag
cardRouter.put("/cards/:cardId/tags/:tagId", isAuthed, isAdmin, cardController.addTagToCard);

// dissocier une carte et un tag
cardRouter.delete("/cards/:cardId/tags/:tagId", isAuthed, isAdmin, cardController.removeTagFromCard);
