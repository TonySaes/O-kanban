import Joi from "joi";
import { List } from "../models/index.js";
import { createListSchema, updateListSchema } from "../schemas/index.js";
import { HttpError, httpStatusCodes } from "../errors/http.errors.js";

export const listController = {

  // récuperer toutes les listes
  async getAll(req, res) {

    // récuperer les listes triées par position croissante
    const lists = await List.findAll({
      order: [
        ["position", "ASC"],
        ["id", "ASC"],
      ]
    });

    // envoyer les listes en json au client
    res.status(httpStatusCodes.OK).json(lists);
  },

  // créer une liste
  async create(req, res) {
    // récuperer les données et les valider (NTUI)
    const data = Joi.attempt(req.body, createListSchema);

    // console.log(data); // --> { title: "nouvelle liste", position: 2 }

    // créer la liste
    const list = await List.create(data);

    // envoyer la liste créée au client en json
    res.status(httpStatusCodes.CREATED).json(list);
  },

  // récuperer une liste par son id
  async getById(req, res) {
    // récuperer l'id de la liste souhaitée
    const id = req.params.id;

    // récupérer la liste qui porte cet id
    const list = await List.findByPk(id);

    // si la liste n'existe pas
    if (!list) {
      // il faut envoyer une erreur explicite au client
      // res.status(404).json({message: "list not found"});
      // return; // apres une réponse prématurée, on stoppe la fonction

      // nouveau ! on leve une erreur personnalisée :
      throw new HttpError("List not found", httpStatusCodes.NOT_FOUND);
    }

    // envoyer la liste au client en json
    res.status(httpStatusCodes.OK).json(list);
  },

  // supprimer une liste par son id
  async deleteById(req, res) {
    const { id } = req.params; // ecriture déstructurée (destructuring)

    // récupérer la liste qui porte cet id
    const list = await List.findByPk(id);

    // si la liste n'existe pas
    if (!list) {
      // il faut envoyer une erreur explicite au client
      throw new HttpError("List not found", httpStatusCodes.NOT_FOUND);
    }

    // supprimer cette liste
    list.destroy();

    // réponse standard REST : status 204 no content
    res.status(httpStatusCodes.NO_CONTENT).json();
  },

  // modifier une liste par son id
  async update(req, res) {
    // récuperer l'id de la liste souhaitée
    const { id } = req.params;

    // récupérer et valider les données du corps de la requête
    const data = Joi.attempt(req.body, updateListSchema);

    // récupérer la liste qui porte cet id
    const list = await List.findByPk(id);

    // si la liste n'existe pas
    if (!list) {
      // il faut envoyer une erreur explicite au client
      throw new HttpError("List not found", httpStatusCodes.NOT_FOUND);
    }

    list.title = data.title || list.title;
    list.position = data.position || list.position;
    await list.save();

    // envoyer la liste mise à jour au client en json
    res.status(httpStatusCodes.OK).json(list);
  },

  // bonus : récuperer toutes les listes avec leurs cartes et leurs tags
  async getAllWithCardsAndTags(req, res) {
    // récuperer les listes avec leurs cartes et leurs tags
    const lists = await List.findAll({
      include: [
        {
          association: "cards",
          include: [
            {
              association: "tags",
              through: { attributes: [] } // on ne veut pas les attributs de la table de jointure
            }
          ]
        }
      ],
      order: [
        ["position", "ASC"],
        ["id", "ASC"],
      ]
    });

    // envoyer les listes avec leurs cartes et leurs tags en json au client
    res.status(httpStatusCodes.OK).json(lists);
  } 

};
