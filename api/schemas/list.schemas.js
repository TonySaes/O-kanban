import Joi from "joi";

// ici on stocke tous les schemas de validation pour les listes

export const createListSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required(), // le title doit etre une chaine de caractere et est obligatoire
  position: Joi.number().integer().min(1), // la position doit etre un nombre entier positif
});

export const updateListSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100), // le title doit etre une chaine de caractere de au moins 1 caractere
  position: Joi.number().integer().min(1), // la position doit etre un nombre entier positif
}).or("title", "position"); // au moins un champ doit être renseigné pour la mise à jour
