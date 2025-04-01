const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Feedback = sequelize.define(
  "Feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    logbook_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "logbooks",
        key: "id",
      },
    },
    supervisor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "feedback",
    timestamps: true,
  }
);

module.exports = Feedback;
