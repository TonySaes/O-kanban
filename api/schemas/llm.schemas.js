import Joi from "joi";

export const promptSchema = Joi.object({
  prompt: Joi.string().min(1).required(),
});

export const spellcheckSchema = Joi.object({
  text: Joi.string().min(1).required(),
});

export const translateSchema = Joi.object({
  text: Joi.string().min(1).required(),
  targetLanguage: Joi.string().min(1).required(),
});