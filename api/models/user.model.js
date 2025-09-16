import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.TEXT, // TEXT = illimité | STRING = 255 caractères
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(["member", "admin"]), // seules les valeurs "member" et "admin" seront acceptées ici
      allowNull: false,
      defaultValue: "member"
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user"
  },
);
