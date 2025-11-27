import { httpStatusCodes } from "../errors/http.errors.js";

export function getWelcomeResponse(_, res) {
  res
    .status(httpStatusCodes.OK)
    .json({
      message: "Welcome to the Okanban API",
      description: "This is the API for the Okanban application, a kanban board application.",
      version: "1.0.0",
      routes: {
        lists: "/lists",
        liste_expanded: "/lists/expanded",
        cards: "/cards",
        tags: "/tags",
      }
    });
}
