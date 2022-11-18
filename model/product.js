let sequelize = require("sequelize");
let dbconnection = require("../config/db.config");

let Products = dbconnection.define(
  "Products",
  {
    id: {
      primaryKey: true,
      notNull: true,
      autoIncrement: true,
      type: sequelize.DataTypes.INTEGER,
    },

    name: {
      notNull: true,
      type: sequelize.DataTypes.STRING,
    },
    price: {
      notNull: true,
      type: sequelize.DataTypes.BIGINT,
    },
    categoryId: {
      notNull: true,
      type: sequelize.DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Products;
