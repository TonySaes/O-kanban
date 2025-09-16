import Joi from "joi";

// ici on stocke tous les schemas de validation pour les cartes

export const createCardSchema = Joi.object({
  content: Joi.string().trim().min(1).max(300).required(), // le content doit etre une chaine de caractere et est obligatoire
  position: Joi.number().integer().min(1), // la position doit etre un nombre entier positif
  color: Joi.string().trim().pattern(/^#[0-9a-fA-F]{6}$/),
  list_id: Joi.number().integer().min(1).required(), // une carte est OBLIGATOIREMENT attachée à une liste
});

export const updateCardSchema = Joi.object({
  content: Joi.string().trim().min(1).max(300), // le content doit etre une chaine de caractere de au moins 1 caractere
  position: Joi.number().integer().min(1), // la position doit etre un nombre entier positif
  color: Joi.string().trim().pattern(/^#[0-9a-fA-F]{6}$/), // une couleur héxadécimale
  list_id: Joi.number().integer().min(1), // une carte peut changer de liste
}).or("content", "position", "color", "list_id"); // au moins un champ doit être renseigné pour la mise à jour


/* 
une couleur héxadécimale c'est :
- ça commence par le sybole #
- ensuite il y'a 6 chiffres entre 0 et 9, ou lettres entre a et f
---> #FF00FF, #999999, 

le REGEX : ^#[0-9a-fA-F]{6}$
*/
