import Joi from "joi";

// ici on stocke tous les schemas de validation pour les tags

export const createTagSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).required(), // le name doit être une chaîne de caractères et est obligatoire
  color: Joi.string().trim().pattern(/^#[0-9A-Fa-f]{6}$/).default("#808080"), // la couleur doit être au format hexadécimal (#RRGGBB)
});

export const updateTagSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50), // le name doit être une chaîne de caractères
  color: Joi.string().trim().pattern(/^#[0-9A-Fa-f]{6}$/), // la couleur doit être au format hexadécimal (#RRGGBB)
}).or("name", "color"); // au moins un champ doit être renseigné pour la mise à jour
