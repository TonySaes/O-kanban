import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class List extends Model {}

List.init(
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false, // le titre de liste est obligatoire
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false, // une liste doit avoir une position
      defaultValue: 1,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "List", // We need to choose the model name
    tableName: "list"
  },
);
