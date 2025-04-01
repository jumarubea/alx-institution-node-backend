const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Report = sequelize.define(
  "Report",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    generated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    report_type: {
      type: DataTypes.ENUM("weekly", "monthly", "custom"),
      defaultValue: "weekly",
    },
    date_generated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    report_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "reports",
    timestamps: true,
  }
);

module.exports = Report;
