import joi from "joi";
import { HttpError, httpStatusCodes } from "../errors/http.errors.js";

export function notFoundMiddleware(req, res) {
  res
    .status(httpStatusCodes.NOT_FOUND)
    .json({ error: "Not found" });  
}

// eslint-disable-next-line no-unused-vars
export function errorMiddleware(err, req, res, _next) {
  // on log l'erreur pour le dev qui debug
  console.error(err);

  // si c'est une httpError
  if (err instanceof HttpError) {
    res
      .status(err.statusCode)
      .json({ error: err.message });
    return;
  }
  
  // si c'est une erreur de validation (err.name = ValidationError)
  if (err instanceof joi.ValidationError) {
    res
      .status(httpStatusCodes.BAD_REQUEST)
      .json({ error: err.message });
    return;
  }

  res
    .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "Internal server error" });
}
