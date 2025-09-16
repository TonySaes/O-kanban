import jwt from "jsonwebtoken";
import { HttpUnauthorizedError } from "../errors/http.errors.js";

export function isAuthed(req, res, next) {
  // On récupère le header d'Authorization
  const authorizationHeader = req.headers.authorization; // "Bearer eyJhbGciOiJIUzI1NiIsInR5c"
  if (! authorizationHeader) { throw new HttpUnauthorizedError("Authorization headers not provided"); } // 401 si non présent

  // On extrait l'access token depuis le header
  const accessToken = authorizationHeader.substring("Bearer ".length);
  if (! accessToken) { throw new HttpUnauthorizedError("Access token not provided"); } // 401 si non présent

  try {
    // Vérifier et décoder le token
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET); // { userId: 1, username: 'Alice', iat: 1753859516, exp: 1753863116 }

    // Très régulièrement, on accroche le `userId` à `req` à ce niveau, afin que les middlewares suivant puisse accéder à l'ID de l'utilisateur qui fait la requête
    req.userId = decodedToken.userId; // Très pratique ! 
    req.userRole = decodedToken.role; // Pratique pour le middleware `isAdmin` qui vient juste après

    // Le token est décodé, donc il est valide, on peut donc passer au middleware suivant
    next();

  } catch (error) {
    console.error(`JWT verification error: ${error.message}`);
    // Si pas valide, ou expiré ==> 401
    throw new HttpUnauthorizedError("Invalid or expired token");
  }
}
