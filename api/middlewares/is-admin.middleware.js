import { HttpForbiddenError } from "../errors/http.errors.js";

export function isAdmin(req, res, next) {
  // Récupérer le rôle de l'utilisateur qui a été ajouté à `req` via le middleware `isAuthed`
  const userRole = req.userRole;

  if (userRole === "admin") {
    next();
  } else {
    throw new HttpForbiddenError("You must be admin to access this route");
  }

  // Récupérer le ROLE de l'utilisateur : 
  // - soit on va le chercher en BDD (on a l'ID -> donc on peut avoir le user au complet -> donc son role)
  // - on a qu'à mettre le ROLE de l'utilsateur dans payload également ça nous évitera d'aller le cherche en base !
  // On regarde si le role est "admin" --> next()
  // Sinon 403 : Forbidden (ie, vous êtes bien authentifié MAIS vous n'avez pas les droits)
}
