// créer une classe d'erreur personnalisée héritée de Error
export class HttpError extends Error {
  constructor(message, statusCode) {
    super(message); // on passe l'attribut message à la classe parente
    this.name = "HttpError"; // nom d'erreur personnalisé (valeur statique)
    this.statusCode = statusCode; // on définit l'attribut statusCode 
  }
}

// 400 - Bad Request
export class HttpBadRequestError extends HttpError {
  constructor(message = "bad request") {
    super(message, httpStatusCodes.BAD_REQUEST);
  }
}

// 401 - Unauthorized
export class HttpUnauthorizedError extends HttpError {
  constructor(message = "unauthorized") {
    super(message, httpStatusCodes.UNAUTHORIZED);
  }
}

// 403 - Forbidden
export class HttpForbiddenError extends HttpError {
  constructor(message = "forbidden") {
    super(message, httpStatusCodes.FORBIDDEN);
  }
}

// 404 - Not Found
export class HttpNotFoundError extends HttpError {
  constructor(message = "ressource not found") {
    super(message, httpStatusCodes.NOT_FOUND);
  }
}

// 409 - Conflict
export class HttpConflictError extends HttpError {
  constructor(message = "conflict") {
    super(message, httpStatusCodes.CONFLICT);
  }
}

// Stocker les status code
export const httpStatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
