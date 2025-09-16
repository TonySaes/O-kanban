import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Card extends Model {}

Card.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      defaultValue: 1,
    },
    color: {
      type: DataTypes.STRING(7),
    },
  },
  {
    sequelize,
    modelName: "Card",
    tableName: "card"
  },
);
