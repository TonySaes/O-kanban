import Joi from "joi";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { HttpBadRequestError, HttpConflictError, httpStatusCodes, HttpUnauthorizedError } from "../errors/http.errors.js";
import { User } from "../models/index.js";

export const authController = {
  async registerUser(req, res) {
    // Définir un schéma de validation (que l'on peut extraire dans le dossier `api/schemas`)
    const registerUserSchema = Joi.object({
      username: Joi.string().min(1).required(), // - username est une string d'au moins 1 caractère, obligatoire
      password: Joi.string().min(8).regex(/[0-9]/).regex(/[a-z]/).regex(/[A-Z]/).required(), // - password : au moins 8 caractères, 1 chiffre, 1 majuscule, 1 minuscule
      confirm: Joi.string().min(8).regex(/[0-9]/).regex(/[a-z]/).regex(/[A-Z]/).required() // Alternativement : Joi.ref('password')
    });

    // Valider le body
    const { username, password, confirm } = Joi.attempt(req.body, registerUserSchema); // Si la validation plante, alors l'erreur (ValidationError) est transmise au 'errorMiddleware' pour traitement et renvoie d'une 400
    
    // Vérifier que le MDP + CONFIRM correspondent, sinon 400 (Bad Request)
    if (password !== confirm) {
      throw new HttpBadRequestError("Le mot de passe et sa confirmation ne correspondent pas"); // Cette erreur est également transmise au errorMiddleware pour traitement et envoie du status code approprié
    }

    // Vérifier si le username n'est pas déjà pris, sinon 409 (Conflict)
    const alreadyExistingUser = await User.findOne({ where: { username } }); // User | null
    if (alreadyExistingUser) {
      throw new HttpConflictError("Ce pseudo est déjà utilisé");
    }

    // Hacher le mot de passe à l'aide de argon2
    const hashedPassword = await argon2.hash(password);

    // Enregistre l'utilisateur en BDD via le modèle User
    const createdUser = await User.create({
      username: username,
      password: hashedPassword
    });

    // Le renvoyer au client (note : si possible sans renvoyer le mot de passe haché par sécurité)
    res.status(httpStatusCodes.CREATED).json({
      id: createdUser.id,
      username: createdUser.username,
      created_at: createdUser.created_at,
      updated_at: createdUser.updated_at
    });
  },

  async loginUser(req, res) {
    // Récupérer le body (username + mdp) et le valider
    const loginUserSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required() // Pas besoin de valider plus que ça, de toutes manières le mdp va être comparé à l'étape après
    });

    const { username, password } = Joi.attempt(req.body, loginUserSchema);

    // Récupérer l'utilisateur en BDD
    // - SI KO : 401 : mauvais couple username/mdp
    const user = await User.findOne({ where: { username }}); // { id, username, password, created_at, updated_at }
    if (!user) {
      throw new HttpUnauthorizedError("Le pseudo et le mot de passe ne correspondent pas");
    }

    // Comparer le MDP stocké (hashé) avec le MPD fourni
    // - SI KO : 401 : mauvais couple username/mdp
    const isMatching = await argon2.verify(user.password, password);
    if (! isMatching) {
      throw new HttpUnauthorizedError("Le pseudo et le mot de passe ne correspondent pas");
    }


    // Générer le token d'accès JWT : 
    // - Payload : { userId + username }
    // - Durée de vie : 1h
    // - Signer : clé secrète à générer et à stocker dans le .env
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role }, // Payload = charge utile
      process.env.JWT_SECRET, // Signature
      { expiresIn: "1h" }
    );


    // On renvoie le token ainsi que le user
    res.json({
      token,
      user: {
        id: user.id,
        role: user.role,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at
      } });
  },

  async getCurrentUserInfo(req, res) {
    // Puisque le middleware isAuthed est placé AVANT ce controleur,
    // Alors, j'ai accès a priori à la variable `req.userId` contenant l'ID de l'utilisateur qui fait la requête
    const userId = req.userId;

    // On récupère le user (sans son mdp)
    const user = await User.findByPk(userId, { attributes: { exclude: ["password"] }});

    // On le renvoie
    res.json(user);
  }
};
