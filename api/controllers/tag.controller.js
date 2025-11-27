import Joi from "joi";
import { Tag } from "../models/index.js";
import { createTagSchema, updateTagSchema } from "../schemas/index.js";
import { HttpError, httpStatusCodes } from "../errors/http.errors.js";

export const tagController = {

  async getAll(req, res) {
    const tags = await Tag.findAll({
      order: [
        ["name", "ASC"],
        ["id", "ASC"],
      ]
    });
    res.status(httpStatusCodes.OK).json(tags);
  },

  async create(req, res) {
    const data = Joi.attempt(req.body, createTagSchema);

    const existingTag = await Tag.findOne({ where: { name: data.name } });
    if (existingTag) {
      throw new HttpError("Tag name already exists", httpStatusCodes.BAD_REQUEST);
    }

    const tag = await Tag.create(data);

    res.status(httpStatusCodes.CREATED).json(tag);
  },


  async getById(req, res) {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    if (!tag) {
      throw new HttpError("Tag not found", httpStatusCodes.NOT_FOUND);
    }

    res.status(httpStatusCodes.OK).json(tag);
  },

  async deleteById(req, res) {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    if (!tag) {
      throw new HttpError("Tag not found", httpStatusCodes.NOT_FOUND);
    }

    await tag.destroy();

    res.status(httpStatusCodes.NO_CONTENT).json();
  },

  async update(req, res) {
    const { id } = req.params;

    const data = Joi.attempt(req.body, updateTagSchema);

    const tag = await Tag.findByPk(id);

    if (!tag) {
      throw new HttpError("Tag not found", httpStatusCodes.NOT_FOUND);
    }

    if (data.name && data.name !== tag.name) {
      const existingTag = await Tag.findOne({ where: { name: data.name } });
      if (existingTag) {
        throw new HttpError("Tag name already exists", httpStatusCodes.BAD_REQUEST);
      }
    }

    await tag.update(data);

    res.status(httpStatusCodes.OK).json(tag);
  },

};
