// Chargement des variables d'environnement
import "dotenv/config";

// Imports
import express from "express";
import cors from "cors";
import { apiRouter } from "./routers/index.js";
import { notFoundMiddleware, errorMiddleware } from "./middlewares/error.middleware.js";
import { xss } from "express-xss-sanitizer";

// Creation de l'app Express
const app = express();

// Autoriser les requêtes Cross-Origin venu de notre front
app.use(cors()); // * = autorité tous les domaines

// Middleware pour parser les données JSON entrantes
app.use(express.json());

// Body sanitizer anti-XSS
app.use(xss());

// Api router (avec préfixe et/ou version)
app.use(/* "/api", */ apiRouter);

// Middlewares d'erreurs
app.use(errorMiddleware);

// Middleware pour gérer les routes non trouvées (404)
app.use(notFoundMiddleware);

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Api is listening on http://localhost:${port}`);
});
