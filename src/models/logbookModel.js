const { DataTypes, BLOB } = require("sequelize");
const sequelize = require("../config/database");

const Logbooks = sequelize.define(
  "Logbooks",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    file: {
      type: BLOB,
      allowNull: true,
    },
    file_details: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    weekno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_submitteed: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    activities: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
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
      allowNull: true,
    },
  },
  {
    tableName: "logbooks",
    timestamps: true,
  }
);

module.exports = Logbooks;
