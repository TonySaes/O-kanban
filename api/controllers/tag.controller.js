import Joi from "joi";
import { Tag } from "../models/index.js";
import { createTagSchema, updateTagSchema } from "../schemas/index.js";
import { HttpError, httpStatusCodes } from "../errors/http.errors.js";

export const tagController = {

  // récupérer tous les tags
  async getAll(req, res) {
    // récupérer les tags triés par nom croissant
    const tags = await Tag.findAll({
      order: [
        ["name", "ASC"],
        ["id", "ASC"],
      ]
    });

    // envoyer les données en json au client
    res.status(httpStatusCodes.OK).json(tags);
  },

  // créer un tag
  async create(req, res) {
    const data = Joi.attempt(req.body, createTagSchema);

    // vérifier si le nom du tag est unique
    const existingTag = await Tag.findOne({ where: { name: data.name } });
    if (existingTag) {
      throw new HttpError("Tag name already exists", httpStatusCodes.BAD_REQUEST);
    }

    // créer le tag
    const tag = await Tag.create(data);

    // envoyer le tag créé au client en json
    res.status(httpStatusCodes.CREATED).json(tag);
  },

  // récupérer un tag par son id
  async getById(req, res) {
    const { id } = req.params;

    // récupérer le tag qui porte cet id
    const tag = await Tag.findByPk(id);

    // si le tag n'existe pas
    if (!tag) {
      throw new HttpError("Tag not found", httpStatusCodes.NOT_FOUND);
    }

    // envoyer le tag au client en json
    res.status(httpStatusCodes.OK).json(tag);
  },

  // supprimer un tag par son id
  async deleteById(req, res) {
    const { id } = req.params;

    // récupérer le tag qui porte cet id
    const tag = await Tag.findByPk(id);

    // si le tag n'existe pas
    if (!tag) {
      throw new HttpError("Tag not found", httpStatusCodes.NOT_FOUND);
    }

    // supprimer ce tag
    await tag.destroy();

    // réponse standard REST : status 204 no content
    res.status(httpStatusCodes.NO_CONTENT).json();
  },

  // modifier un tag par son id
  async update(req, res) {
    const { id } = req.params;

    // récupérer et valider les données du corps de la requête
    const data = Joi.attempt(req.body, updateTagSchema);

    // récupérer le tag qui porte cet id
    const tag = await Tag.findByPk(id);

    // si le tag n'existe pas
    if (!tag) {
      throw new HttpError("Tag not found", httpStatusCodes.NOT_FOUND);
    }

    // Si changement de nom
    if (data.name && data.name !== tag.name) {
      // vérifier l'unicité
      const existingTag = await Tag.findOne({ where: { name: data.name } });
      if (existingTag) {
        throw new HttpError("Tag name already exists", httpStatusCodes.BAD_REQUEST);
      }
    }

    // mettre à jour le tag
    await tag.update(data);

    // envoyer le tag mis à jour au client en json
    res.status(httpStatusCodes.OK).json(tag);
  },

};
