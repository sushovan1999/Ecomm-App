const sequelize = require("sequelize");
const dbconnection = require("./../config/db.config");

let cart = dbconnection.define(
  "cart",
  {
    id: {
      type: sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cost: {
      type: sequelize.DataTypes.DECIMAL,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = cart;
