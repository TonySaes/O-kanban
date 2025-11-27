import { httpStatusCodes } from "../errors/http.errors.js";
import { callAPI } from "../utils/callAPI.js";
import Joi from "joi";
import { promptSchema, spellcheckSchema, translateSchema } from "../schemas/index.js";

export const llmController = {
  async handlePrompt(req, res) {
    const { prompt } = Joi.attempt(req.body, promptSchema);

    // Call the Mistral API with the prompt
    const llmResponse = await callAPI(
      "Tu es un assistant de gestion de projet intégré dans une application de gestion de tâches (Kanban).",
      prompt
    );

    res.status(httpStatusCodes.OK).json({ response: llmResponse });
  },

  async spellcheck(req, res) {
    const { text } = Joi.attempt(req.body, spellcheckSchema);

    // Call the Mistral API for spell checking
    const llmResponse = await callAPI(
      "Tu es un assistant de correction orthographique et grammaticale, en français, et renvois uniquement le texte corrigé. Si le texte est correct, renvois juste le texte tel quel.",
      `Corrige le texte suivant : ${text}`
    );

    res.status(httpStatusCodes.OK).json({ response: llmResponse });
  },

  async translate(req, res) {
    const { text, targetLanguage } = Joi.attempt(req.body, translateSchema);

    // Call the Mistral API for translation
    const llmResponse = await callAPI(
      "Tu es un assistant de traduction. Tu traduis le texte donné dans la langue cible spécifiée. Tu ne renvois que le texte traduit.",
      `Traduis le texte suivant en ${targetLanguage} : ${text}`
    );

    res.status(httpStatusCodes.OK).json({ response: llmResponse });
  }
};
