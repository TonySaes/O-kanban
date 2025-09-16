export function checkId(req, res, next) {

  // récuperer l'id et transformer en entier en base 10
  const id = parseInt(req.params.id, 10); 

  // un id est un nombre entier positif
  if (isNaN(id) || id <= 0) {
    res.status(400).json({error: "invalid ID (must be a positive integer)"});
    return; // apres une réponse prématurée, on stoppe la fonction
  }

  // on parse l'id pour le transmettre au controlleur dans un format valide
  req.params.id = parseInt(req.params.id, 10);

  // si l'id est valide
  next();
}
