import Joi from "joi";

// validation schema for card creation
export const createCardSchema = Joi.object({
  content: Joi.string().trim().min(1).required(),
  position: Joi.number().integer().positive(),
  color: Joi.string().pattern(/^#[0-9a-fA-F]{6}$/), // here we test the validity of the color using a regex
  list_id: Joi.number().integer().positive().required(),
});


// validation schema for card update
export const updateCardSchema = Joi.object({
  content: Joi.string().trim().min(1),
  position: Joi.number().integer().positive(),
  color: Joi.string().pattern(/^#[0-9a-fA-F]{6}$/),
  list_id: Joi.number().integer().positive(),
  targetLanguage: Joi.string().valid("français", "anglais", "espagnol", "allemand", "italien", "portugais"),
}).or("content", "position", "color", "list_id", "targetLanguage");