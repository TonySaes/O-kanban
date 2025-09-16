// Index.js a deux rôles : 
// - définir les associations
// - faire un point d'entrée vers nos modèles depuis les autres dossiers
//   ie, plutôt que d'importer nos modèles depuis leur fichier individuel, on peut importer depuis /models/index.js
//   en anglais on appel ça un entry-point (un fichier d'index)

import { List } from "./list.model.js";
import { Card } from "./card.model.js";
import { Tag } from "./tag.model.js";
import { User } from "./user.model.js";
import { sequelize } from "./sequelize.client.js";


// association list <-> card
// association de type one-to-many
List.hasMany(Card, {
  foreignKey: "list_id", // Clé étrangere dans la table card, on la définit pour etre explicite
  as: "cards", // alias pour cette association (utile dans les requetes avec des include)
  onDelete: "CASCADE", // Supprimer une liste, supprime également toutes les cartes associées
});

Card.belongsTo(List, {
  foreignKey: "list_id",
  as: "list",
});

// association card <-> tag
// association de type many-to-many
Card.belongsToMany(Tag, {
  through: "card_has_tag", // table de jointure avec un nom personnalisé
  foreignKey: "card_id", // clé étrangere du modele d'origine
  otherKey: "tag_id", // clé étrangere du modele cible
  as: "tags"
});

Tag.belongsToMany(Card, {
  through: "card_has_tag",
  foreignKey: "tag_id",
  otherKey: "card_id",
  as: "cards"
});

export {
  List,
  Card,
  Tag,
  User,
  sequelize
};
