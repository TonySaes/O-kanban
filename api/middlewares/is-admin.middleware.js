import { HttpForbiddenError } from "../errors/http.errors.js";

export function isAdmin(req, res, next) {
  const userRole = req.userRole;

  if (userRole === "admin") {
    next();
  } else {
    throw new HttpForbiddenError("You must be admin to access this route");
  }
}
