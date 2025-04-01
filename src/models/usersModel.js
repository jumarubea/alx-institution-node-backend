const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { r, u } = require("tar");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "student", "supervisor"),
      defaultValue: "student",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
