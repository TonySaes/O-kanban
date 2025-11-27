import jwt from "jsonwebtoken";
import { HttpUnauthorizedError } from "../errors/http.errors.js";

export function isAuthed(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) { throw new HttpUnauthorizedError("Authorization headers not provided"); } 

  const accessToken = authorizationHeader.substring("Bearer ".length);
  if (!accessToken) { throw new HttpUnauthorizedError("Access token not provided"); }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.role;
    next();

  } catch (error) {
    console.error(`JWT verification error: ${error.message}`);
    throw new HttpUnauthorizedError("Invalid or expired token");
  }
}
