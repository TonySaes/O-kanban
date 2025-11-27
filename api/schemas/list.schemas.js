import Joi from "joi";

export const createListSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  position: Joi.number().integer().positive(),
});

export const updateListSchema = Joi.object({
  title: Joi.string().trim().min(1),
  position: Joi.number().integer().positive(),
  targetLanguage: Joi.string().valid("français", "anglais", "espagnol", "allemand", "italien", "portugais"),
}).or("title", "position", "targetLanguage");