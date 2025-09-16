import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // on ne peut pas avoir plusieurs tags avec le meme name
    },
    color: {
      type: DataTypes.STRING(7),
    }
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tag"
  },
);
