import { Router } from "express";

import { llmController } from "../controllers/index.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";

export const llmRouter = Router();

// Route to handle LLM requests
llmRouter.post ("/prompt", isAuthed, llmController.handlePrompt);

// Route to check the spell
llmRouter.post ("/spellcheck", isAuthed, llmController.spellcheck);

//Route to translate text
llmRouter.post ("/translate", isAuthed, llmController.translate);