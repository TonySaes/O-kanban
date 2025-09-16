import { Router } from "express";
import { tagController } from "../controllers/tag.controller.js";
import { checkId } from "../middlewares/check-id.middleware.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";
import { isAdmin } from "../middlewares/is-admin.middleware.js";

export const tagRouter = Router();

// récupérer tous les tags
tagRouter.get("/tags", isAuthed, tagController.getAll);

// créer un tag
tagRouter.post("/tags", isAuthed, isAdmin, tagController.create);

// récupérer un tag par son id
tagRouter.get("/tags/:id", isAuthed, checkId, tagController.getById);

// mettre à jour un tag par son id
tagRouter.patch("/tags/:id", isAuthed, isAdmin, checkId, tagController.update);

// supprimer un tag par son id
tagRouter.delete("/tags/:id", isAuthed, isAdmin, checkId, tagController.deleteById);
