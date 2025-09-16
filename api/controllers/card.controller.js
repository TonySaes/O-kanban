import Joi from "joi";
import { List, Card, Tag } from "../models/index.js";
import { createCardSchema, updateCardSchema } from "../schemas/index.js";
import { HttpError, httpStatusCodes } from "../errors/http.errors.js";

export const cardController = {

  // récuperer toutes les cartes
  async getAll(req, res) {

    // filtrer les cartes par liste si un id de liste est fourni en query
    const listId = parseInt(req.query.list_id, 10);

    // ternaire pour définir la clause where
    // si listId est défini whereClause = { list_id: listId }
    // sinon whereClause = {}
    const whereClause = listId ? { list_id: listId } : {};

    const cards = await Card.findAll({
      where: whereClause,
      order: [
        ["list_id", "ASC"],
        ["position", "ASC"],
        ["id", "ASC"],
      ]
    });

    // envoyer les cartes en json au client
    res.status(httpStatusCodes.OK).json(cards);
  },

  // récuperer une carte par son id
  async getById(req, res) {
    const id = req.params.id;

    // récupérer la carte qui porte cet id
    const card = await Card.findByPk(id);

    // si la carte n'existe pas
    if (!card) {
      // il faut envoyer une erreur explicite au client
      throw new HttpError("Card not found", httpStatusCodes.NOT_FOUND);
    }

    // envoyer la carte au client en json
    res.status(httpStatusCodes.OK).json(card);
  },

  // créer une carte
  async create(req, res) {
    // récuperer les données et les valider (NTUI)
    const data = Joi.attempt(req.body, createCardSchema);

    // s'assurer que la liste existe !
    const list = await List.findByPk(data.list_id);

    // si la liste n'existe pas
    if (!list) {
      // il faut envoyer une erreur explicite au client
      throw new HttpError("List not found", httpStatusCodes.BAD_REQUEST);
    }

    // créer la carte
    const card = await Card.create(data);

    // envoyer la carte créée au client en json
    res.status(httpStatusCodes.CREATED).json(card);
  },

  // modifier une carte
  async update(req, res) {
    const id = req.params.id;

    // récupérer la carte qui porte cet id
    const card = await Card.findByPk(id);

    // si la carte n'existe pas
    if (!card) {
      throw new HttpError("Card not found", httpStatusCodes.NOT_FOUND);
    }

    // valider les données de la requete
    const data = Joi.attempt(req.body, updateCardSchema);

    // si la modification porte sur un changement de liste
    if (data.list_id) {
      // s'assurer que la liste existe
      const list = await List.findByPk(data.list_id);

      // si la liste n'existe pas
      if (!list) {
        // il faut envoyer une erreur explicite au client
        throw new HttpError("List not found", httpStatusCodes.BAD_REQUEST);
      }
    }

    // mettre à jour la carte
    if (data.content) { card.content = data.content; }
    if (data.position) { card.position = data.position; }
    if (data.color) { card.color = data.color; }
    if (data.list_id) { card.list_id = data.list_id; }

    await card.save();

    // envoyer la carte mise à jour au client en json
    res.status(httpStatusCodes.OK).json(card);
  },

  // supprimer une carte par son id
  async deleteById(req, res) {
    const id = req.params.id;

    // récupérer la carte qui porte cet id
    const card = await Card.findByPk(id);

    // si la carte n'existe pas
    if (!card) {
      // il faut envoyer une erreur explicite au client
      throw new HttpError("Card not found", httpStatusCodes.NOT_FOUND);
    }

    // supprimer cette carte
    await card.destroy();

    // réponse standard REST : status 204 no content
    res.status(httpStatusCodes.NO_CONTENT).json();
  },

  // récuperer les cartes d'une liste spécifique
  // (doublon avec getAll + query, mais à but pédagogique)
  async getAllFromList(req, res) {
    // récuperer l'id de la liste
    const listId = req.params.id;

    // on pourrait lever une erreur si la liste n'existe pas
    // à coder si besoin.

    const cards = await Card.findAll({
      where: {
        list_id: listId,
      },
      order: [["position", "ASC"]],
    });

    // renvoyer les cartes de la liste
    res.status(httpStatusCodes.OK).json(cards);
  },

  // associer une carte et un tag
  async addTagToCard(req, res) {
    const cardId = parseInt(req.params.cardId, 10);
    const tagId = parseInt(req.params.tagId, 10);

    // vérifier que les ids sont valides
    if (isNaN(cardId) || isNaN(tagId) || cardId <= 0 || tagId <= 0) {
      throw new HttpError("Invalid card or tag ID", httpStatusCodes.BAD_REQUEST);
    }

    // récupérer la carte qui porte cet id
    const card = await Card.findByPk(cardId);

    // si la carte n'existe pas
    if (!card) {
      throw new HttpError("Card not found", httpStatusCodes.BAD_REQUEST);
    }

    // récupérer le tag qui porte cet id
    const tag = await Tag.findByPk(tagId);

    // si le tag n'existe pas
    if (!tag) {
      throw new HttpError("Tag not found", httpStatusCodes.BAD_REQUEST);
    }

    // ajouter le tag à la carte
    await card.addTag(tag);

    // envoyer une réponse standard REST : status 204 no content
    res.status(httpStatusCodes.NO_CONTENT).json();
  },

  // dissocier un tag d'une carte
  async removeTagFromCard(req, res) {
    const cardId = parseInt(req.params.cardId, 10);
    const tagId = parseInt(req.params.tagId, 10);

    // vérifier que les ids sont valides
    if (isNaN(cardId) || isNaN(tagId) || cardId <= 0 || tagId <= 0) {
      throw new HttpError("Invalid card or tag ID", httpStatusCodes.BAD_REQUEST);
    }

    // récupérer la carte qui porte cet id
    const card = await Card.findByPk(cardId);

    // récupérer le tag qui porte cet id
    const tag = await Tag.findByPk(tagId);

    // Pour dissocier, pas besoin de vérifier si la carte ou le tag existent
    // --> suppression silencieuse, fonctionne meme si l'association n'existe pas

    // dissocier le tag de la carte
    await card.removeTag(tag);

    // envoyer une réponse standard REST : status 204 no content
    res.status(httpStatusCodes.NO_CONTENT).json();
  }

};
